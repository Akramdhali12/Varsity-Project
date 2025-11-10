import { ActionIcon, Badge, Button, Fieldset, Group, MultiSelect, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconCheck, IconEdit, IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
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

import { capitalizeFirstLetter } from "../../../Utility/OtherUtility";
import { DateInput } from "@mantine/dates";
import { addStock, getAllStocks, updateStock } from "../../../Service/InventoryService";

const Inventory = () => {

  const [data,setData]=useState([]);
  const [medicine,setMedicine]=useState([]);
  const [edit,setEdit] = useState(false);
  const [loading, setLoading] =useState(false);
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
    getAllMedicines().then((res)=>{
      setMedicine(res);
      setMedicineMap(res.reduce((acc,item)=>{
        acc[item.id] = item;
        return acc;
      },{}));
    }).catch((err)=>{
      console.log("Error fetching reports:",err);
    });
    fetchData();
  },[])

  const fetchData =()=>{
  
    getAllStocks().then((res)=>{
      setData(res);
    }).catch((err)=>{
      console.log("Error fetching reports:",err);
    });

  }

  const form = useForm({
    initialValues: {
        id:null,
      medicineId: '',
      batchNo: '',
      quantity: 0,
      expiryDate: ''
    },
    validate: {
      medicineId:(value)=>(value?null:'Medicine is required'),
      batchNo:(value)=>(value?null:'Batch Number is required'),
      quantity:(value)=>(value>0?null:'Quantity must be positive'),
      expiryDate:(value)=>(value?null:'Expiry date is required')
  }});

  const onEdit=(rowData)=>{
    setEdit(true);
    form.setValues({
        ...rowData,
        medicineId:String(rowData.medicineId),
        batchNo:rowData.batchNo,
        quantity:rowData.quantity,
        expiryDate:new Date(rowData.expiryDate)
    });
  }
  const handleSubmit = (values) => {
    let update=false;
    let method;
    if(values.id){
        update=true;
        method=updateStock;
    }else{
        method=addStock;
    }
    setLoading(true);
    method(values)
      .then((_res)=>{
        successNotification(`Stock ${update?"updated":"added"} successfully`);
        form.reset();
        setEdit(false);
        fetchData();
      })
      .catch((err)=>{
        errorNotification("Error",`Failed to ${update?"update":"add"} Stock`);
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
      <Button variant="filled" onClick={()=>setEdit(true)}>Add Stock</Button>
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

const renderSelectOption = ({ option, checked }) => (
  <Group style={{ flex: 1, gap: '8px' }}>
    <div className="flex gap-3 items-center">
        {option.label}
        {option?.manufacturer && <span style={{marginLeft:'auto',fontSize:'0.8em',color:'gray'}}>{option.manufacturer}</span>}
    </div>
    {checked && <IconCheck style={{ marginInlineStart: 'auto' }}/>}
  </Group>
);

const statusBody=(rowData)=>{
    const isExpired = new Date(rowData.expiryDate)<new Date();
    return <Badge color={isExpired?"red":"green"}>{isExpired?"Expired":"Active"}</Badge>
}
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
                  header="Medicine"
                  body={(rowData)=> <span>{medicineMap[""+rowData.medicineId]?.name}
                  <span className="text-xs text-gray-600"> {medicineMap[""+rowData.medicineId]?.manufacturer}</span></span>}
                />
                <Column
                  field="batchNo"
                  header="Batch No."
                />
                <Column
                  field="initialQuantity"
                  header="Quantity"
                />
                
                <Column
                  field="quantity"
                  header="Remaining Quantity"
                />
                <Column
                  field="expiryDate"
                  header="Expiry Date"
                />
                <Column field="status" header="Status" body={statusBody}/>
                
                <Column
                          headerStyle={{textAlign: "center" }}
                          bodyStyle={{ textAlign: "center", overflow: "visible" }}
                          body={actionBodyTemplate}
                          filter
                        />
                
              </DataTable>
    :<form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
      <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-xl" style={{ color: '#32b9a9' }}>Medicine information</span>} radius="md">
        
        <Select renderOption={renderSelectOption} {...form.getInputProps("medicineId")} label="Medicine" placeholder="Select medicine"
         data={medicine.map(item=>({...item,value:""+item.id,label:item.name}))}/>
        <TextInput {...form.getInputProps("batchNo")} label="Batch No" placeholder="Enter batch number" withAsterisk/>
        <NumberInput min={0} {...form.getInputProps("quantity")} clampBehavior="strict" label="Quantity" placeholder="Enter quantity"/>
        <DateInput {...form.getInputProps("expiryDate")} minDate={new Date()} label="Expiry Date" placeholder="Enter expiry date" withAsterisk/>
      </Fieldset>

      
      <div className="flex items-center gap-5 justify-center">
        <Button loading={loading} onClick={cancel} variant="filled" color="red" >
          Cancel
        </Button>
        <Button loading={loading} type="submit" className="w-full" variant="filled" color="green" >
          {form.values?.id ? "Update":"Add"} Stock
        </Button>
      </div>
    </form>}
    </div>
  );
};

export default Inventory;
