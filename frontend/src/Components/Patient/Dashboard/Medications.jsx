import React, { useEffect, useState } from "react";
import { AreaChart } from '@mantine/charts';
import { medicines} from '../../../Data/DashboardData';
import { ScrollArea, ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'
import { useSelector } from "react-redux";
import { getMedicinesConsumedByPatient } from "../../../Service/AppointmentService";

const Medications = () => {
  const [data,setData]=useState(medicines);
  const user=useSelector((state)=>state.user);

  useEffect(()=>{
    getMedicinesConsumedByPatient(user.profileId).then((res)=>{
      setData(res);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);
  const card = (app) => {
    return <div className='p-3 mb-3 rounded-xl justify-between border
             border-l-4 border-orange-500 shadow-md flex bg-orange-100 items-center' key={app.id}>
        <div>
            <div className="font-semibold">{app.name}</div>
            <div className="text-sm text-gray-500">{app.manufacturer}</div>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500">{app.dosage}</div>
            <div className="text-sm text-gray-500">{app.frequency}</div>
        </div>
      </div>
  }

  return (
  <div className="p-3 rounded-xl bg-orange-50 shadow-xl flex flex-col gap-3">
    <div className="text-xl font-semibold">Medications</div>
    <div>
        <ScrollArea.Autosize mah={300} mx="auto">
        {data.map((app)=>card(app))}
      </ScrollArea.Autosize>
    </div>
  </div>);
};

export default Medications;
