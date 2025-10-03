import {
  IconBed,
  IconCalendarCheck,
  IconHeartbeat,
  IconLayoutGrid,
  IconPill,
  IconSettings,
  IconStethoscope,
  IconUsers,
} from "@tabler/icons-react";
import "../../App.css";
import { Avatar, Text } from "@mantine/core";

const links = [
  {
    name: "Dashboard",
    icon: <IconLayoutGrid stroke={1.5} />,
    url: "/dashboard",
  },
  { name: "Patients", icon: <IconBed stroke={1.5} />, url: "/patients" },
  { name: "Doctors", icon: <IconStethoscope stroke={1.5} />, url: "/doctors" },
  {
    name: "Appointments",
    icon: <IconCalendarCheck stroke={1.5} />,
    url: "/appointments",
  },
  { name: "pharmacy", icon: <IconPill stroke={1.5} />, url: "/pharmacy" },
  { name: "Staffs", icon: <IconUsers stroke={1.5} />, url: "/staffs" },
  { name: "Settings", icon: <IconSettings stroke={1.5} />, url: "/settings" },
];

const Sidebar = () => {
  return (
    <div className="bg-red-200 w-64 flex flex-col gap-7 items-center py-3">
      <div className="text-red-600 flex gap-1 items-center">
        <IconHeartbeat size={35} stroke={2.5} />
        <span className="font-heading text-3xl">Pulse</span>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <div className="p-1 bg-white rounded-full shadow-lg">
          <Avatar variant="filled" src="avatar.png" size="lg" alt="it's me" />
        </div>
        <span className="font-medium">Akram</span>
        <Text size="xs" c="dimmed">
          Admin
        </Text>
      </div>
      <div>
        {links.map((link) => (
          <div
            key={link.name} className="w-full">
            <a
              href={link.url}
              className="flex items-center gap-3 text-gray-700 hover:bg-green-300 px-4 py-2 rounded-md w-48" >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
