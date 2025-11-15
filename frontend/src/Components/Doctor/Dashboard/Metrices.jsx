import React from 'react'
import { AreaChart } from '@mantine/charts';

const Metrices = () => {
  const data = [
  { date: 'Jan 2025', appointments: 54 },
  { date: 'Feb 2025', appointments: 62 },
  { date: 'Mar 2025', appointments: 71 },
  { date: 'Apr 2025', appointments: 48 },
  { date: 'May 2025', appointments: 85 },
  { date: 'Jun 2025', appointments: 67 },
  { date: 'Jul 2025', appointments: 73 },
  { date: 'Aug 2025', appointments: 59 },
  { date: 'Sep 2025', appointments: 64 },
  { date: 'Oct 2025', appointments: 78 },
  { date: 'Nov 2025', appointments: 69 },
  { date: 'Dec 2025', appointments: 91 },
];
const getSum = (data,key)=>{
  return data.reduce((sum,item)=>sum+item[key],0);
}
  return (
    <div className='bg-violet-50 rounded-xl p-3'>
      <div className='flex justify-between p-5 items-center'>
        <div>
          <div className='font-semibold'>Appointments</div>
          <div className='text-xs text-gray-500'>Last 7 days</div>
        </div>
        <div className='text-2xl font-bold text-violet-500'>{getSum(data,"appointments")}</div>
      </div>
      <AreaChart
                h={200}
                data={data}
                dataKey="date"
                series={[{ name: 'appointments', color: 'violet' }]}
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