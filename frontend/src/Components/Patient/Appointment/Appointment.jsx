import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Modal,
  SegmentedControl,
  Select,
  Text,
  Textarea,
  TextInput,
  Card, // Added for prescription cards
  Divider, // Added for layout
  Grid, // Added for layout
  Title,
} from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconMedicineSyrup,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
// import { getdoctorDropdown } from "../../../Service/DoctorProfileService";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { appointmentReasons } from "../../../Data/DropDownData";
import { useSelector } from "react-redux";
import {
  cancelAppointment,
  getAppointmentsByPatient,
  getPrescriptionsByPatientId,
  scheduleAppointment,
} from "../../../Service/AppointmentService";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import { formatDateWithTime } from "../../../Utility/DateUtility";
import { modals } from "@mantine/modals";
import { Toolbar } from "primereact/toolbar";
import { getAllDoctors } from "../../../Service/DoctorProfileService"; // new import

const Appointment = () => {
  const [opened, { open, close }] = useDisclosure(false);
  // const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("Today");
  const user = useSelector((state) => state.user);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [allDoctors, setAllDoctors] = useState([]); // Full list of doctors
  const [specializations, setSpecializations] = useState([]); // Unique specialization options
  const [departments, setDepartments] = useState([]); // Unique department options

  // **New state for prescriptions**
  const [medicineData, setMedicineData] = useState([]);
  const [
    openedPrescriptions,
    { open: openPrescriptions, close: closePrescriptions },
  ] = useDisclosure(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const getSeverity = (status) => {
    switch (status) {
      case "CANCELLED":
        return "danger";
      case "COMPLETED":
        return "success";
      case "SCHEDULED":
        return "info";
      case "negotiation":
        return "warning";
      default:
        return null;
    }
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      docSpecialization: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      docDepartment: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      doctorName: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      reason: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      notes: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValue("");
  };

  const fetchData = () => {
    getAppointmentsByPatient(user.profileId)
      .then((data) => {
        setAppointments(getCustomers(data));
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  useEffect(() => {
    initFilters();
    fetchData();

    // getdoctorDropdown()
    //   .then((data) => {
    //     console.log(data);
    //     setDoctors(
    //       data.map((doctor) => ({ value: "" + doctor.id, label: doctor.name }))
    //     );
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching doctor dropdown data:", error);
    //   });
    // Fetch all doctors from profileMS
    getAllDoctors()
      .then((data) => {
        setAllDoctors(data);

        // make sure values are strings
        const specs = [...new Set(data.map((d) => String(d.specialization)))];
        const depts = [...new Set(data.map((d) => String(d.department)))];

        setSpecializations(specs.map((s) => ({ value: s, label: s })));
        setDepartments(depts.map((d) => ({ value: d, label: d })));
      })
      .catch((err) => console.error("Error loading doctors", err));
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, global: { ...prev.global, value } }));
    setGlobalFilterValue(value);
  };
  const form = useForm({
    initialValues: {
      specialization: "", // <-- new field
      department: "",
      doctorId: "",
      patientId: user.profileId,
      appointmentTime: new Date(),
      reason: "",
      notes: "",
    },

    validate: {
      doctorId: (value) => (value ? null : "Doctor is required"),
      appointmentTime: (value) =>
        value ? null : "Appointment time is required",
      reason: (value) => (value ? null : "Reason is required"),
    },
  });

  // const renderHeader = () => (
  //   <div className="flex justify-between items-center">
  //     <Button leftSection={<IconPlus />} variant="filled" onClick={open}>
  //       Schedule Appointment
  //     </Button>

  //     <TextInput
  //       leftSection={<IconSearch />}
  //       fw={500}
  //       value={globalFilterValue}
  //       onChange={onGlobalFilterChange}
  //       placeholder="Keyword Search"
  //     />
  //   </div>
  // );

  // const header = renderHeader();
  const handleSubmit = (values) => {
    if (selectedDoctor) {
      if (!isDayAllowed(values.appointmentTime, selectedDoctor)) {
        errorNotification("This doctor is not available on the selected day");
        return;
      }
      if (!isTimeAllowed(values.appointmentTime, selectedDoctor)) {
        errorNotification(
          `Doctor available only between ${selectedDoctor.startTime} to ${selectedDoctor.endTime}`
        );
        return;
      }
    }

    // ---------- VERY IMPORTANT FIX ----------
    const formatLocalDateTime = (date) => {
      const pad = (n) => String(n).padStart(2, "0");

      return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        " " +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":" +
        pad(date.getSeconds())
      );
    };

    const payload = {
      doctorId: Number(values.doctorId),
      patientId: Number(values.patientId),
      reason: values.reason,
      notes: values.notes || "",
      appointmentTime: formatLocalDateTime(values.appointmentTime),
    };
    setLoading(true);
    scheduleAppointment(payload)
      .then((data) => {
        close();
        form.reset();
        fetchData();
        successNotification("Appointment scheduled successfully");
      })
      .catch((error) => {
        errorNotification(
          error.response?.data?.errorMessage ||
            "Failed to schedule appointment. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (rowData) => {
    modals.openConfirmModal({
      title: <span className="text-xl font-semibold">Are You Sure</span>,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to cancel the appointment with Dr.{" "}
          {rowData.doctorName} scheduled on{" "}
          {formatDateWithTime(rowData.appointmentTime)}? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        cancelAppointment(rowData.id)
          .then((data) => {
            successNotification("Appointment cancelled successfully");
            setAppointments(
              appointments.map((app) =>
                app.id == rowData.id ? { ...app, status: "CANCELLED" } : app
              )
            );
          })
          .catch((error) => {
            errorNotification(
              error.response?.data?.errorMessage ||
                "Failed to cancel appointment. Please try again."
            );
          });
      },
    });
  };

  // **New handler to view prescriptions for an appointment**
  const handleViewPrescription = (rowData) => {
    getPrescriptionsByPatientId(user.profileId)
      .then((res) => {
        // Find the prescription that matches this appointment ID
        const prescription = res.find((p) => p.appointmentId === rowData.id);
        setMedicineData(prescription ? prescription.medicines : []);
        openPrescriptions();
      })
      .catch((err) => {
        console.error("Error fetching prescriptions:", err);
      });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        {/* **New icon button to view prescription** */}
        <ActionIcon onClick={() => handleViewPrescription(rowData)}>
          <IconMedicineSyrup size={16} stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => handleDelete(rowData)}>
          <IconTrash size={16} stroke={1.5} />
        </ActionIcon>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => (
    <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
  );

  const timeTemplate = (rowData) => {
    return <span>{formatDateWithTime(rowData.appointmentTime)}</span>;
  };

  const leftToolbarTemplate = () => {
    return (
      <Button leftSection={<IconPlus />} variant="filled" onClick={open}>
        Schedule Appointment
      </Button>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <TextInput
        leftSection={<IconSearch />}
        fw={500}
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Keyword Search"
      />
    );
  };
  const centerToolbarTemplate = () => {
    return (
      <SegmentedControl
        value={tab}
        variant="filled"
        color={tab === "Today" ? "blue" : tab === "Upcoming" ? "teal" : "red"}
        onChange={setTab}
        data={["Today", "Upcoming", "Past"]}
      />
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today

    const appointmentDay = new Date(appointmentDate);
    appointmentDay.setHours(0, 0, 0, 0); // Set to the start of the appointment day

    if (tab === "Today") {
      return appointmentDay.getTime() === today.getTime();
    } else if (tab === "Upcoming") {
      return appointmentDay.getTime() > today.getTime();
    } else if (tab === "Past") {
      return appointmentDay.getTime() < today.getTime();
    }
    return true;
  });

  const getDoctorOptions = () => {
    return allDoctors
      .filter((d) => {
        return (
          (!form.values.specialization ||
            d.specialization === form.values.specialization) &&
          (!form.values.department || d.department === form.values.department)
        );
      })
      .map((d) => ({
        value: String(d.id),
        label: d.name,
      }));
  };

  // Convert LocalTime string ("11:00") to Date object (BD time)
  const toBDTime = (timeStr, baseDate) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date(baseDate);
    d.setHours(h, m, 0, 0);
    return d;
  };

  // Check if chosen day matches doctor's availableDays
  const isDayAllowed = (input, doctor) => {
    if (!doctor || !doctor.availableDays) return true;

    // Convert to Date safely
    const date = new Date(input);

    // If invalid date → allow by default
    if (isNaN(date.getTime())) return true;

    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const dayName = localDate.toLocaleString("en-US", { weekday: "long" });

    return doctor.availableDays.includes(dayName);
  };

  // Check if chosen time is inside doctor's allowed range
  const isTimeAllowed = (date, doctor) => {
    if (!doctor || !doctor.startTime) return true;

    const start = toBDTime(doctor.startTime, date);
    const end = toBDTime(doctor.endTime, date);

    return date >= start && date <= end;
  };

  return (
    <div className="card">
      <Toolbar
        className="mb-4"
        start={leftToolbarTemplate}
        center={centerToolbarTemplate}
        end={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        stripedRows
        value={filteredAppointments}
        paginator
        showGridlines
        rows={10}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          "doctorName",
          "reason",
          "notes",
          "status",
          "docSpecialization",
          "docDepartment",
        ]}
        emptyMessage="No appointment found."
        onFilter={(e) => setFilters(e.filters)}
      >
        <Column
          field="doctorName"
          header="Doctor"
          sortable
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="appointmentTime"
          header="Appointment Time"
          sortable
          body={timeTemplate}
        />
        <Column
          field="reason"
          header="Reason"
          sortable
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="notes"
          header="Notes"
          sortable
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          filter
        />
        <Column
          headerStyle={{ width: "5rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
          filter
        />
      </DataTable>
      {/* **Modal to show medicines for the selected appointment** */}
      <Modal
        opened={openedPrescriptions}
        size="xl"
        onClose={closePrescriptions}
        title="Medicines"
        centered
      >
        <div className="grid grid-cols-2 gap-5">
          {medicineData.map((data, index) => (
            <Card key={index} shadow="md" radius="lg" withBorder padding="lg">
              <Title order={4} mb="sm">
                {data.name} ({data.type})
              </Title>
              <Divider my="xs" />
              <Grid gap="xs">
                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Dosage:
                  </Text>
                  <Text>{data.dosage}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" fw={500}>
                    Frequency:
                  </Text>
                  <Text>{data.frequency}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" fw={500}>
                    Duration:
                  </Text>
                  <Text>{data.duration}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" fw={500}>
                    Advice:
                  </Text>
                  <Text>{data.advice}</Text>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </div>
        {medicineData.length === 0 && (
          <Text color="dimmed" size="sm" mt="md">
            No medicines prescribed for this appointment
          </Text>
        )}
      </Modal>
      <Modal
        opened={opened}
        size="lg"
        onClose={close}
        title={
          <div className="text-xl font-semibold">Schedule Appointment</div>
        }
        centered
      >
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="grid grid-cols-1 gap-3"
        >
          {/* Specialization Select */}
          <Grid>
            <Grid.Col span={6}>
              <Select
                label="Specialist"
                data={specializations}
                value={form.values.specialization}
                onChange={(v) => form.setFieldValue("specialization", v || "")}
                clearable
                placeholder="choice specialist"
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Department"
                data={departments}
                value={form.values.department}
                onChange={(v) => form.setFieldValue("department", v || "")}
                clearable
                placeholder="choice department"
              />
            </Grid.Col>
          </Grid>

          <Select
            label="Doctor"
            data={getDoctorOptions()}
            value={form.values.doctorId}
            onChange={(v) => {
              form.setFieldValue("doctorId", v || "");
              const doc = allDoctors.find((d) => String(d.id) === String(v));
              setSelectedDoctor(doc || null);
            }}
            clearable
            placeholder="Select Doctor"
          />

          {/* <Select
            {...form.getInputProps("doctorId")}
            withAsterisk
            data={doctors}
            label="Doctor"
            placeholder="Select Doctor"
          /> */}
          <DateTimePicker
            minDate={new Date()}
            {...form.getInputProps("appointmentTime")}
            withAsterisk
            label="Appointment Time"
            excludeDate={(date) => {
              // Mantine often passes strings or invalid objects → must convert
              const d = new Date(date);

              // If invalid → do NOT disable
              if (isNaN(d.getTime())) return false;

              if (!selectedDoctor) return false;

              return !isDayAllowed(d, selectedDoctor);
            }}
            onChange={(value) => {
              const d = new Date(value);

              if (isNaN(d.getTime())) return; // ignore invalid values

              if (selectedDoctor) {
                if (!isDayAllowed(d, selectedDoctor)) {
                  errorNotification("Doctor is not available on this day");
                  return;
                }

                if (!isTimeAllowed(d, selectedDoctor)) {
                  errorNotification(
                    `Doctor available between ${selectedDoctor.startTime} - ${selectedDoctor.endTime}`
                  );
                  return;
                }
              }

              form.setFieldValue("appointmentTime", d);
            }}
            placeholder="Pick date and time"
          />

          <Select
            {...form.getInputProps("reason")}
            data={appointmentReasons}
            withAsterisk
            label="Reason for Appointment"
            placeholder="Reason for appointment"
            mt="md"
          />
          <Textarea
            {...form.getInputProps("notes")}
            withAsterisk
            label="Additional Notes"
            placeholder="Enter any additional notes"
            mt="md"
          />
          <Button type="submit" variant="filled">
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Appointment;
