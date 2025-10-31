import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressBar } from "primereact/progressbar";
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
} from "@mantine/core";
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { getdoctorDropdown } from "../../../Service/DoctorProfileService";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { appointmentReasons } from "../../../Data/DropDownData";
import { useSelector } from "react-redux";
import {
  cancelAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  scheduleAppointment,
} from "../../../Service/AppointmentService";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import { formatDateWithTime } from "../../../Utility/DateUtility";
import { modals } from "@mantine/modals";
import { Toolbar } from "primereact/toolbar";
import { data, useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState("Today");
  const user = useSelector((state) => state.user);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

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
      patientName: {
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
    getAppointmentsByDoctor(user.profileId)
      .then((data) => {
        console.log("Fetched appointments:", data);
        setAppointments(getCustomers(data));
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const getCustomers =(data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
  });
  }

  useEffect(() => {
    initFilters();
    fetchData();

    getdoctorDropdown()
      .then((data) => {
        setDoctors(
          data.map((doctor) => ({ value: "" + doctor.id, label: doctor.name }))
        );
      })
      .catch((error) => {
        console.error("Error fetching doctor dropdown data:", error);
      });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, global: { ...prev.global, value } }));
    setGlobalFilterValue(value);
  };
  const form = useForm({
    initialValues: {
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

  const renderHeader = () => (
    <div className="flex justify-between items-center">
      <Button leftSection={<IconPlus />} variant="filled" onClick={open}>
        Schedule Appointment
      </Button>

      <TextInput
        leftSection={<IconSearch />}
        fw={500}
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Keyword Search"
      />
    </div>
  );

  const header = renderHeader();
  const handleSubmit = (values) => {
    setLoading(true);
    scheduleAppointment(values)
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
          {rowData.patientName} scheduled on{" "}
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <ActionIcon onClick={()=>navigate(""+rowData.id)}>
          <IconEye size={16} stroke={1.5} />
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
          Schedule Appointment</Button>
    );
  };

  const rightToolbarTemplate = () => {
    return <TextInput
          leftSection={<IconSearch />}
          fw={500}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />;
  };
  const centerToolbarTemplate = () => {
    return <SegmentedControl
      value={tab}
      variant="filled"
      color={tab==="Today"?"blue":tab==="Upcoming"?"teal":"red"}
      onChange={setTab}
      data={["Today","Upcoming","Past"]}
    />
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

  return (
    <div className="card">
      <Toolbar
        className="mb-4"
        start={centerToolbarTemplate}
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
        globalFilterFields={["patientName", "reason", "notes", "status"]}
        emptyMessage="No appointment found."
        onFilter={(e) => setFilters(e.filters)}
      >
        <Column
          field="patientName"
          header="Patient"
          sortable
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="patientPhone"
          header="Phone"
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
          <Select
            {...form.getInputProps("doctorId")}
            withAsterisk
            data={doctors}
            label="Doctor"
            placeholder="Select Doctor"
          />
          <DateTimePicker
            minDate={new Date()}
            {...form.getInputProps("appointmentTime")}
            withAsterisk
            label="Appointment Time"
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
