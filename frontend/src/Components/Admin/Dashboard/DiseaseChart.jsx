import React, { useEffect, useState } from 'react'
import { diseaseData } from '../../../Data/DashboardData'
import { DonutChart } from '@mantine/charts'
import { countAllReasons } from '../../../Service/AppointmentService';
import { convertReasonChartData } from '../../../Utility/OtherUtility';

const DiseaseChart = () => {
  const [data,setData] = useState(diseaseData);
  useEffect(() => {
    countAllReasons().then((res)=>{
      console.log(res);
      setData(convertReasonChartData(res));
    }).catch((err)=>{
      console.log(err);
    });
  }, []);
  return (
    <div className='p-3 rounded-xl bg-green-50 shadow-xl flex flex-col gap-3'>
        <div className='text-xl font-semibold'>Disease Overview</div>
        <div className='flex justify-center'>
            <DonutChart withLabelsLine labelsType="percent" withLabels data={data}
            thickness={25} size={200} paddingAngle={10} chartLabel="Disease" />
        </div>
    </div>
  )
}

export default DiseaseChart