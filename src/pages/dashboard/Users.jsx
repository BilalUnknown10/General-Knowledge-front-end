import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Store/UserContext";
import { toast } from "react-toastify";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Admin_Api } = useContext(UserContext);
  const token = localStorage.getItem("GKT");

  // GET USERS
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${Admin_Api}/allUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllUsers(res.data.getAllUsers || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `${Admin_Api}/deleteUserById/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message);

      // instant UI update (no reload needed)
      setAllUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    if (token) getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 text-2xl font-bold">
        User Management
      </div>

      {/* Count */}
      <div className="max-w-6xl mx-auto px-4 mt-4 text-right text-gray-700 font-semibold">
        Total Users: {allUsers.length}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : allUsers.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          No users found
        </p>
      ) : (
        <div className="max-w-6xl mx-auto px-4 mt-6 space-y-4">

          {allUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-5 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between"
            >

              {/* Name + Email */}
              <div className="md:w-1/3">
                <h2 className="font-bold text-gray-800">
                  {user.userName}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              {/* Status */}
              <div className="md:w-1/3 mt-3 md:mt-0 flex gap-3 flex-wrap">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    user.isEmailVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.isEmailVerified ? "Verified" : "Unverified"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    user.isAdmin
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </span>

              </div>

              {/* Actions */}
              <div className="md:w-1/3 mt-4 md:mt-0 flex justify-end gap-3">

                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition">
                  Update
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Users;