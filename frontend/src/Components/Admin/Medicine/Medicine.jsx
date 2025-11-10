import { ActionIcon, Button, Fieldset, MultiSelect, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconEdit, IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
// import { dosageFrequencies, symptoms, tests } from "../../../Data/DropDownData";
import { useForm } from "@mantine/form";
// import { createAppointmentReport, getReportsByPatientId, isReportExists } from "../../../Service/AppointmentService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
// import { useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { useNavigate } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { formatDate } from "../../../Utility/DateUtility";
import { AddMedicine, getAllMedicines, updateMedicine } from "../../../Service/MedicineService";
import { medicineCategories, medicineTypes } from "../../../Data/DropDownData";
import { capitalizeFirstLetter } from "../../../Utility/OtherUtility";

const Medicine = () => {

  const [data,setData]=useState([]);
  const [edit,setEdit] = useState(false);
  const [loading, setLoading] =useState(false);
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
  },[])

  const fetchData =()=>{
  
    getAllMedicines().then((res)=>{
      setData(res);
    }).catch((err)=>{
      console.log("Error fetching reports:",err);
    });

  }

  const form = useForm({
    initialValues: {
        id:null,
      name: '',
      dosage: '',
      category: '',
      type: '',
      manufacturer: '',
      unitPrice:''
    },
    validate: {
      name:(value)=>(value?null:'Name is required'),
      dosage:(value)=>(value?null:'Dosage is required'),
      category:(value)=>(value?null:'Category is required'),
      type:(value)=>(value?null:'Type is required'),
      manufacturer:(value)=>(value?null:'Manufacturer is required'),
      unitPrice:(value)=>(value?null:'Unit Price is required'),
  }});

  const onEdit=(rowData)=>{
    setEdit(true);
    form.setValues({
        ...rowData,
        name:rowData.name,
        dosage:rowData.dosage,
        category:rowData.category,
        type:rowData.type,
        manufacturer:rowData.manufacturer,
        unitPrice:rowData.unitPrice
    })
  }
  const handleSubmit = (values) => {
    let update=false;
    let method;
    if(values.id){
        update=true;
        method=updateMedicine;
    }else{
        method=AddMedicine;
    }
    setLoading(true);
    method(values)
      .then((res)=>{
        successNotification(`Medicine ${update?"updated":"added"} successfully`);
        form.reset();
        setEdit(false);
        fetchData();
      })
      .catch((err)=>{
        errorNotification("Error",`Failed to ${update?"update":"add"} medicine`);
      }).finally(()=>{
        setLoading(false);
      });
  };

  const cancel=()=>{
    form.reset();
    setEdit(false);
  }

  const renderHeader = () =>{
    return (
    <div className="flex justify-between items-center">
      <Button variant="filled" onClick={()=>setEdit(true)}>Add Medicine</Button>
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
        <ActionIcon onClick={()=>onEdit(rowData)}>
          <IconEdit size={16} stroke={1.5} />
        </ActionIcon>
      </div>
    );
  };
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
                  field="name"
                  header="Name"
                />
                <Column
                  field="dosage"
                  header="Dosage"
                />
                <Column
                  field="category"
                  header="Category"
                  body={rowData=>capitalizeFirstLetter(rowData.category)}
                />
                
                <Column
                  field="type"
                  header="Type"
                  body={rowData=>capitalizeFirstLetter(rowData.type)}
                />
                <Column
                  field="manufacturer"
                  header="Manufacturer"
                />
                <Column field="unitPrice" header="Unit Price" sortable/>
                
                <Column
                          headerStyle={{textAlign: "center" }}
                          bodyStyle={{ textAlign: "center", overflow: "visible" }}
                          body={actionBodyTemplate}
                          filter
                        />
                
              </DataTable>
    :<form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
      <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-xl" style={{ color: '#32b9a9' }}>Medicine information</span>} radius="md">
        
        <TextInput {...form.getInputProps("name")} label="Medicine" placeholder="Enter medicine name" withAsterisk/>
        <TextInput {...form.getInputProps("dosage")} label="Dosage" placeholder="Enter dosage (50mg, 100mg, etc.)"/>
        <Select {...form.getInputProps("category")} label="Category" placeholder="Select category" data={medicineCategories}/>
        <Select {...form.getInputProps("type")} label="Type" placeholder="Select type" data={medicineTypes}/>
        <TextInput {...form.getInputProps("manufacturer")} label="Manufacturer" placeholder="Enter manufacturer" withAsterisk/>
        <NumberInput min={0} {...form.getInputProps("unitPrice")} clampBehavior="strict" label="Unit Price" placeholder="Enter unit price"/>
      </Fieldset>

      
      <div className="flex items-center gap-5 justify-center">
        <Button loading={loading} onClick={cancel} variant="filled" color="red" >
          Cancel
        </Button>
        <Button loading={loading} type="submit" className="w-full" variant="filled" color="green" >
          {form.values?.id ? "Update":"Add"} Medicine
        </Button>
      </div>
    </form>}
    </div>
  );
};

export default Medicine;
