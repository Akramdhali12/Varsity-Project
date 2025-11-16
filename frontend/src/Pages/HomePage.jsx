import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hospital Management System</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
          {/* Left Section */}
          <div className="text-left space-y-6">
            <h2 className="text-4xl font-semibold text-blue-700">
              Welcome to Our Hospital
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Your health is our priority. This Hospital Management System helps
              patients, doctors, and staff stay connected with a seamless
              digital experience. Login or register to access personalized
              services.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Manage appointments, view medical records, and stay updated — all
              in one place.
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center">
            <img
              src="/doctor.jpg"
              alt="Doctor"
              className="rounded-2xl shadow-lg w-80 md:w-96 border-4 border-blue-200"
            />
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white p-5 mt-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div>
            <h3 className="text-xl font-semibold mb-3">Hospital Name</h3>
            <p className="text-gray-300">
              Your trusted partner in healthcare, providing quality service and
              care for all patients.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Location</h3>
            <p className="text-gray-300">
              123 Health Street
              <br />
              Dhaka, Bangladesh
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <p className="text-gray-300">Email: info@hospital.com</p>
            <p className="text-gray-300">Phone: +880 1234-567890</p>
            <p className="text-gray-300">Emergency: +880 9876-543210</p>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-5 border-t border-gray-700 p-2">
          © 2025 Hospital Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
