import { ActionIcon, Button, Fieldset, Group, MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconCheck, IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
import { dosageFrequencies, medicineTypes, symptoms, tests } from "../../../Data/DropDownData";
import { useForm } from "@mantine/form";
import { createAppointmentReport, getReportsByPatientId, isReportExists } from "../../../Service/AppointmentService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { formatDate } from "../../../Utility/DateUtility";
import { getAllMedicines } from "../../../Service/MedicineService";

/**
 * @typedef {{ name: string,
 *  medicineId?: string | number | undefined,
 *  dosage:string,
 *  frequency:string,
 *  duration:number,
 *  route:string,
 *  type:string,
 *  instructions:string,
 *  prescriptionId?:number }} Medicine
 */

const ApReport = ({appointment}) => {

  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [data,setData]=useState([]);
  const [allowAdd,setAllowAdd] = useState(false);
  const [edit,setEdit] = useState(false);
  const [loading, setLoading] =useState(false);
  const [medicine,setMedicine] = useState([]);
  const [medicineMap,setMedicineMap] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({});
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

  useEffect(()=>{
    initFilters();
    fetchData();
  },[appointment?.patientId,appointment.id]);

  useEffect(() => {
    // initFilters();
    getAllMedicines()
      .then((res) => {
        console.table("medicines Date:",res);
        setMedicine(res);
        setMedicineMap(
          res.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {})
        );
      })
      .catch((err) => {
        console.log("Error fetching reports:", err);
      });
    // fetchData();
  }, []);

  const fetchData =()=>{
    if (!appointment?.patientId) {
    console.warn("No patient ID found — skipping prescription fetch");
    return;
  }
    getReportsByPatientId(appointment.patientId).then((res)=>{
      console.log("Reports Data:",res);
      setData(res);
    }).catch((err)=>{
      console.log("Error fetching reports:",err);
    });

    isReportExists(appointment.id).then((res)=>{
      setAllowAdd(!res);
      console.log("Report existence check:",res);
    }).catch((err)=>{
      console.error("Error checking report existence:",err);
      setAllowAdd(true);
    })
  }

  const form = useForm({
    initialValues: {
      symptoms: [],
      tests: [],
      diagnosis: '',
      referral: '',
      notes: '',
      prescription:{
        medicines: [],
      },
    },
    validate: {
      symptoms: (value) => (value.length === 0 ? 'At least one symptom must be selected' : null),
      diagnosis: (value) => (value?.trim().length === 0 ? 'Diagnosis is required' : null),
      prescription: {
        medicines:{
          name: (value) => (value?.trim().length === 0 ? 'Medicine name is required' : null),
          dosage: (value) => (value?.trim().length === 0 ? 'Dosage is required' : null),
          frequency: (value) => (value?.trim().length === 0 ? 'Frequency is required' : null),
          duration: (value) => (value <= 0 ? 'Duration must be greater than 0' : null),
          // route: (value) => (value?.trim().length === 0 ? 'Route is required' : null),
          type: (value) => (value?.trim().length === 0 ? 'Type is required' : null),
          instructions: (value) => (value?.trim().length === 0 ? 'Instructions are required' : null),
        }
    },
  }});

  const defaultMedicine = {
    name: "",
    dosage: "",
    frequency: "",
    duration: 0,
    route: "",
    type: "",
    instructions: "",
  };
  
  const insertMedicine = () => {
    form.insertListItem('prescription.medicines', {...defaultMedicine});
  }
  const removeMedicine = (index) => {
    form.removeListItem('prescription.medicines', index);
  }

  const renderSelectOption = ({ option, checked }) => (
    <Group style={{ flex: 1, gap: "8px" }}>
      <div className="flex gap-3 items-center">
        {option.label}
        {option?.manufacturer && (
          <span
            style={{ marginLeft: "auto", fontSize: "0.8em", color: "gray" }}
          >
            {option.manufacturer} - {option.dosage}
          </span>
        )}
      </div>
      {checked && <IconCheck style={{ marginInlineStart: "auto" }} />}
    </Group>
  );

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    let data={
      ...values,
      doctorId:appointment.doctorId,
      patientId:appointment.patientId,
      appointmentId:appointment.id,
      prescription:{
        medicines:values.prescription.medicines.map(med=>({
          ...med,
          medicineId:med.medicineId==="OTHER"?null:med.medicineId
        })),
        doctorId:appointment.doctorId,
        patientId:appointment.patientId,
        appointmentId:appointment.id,
      }
    }
    setLoading(true);
    createAppointmentReport(data)
      .then((res)=>{
        successNotification("Report Created","Appointment report created successfully");
        form.reset();
        setEdit(false);
        setAllowAdd(false);
        fetchData();
      })
      .catch((err)=>{
        errorNotification("Error","Failed to create appointment report");
      }).finally(()=>{
        setLoading(false);
      });
  };

  const renderHeader = () =>{
    return (
    <div className="flex justify-between items-center">
      {allowAdd&&<Button variant="filled" onClick={()=>setEdit(true)}>Add Report</Button>}
      {/* <Button variant="filled" onClick={()=>setEdit(true)}>Add Report</Button> */}
      <TextInput
        leftSection={<IconSearch />}
        fw={500}
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Keyword Search"
      />
    </div>
  );
};
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        {/* <ActionIcon onClick={()=>navigate("/doctor/appointments/"+rowData.appointmentId)}>
          <IconEye size={16} stroke={1.5} />
        </ActionIcon> */}
      </div>
    );
  };

  const handleChangeMed = (medId,index)=>{
    if(medId && medId !== "OTHER"){
      form.setFieldValue(`prescription.medicines.${index}.medicineId`,medId);
      form.setFieldValue(`prescription.medicines.${index}.name`,medicineMap[medId]?.name || '');
      form.setFieldValue(`prescription.medicines.${index}.dosage`,medicineMap[medId]?.dosage || '');
      form.setFieldValue(`prescription.medicines.${index}.type`,medicineMap[medId]?.type || '');
    }else{
      form.setFieldValue(`prescription.medicines.${index}.medicineId`,"OTHER");
      form.setFieldValue(`prescription.medicines.${index}.name`,undefined);
      form.setFieldValue(`prescription.medicines.${index}.dosage`,undefined);
      form.setFieldValue(`prescription.medicines.${index}.type`,undefined);
    }
  }
  const header = renderHeader()
  return (
    <div>
      {!edit ? <DataTable header={header}
                stripedRows
                value={data}
                paginator
                showGridlines
                rows={10}
                loading={loading}
                dataKey="id"
                filters={filters}
                globalFilterFields={["doctorName","notes"]}
                emptyMessage="No appointment found."
                onFilter={(e) => setFilters(e.filters)}
              >
                <Column
                  field="doctorName"
                  header="Doctor"
                />
                <Column
                  field="diagnosis"
                  header="Diagnosis"
                />
                <Column
                  field="reportDate"
                  header="Report Date"
                  sortable
                  body={(rowData)=>formatDate(rowData.createdAt)}
                />
                
                <Column
                  field="notes"
                  header="Notes"
                />
                <Column
                          headerStyle={{ width: "5rem", textAlign: "center" }}
                          bodyStyle={{ textAlign: "center", overflow: "visible" }}
                          body={actionBodyTemplate}
                          filter
                        />
                
              </DataTable>
    :<form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
      <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-xl" style={{ color: '#32b9a9' }}>Personal information</span>} radius="md">
        <MultiSelect {...form.getInputProps("symptoms")} className="col-span-2" withAsterisk
          label="Symptoms"
          placeholder="Pick symptoms"
          data={symptoms}
        />
        <MultiSelect {...form.getInputProps("tests")} className="col-span-2"
          label="Tests"
          placeholder="Pick tests"
          data={tests}
        />
        <TextInput {...form.getInputProps("diagnosis")} label="Diagnosis" placeholder="Enter diagnosis" withAsterisk/>
        <TextInput {...form.getInputProps("referral")} label="Referral" placeholder="Enter referral details"/>

        <TextInput {...form.getInputProps("notes")} className="col-span-2" label="Notes" placeholder="Enter any additional notes"/>
      </Fieldset>

      <Fieldset className="grid gap-5" legend={<span className="text-xl" style={{ color: '#32b9a9' }}>Prescription</span>} radius="md">
        {
        form.values.prescription.medicines.map((med, index) => (
        
        <Fieldset key={medicine.medicineId || `medicine-${index}`} legend={<div className="flex items-center gap-5">
            <h1 className="text-lg font-medium">Medicine {index+1}</h1>
            <ActionIcon onClick={()=>removeMedicine(index)} variant="filled" color="red" size="md" className="mb-2">
              <IconTrash/>
            </ActionIcon>
          </div>} className="grid gap-4 col-span-2 grid-cols-2">
          <Select
                  renderOption={renderSelectOption}
                    {...form.getInputProps(`prescription.medicines.${index}.medicineId`)}
                    label="Medicine"
                    placeholder="Select medicine"
                    onChange={(value)=>handleChangeMed(value,index)}
                    data={[...medicine.filter((x)=>!form.values.prescription.medicines.some((item1,idx)=>item1.medicineId==x.id && idx != index)).map((item) => ({
                      ...item,
                      value: "" + item.id,
                      label: item.name,
                    })),{label:"Other",value:"OTHER"}]}
                    withAsterisk
          />
          {med.medicineId == "OTHER" && <TextInput {...form.getInputProps(`prescription.medicines.${index}.name`)} label="Medicine" placeholder="Enter medicine name" withAsterisk/>}
          <TextInput disabled={med.medicineId!="OTHER"} {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label="Dosage" placeholder="Enter dosage" withAsterisk/>
          <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)} label="Frequency" placeholder="Select frequency" withAsterisk data={dosageFrequencies}/>
          <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label='Duration(days)' placeholder="Enter duration in days" withAsterisk/>
          {/* <Select {...form.getInputProps(`prescription.medicines.${index}.route`)} label="Route" placeholder="Select route" withAsterisk data={["Oral","Intravenous","Topical","Inhalation"]}/> */}
          <Select disabled={med.medicineId!="OTHER"} {...form.getInputProps(`prescription.medicines.${index}.type`)} label="Type" placeholder="Select type" withAsterisk data={medicineTypes}/>
          <TextInput {...form.getInputProps(`prescription.medicines.${index}.instructions`)} label="Instructions" placeholder="Enter instructions" withAsterisk/>
        </Fieldset>
        ))}

        <div className="flex items-start col-span-2 justify-center">
          <Button onClick={insertMedicine} variant="outline" className="col-span-2" color="blue">
            Add Medicine
          </Button>
        </div>
      </Fieldset>
      <div className="flex items-center gap-5 justify-center">
        <Button loading={loading} variant="filled" color="red" >
          Cancel
        </Button>
        <Button loading={loading} type="submit" className="w-full" variant="filled" color="green" >
          Submit Report
        </Button>
      </div>
    </form>}
    </div>
  );
};

export default ApReport;
