import React from "react";
import { AreaChart } from '@mantine/charts';
import { appointments} from '../../../Data/DashboardData';
import { ScrollArea, ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'

const Appointments = () => {

  const card = (app) => {
    return <div className='p-3 mb-3 rounded-xl justify-between border
             border-l-4 border-blue-500 shadow-md flex bg-blue-100 items-center' key={app.id}>
        <div>
            <div className="font-semibold">{app.doctor}</div>
            {/* <div className="text-sm text-gray-500">{app.doctor}</div> */}
            <div className="text-sm text-gray-500">{app.reason}</div>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500">19 Oct 2025</div>
            <div className="text-sm text-gray-500">{app.time}</div>
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
