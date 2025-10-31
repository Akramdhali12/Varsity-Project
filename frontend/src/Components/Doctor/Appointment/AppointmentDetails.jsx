import {
  Anchor,
  Badge,
  Breadcrumbs,
  Card,
  Divider,
  Group,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAppointmentDetails } from "../../../Service/AppointmentService";
import { formatDateWithTime } from "../../../Utility/DateUtility";
import {
  IconClipboardHeart,
  IconStethoscope,
  IconVaccine,
} from "@tabler/icons-react";
import ApReport from "./ApReport";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({});
  useEffect(() => {
    getAppointmentDetails(id)
      .then((res) => {
        console.log("Appointment Details:", res);
        setAppointment(res);
      })
      .catch((err) => {
        console.error("Error fetching appointment details:", err);
      });
  }, []);

  return (
    <div>
      <Breadcrumbs m="md">
        <Link className="text-blue-400 hover:underline" to="/doctor/dashboard">
          Dashboard
        </Link>
        <Link
          className="text-blue-400 hover:underline"
          to="/doctor/appointments"
        >
          Appointments
        </Link>
        <Text>Details</Text>
      </Breadcrumbs>
      <Card shadow="sm" padding="lg" radius="md" withBorder m="md">
        <Group justify="space-between" mb="sm">
          <Title order={2}>{appointment.patientName}</Title>
          <Badge
            color={appointment.status === "SCHEDULED" ? "green" : "red"}
            variant="light"
          >
            {appointment.status}
          </Badge>
        </Group>
        <div className="grid grid-cols-2 gap-5 mb-2">
          <Text>
            <strong>Email:</strong>
            {appointment.patientEmail}
          </Text>
          <Text>
            <strong>Phone:</strong>
            {appointment.patientPhone}
          </Text>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Text>
            <strong>Reason:</strong>
            {appointment.reason}
          </Text>
          <Text>
            <strong>Appointment Time:</strong>
            {formatDateWithTime(appointment.appointmentTime)}
          </Text>
        </div>

        <Text mt="xs">
          <strong>Doctor:</strong>
          {appointment.doctorName}
        </Text>
        {appointment.notes && (
          <Text mt="sm">
            <strong>Notes:</strong>
            {appointment.notes}
          </Text>
        )}
      </Card>
      <Tabs variant="pills" defaultValue="medical" m='md'>
        <Tabs.List>
          <Tabs.Tab value="medical" leftSection={<IconStethoscope size={15} />}>
            Medical History
          </Tabs.Tab>
          <Tabs.Tab
            value="prescriptions"
            leftSection={<IconVaccine size={15} />}
          >
            Prescriptions
          </Tabs.Tab>
          <Tabs.Tab
            value="report"
            leftSection={<IconClipboardHeart size={15} />}
          >
            Reports
          </Tabs.Tab>
        </Tabs.List>
        <Divider my="sm"/>

        <Tabs.Panel value="medical">meidcal content</Tabs.Panel>

        <Tabs.Panel value="prescriptions">Prescriptions</Tabs.Panel>

        <Tabs.Panel value="report"><ApReport appointment={appointment}/></Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AppointmentDetails;
