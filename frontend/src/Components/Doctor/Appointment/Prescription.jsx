import { ActionIcon, Card, Divider, Grid, Modal, Text, TextInput, Title } from "@mantine/core";
import {
  IconEye,
  IconMedicineSyrup,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { getPrescriptionsByPatientId } from "../../../Service/AppointmentService";
import { formatDate } from "../../../Utility/DateUtility";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const Prescription = ({ appointment }) => {
  const [data, setData] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [medicineData,setMedicineData] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, global: { ...prev.global, value } }));
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    initFilters();

    if (!appointment?.patientId) {
      console.warn("No patient ID found — skipping prescription fetch");
      return;
    }

    setLoading(true);
    getPrescriptionsByPatientId(appointment.patientId)
      .then((res) => {
        console.log("Prescription Data:", res);
        setData(res);
      })
      .catch((err) => {
        console.error("Error fetching prescription:", err);
      })
      .finally(() => setLoading(false));
  }, [appointment?.patientId]);

  const renderHeader = () => (
    <div className="flex justify-end items-center">
      <TextInput
        leftSection={<IconSearch />}
        fw={500}
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Keyword Search"
      />
    </div>
  );
  const handleMedicine = (medicine) => {
    open();
    setMedicineData(medicine);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <ActionIcon
          onClick={() =>
            navigate("/doctor/appointments/" + rowData.appointmentId)
          }
        >
          <IconEye size={16} stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => handleMedicine(rowData.medicines)}>
          <IconMedicineSyrup size={16} stroke={1.5} />
        </ActionIcon>
      </div>
    );
  };
  const header = renderHeader();
  return (
    <div>
      <DataTable
        header={header}
        stripedRows
        value={data}
        paginator
        showGridlines
        rows={10}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={["doctorName", "notes"]}
        emptyMessage="No appointment found."
        onFilter={(e) => setFilters(e.filters)}
      >
        <Column field="doctorName" header="Doctor" />
        <Column
          field="prescriptionDate"
          header="Prescription Date"
          sortable
          body={(rowData) => formatDate(rowData.prescriptionDate)}
        />

        <Column
          field="medicine"
          header="Medicines"
          body={(rowData) => rowData.medicines?.length ?? 0}
        />
        <Column
          field="notes"
          header="Notes"
          filterPlaceholder="Search by name"
        />
        <Column
          headerStyle={{ width: "5rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
          filter
        />
      </DataTable>
      <Modal opened={opened} size="xl" onClose={close} title="Medicines" centered>
        <div className="grid grid-cols-2 gap-5">
        {
          medicineData?.map((data,index)=>(
        <Card key={index} shadow="md" radius="lg" withBorder padding="lg">
          <Title order={4} mb="sm">
            {data.name} ({data.type})
          </Title>

          <Divider my="xs" />

          <Grid gap="xs">
            <Grid.Col span={6}>
              <Text size="sm" fw={500}>Dosage:</Text>
              <Text>{data.dosage}</Text>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text size="sm" fw={500}>Frequency:</Text>
              <Text>{data.frequency}</Text>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text size="sm" fw={500}>Duration:</Text>
              <Text>{data.duration}</Text>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text size="sm" fw={500}>Medicine ID:</Text>
              <Text>{data.medicineId?? 'N/A'}</Text>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text size="sm" fw={500}>Instructions:</Text>
              <Text>{data.instructions}</Text>
            </Grid.Col>
          </Grid>
        </Card>
        ))
        }
        </div>
        {
          medicineData.length===0 &&(
            <Text color="dimmed" size="sm" mt="md">
              No medicines prescribed for this appointment
            </Text>
          )
        }
      </Modal>
    </div>
  );
};

export default Prescription;
