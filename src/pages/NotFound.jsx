import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

      <div className="text-center max-w-md">

        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold text-green-600">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate("/", { replace: true })}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl font-semibold transition"
          >
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
}

export default NotFound;