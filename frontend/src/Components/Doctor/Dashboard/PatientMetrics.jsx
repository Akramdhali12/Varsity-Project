import React from 'react'
import { AreaChart } from '@mantine/charts';

const PatientMetrics = () => {
  const data = [
  { date: 'Jan', patients: 54 },
  { date: 'Feb', patients: 62 },
  { date: 'Mar', patients: 71 },
  { date: 'Apr', patients: 48 },
  { date: 'May', patients: 85 },
  { date: 'Jun', patients: 67 },
  { date: 'Jul', patients: 73 },
  { date: 'Aug', patients: 59 },
  { date: 'Sep', patients: 64 },
  { date: 'Oct', patients: 78 },
  { date: 'Nov', patients: 69 },
  { date: 'Dec', patients: 91 },
];
const getSum = (data,key)=>{
  return data.reduce((sum,item)=>sum+item[key],0);
}
  return (
    <div className='bg-orange-50 rounded-xl p-3'>
      <div className='flex justify-between p-5 items-center'>
        <div>
          <div className='font-semibold'>Patients</div>
          <div className='text-xs text-gray-500'>{new Date().getFullYear()}</div>
        </div>
        <div className='text-2xl font-bold text-orange-500'>{getSum(data,"patients")}</div>
      </div>
      <AreaChart
                h={280}
                data={data}
                dataKey="date"
                series={[{ name: 'patients', color: 'orange' }]}
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

export default PatientMetrics