import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import UserContext from "../../Store/UserContext";
import { useEffect } from "react";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const token = localStorage.getItem("GKT");

  const { Admin_Api } = useContext(UserContext);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${Admin_Api}/allUsers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      const users = response.data.getAllUsers;
      setAllUsers(users);
    } catch (error) {
      console.log("Error in get all user in dashboard : ", error);
    }
  };

  console.log(allUsers);

  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, []);
  return (
    <div>
      <div className="py-3 px-10 bg-green-500 font-bold md:text-4xl text-white">
        <h1>All Users</h1>
      </div>
     <div className="hidden md:block">
      <div className=" font-bold text-xl px-10 py-2 text-end">Total Users : {allUsers.length}</div>
         <div className=" flex justify-between md:mx-9 p-2 rounded-md my-10 font-bold text-xl md:text-2xl bg-green-300">
        <h1 className=" w-1/4 ">Name</h1>
        <h1 className=" w-1/4">Email</h1>
        <h1 className=" w-1/4">Verification</h1>
        <h1 className="w-1/4 ">Manage Users</h1>
      </div>
      {allUsers.map((user, i) => (
        <div
          key={i}
          className="  flex justify-between  space-y-5 px-10 text-xl font-semibold"
        >
          <h1 className=" w-1/4">{user.userName}</h1>
          <p className=" w-1/4">{user.email}</p>
          <p className=" w-1/4">
            {user?.isEmailVerified ? (
              <span>Verified</span>
            ) : (
              <span className="text-red-600">UnVerified</span>
            )}
          </p>
          <p className=" w-1/4">
            <button className="bg-green-600 text-white px-3 py-1 cursor-pointer rounded-md border-none">
              Update
            </button>{" "}
            <button className="bg-red-600 text-white px-3 py-1 cursor-pointer rounded-md border-none">
              Delete
            </button>
          </p>
        </div>
      ))}
     </div>

      {/* For mobile view */}
      <>
      <div className="md:hidden font-bold text-xl px-5 py-2 text-end">Total Users : {allUsers.length}</div>
       {allUsers.map((user, i) => (
        <div
          key={i}
          className="md:hidden space-y-5 px-10 text-xl font-semibold border rounded-md border-green-400 p-5 m-4"
        >
          <h1 className="">Name : {user.userName}</h1>
          <p className="">Email : {user.email}</p>
          <p className=""> Verification : 
            {user?.isEmailVerified ? (
              <span>Verified</span>
            ) : (
              <span className="text-red-600">UnVerified</span>
            )}
          </p>
          <p className="text-end">
            <button className="bg-green-600 text-white px-3 py-1 cursor-pointer rounded-md border-none">
              Update
            </button>{" "}
            <button className="bg-red-600 text-white px-3 py-1 cursor-pointer rounded-md border-none">
              Delete
            </button>
          </p>
        </div>
      ))}
      </>
    </div>
  );
}

export default Users;
