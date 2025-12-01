import React, { useEffect, useState } from "react";
import { AreaChart } from '@mantine/charts';
import { data, doctorData, patientData, } from '../../../Data/DashboardData';
import { ThemeIcon } from "@mantine/core";
import {IconFileReport, IconPhoto, IconStethoscope, IconUsers} from '@tabler/icons-react'
import { countAllAppointments } from "../../../Service/AppointmentService";
import { getRegistrationCounts } from "../../../Service/UserService";
// import { addZeroMonths } from "../../../Utility/OtherUtility";

const TopCards = () => {
  const [apData,setApData]=useState(data);
  const [ptData,setPtData]=useState(patientData);
  const [drData,setDrData]=useState(doctorData);

  useEffect(()=>{
    countAllAppointments().then((res)=>{
      // setApData(addZeroMonths(res,'month','count'));
      setApData(res);
    }).catch((err)=>{
      console.log(err);
    });

    getRegistrationCounts().then((res)=>{
      // setPtData(res.patients,"month","count");
      // setDrData(res.doctors,"month","count");
      setPtData(res.patientCounts ?? []);
      setDrData(res.doctorCounts ?? []);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);

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
          dataKey="month"
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
    {name:'Appointments',id:'count',color:'violet',bg:'bg-violet-100',icon:<IconFileReport/>,data:apData},
    {name:'Patients',id:'count',color:'orange',bg:'bg-orange-100',icon:<IconUsers/>,data:ptData},
    {name:'Doctors',id:'count',color:'green',bg:'bg-green-100',icon:<IconStethoscope/>,data:drData},

  ]

  return (
  <div className="grid grid-cols-3 gap-5">
    {cards.map((cardData)=>card(cardData.name,cardData.id,cardData.color,cardData.bg,cardData.icon,cardData.data))}
  </div>);
};

export default TopCards;
