import React, { useEffect, useState } from "react";
import { AreaChart } from '@mantine/charts';
import { appointments} from '../../../Data/DashboardData';
import { ScrollArea, ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'
import { useSelector } from "react-redux";
import { getAppointmentsByPatient } from "../../../Service/AppointmentService";
import { extractTimeIn12HourFormat, formatDate } from "../../../Utility/DateUtility";

const Appointments = () => {
  const [appointments,setAppointments]=useState([]);
  const user = useSelector((state)=>state.user);

  useEffect(()=>{
    getAppointmentsByPatient(user.profileId).then((res)=>{
      setAppointments(res);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);
  const card = (app) => {
    return <div className='p-3 mb-3 rounded-xl justify-between border
             border-l-4 border-blue-500 shadow-md flex bg-blue-100 items-center' key={app.id}>
        <div>
            <div className="font-semibold">{app.doctorName}</div>
            {/* <div className="text-sm text-gray-500">{app.doctor}</div> */}
            <div className="text-sm text-gray-500">{app.reason}</div>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500">{formatDate(app.appointmentTime)}</div>
            <div className="text-sm text-gray-500">{extractTimeIn12HourFormat(app.appointmentTime)}</div>
        </div>
      </div>
  }

  return (
  <div className="p-3 rounded-xl bg-blue-50 shadow-xl flex flex-col gap-3">
    <div className="text-xl font-semibold">Appointments</div>
    <div>
        <ScrollArea.Autosize mah={300} mx="auto">
        {appointments.map((app)=>card(app))}
      </ScrollArea.Autosize>
    </div>
  </div>);
};

export default Appointments;
