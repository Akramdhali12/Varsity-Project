import React from "react";
import { AreaChart } from '@mantine/charts';
import { doctors} from '../../../Data/DashboardData';
import { ScrollArea, ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'

const Doctors = () => {

  const card = (app) => {
    return <div className='p-3 mb-3 rounded-xl justify-between border
             border-l-4 border-violet-500 shadow-md flex bg-violet-100' key={app.id}>
        <div>
            <div className="font-semibold">{app.name}</div>
            <div className="text-sm text-gray-500">{app.email}</div>
        </div>
        <div className="text-right">
            <div className="text-sm text-gray-500">{app.location}</div>
            <div className="text-sm text-gray-500">Department: {app.department}</div>
        </div>
      </div>
  }

  return (
  <div className="p-3 rounded-xl bg-violet-50 shadow-xl flex flex-col gap-3">
    <div className="text-xl font-semibold">Doctors</div>
    <div>
        <ScrollArea.Autosize mah={300} mx="auto">
        {doctors.map((app)=>card(app))}
      </ScrollArea.Autosize>
    </div>
  </div>);
};

export default Doctors;
