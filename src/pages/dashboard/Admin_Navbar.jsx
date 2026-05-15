import React from "react";
import { NavLink } from "react-router-dom";

function Admin_Navbar() {
  const linkClass = ({ isActive }) =>
    `px-5 py-2 rounded-xl font-semibold transition duration-200 text-sm sm:text-base
    ${
      isActive
        ? "bg-green-700 text-white shadow-md"
        : "bg-green-500 text-white hover:bg-green-600"
    }`;

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-3 sm:gap-5 justify-center sm:justify-start">

        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>

        <NavLink to="/admin/mcqs" className={linkClass}>
          MCQs
        </NavLink>

        <NavLink to="/admin/feedbacks" className={linkClass}>
          Feedbacks
        </NavLink>

      </div>
    </div>
  );
}

export default Admin_Navbar;