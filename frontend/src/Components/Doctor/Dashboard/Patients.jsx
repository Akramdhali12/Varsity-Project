import React, { useEffect, useState } from "react";
import { AreaChart } from '@mantine/charts';
import { patients} from '../../../Data/DashboardData';
import { ScrollArea, ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'
import { getAllPatients } from "../../../Service/PatientProfileService";

const Patients = () => {

  const [patients,setPatients] = useState([]);

    useEffect(()=>{
        getAllPatients().then((data)=>{
            setPatients(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])

  const card = (app) => {
    return <div className='p-3 mb-3 rounded-xl justify-between border
             border-l-4 border-red-500 shadow-md flex bg-red-100' key={app.id}>
        <div>
            <div className="font-semibold">{app.name}</div>
            <div className="text-sm text-gray-500">{app.email}</div>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500">{app.address}</div>
            <div className="text-sm text-gray-500">Blood Group: {app.bloodGroup}</div>
        </div>
      </div>
  }

  return (
  <div className="p-3 rounded-xl bg-red-50 shadow-xl flex flex-col gap-3">
    <div className="text-xl font-semibold">Patients</div>
    <div>
        <ScrollArea.Autosize mah={300} mx="auto">
        {patients.map((app)=>card(app))}
      </ScrollArea.Autosize>
    </div>
  </div>);
};

export default Patients;
