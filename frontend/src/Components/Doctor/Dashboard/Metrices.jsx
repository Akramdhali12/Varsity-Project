import React, { useEffect, useState } from 'react'
import { AreaChart } from '@mantine/charts';
import { countAppointmentsByDoctor } from '../../../Service/AppointmentService';
// import { addZeroMonths } from '../../../Utility/OtherUtility';
import { useSelector } from 'react-redux';

const Metrices = () => {
  const [appointments,setAppointments]=useState([]);
  const user = useSelector((state)=>state.user);
  useEffect(()=>{
    countAppointmentsByDoctor(user.profileId).then((data)=>{
      console.log(data);
      setAppointments(data);
    }).catch((error)=>{
      console.log(error);
    });
  },[]);

const getSum = (data,key)=>{
  return data.reduce((sum,item)=>sum+item[key],0);
}
  return (
    <div className='bg-violet-50 rounded-xl p-3'>
      <div className='flex justify-between p-5 items-center'>
        <div>
          <div className='font-semibold'>Appointments</div>
          <div className='text-xs text-gray-500'>{new Date().getFullYear()}</div>
        </div>
        <div className='text-2xl font-bold text-violet-500'>{getSum(appointments,"count")}</div>
      </div>
      <AreaChart
                h={200}
                data={appointments}
                dataKey="month"
                series={[{ name: 'count', color: 'violet' }]}
                strokeWidth={4}
                curveType="bump"
                // tickLine="none"
                // gridAxis="none"
                withXAxis={true}
                withYAxis={true}
                withDots={true}
              />
    </div>
  )
}

export default Metrices