import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="flex">
        <Sidebar />
        <div className="w-full h-16">
          <Header />
          <Outlet/>
        </div>
      </div>
  )
}

export default AdminDashboard