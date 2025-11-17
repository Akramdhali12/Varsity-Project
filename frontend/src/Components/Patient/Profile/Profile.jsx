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
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IconEdit } from "@tabler/icons-react";
import { bloodGroups } from "../../../Data/DropDownData";
import { useDisclosure } from "@mantine/hooks";
import {
  getPatient,
  updatePatient,
} from "../../../Service/PatientProfileService";
import { formatDate } from "../../../Utility/DateUtility";
import {
  errorNotification,
  successNotification,
} from "../../../Utility/NotificationUtil";
import { arrayToCSV } from "../../../Utility/OtherUtility";
import { DropzoneButton } from "../../Utility/Dropzone/DropzoneButton";
import useProtectedImage from "../../Utility/Dropzone/useProtectedImage";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const [editMode, setEdit] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getPatient(user.profileId)
      .then((data) => {
        setProfile({
          ...data,
          allergies: data.allergies ? JSON.parse(data.allergies) : null,
          chronicDisease: data.chronicDisease
            ? JSON.parse(data.chronicDisease)
            : null,
        });
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
      idCardNo: "",
      profilePictureId: "",
      bloodGroup: "",
      allergies: [],
      chronicDisease: [],
    },

    validate: {
      dob: (value) => (!value ? "Date of Birth is required" : undefined),
      phone: (value) => (!value ? "Phone number is required" : undefined),
      address: (value) => (!value ? "Address is required" : undefined),
      idCardNo: (value) => (!value ? "IdCard Number is required" : undefined),
    },
  });
  const handleEdit = () => {
    form.setValues({
      ...profile,
      dob: profile.dob ? new Date(profile.dob) : undefined,
      chronicDisease: profile.chronicDisease ?? [],
      allergies: profile.allergies ?? [],
    });
    setEdit(true);
  };
  const handleSubmit = (e) => {
    let values = form.getValues();
    form.validate();
    if (!form.isValid()) return;
    updatePatient({
      ...profile,
      ...values,
      allergies: values.allergies ? JSON.stringify(values.allergies) : null,
      chronicDisease: values.chronicDisease
        ? JSON.stringify(values.chronicDisease)
        : null,
    })
      .then((data) => {
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

  const url = useProtectedImage(profile.profilePictureId);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center gap-3">
            <Avatar variant="filled" src={url} size={120} alt="it's me" />
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
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-t-xl text-2xl font-semibold">
          Personal Information
        </div>

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

            {/* ID Card */}
            <div>
              <p className="text-blue-600 font-medium mb-1">ID Card No</p>
              {editMode ? (
                <NumberInput
                  {...form.getInputProps("idCardNo")}
                  hideControls
                  placeholder="ID Number"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.idCardNo ?? "-"}
                </p>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Blood Group</p>
              {editMode ? (
                <Select
                  {...form.getInputProps("bloodGroup")}
                  data={bloodGroups}
                  placeholder="Select blood group"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {profile.bloodGroup ?? "-"}
                </p>
              )}
            </div>

            {/* Allergies */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Allergies</p>
              {editMode ? (
                <TagsInput
                  {...form.getInputProps("allergies")}
                  placeholder="Allergies"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {arrayToCSV(profile.allergies) ?? "-"}
                </p>
              )}
            </div>

            {/* Chronic Disease */}
            <div>
              <p className="text-blue-600 font-medium mb-1">Chronic Disease</p>
              {editMode ? (
                <TagsInput
                  {...form.getInputProps("chronicDisease")}
                  placeholder="Chronic diseases"
                />
              ) : (
                <p className="text-gray-800 font-semibold">
                  {arrayToCSV(profile.chronicDisease) ?? "-"}
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
        <DropzoneButton close={close} form={form} id="profilePictureId" />
      </Modal>
    </div>
  );
};

export default Profile;
