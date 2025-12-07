import React from 'react'

const HomePage = () => {
  return (
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
              src="/polash_Pic.png"
              alt="Doctor"
              className="rounded-2xl shadow-lg w-80 md:w-96 border-4 border-blue-200"
            />
          </div>
        </div>
  )
}

export default HomePage