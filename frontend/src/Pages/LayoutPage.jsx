import { Menu } from "@mantine/core";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function LayoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold">HealthHub</h1>
        </Link>
        {/* Center Navigation Links */}
  <nav className="flex gap-8 text-lg font-medium">
    <Link
      to="/about"
      className="hover:text-yellow-300 transition"
    >
      About
    </Link>
    {/* Services Dropdown */}
          <Menu trigger="click" withinPortal>
            <Menu.Target>
              <button className="hover:text-yellow-300 transition cursor-pointer bg-transparent border-none text-inherit font-medium">
                Services ▼
              </button>
            </Menu.Target>

            <Menu.Dropdown className="text-black">
              <Menu.Item component={Link} to="/appointment">
                Appointment
              </Menu.Item>
              {/* Therapy with Submenu */}
      <Menu trigger="hover" position="right-start" offset={10}>
        <Menu.Target>
          <Menu.Item>
            Therapy ➤
          </Menu.Item>
        </Menu.Target>

        <Menu.Dropdown>

          <Menu.Item component={Link} to="/therapy/physiotherapy">
            Physiotherapy
          </Menu.Item>

          <Menu.Item component={Link} to="/therapy/panchakarma-regimental">
            Panchakarma & Regimental
          </Menu.Item>

        </Menu.Dropdown>
      </Menu>
              <Menu.Item component={Link} to="/ambulance-service">
                Ambulance Service
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
    <Link
      to="/contact"
      className="hover:text-yellow-300 transition"
    >
      Contact
    </Link>
  </nav>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold shadow hover:bg-blue-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-xl font-semibold shadow hover:bg-yellow-300 transition"
          >
            Register
          </Link>
          {/* 3-dot Menu */}
          <button className="ml-4 p-2 rounded-full hover:bg-blue-500 hover:bg-opacity-20 transition">
            <div className="space-y-1">
              <span className="block w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="block w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="block w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
          </button>
        </div>
      </header>
      <main className="flex-grow p-10 flex items-center justify-center">
        <Outlet />
        {/* Floating Action Buttons */}
<div className="fixed right-6 bottom-35 flex flex-col gap-4 z-50">

  {/* Contact Icon */}
  <Link
    to="/contact"
    className="w-12 h-12 bg-red-400 rounded-2xl flex items-center justify-center shadow-xl relative hover:scale-110 transition"
  >
    <i className="text-white text-xl">
      📞
    </i>

    {/* Small green dot */}
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-700 rounded-full border-2 border-white"></span>
  </Link>

  {/* Appointment Icon */}
  <Link
    to="/login"
    className="w-12 h-12 bg-white border border-green-700 rounded-2xl flex items-center justify-center shadow-xl relative hover:scale-110 transition"
  >
    <i className="text-green-700 text-xl">
      📅
    </i>

    {/* Small green dot */}
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-700 rounded-full border-2 border-white"></span>
  </Link>

</div>

      </main>
      <footer className="bg-gray-900 text-white p-2 mt-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-1">HealthHub</h3>
            <p className="text-gray-300 text-sm">
              Your trusted partner in healthcare, providing quality service and
              care for all patients.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-1">Location</h3>
            <p className="text-gray-300 text-sm">
              123 Health Street
              <br />
              Dhaka, Bangladesh
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-1">Contact Information</h3>
            <p className="text-gray-300 text-sm">Email: info@hospital.com</p>
            <p className="text-gray-300 text-sm">Phone: +880 1234-567890</p>
            <p className="text-gray-300 text-sm">Emergency: +880 9876-543210</p>
          </div>
        </div>
        <div className="text-center text-gray-400 m-2 border-t border-gray-700 p-2">
          © 2025 HealthHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LayoutPage;
