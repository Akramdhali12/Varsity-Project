import React from 'react'
import Welcome from './Welcome'
import DiseaseChart from './DiseaseChart'
import Visits from './Visits'
import Appointments from './Appointment'
import Medications from './Medications'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='grid grid-cols-2 gap-5'>
        <Welcome/>
        <Visits/>
      </div>
      <div className='grid grid-cols-3 gap-5'>
        <DiseaseChart/>
        <Appointments/>
        <Medications/>
      </div>
    </div>
  )
}

export default Dashboard