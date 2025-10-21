import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";
import { doctorDepartments, doctorSpecializations } from "../../../Data/DropDownData";
import { useDisclosure } from "@mantine/hooks";
import { getdoctor, updatedoctor } from "../../../Service/DoctorProfileService";
import { useForm } from "@mantine/form";
import { formatDate } from "../../../Utility/DateUtility";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";

const doctor = {
  name: "Dr. Akram Hossain",
  email: "akram.hossain@example.com",
  dob: "1998-04-25",
  phone: "+8801789123456",
  address: "Dhaka, Bangladesh",
  licenseNo: "DOC-2025-12345",
  specialization: "Cardiologist",
  department: "Cardiology",
  totalExp: 5
};

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [opened, {open,close}] = useDisclosure(false);
  const [editMode, setEdit] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(()=>{
    getdoctor(user.profileId).then((data)=>{
      setProfile({...data});
    }).catch((error)=>{
      console.log(error);
      
    })
  },[])

  const form = useForm({
    initialValues: {
      dob:'',
      phone:'',
      address:'',
      licenseNo:'',
      specialization:'',
      department:'',
      totalExp:[],
    },

    validate: {
      dob:(value)=>!value?'Date of Birth is required':undefined,
      phone:(value)=>!value?'Phone number is required':undefined,
      address:(value)=>!value?'Address is required':undefined,
      licenseNo:(value)=>!value?'License number is required':undefined,
    },
  });
  const handleEdit=()=>{
    form.setValues({...profile,dob:profile.dob?new Date(profile.dob):undefined});
    setEdit(true);
  }
  const handleSubmit = (e)=>{
    let values = form.getValues();
    form.validate();
    if(!form.isValid())return;
    updatedoctor({...profile,...values}).then((_data)=>{
      successNotification("Profile updated successfully");
      setProfile({...profile, ...values});
      setEdit(false);
    }).catch((error)=>{
      const msg =
    error.response?.data?.errorMessage || error.message || "Something went wrong!";
  errorNotification(msg);
      
    })
    
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center gap-3">
          <Avatar
            variant="filled"
            src="/profile.png"
            size={120}
            alt="it's me"
          />
          {editMode && <Button onClick={open} variant="filled">Upload</Button>}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl font-medium text-neutral-900">
              {user.name}
            </div>
            <div className="text-xl text-neutral-700">{user.email}</div>
          </div>
        </div>
        {!editMode? <Button type="button" onClick={handleEdit} variant="filled" leftSection={<IconEdit />}>
          Edit
        </Button>:
        <Button type="submit" onClick={handleSubmit} variant="filled">
          submit
        </Button>}
      </div>
      <Divider my="xl" />
      <div>
        <div className="text-2xl font-medium mb-5 text-neutral-900">
          Personal Information
        </div>
        <Table striped stripedColor="red.1" withRowBorders={false}>
          <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
            <Table.Tr>
              <Table.Td className="px-4">Date of Birth</Table.Td>
              {editMode?<Table.Td className="px-4">
                <DateInput {...form.getInputProps("dob")} placeholder="Date input"/>
              </Table.Td>:
              <Table.Td className="px-4">{formatDate(profile.dob)?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Phone</Table.Td>
              {editMode?<Table.Td className="px-4">
                <NumberInput {...form.getInputProps("phone")} maxLength={11} clampBehavior="strict" placeholder="Phone Number" hideControls/>
              </Table.Td>:
              <Table.Td className="px-4">{profile.phone?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Address</Table.Td>
              {editMode?<Table.Td className="px-4">
                <TextInput {...form.getInputProps("address")}
                  placeholder="Address"
                />
              </Table.Td>:
              <Table.Td className="px-4">{profile.address?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">License No</Table.Td>
              {editMode?<Table.Td className="px-4">
                <TextInput {...form.getInputProps("licenseNo")} placeholder="IdCard Number"/>
              </Table.Td>:
              <Table.Td className="px-4">{profile.licenseNo?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Specialization</Table.Td>
              {editMode?<Table.Td className="px-4">
                <Select {...form.getInputProps("specialization")} data={doctorSpecializations} placeholder="Specialization"/>
              </Table.Td>:
              <Table.Td className="px-4">{profile.specialization?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Department</Table.Td>
              {editMode?<Table.Td className="px-4">
                <Select {...form.getInputProps("department")} data={doctorDepartments} placeholder="Department"/>
              </Table.Td>:
              <Table.Td className="px-4">{profile.department?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Total Experience</Table.Td>
              {editMode?<Table.Td className="px-4">
                <NumberInput {...form.getInputProps("totalExp")} maxLength={2} max={50} clampBehavior="strict" placeholder="Total Experience" hideControls/>
              </Table.Td>:
              <Table.Td className="px-4">{profile.totalExp?? '-'} {profile.totalExp?'years':''}</Table.Td>}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
      <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default Profile;
