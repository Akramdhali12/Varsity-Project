import React from "react";
import { AreaChart } from '@mantine/charts';
import { data, doctorData, patientData, } from '../../../Data/DashboardData';
import { ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'

const TopCards = () => {

  const getSum = (data,key)=>{
    return data.reduce((sum,item)=>sum+item[key],0);
  }
  const card = (name,id,color,bg,icon,data) => {
    return <div className={`${bg} rounded-xl p-2`}>
        <div className="flex justify-between p-5 items-center gap-5">
          <ThemeIcon size='xl' radius="md" color={color}>
            {icon}
          </ThemeIcon>
          <div>
            <div>{name}</div>
            <div className="text-lg">{getSum(data,id)}</div>
          </div>
        </div>
        <AreaChart
          h={200}
          data={data}
          dataKey="date"
          series={[{ name: id, color: color }]}
          strokeWidth={4}
          curveType="bump"
          // tickLine="none"
          // gridAxis="none"
          withXAxis={true}
          withYAxis={true}
          withDots={true}
        />
      </div>
  }

  const cards =[
    {name:'Appointments',id:'appointments',color:'violet',bg:'bg-violet-100',icon:<IconFileReport/>,data:data},
    {name:'Patients',id:'patients',color:'orange',bg:'bg-orange-100',icon:<IconUsers/>,data:patientData},
    {name:'Doctors',id:'doctors',color:'green',bg:'bg-green-100',icon:<IconStethoscope/>,data:doctorData},

  ]

  return (
  <div className="grid grid-cols-3 gap-5">
    {cards.map((cardData)=>card(cardData.name,cardData.id,cardData.color,cardData.bg,cardData.icon,cardData.data))}
  </div>);
};

export default TopCards;
