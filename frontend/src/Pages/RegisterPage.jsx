import {
  Button,
  PasswordInput,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import "../App.css";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Service/UserService";
import {
  errorNotification,
  successNotification,
} from "../Utility/NotificationUtil";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      type: "PATIENT",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) => (value ? null : "Name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (!value) return "Password is required";
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        return regex.test(value)
          ? null
          : "Password must be 8–15 characters long, include uppercase, lowercase, number, and special character";
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values) => {
  setLoading(true);
  try {
    const data = await registerUser(values);
    console.log("Registration successful:", data);
    successNotification("Registration successful! Please login.");
    navigate("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    const message =
      error.response?.data?.message || // backend error message
      error.message || // axios-level message
      "Registration failed. Please try again."; // fallback
    errorNotification(message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      style={{ background: 'url("/bg.jpeg")' }}
      className="h-screen w-screen !bg-center !bg-cover !bg-no-repeat 
             flex flex-col items-center justify-center relative"
    >
      {/* Blur overlay (only background will blur) */}
      <div className="absolute inset-0 backdrop-blur-xs"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="py-3 text-green-800 flex gap-1 items-center">
          <IconHeartbeat size={40} stroke={2.5} />
          <span className="font-heading text-green-800 text-4xl">Pulse</span>
        </div>

        <div className="w-[450px] backdrop-blur-md p-10 border border-gray-950 rounded-lg shadow-lg">
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="self-center font-medium font-heading text-xl">
              Register
            </div>
            <SegmentedControl
              {...form.getInputProps("type")}
              color="pink"
              fullWidth
              size="md"
              radius="md"
              data={[
                { label: "Patient", value: "PATIENT" },
                { label: "Doctor", value: "Doctor" },
                { label: "admin", value: "ADMIN" },
              ]}
            />
            <TextInput
              {...form.getInputProps("name")}
              variant="filled"
              size="md"
              radius="md"
              placeholder="Name"
            />
            <TextInput
              {...form.getInputProps("email")}
              variant="filled"
              size="md"
              radius="md"
              placeholder="Email"
            />
            <PasswordInput
              {...form.getInputProps("password")}
              variant="filled"
              size="md"
              radius="md"
              placeholder="Password"
            />
            <PasswordInput
              {...form.getInputProps("confirmPassword")}
              variant="filled"
              size="md"
              radius="md"
              placeholder="Confirm Password"
            />
            <Button loading={loading} type="submit">Register</Button>
            <div>
              Have an account?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
