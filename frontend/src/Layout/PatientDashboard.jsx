import React from 'react'

import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Patient/Sidebar/Sidebar'
import Header from '../Components/Header/Header'

const PatientDashboard = () => {
  return (
    <div className="flex">
        <Sidebar />
        <div className="w-full overflow-hidden flex flex-col">
          <Header />
          <Outlet/>
        </div>
      </div>
  )
}

export default PatientDashboard;