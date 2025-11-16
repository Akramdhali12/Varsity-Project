import { Button, PasswordInput, TextInput } from "@mantine/core";
import "../App.css";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setJwt } from "../Slices/JwtSlice";
import { setUser } from "../Slices/UserSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    loginUser(values)
      .then((_data) => {
        successNotification("Login successful!");
        dispatch(setJwt(_data));
        dispatch(setUser(jwtDecode(_data)));
      })
      .catch((error) => {
        console.error("Login failed:", error);
        errorNotification(error.response?.data?.message || error.message || "Login failed. Please try again."); 
      }).finally(() => {
        form.reset();
        setLoading(false);
      });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="w-[75%] h-[85%] bg-white rounded-2xl shadow-xl flex overflow-hidden">

        {/* Left Section with Image + Message */}
        <div className="w-1/3 bg-blue-400 flex flex-col items-center justify-center p-6 text-white">
          <img
            src='/Male-doctor.jpg'
            alt="Doctor"
            className="w-[60%] rounded-xl shadow-lg mb-5"
          />
          <p className="text-lg text-center font-medium px-4">
            Welcome to MediCare Portal — your trusted place to manage appointments,
            health records, and medical services easily.
          </p>
        </div>

        {/* Right Section Login */}
        <div className="w-2/3 flex items-center justify-center bg-blue-100 p-5">
          <div className="w-[75%] bg-white p-8 shadow-lg rounded-xl">
            <div className="pb-4 flex items-center gap-2 text-blue-900 justify-center">
              <IconHeartbeat size={40} stroke={2.5} />
              <span className="font-heading text-3xl font-bold">MediCare Portal</span>
            </div>

            <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-5 mt-4">
              <div className="self-center font-semibold text-xl">Login</div>

              <TextInput {...form.getInputProps('email')} size="md" radius="md" placeholder="Email" />
              <PasswordInput {...form.getInputProps('password')} size="md" radius="md" placeholder="Password" />

              <Button
                loading={loading}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login
              </Button>

              <div className="text-center text-sm">
                Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
