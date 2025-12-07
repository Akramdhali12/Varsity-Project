import {
  IconBed,
  IconCalendarCheck,
  IconHeartbeat,
  IconLayoutGrid,
  IconPill,
  IconUser,
} from "@tabler/icons-react";
import "../../../app.css"
import { Avatar, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getdoctor } from "../../../Service/DoctorProfileService";
import useProtectedImage from "../../Utility/Dropzone/useProtectedImage";

const links = [
  {
    name: "Dashboard",
    icon: <IconLayoutGrid stroke={1.5} />,
    url: "/doctor/dashboard",
  },
  { name: "Profile", icon: <IconUser stroke={1.5} />, url: "/doctor/profile" },
  // { name: "Patients", icon: <IconBed stroke={1.5} />, url: "/doctor/patient" },
  {
    name: "Appointments",
    icon: <IconCalendarCheck stroke={1.5} />,
    url: "/doctor/appointments",
  },
  // { name: "pharmacy", icon: <IconPill stroke={1.5} />, url: "/doctor/pharmacy" },
];

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation(); // <-- Important for active detection

  const [picId,setPicId] = useState(null);
  useEffect(()=>{
    if(!user) return;
    getdoctor(user.profileId)
    .then((data) => {
      console.log("Patient:", data);
      setPicId(data.profilePictureId);
    })
    .catch(console.log);
  },[user]);
  const url = useProtectedImage(picId);

  return (
    <div className="flex">
      <div className="w-64"></div>

      <div className="bg-gray-800 h-screen hide-scrollbar overflow-y-auto w-64 fixed flex flex-col gap-7 items-center">
        
        <div className="fixed z-[500] py-3 bg-gray-800 text-red-600 flex gap-1 items-center">
          <IconHeartbeat size={35} stroke={2.5} />
          <span className="font-heading text-blue-400 text-3xl">HealthHub</span>
        </div>

        <div className="flex flex-col mt-20 gap-8 items-center">
          <div className="flex flex-col gap-1 items-center">
            <div className="p-1 bg-white rounded-full shadow-lg">
              <Avatar variant="filled" src={url} size="lg" alt="it's me" />
            </div>
            <span className="font-medium text-white">{user.name}</span>
            <Text size="xs" c="dimmed" className="text-white">
              {user.role}
            </Text>
          </div>

          <div>
            {links.map((link) => {
              const isActive = location.pathname === link.url;

              return (
                <div key={link.name} className="w-full">
                  <Link
                    to={link.url}
                    className={`group flex items-center gap-3 px-4 py-2 rounded-md w-48 
                      ${isActive 
                        ? "bg-green-300 text-black" 
                        : "text-white hover:bg-green-300 hover:text-black"
                      }`}
                  >
                    <span className={`${isActive ? "text-black" : "text-white"}`}>
                      {link.icon}
                    </span>

                    <span className={`font-medium 
                      ${isActive ? "text-black" : "text-white group-hover:text-black"}`}>
                      {link.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
