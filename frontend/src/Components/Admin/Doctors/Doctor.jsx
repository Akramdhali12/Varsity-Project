import React, { useEffect, useState } from 'react'
import { getAllDoctors } from '../../../Service/DoctorProfileService'
import DoctorCard from './DoctorCard'

const Doctor = () => {
    const [doctors,setDoctors] = useState([]);

    useEffect(()=>{
        getAllDoctors().then((data)=>{
            console.log(data);
            setDoctors(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div>
        <div style={{color:"rgb(50, 185, 169)"}} className='text-xl mb-5 font-semibold'>Doctor</div>
        <div className='grid grid-cols-4 gap-5'>
            {
                doctors.map((doctor)=>(
                    <DoctorCard key={doctor.id} {...doctor}/>
                ))
            }
        </div>
    </div>
  )
}

export default Doctor;