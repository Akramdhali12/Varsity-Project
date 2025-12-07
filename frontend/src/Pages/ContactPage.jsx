import React, { useState } from 'react'
import { IconPhone, IconMail, IconMapPin, IconSend, IconCheck, IconX } from '@tabler/icons-react';
import emailjs from "emailjs-com";

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    emailjs
      .send(
        "service_jrw4bva",      // ⬅ replace
        "template_7r81bzd",     // ⬅ replace
        formData,
        "DAcSUFcuIU_Zb4F_E"       // ⬅ replace
      )
      .then(() => {
        setStatus("success");
        setLoading(false);
        e.target.reset();
      })
      .catch(() => {
        setStatus("error");
        setLoading(false);
      });
  };
  return (
    <div className="max-w-6xl mx-auto">

      {/* ---------- TOP HEADER ---------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">Contact Us</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          We’re here to help you. Reach out to us anytime for queries, appointments, or support.
        </p>
      </div>

      {/* ---------- CONTACT INFO CARDS ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

        {/* Phone Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <div className="flex justify-center mb-3">
            <IconPhone size={50} stroke={1.5} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Phone</h3>
          <p className="text-gray-600 text-sm">
            +880 1234-567890
          </p>
          <p className="text-gray-600 text-sm">
            +880 9876-543210 (Emergency)
          </p>
        </div>

        {/* Email Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <div className="flex justify-center mb-3">
            <IconMail size={50} stroke={1.5} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Email</h3>
          <p className="text-gray-600 text-sm">
            info@hospital.com
          </p>
          <p className="text-gray-600 text-sm">
            support@hospital.com
          </p>
        </div>

        {/* Location Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <div className="flex justify-center mb-3">
            <IconMapPin size={50} stroke={1.5} className="text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-1">Location</h3>
          <p className="text-gray-600 text-sm">
            123 Health Street
          </p>
          <p className="text-gray-600 text-sm">
            Dhaka, Bangladesh
          </p>
        </div>

      </div>

      {/* ---------- CONTACT FORM ---------- */}
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Send Us a Message
        </h2>

        {/* SUCCESS / ERROR ALERT */}
        {status === "success" && (
          <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 p-3 rounded-lg mb-4">
            <IconCheck /> Message sent successfully!
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4">
            <IconX /> Failed to send message. Try again.
          </div>
        )}

        <form onSubmit={sendEmail} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Name
            </label>
            <input
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
            {!loading && <IconSend size={20} />}
          </button>
        </form>

      </div>

    </div>
  )
}

export default ContactPage