import { Avatar, Badge } from "@mantine/core";
import React from "react";
import {
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

const DoctorCard = ({
  name,
  email,
  phone,
  id,
  address,
  totalExp,
  specialization,
  department,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-6 group hover:-translate-y-1">
      {/* Floating gradient strip */}
      <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl bg-gradient-to-r from-green-400 via-blue-400 to-teal-400"></div>

      {/* Top Section */}
      <div className="flex items-center gap-4 mt-2">
        <Avatar name={name} color='initials' variant='filled'/>

        <div className="flex flex-col">
          <div className="text-lg font-bold text-gray-800">{name}</div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Badge
              color="teal"
              radius="sm"
              variant="light"
              className="px-2 py-1 text-xs"
            >
              {specialization}
            </Badge>
            <Badge
              color="blue"
              radius="sm"
              variant="light"
              className="px-2 py-1 text-xs"
            >
              {department}
            </Badge>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3" />

      {/* Info Section */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <IconMail size={18} className="text-blue-600" />
          <span className="text-gray-700">{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconPhone size={18} className="text-teal-600" />
          <span className="text-gray-700">{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconMapPin size={18} className="text-green-600" />
          <span className="text-gray-700">{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconBriefcase size={18} className="text-amber-600" />
          <span className="text-gray-700 font-medium">
            {totalExp} Years Experience
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center">
        <Badge
          color="green"
          radius="sm"
          variant="filled"
          className="text-xs font-semibold"
        >
          ID: {id}
        </Badge>

        <div className="text-xs text-gray-500 group-hover:text-green-700 transition-colors">
          View Profile →
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
