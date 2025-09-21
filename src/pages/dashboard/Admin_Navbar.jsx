import React from 'react';
import { Link } from "react-router-dom";

function Admin_Navbar() {
  return (
    <div>
       <div className="my-5 px-10 font-bold flex flex-wrap gap-5">
              <Link to = {'/admin/users'} className="bg-green-500 px-5 py-1 rounded-md md:text-2xl cursor-pointer hover:bg-green-600 text-white">
                Users
              </Link>
              <Link to = {'/admin/mcqs'} className="bg-green-500 px-5 py-1 rounded-md md:text-2xl cursor-pointer hover:bg-green-600 text-white">
                MCQS
              </Link>
              <Link to={'/admin/feedbacks'} className="bg-green-500 px-5 py-1 rounded-md md:text-2xl cursor-pointer hover:bg-green-600 text-white">
                Feedbacks
              </Link>
            </div>
    </div>
  )
}

export default Admin_Navbar
