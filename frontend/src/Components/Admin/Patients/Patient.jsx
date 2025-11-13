import React, { useEffect, useState } from 'react'
import { getAllPatients } from '../../../Service/PatientProfileService'
import PatientCard from './PatientCard'

const Patient = () => {
    const [patients,setPatients] = useState([]);

    useEffect(()=>{
        getAllPatients().then((data)=>{
            console.log(data);
            setPatients(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div>
        <div style={{color:"rgb(50, 185, 169)"}} className='text-xl mb-5 font-semibold'>
            Patient
        </div>
        <div className='grid grid-cols-4 gap-3'>
            {
                patients.map((patient)=>(
                    <PatientCard key={patient.id} {...patient}/>
                ))
            }
        </div>
    </div>
  )
}

export default Patient;