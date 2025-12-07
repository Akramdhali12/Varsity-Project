import { Avatar } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import useProtectedImage from '../../Utility/Dropzone/useProtectedImage';
import { getdoctor } from '../../../Service/DoctorProfileService';

const Welcome = () => {
    const user = useSelector((state)=>state.user);
    const [picId,setPicId] = useState(null);
    const [doctorInfo,setDoctorInfo] = useState({});
  useEffect(()=>{
    if(!user) return;
    // getUserProfile(user.id).then((data)=>{
    //   setPicId(data);
    // }).catch((error)=>{
    //   console.log(error);
    // })

    getdoctor(user.profileId).then((data)=>{
      setDoctorInfo(data);
      setPicId(data.profilePictureId);
    }).catch((error)=>{
      console.log(error);
    });
  },[]);
  const url = useProtectedImage(picId);
  return (
    <div className='p-5 shadow-sm rounded-xl bg-blue-50 flex flex-col gap-3'>
        <div className='flex justify-between items-center'>
            <div>
                <div>WelCome Back</div>
                <div className='text-3xl font-semibold text-blue-600'>{user.name}!</div>
                <div className='text-sm'>{doctorInfo.specialization}, {doctorInfo.department}</div>
            </div>
            <Avatar src={url} alt="It's me" variant='filled' size={100}/>
        </div>
        <div className='flex gap-5'>
          <div className='p-3 rounded-xl bg-violet-200'>
            <div className='text-sm'>Appointments</div>
            <div className='text-lg font-semibold text-violet-600'>120+</div>
          </div>
          <div className='p-3 rounded-xl bg-orange-200'>
            <div className='text-sm'>Patients</div>
            <div className='text-lg font-semibold text-orange-600'>80+</div>
          </div>
        </div>
    </div>
  )
}

export default Welcome