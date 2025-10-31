import { ActionIcon, Button, Fieldset, MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { dosageFrequencies, symptoms, tests } from "../../../Data/DropDownData";
import { useForm } from "@mantine/form";
import { createAppointmentReport } from "../../../Service/AppointmentService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { useDispatch } from "react-redux";

const ApReport = ({appointment}) => {
  const dispatch=useDispatch();
  const [loading, setLoading] =useState(false);

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
          route: (value) => (value?.trim().length === 0 ? 'Route is required' : null),
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

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    let data={
      ...values,
      doctorId:appointment.doctorId,
      patientId:appointment.patientId,
      appointmentId:appointment.id,
      prescription:{
        ...values.prescription,
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
      })
      .catch((err)=>{
        errorNotification("Error","Failed to create appointment report");
      }).finally(()=>{
        setLoading(false);
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
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
        form.values.prescription.medicines.map((medicine, index) => (
        
        <Fieldset key={medicine.medicineId || `medicine-${index}`} legend={<div className="flex items-center gap-5">
            <h1 className="text-lg font-medium">Medicine {index+1}</h1>
            <ActionIcon onClick={()=>removeMedicine(index)} variant="filled" color="red" size="md" className="mb-2">
              <IconTrash/>
            </ActionIcon>
          </div>} className="grid gap-4 col-span-2 grid-cols-2">
          
          <TextInput {...form.getInputProps(`prescription.medicines.${index}.name`)} label="Medicine" placeholder="Enter medicine name" withAsterisk/>
          <TextInput {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label="Dosage" placeholder="Enter dosage" withAsterisk/>
          <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)} label="Frequency" placeholder="Select frequency" withAsterisk data={dosageFrequencies}/>
          <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label='Duration(days)' placeholder="Enter duration in days" withAsterisk/>
          <Select {...form.getInputProps(`prescription.medicines.${index}.route`)} label="Route" placeholder="Select route" withAsterisk data={["Oral","Intravenous","Topical","Inhalation"]}/>
          <Select {...form.getInputProps(`prescription.medicines.${index}.type`)} label="Type" placeholder="Select type" withAsterisk data={["Tablet","Syrup","Injection","Capsule","Ointment"]}/>
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
    </form>
  );
};

export default ApReport;
