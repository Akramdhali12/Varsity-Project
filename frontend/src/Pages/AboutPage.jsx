import React from 'react'
import { IconBuildingHospital, IconHeartbeat, IconStethoscope, IconTestPipe } from '@tabler/icons-react';

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto">

      {/* ---------- TOP SECTION ---------- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          The New Way to Diagnostic Treatment
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          Popular is committed to render the possible standard service to the
          people of the country at an affordable cost. This will definitely
          reduce the burden of the government and will make the path of
          <span className="font-semibold text-blue-600"> “Health for all”.</span>
        </p>
      </div>

      {/* ---------- STEP CARD SECTION ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Step 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-blue-600 hover:scale-105 transition">
          <div className="flex justify-center mb-4">
            <IconHeartbeat size={60} stroke={1.5} className="text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Step 1: Initial Diagnosis
          </h3>
          <p className="text-gray-600 text-sm">
            We begin with a comprehensive evaluation using advanced diagnostics.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-green-600 hover:scale-105 transition">
          <div className="flex justify-center mb-4">
            <IconStethoscope size={60} stroke={1.5} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Step 2: Expert Consultation
          </h3>
          <p className="text-gray-600 text-sm">
            Our specialist doctors analyze reports and guide treatment options.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-yellow-500 hover:scale-105 transition">
          <div className="flex justify-center mb-4">
            <IconTestPipe size={60} stroke={1.5} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Step 3: Advanced Testing
          </h3>
          <p className="text-gray-600 text-sm">
            Lab & imaging tests ensure precise and reliable results.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center border-t-4 border-purple-600 hover:scale-105 transition">
          <div className="flex justify-center mb-4">
            <IconBuildingHospital size={60} stroke={1.5} className="text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Step 4: Treatment & Care
          </h3>
          <p className="text-gray-600 text-sm">
            Personalized treatment plans with continuous support and care.
          </p>
        </div>

      </div>
    </div>
  )
}

export default AboutPage