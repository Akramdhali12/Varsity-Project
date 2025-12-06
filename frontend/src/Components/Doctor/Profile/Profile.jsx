import {
  Avatar,
  Button,
  Divider,
  Modal,
  NumberInput,
  Select,
  Table,
  TagsInput,
  TextInput,
} from "@mantine/core";
import { DateInput, TimePicker } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";
import {
  doctorDepartments,
  doctorSpecializations,
} from "../../../Data/DropDownData";
import { useDisclosure } from "@mantine/hooks";
import { getdoctor, updatedoctor } from "../../../Service/DoctorProfileService";
import { useForm } from "@mantine/form";
import { formatDate } from "../../../Utility/DateUtility";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";

// const doctor = {
//   name: "Dr. Akram Hossain",
//   email: "akram.hossain@example.com",
//   dob: "1998-04-25",
//   phone: "+8801789123456",
//   address: "Dhaka, Bangladesh",
//   licenseNo: "DOC-2025-12345",
//   specialization: "Cardiologist",
//   department: "Cardiology",
//   totalExp: 5
// };

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const [editMode, setEdit] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getdoctor(user.profileId)
      .then((data) => {
        setProfile({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const form = useForm({
    initialValues: {
      dob: "",
      phone: "",
      address: "",
      licenseNo: "",
      specialization: "",
      department: "",
      totalExp: [],
      startTime: "", // new field for start time
      endTime: "", // new field for end time
      availableDays: [], // new field for days (array of strings)
    },

    validate: {
      dob: (value) => (!value ? "Date of Birth is required" : undefined),
      phone: (value) => (!value ? "Phone number is required" : undefined),
      address: (value) => (!value ? "Address is required" : undefined),
      licenseNo: (value) => (!value ? "License number is required" : undefined),
    },
  });
  const handleEdit = () => {
    form.setValues({
      ...profile,
      dob: profile.dob ? new Date(profile.dob) : undefined,
    });
    setEdit(true);
  };
  const handleSubmit = (e) => {
    let values = form.getValues();
    form.validate();
    if (!form.isValid()) return;
    updatedoctor({ ...profile, ...values })
      .then((_data) => {
        successNotification("Profile updated successfully");
        setProfile({ ...profile, ...values });
        setEdit(false);
      })
      .catch((error) => {
        const msg =
          error.response?.data?.errorMessage ||
          error.message ||
          "Something went wrong!";
        errorNotification(msg);
      });
  };

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
            {editMode && (
              <Button onClick={open} variant="filled">
                Upload
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-3xl font-medium text-neutral-900">
              {user.name}
            </div>
            <div className="text-xl text-neutral-700">{user.email}</div>
          </div>
        </div>
        {!editMode ? (
          <Button
            type="button"
            onClick={handleEdit}
            variant="filled"
            leftSection={<IconEdit />}
          >
            Edit
          </Button>
        ) : (
          <Button type="submit" onClick={handleSubmit} variant="filled">
            submit
          </Button>
        )}
      </div>
      <Divider my="xl" />
      <div className="mt-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-t-xl text-2xl font-semibold">
          Personal Information
        </div>

        {/* Card Body */}
        <div className="bg-white shadow-lg rounded-b-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Date of Birth */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Date of Birth</p>
              {editMode ? (
                <DateInput
                  {...form.getInputProps("dob")}
                  placeholder="Select date"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {formatDate(profile.dob) ?? "-"}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Phone</p>
              {editMode ? (
                <NumberInput
                  {...form.getInputProps("phone")}
                  hideControls
                  placeholder="Phone number"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.phone ?? "-"}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Address</p>
              {editMode ? (
                <TextInput
                  {...form.getInputProps("address")}
                  placeholder="Address"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.address ?? "-"}
                </p>
              )}
            </div>

            {/* License No */}
            <div>
              <p className="text-blue-600 font-medium mb-1">License No</p>
              {editMode ? (
                <TextInput
                  {...form.getInputProps("licenseNo")}
                  placeholder="License Number"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.licenseNo ?? "-"}
                </p>
              )}
            </div>

            {/* Specialization */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Specialization</p>
              {editMode ? (
                <Select
                  {...form.getInputProps("specialization")}
                  data={doctorSpecializations}
                  placeholder="Select specialization"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.specialization ?? "-"}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Department</p>
              {editMode ? (
                <Select
                  {...form.getInputProps("department")}
                  data={doctorDepartments}
                  placeholder="Select department"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.department ?? "-"}
                </p>
              )}
            </div>

            {/* Total Experience */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Total Experience</p>
              {editMode ? (
                <NumberInput
                  {...form.getInputProps("totalExp")}
                  hideControls
                  placeholder="Years of experience"
                  max={50}
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.totalExp ?? "-"} {profile.totalExp ? "years" : ""}
                </p>
              )}
            </div>
            <div>
              <p className="text-blue-600 font-medium mb-1">Available From</p>
              {editMode ? (
                <TimePicker
                  value={form.values.startTime}
                  onChange={(val) => form.setFieldValue("startTime", val)}
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.startTime ?? "-"}
                </p>
              )}
            </div>
            <div>
              <p className="text-blue-600 font-medium mb-1">Available Until</p>
              {editMode ? (
                <TimePicker
                  value={form.values.endTime}
                  onChange={(val) => form.setFieldValue("endTime", val)}
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.endTime ?? "-"}
                </p>
              )}
            </div>
            <div>
              <p className="text-blue-600 font-medium mb-1">Available Days</p>
              {editMode ? (
                <TagsInput
                  data={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ]}
                  value={form.values.availableDays}
                  onChange={(val) => form.setFieldValue("availableDays", val)}
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {(profile.availableDays || []).join(', ') || '-'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        centered
        opened={opened}
        onClose={close}
        title={
          <span className="text-xl font-medium">Upload Profile Picture</span>
        }
      >
        {/* Modal content */}
      </Modal>
    </div>
  );
};

export default Profile;
