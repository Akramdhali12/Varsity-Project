import { Button, PasswordInput, SegmentedControl, TextInput } from "@mantine/core";
import "../App.css";
import { IconHeartbeat } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const form = useForm({
    initialValues: {
        type: 'PATIENT',
        email: '',
        password: '',
        confirmPassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
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
        <div className="self-center font-medium font-heading text-xl">Register</div>
        <SegmentedControl {...form.getInputProps("type")} color="pink" fullWidth size="md" radius="md"
         data={[{label:'Patient',value:"PATIENT"},{label:'Doctor',value:"Doctor"},{label:'admin',value:"ADMIN"}]} />
        <TextInput {...form.getInputProps('email')} variant="filled" size="md" radius="md" placeholder="Email" />
        <PasswordInput {...form.getInputProps('password')} variant="filled" size="md" radius="md" placeholder="Password" />
        <PasswordInput {...form.getInputProps('confirmPassword')} variant="filled" size="md" radius="md" placeholder="Confirm Password" />
        <Button type="submit">Register</Button>
        <div>Have an account? <Link to="/login" className="text-red-500 hover:underline">Login</Link></div>
      </form>
    </div>
  </div>
</div>

  );
};

export default RegisterPage;
