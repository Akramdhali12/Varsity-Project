import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      
      <h1 className="text-[8rem] font-extrabold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
        404
      </h1>

      <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>

      <p className="text-gray-400 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl text-white font-semibold shadow-lg hover:shadow-teal-500/30 transition duration-300"
      >
        Go Home
      </button>

      <div className="absolute bottom-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} HMS Portal
      </div>
    </div>
  );
};

export default NotFoundPage;
