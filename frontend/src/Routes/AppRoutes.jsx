import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../Layout/AdminDashboard";
import Random from "../Components/Random";

const AppRoutes=()=> {
  return (
    <BrowserRouter>
           <Routes>
            <Route path="/" element={<AdminDashboard/>} /> 
            <Route path="/dashboard" element={<Random/>} />
            <Route path="/patients" element={<Random/>} />
            <Route path="/doctors" element={<Random/>} />
            <Route path="/appointments" element={<Random/>} />
            <Route path="/pharmacy" element={<Random/>} />
            <Route path="/staffs" element={<Random/>} />
            <Route path="/settings" element={<Random/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
