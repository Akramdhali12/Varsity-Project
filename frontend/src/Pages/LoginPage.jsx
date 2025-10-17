import { Button, PasswordInput, TextInput } from "@mantine/core";
import "../App.css";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/NotificationUtil";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { setJwt } from "../Slices/JwtSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
    // if(values.email === "" || values.password === ""){
    //   setLoading(false);
    // };
    // console.log(values);
    // navigate("/dashboard");
    // setLoading(true);
    loginUser(values)
      .then((_data) => {
        console.log(jwtDecode(_data));
        console.log("Login successful:", _data);
        successNotification("Login successful!");
        dispatch(setJwt(_data));
        // navigate to dashboard or home page
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        errorNotification(error.response?.data?.message || error.message || "Login failed. Please try again."); 
      }).finally(() => {
        form.reset();
      });
  };

  return (
    <div style={{ background: 'url("/bg.jpeg")' }}
    className="h-screen w-screen !bg-center !bg-cover !bg-no-repeat 
             flex flex-col items-center justify-center relative">
  {/* Blur overlay (only background will blur) */}
  <div className="absolute inset-0 backdrop-blur-xs"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center">
    <div className="py-3 text-green-800 flex gap-1 items-center">
      <IconHeartbeat size={40} stroke={2.5} />
      <span className="font-heading text-green-800 text-4xl">Pulse</span>
    </div>

    <div className="w-[450px] backdrop-blur-md p-10 border border-gray-950 rounded-lg shadow-lg">
      <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-5">
        <div className="self-center font-medium font-heading text-xl">Login</div>
        <TextInput {...form.getInputProps('email')} variant="filled" size="md" radius="md" placeholder="Email" />
        <PasswordInput {...form.getInputProps('password')} variant="filled" size="md" radius="md" placeholder="Password" />
        <Button loading={loading} type="submit">Login</Button>
        <div>Don't have an account? <Link to="/register" className="text-red-500 hover:underline">Register</Link></div>
      </form>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
