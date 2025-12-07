import { Avatar, Badge } from "@mantine/core";
import { formatDate } from "../../../Utility/DateUtility";
import React from "react";
import { IconPhone, IconMapPin, IconDroplet, IconMail, IconHeart } from "@tabler/icons-react";
import useProtectedImage from "../../Utility/Dropzone/useProtectedImage";

const PatientCard = ({
  name,
  email,
  dob,
  phone,
  id,
  address,
  aadharNo,
  bloodGroup,
  profilePictureId,
}) => {
  // Load secure patient image
  const url = useProtectedImage(profilePictureId);
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-6 group hover:-translate-y-1">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r from-blue-400 via-green-400 to-teal-400"></div>

      {/* Header section */}
      <div className="flex items-center gap-4 mt-2">
        <Avatar src={url || null} name={name} color='initials' variant='filled'/>

        <div>
          <div className="text-lg font-semibold text-gray-800">{name}</div>
          <div className="text-xs text-gray-600">Patient ID: {id}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3" />

      {/* Info section */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <IconMail size={16} className="text-blue-600" />
          <span className="text-gray-700">{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconHeart size={16} className="text-pink-500" />
          <span className="text-gray-700">DOB: {formatDate(dob)}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconPhone size={16} className="text-teal-600" />
          <span className="text-gray-700">{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconMapPin size={16} className="text-green-600" />
          <span className="text-gray-700">{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconDroplet size={16} className="text-red-500" />
          <span className="text-gray-700">Blood Group: {bloodGroup}</span>
        </div>
      </div>

      {/* Footer section */}
      <div className="mt-4 flex justify-between items-center">
        {aadharNo && (
          <Badge color="gray" variant="outline" radius="sm" className="text-xs">
            Aadhar: {aadharNo}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
