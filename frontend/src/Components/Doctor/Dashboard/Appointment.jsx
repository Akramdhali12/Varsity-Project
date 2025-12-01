import React, { useEffect, useState } from "react";
import { AreaChart } from '@mantine/charts';
import { appointments} from '../../../Data/DashboardData';
import { ScrollArea, ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'
import { getTodaysAppointments } from "../../../Service/AppointmentService";
import { extractTimeIn12HourFormat } from "../../../Utility/DateUtility";

const Appointments = () => {
  const [tdAppointment,setTdAppointment]=useState(appointments);
  useEffect(()=>{
    getTodaysAppointments().then((res)=>{
      setTdAppointment(res);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);
  const card = (app) => {
    return <div className='p-3 mb-3 rounded-xl justify-between border
             border-l-4 border-violet-500 shadow-md flex bg-violet-100 items-center' key={app.id}>
        <div>
            <div className="font-semibold">{app.patientName}</div>
            {/* <div className="text-sm text-gray-500">{app.doctor}</div> */}
            <div className="text-sm text-gray-500">{app.reason}</div>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500">{extractTimeIn12HourFormat(app.appointmentTime)}</div>
        </div>
      </div>
  }

  return (
  <div className="p-3 rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
    <div className="text-xl font-semibold">Today's Appointment</div>
    <div>
        <ScrollArea.Autosize mah={300} mx="auto">
        {tdAppointment.map((app)=>card(app))}
      </ScrollArea.Autosize>
    </div>
  </div>);
};

export default Appointments;
