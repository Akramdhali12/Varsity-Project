import { Avatar, Divider, Table } from '@mantine/core';
import React from 'react'
import { useSelector } from 'react-redux'

const patient = {
  dob: "1998-04-25",
  phone: "+8801789123456",
  address: "Dhaka, Bangladesh",
  idCardNo: "123456789",
  bloodGroup: "O+",
  allergies: "Pollen",
  chronicDisease: "None",
};

const Profile = () => {
    const user = useSelector((state)=>state.user);
  return (
    <div className='p-10'>
        <div className='flex gap-5 items-center'>
            <Avatar variant="filled" src="/profile.png" size={120} alt="it's me" />
            <div className='flex flex-col gap-3'>
                <div className='text-3xl font-medium text-neutral-900'>{user.name}</div>
                <div className='text-xl text-neutral-700'>{user.email}</div>
            </div>
        </div>
        <Divider my="xl"/>
        <div>
          <div className="text-2xl font-medium text-neutral-900">Personal Information</div>
          <Table striped highlightOnHover withColumnBorders>
          <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">Date of Birth</td>
            <td className="px-4 py-2 border-b">{patient.dob}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">Phone</td>
            <td className="px-4 py-2 border-b">{patient.phone}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">Address</td>
            <td className="px-4 py-2 border-b">{patient.address}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">ID Card No</td>
            <td className="px-4 py-2 border-b">{patient.idCardNo}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">Blood Group</td>
            <td className="px-4 py-2 border-b">{patient.bloodGroup}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">Allergies</td>
            <td className="px-4 py-2 border-b">{patient.allergies}</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-2">Chronic Disease</td>
            <td className="px-4 py-2">{patient.chronicDisease}</td>
          </tr>
        </tbody>
        </Table>
        </div>
    </div>
  )
}

export default Profile