import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Fieldset,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  IconCheck,
  IconEdit,
  IconEye,
  IconHome,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import {
  getAllMedicines,
} from "../../../Service/MedicineService";
import {formatDate} from '../../../Utility/DateUtility'
import { spotlight, Spotlight} from '@mantine/spotlight';
import { AddSale, getAllSaleItems, getAllSales } from "../../../Service/SalesService";
import { useDisclosure } from "@mantine/hooks";
import { getAllPrescriptions, getMedicinesByPrescriptionId } from "../../../Service/AppointmentService";
import { freqMap } from "../../../Data/DropDownData";
/**
 * @typedef {Object} SaleItem
 * @property {string} medicineId
 * @property {number} quantity
 */

const Sales = () => {
  const [data, setData] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened,{open,close}] = useDisclosure(false);
  const [saleItems,setSaleItems] = useState([]);
  const [medicineMap, setMedicineMap] = useState({});
  const [actions,setActions] = useState([]);
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

  useEffect(() => {
    initFilters();
    getAllMedicines()
      .then((res) => {
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
      getAllPrescriptions().then((res)=>{
        setActions(res.map((item)=>({
          id:String(item.id),
          label:item.patientName,
          description:`Prescription by Dr. ${item.doctorName} on ${formatDate(item.prescriptionDate)}`,
          onClick:()=>handleImport(item),
        })));
      }).catch((err)=>{
        console.error("Error fetching prescriptions:",err)
      })
    fetchData();
  }, []);

  const handleImport =(item)=>{
    setLoading(true);
    getMedicinesByPrescriptionId(item.id).then((res)=>{
      setSaleItems(res);
      form.setValues({
        buyerName:item.patientName,
        saleItems:res.filter((x)=>x.medicineId != null).map((x)=>({medicineId:String(x.medicineId),quantity:calculateQuantity(x.frequency,x.duration)}))
      });
    }).catch((err)=>{
      console.error("errror");
    }).finally(()=>{
      setLoading(false);
    });
    
  }

  const calculateQuantity = (freq,duration)=>{
    const freqValue = freqMap[freq] || 0;
    return Math.ceil(freqValue*duration);
  }
  
//   const actions = [
//   {
//     id: 'home',
//     label: 'Home',
//     description: 'Get to home page',
//     onClick: () => console.log('Home'),
//     leftSection: <IconHome size={24} stroke={1.5} />,
//   },
  
// ];

  const fetchData = () => {
    getAllSales().then((res)=>{
      setData(res);
      console.log(res);
    }).catch((err)=>{
      console.log("Error fetching sales:",err);
    });
  };

  const form = useForm({
    initialValues: {
      buyerName:'',
      buyerContact:'',
      saleItems:[{medicineId:'',quantity:0}],
    },
    validate: {
      saleItems:{
        medicineId: (value) => (value ? null : "Medicine is required"),
        quantity: (value) => (value > 0 ? null : "Quantity must be positive"),
      }
    },
  });

  const onEdit = (rowData) => {
    setEdit(true);
    form.setValues({
      ...rowData,
      medicineId: String(rowData.medicineId),
      batchNo: rowData.batchNo,
      quantity: rowData.quantity,
      expiryDate: new Date(rowData.expiryDate),
    });
  };

  const handleDetails=(rowData)=>{
    open();
    setLoading(true);
    getAllSaleItems(rowData.id).then((res)=>{
      setSaleItems(res);
      console.log(res);
    }).catch((err)=>{
      console.error("Error fetching sale items:",err);
    }).finally(()=>{
      setLoading(false);
    })
  }

  const handleSubmit = (values) => {
    let update = false;
    let flag = false;
    values.saleItems.forEach((item,index)=>{
      if(item.quantity > (medicineMap[item.medicineId]?.stock || 0)){
        flag = true;
        form.setFieldError(`saleItems.${index}.quantity`,'Quantity exceeds available stock');
      }
    });
    if(flag){
      errorNotification("Quantity exceeds available stock");
      return;
    }
    const saleItems = values.saleItems.map((x)=>({...x,unitPrice:medicineMap[x.medicineId]?.unitPrice}));
    const totalAmount = saleItems.reduce((acc,item)=>acc+(item.unitPrice*item.quantity),0);
    
    setLoading(true);
    AddSale({...values, saleItems,totalAmount})
      .then((_res) => {
        successNotification(
          `Medicine sold successfully`
        );
        form.reset();
        setEdit(false);
        fetchData();
      })
      .catch((err) => {
        errorNotification(
          "Error",
          `Failed to sold Medicine`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cancel = () => {
    form.reset();
    setEdit(false);
  };

  const addMore=()=>{
    form.insertListItem('saleItems',{medicineId:'',quantity:0});
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <Button variant="filled" onClick={() => setEdit(true)}>
          Sell Medicine
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
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <ActionIcon onClick={()=>handleDetails(rowData)}>
          <IconEye size={16} stroke={1.5} />
        </ActionIcon>
      </div>
    );
  };
  const header = renderHeader();

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

  const statusBody = (rowData) => {
    const isExpired = new Date(rowData.expiryDate) < new Date();
    return (
      <Badge color={isExpired ? "red" : "green"}>
        {isExpired ? "Expired" : "Active"}
      </Badge>
    );
  };

  const handleSpotlight =()=>{
    spotlight.open();
  }

  return (
    <div>
      {!edit ? (
        <DataTable
          header={header}
          stripedRows
          value={data}
          paginator
          removableSort
          showGridlines
          rows={10}
          loading={loading}
          dataKey="id"
          filters={filters}
          globalFilterFields={["doctorName", "notes"]}
          emptyMessage="No appointment found."
          onFilter={(e) => setFilters(e.filters)}
        >
          <Column
            field="buyerName"
            header="Buyer"
            
          />
          <Column field="buyerContact" header="Contact" />
          {/* <Column field="prescription" header="Prescription" /> */}

          <Column field="totalAmount" header="Total Amount" sortable/>
          <Column field="saleDate" header="Sale Date" sortable body={rowData=> formatDate(rowData.saleDate)}/>

          <Column
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
            
          />
        </DataTable>
      ) : (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 style={{color:"rgb(50, 185, 169)"}} className="text-xl font-medium">Sell Medicine</h3>
            <Button variant="filled" leftSection={<IconPlus/>} onClick={handleSpotlight}>Import Prescription</Button>
          </div>
        <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
          <LoadingOverlay visible={loading}/>
          <Fieldset
            className="grid gap-5"
            legend={
              <span className="text-xl" style={{ color: "#32b9a9" }}>
                Buyer information
              </span>
            }
            radius="md"
          > 
          <div className="grid grid-cols-2 gap-5">
          <TextInput withAsterisk label="Buyer Name" placeholder="Enter buyer number" {...form.getInputProps('buyerName')}/>
          <NumberInput maxLength={11} withAsterisk label="Contact Number" placeholder="Enter contact number" {...form.getInputProps('buyerContact')}/>
          </div>
          </Fieldset>
          <Fieldset
            className="grid gap-5"
            legend={
              <span className="text-xl" style={{ color: "#32b9a9" }}>
                Medicine information
              </span>
            }
            radius="md"
          >
            <div className="grid gap-4 grid-cols-5">
              {
                form.values.saleItems.map((item,index)=>(
                <React.Fragment key={index}>
                <div className="col-span-2">
                <Select
                  renderOption={renderSelectOption}
                  {...form.getInputProps(`saleItems.${index}.medicineId`)}
                  label="Medicine"
                  placeholder="Select medicine"
                  data={medicine.filter(x=>!form.values.saleItems.some((item1,idx)=>item1.medicineId==x.id && idx != index)).map((item) => ({
                    ...item,
                    value: "" + item.id,
                    label: item.name,
                  }))}
                />
              </div>
              <div className="col-span-2">
                <NumberInput rightSectionWidth={60}
                  rightSection={<div className="text-xs flex gap-1 text-white font-medium rounded-md bg-red-400 p-1">Stock: {medicineMap[item.medicineId]?.stock}</div>}
                  min={0} max={medicineMap[item.medicineId]?.stock || 0}
                  {...form.getInputProps(`saleItems.${index}.quantity`)}
                  clampBehavior="strict"
                  label="Quantity"
                  placeholder="Enter quantity"
                />
              </div>
              <div className="flex items-end justify-between">
                {(item.quantity && item.medicineId)?<div>Total: {item.quantity} X {medicineMap[item.medicineId]?.unitPrice}
                  ={item.quantity * medicineMap[item.medicineId]?.unitPrice}</div>
                :<div></div>}
                <ActionIcon color="red" onClick={()=>form.removeListItem('saleItems',index)}>
                  <IconTrash size={16}/>
                </ActionIcon>
              </div>
              </React.Fragment>
                ))
              }
              
            </div>
            <div className="flex items-center">
              <Button onClick={addMore} variant="" leftSection={<IconPlus size={16} />}>
                Add more
              </Button>
            </div>
          </Fieldset>

          <div className="flex items-center gap-5 justify-center">
            <Button
              loading={loading}
              onClick={cancel}
              variant="filled"
              color="red"
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              type="submit"
              className="w-full"
              variant="filled"
              color="green"
            >
              Sell Medicine
            </Button>
          </div>
        </form>
        </div>
      )}
      <Modal opened={opened} size="xl" onClose={close} title="Sold Medicines" centered>
              <div className="grid grid-cols-2 gap-5">
              {
                saleItems?.map((data,index)=>(
              <Card key={index} shadow="md" radius="lg" withBorder padding="lg">
                <Title order={4} mb="sm">
                  {medicineMap[data.medicineId]?.name}-{medicineMap[data.medicineId]?.dosage}
                   (<span className="text-gray-500">{medicineMap[data.medicineId]?.manufacturer}</span>)
                </Title>
                <Text size="xs">{data.batchNo}</Text>
                <Divider my="xs" />
      
                <Grid gap="xs">
                  <Grid.Col span={6}>
                    <Text size="sm" fw={500}>Quantity:</Text>
                    <Text>{data.quantity}</Text>
                  </Grid.Col>
      
                  <Grid.Col span={6}>
                    <Text size="sm" fw={500}>Unit Price:</Text>
                    <Text>{data.unitPrice}</Text>
                  </Grid.Col>
      
                  <Grid.Col span={6}>
                    <Text size="sm" fw={500}>Total:</Text>
                    <Text>{data.quantity * data.unitPrice}</Text>
                  </Grid.Col>
      
                </Grid>
              </Card>
              ))
              }
              </div>
              {
                saleItems.length===0 &&(
                  <Text color="dimmed" size="sm" mt="md">
                    No medicines prescribed for this appointment
                  </Text>
                )
              }
            </Modal>
            <Spotlight
              actions={actions}
              nothingFound="Nothing found..."
              highlightQuery
              searchProps={{
              leftSection: <IconSearch size={20} stroke={1.5} />,
              placeholder: 'Search...',
              }}
            />
    </div>
  );
};

export default Sales;
