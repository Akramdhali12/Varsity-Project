import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";
import { bloodGroups } from "../../../Data/DropDownData";
import { useDisclosure } from "@mantine/hooks";
import { getPatient, updatePatient } from "../../../Service/PatientProfileService"; 
import { formatDate } from "../../../Utility/DateUtility";
import {errorNotification, successNotification} from "../../../Utility/NotificationUtil"
import { arrayToCSV } from "../../../Utility/OtherUtility";
import { DropzoneButton } from "../../Utility/Dropzone/DropzoneButton";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [opened, {open,close}] = useDisclosure(false);
  const [editMode, setEdit] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(()=>{
    getPatient(user.profileId).then((data)=>{
      setProfile({...data,allergies:data.allergies?(JSON.parse(data.allergies)): null,
        chronicDisease:data.chronicDisease?(JSON.parse(data.chronicDisease)): null
      });
    }).catch((error)=>{
      console.log(error);
      
    })
  },[])

  const form = useForm({
    initialValues: {
      dob:'',
      phone:'',
      address:'',
      idCardNo:'',
      bloodGroup:'',
      allergies:[],
      chronicDisease:[],
    },

    validate: {
      dob:(value)=>!value?'Date of Birth is required':undefined,
      phone:(value)=>!value?'Phone number is required':undefined,
      address:(value)=>!value?'Address is required':undefined,
      idCardNo:(value)=>!value?'IdCard Number is required':undefined,
    },
  });
  const handleEdit=()=>{
    form.setValues({...profile,dob:profile.dob?new Date(profile.dob):undefined,
      chronicDisease:profile.chronicDisease??[],allergies:profile.allergies??[]
    });
    setEdit(true);
  }
  const handleSubmit = (e)=>{
    let values = form.getValues();
    form.validate();
    if(!form.isValid())return;
    updatePatient({...profile,...values, allergies:values.allergies?JSON.stringify(values.allergies):null,
      chronicDisease:values.chronicDisease?JSON.stringify(values.chronicDisease):null
    }).then((data)=>{
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
              <Table.Td className="px-4">ID Card No</Table.Td>
              {editMode?<Table.Td className="px-4">
                <NumberInput {...form.getInputProps("idCardNo")} maxLength={12} clampBehavior="strict" placeholder="IdCard Number" hideControls/>
              </Table.Td>:
              <Table.Td className="px-4">{profile.idCardNo?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Blood Group</Table.Td>
              {editMode?<Table.Td className="px-4">
                <Select {...form.getInputProps("bloodGroup")} data={bloodGroups} placeholder="Blood Group"/>
              </Table.Td>:
              <Table.Td className="px-4">{profile.bloodGroup?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Allergies</Table.Td>
              {editMode?<Table.Td className="px-4">
                <TagsInput {...form.getInputProps("allergies")} placeholder="Allergies seperated by comma" />
              </Table.Td>:
              <Table.Td className="px-4">{arrayToCSV(profile.allergies)?? '-'}</Table.Td>}
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-4">Chronic Disease</Table.Td>
              {editMode?<Table.Td className="px-4">
                <TagsInput {...form.getInputProps("chronicDisease")} placeholder="Chronic disease seperated by comma" />
              </Table.Td>:
              <Table.Td className="px-4">{arrayToCSV(profile.chronicDisease) ?? '-'}</Table.Td>}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
      <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
        <DropzoneButton/>
      </Modal>
    </div>
  );
};

export default Profile;
