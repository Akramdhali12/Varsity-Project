import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"

const successNotification = (message) => {
    notifications.show({
        title: "Success",
        message: message,
        color: 'teal',
        icon: <IconCheck />,
        withCloseButton: true,
        withBorder: true,
        className: "!border-green-600",
    })
}
const errorNotification = (message) => {
    notifications.show({
        title: "Error",
        message: message,
        color: 'red',
        icon: <IconX />,
        withCloseButton: true,
        withBorder: true,
        className: "!border-red-600",
    })
}

export { successNotification, errorNotification };
    
