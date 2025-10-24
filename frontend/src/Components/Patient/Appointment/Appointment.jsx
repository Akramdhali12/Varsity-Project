import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Button, LoadingOverlay, Modal, Select, Textarea, TextInput } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { getdoctorDropdown } from '../../../Service/DoctorProfileService';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {appointmentReasons} from '../../../Data/DropDownData';
import { useSelector } from 'react-redux';
import { scheduleAppointment } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';


const Appointment = () => {
    const [customers, setCustomers] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [doctors, setDoctors] = useState([]);
    const user=useSelector((state)=>state.user);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [representatives] = useState([
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ]);
    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified': return 'danger';
            case 'qualified': return 'success';
            case 'new': return 'info';
            case 'negotiation': return 'warning';
            default: return null;
        }
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue('');
    };

    useEffect(() => {
        initFilters();
        setCustomers([
            {
                id: 1000,
                name: 'James Butt',
                country: { name: 'Algeria', code: 'dz' },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'qualified',
                verified: true,
                activity: 65,
                representative: { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
                balance: 70663
            },
            {
                id: 1001,
                name: 'Josephine Darakjy',
                country: { name: 'Egypt', code: 'eg' },
                company: 'Chanay, Jeffrey A Esq',
                date: new Date('2016-02-05'),
                status: 'new',
                verified: false,
                activity: 45,
                representative: { name: 'Amy Elsner', image: 'amyelsner.png' },
                balance: 50432
            }
        ]);
        getdoctorDropdown().then(data => {
            console.log(data);
            setDoctors(data.map(doctor => ({ value:""+doctor.id, label: doctor.name })));
        }).catch(error => {
            console.error('Error fetching doctor dropdown data:', error);
        });
    }, []);

    const formatDate = (value) =>
        value.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const formatCurrency = (value) =>
        value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const clearFilter = () => initFilters();

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({ ...prev, global: { ...prev.global, value } }));
        setGlobalFilterValue(value);
    };
    const form = useForm({
    initialValues: {
      doctorId: '',
      patientId: user.profileId,
      appointmentTime: new Date(),
      reason: '',
      notes: '',
    },

    validate: {
        doctorId: (value) => (value ? null : 'Doctor is required'),
        appointmentTime: (value) => (value ? null : 'Appointment time is required'),
        reason: (value) => (value ? null : 'Reason is required'),
    },
    });

    const renderHeader = () => (
        <div className="flex justify-between items-center">
            <Button leftSection={<IconPlus/>} variant='filled' onClick={open}>Schedule Appointment</Button>
            
            <TextInput leftSection={<IconSearch/>} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

        </div>
    );

    const header = renderHeader();
    const handleSubmit = (values) => {
        console.log('Form Values:', values);
        setLoading(true);
        scheduleAppointment(values)
            .then((data) => {
                close();
                form.reset();
                successNotification('Appointment scheduled successfully');
            })
            .catch((error) => {
                errorNotification(error.response?.data?.errorMessage ||'Failed to schedule appointment. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const countryBodyTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <img
                alt="flag"
                src={`https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png`}
                className={`flag flag-${rowData.country.code}`}
                style={{ width: '24px' }}
            />
            <span>{rowData.country.name}</span>
        </div>
    );

    const representativeBodyTemplate = (rowData) => {
        const rep = rowData.representative;
        return (
            <div className="flex align-items-center gap-2">
                <img alt={rep.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${rep.image}`} width="32" />
                <span>{rep.name}</span>
            </div>
        );
    };

    const dateBodyTemplate = (rowData) => formatDate(rowData.date);

    const balanceBodyTemplate = (rowData) => formatCurrency(rowData.balance);

    const activityBodyTemplate = (rowData) => (
        <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }} />
    );

    const statusBodyTemplate = (rowData) => (
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );

    const verifiedBodyTemplate = (rowData) => (
        <i
            className={classNames('pi', {
                'text-green-500 pi-check-circle': rowData.verified,
                'text-red-500 pi-times-circle': !rowData.verified
            })}
        ></i>
    );

    return (
        <div className="card">
            <DataTable
                value={customers}
                paginator
                showGridlines
                rows={10}
                loading={loading}
                dataKey="id"
                filters={filters}
                globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                header={header}
                emptyMessage="No customers found."
                onFilter={(e) => setFilters(e.filters)}
            >
                <Column field="name" header="Name" filter filterPlaceholder="Search by name"/>
                <Column header="Country" filterField="country.name" body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
                <Column header="Agent" filterField="representative" body={representativeBodyTemplate} filter />
                <Column header="Date" field="date" dataType="date"  body={dateBodyTemplate} filter />
                <Column header="Balance" field="balance" dataType="numeric" body={balanceBodyTemplate} filter />
                <Column header="Activity" field="activity" body={activityBodyTemplate} filter />
                <Column field="status" header="Status" body={statusBodyTemplate} filter />
                <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" body={verifiedBodyTemplate} filter />
            </DataTable>
            <Modal opened={opened} size="lg" onClose={close} title={<div className='text-xl font-semibold'>Schedule Appointment</div>} centered>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form onSubmit={form.onSubmit(handleSubmit)} className='grid grid-cols-1 gap-3'>
                    <Select {...form.getInputProps("doctorId")} withAsterisk data={doctors} label="Doctor" placeholder='Select Doctor'/>
                    <DateTimePicker minDate={new Date()} {...form.getInputProps("appointmentTime")} withAsterisk label="Appointment Time" placeholder="Pick date and time" />
                    <Select {...form.getInputProps("reason")} data={appointmentReasons} withAsterisk label="Reason for Appointment" placeholder="Reason for appointment" mt="md" />
                    <Textarea {...form.getInputProps("notes")} withAsterisk label="Additional Notes" placeholder="Enter any additional notes" mt="md" />
                    <Button type='submit' variant='filled'>Submit</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Appointment;
