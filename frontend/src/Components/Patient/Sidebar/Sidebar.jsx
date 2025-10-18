import {
  IconCalendarCheck,
  IconHeartbeat,
  IconLayoutGrid,
  IconUser,
} from "@tabler/icons-react";
import "../../../App.css";
import { Avatar, Text } from "@mantine/core";
import { useSelector } from "react-redux";

const links = [
  {
    name: "Dashboard",
    icon: <IconLayoutGrid stroke={1.5} />,
    url: "/patient/dashboard",
  },
  { name: "Profile", icon: <IconUser stroke={1.5} />, url: "/patient/profile" },
  {
    name: "Appointments",
    icon: <IconCalendarCheck stroke={1.5} />,
    url: "/patient/appointments",
  },
];

const Sidebar = () => {
  const user=useSelector((state)=>state.user);
  return (
    <div className="flex">
    <div className="w-64">

    </div>
    
    <div className="bg-gray-800 h-screen hide-scrollbar overflow-y-auto w-64 fixed flex flex-col gap-7 items-center">
      <div className="fixed z-[500] py-3 bg-gray-800 text-red-600 flex gap-1 items-center">
        <IconHeartbeat size={35} stroke={2.5} />
        <span className="font-heading text-green-400 text-3xl">Pulse</span>
      </div>
    <div className="flex flex-col mt-20 gap-8 items-center">
      <div className="flex flex-col gap-1 items-center">
        <div className="p-1 bg-white rounded-full shadow-lg">
          <Avatar variant="filled" src="/profile.png" size="lg" alt="it's me" />
        </div>
        <span className="font-medium text-white">{user.name}</span>
        <Text size="xs" c="dimmed" className="text-white">
          {user.role}
        </Text>
      </div>
      <div>
        {links.map((link) => (
          <div
            key={link.name} className="w-full">
            <a
              href={link.url}
              className="group flex items-center gap-3 text-white hover:bg-green-300 hover:text-black px-4 py-2 rounded-md w-48" >
              {link.icon}
              <span className="font-medium text-white group-hover:text-black">{link.name}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Sidebar;
