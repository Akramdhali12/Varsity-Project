import { Button, PasswordInput, SegmentedControl, TextInput } from "@mantine/core";
import "../App.css";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      role: "PATIENT",
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
          : "Password must be 8–15 characters, include uppercase, lowercase, number & special char";
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await registerUser(values);
      successNotification("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed. Please try again.";
      errorNotification(message);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="w-[75%] h-[85%] bg-white rounded-2xl shadow-xl flex overflow-hidden">

        {/* Left Section with Image + Message */}
        <div className="w-1/3 bg-blue-400 flex flex-col items-center justify-center p-6 text-white">
          <img
            src='/polash_Pic.png'
            alt="Doctor"
            className="w-[60%] rounded-xl shadow-lg mb-6"
          />
          <p className="text-lg text-center font-medium px-4">
            Join MediCare Portal — manage appointments, health records, and medical services easily.
          </p>
        </div>

        {/* Right Section Register Form */}
        <div className="w-2/3 flex items-center justify-center bg-blue-100 p-5">
          <div className="w-[65%] bg-white p-5 shadow-lg rounded-xl">
            <div className="flex items-center gap-2 text-blue-900 justify-center">
              <IconHeartbeat size={40} stroke={2.5} />
              <span className="font-heading text-3xl font-bold">MediCare Portal</span>
            </div>

            <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-5 mt-2">
              <div className="self-center font-semibold text-xl">Register</div>

              <SegmentedControl
                {...form.getInputProps("role")}
                color="pink"
                fullWidth
                size="md"
                radius="md"
                data={[
                  { label: "Patient", value: "PATIENT" },
                  { label: "Doctor", value: "DOCTOR" },
                  { label: "Admin", value: "ADMIN" },
                ]}
              />

              <TextInput {...form.getInputProps("name")} size="md" radius="md" placeholder="Name" />
              <TextInput {...form.getInputProps("email")} size="md" radius="md" placeholder="Email" />
              <PasswordInput {...form.getInputProps("password")} size="md" radius="md" placeholder="Password" />
              <PasswordInput {...form.getInputProps("confirmPassword")} size="md" radius="md" placeholder="Confirm Password" />

              <Button loading={loading} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Register
              </Button>

              <div className="text-center text-sm">
                Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
