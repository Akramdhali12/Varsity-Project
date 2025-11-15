import React from 'react'
import { AreaChart } from '@mantine/charts';

const Visits = () => {
  const data = [
  { date: 'Jan', Visits: 54 },
  { date: 'Feb', Visits: 62 },
  { date: 'Mar', Visits: 71 },
  { date: 'Apr', Visits: 48 },
  { date: 'May', Visits: 85 },
  { date: 'Jun', Visits: 67 },
  { date: 'Jul', Visits: 73 },
  { date: 'Aug', Visits: 59 },
  { date: 'Sep', Visits: 64 },
  { date: 'Oct', Visits: 78 },
  { date: 'Nov', Visits: 69 },
  { date: 'Dec', Visits: 91 },
];
const getSum = (data,key)=>{
  return data.reduce((sum,item)=>sum+item[key],0);
}
  return (
    <div className='bg-violet-50 rounded-xl p-3'>
      <div className='flex justify-between p-5 items-center'>
        <div>
          <div className='font-semibold'>Visits</div>
          <div className='text-xs text-gray-500'>{new Date().getFullYear()}</div>
        </div>
        <div className='text-2xl font-bold text-violet-500'>{getSum(data,"Visits")}</div>
      </div>
      <AreaChart
                h={200}
                data={data}
                dataKey="date"
                series={[{ name: 'Visits', color: 'violet' }]}
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

export default Visits