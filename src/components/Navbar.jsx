import React, { useEffect, useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import UserContext from "../Store/UserContext";
import { toast } from "react-toastify";
import axios from 'axios';

function Navbar() {
  const [emailVerifyMenu, setEmailVerifyMenu] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  gsap.registerPlugin(useGSAP);

  const {
    mobileMenu,
    setMobileMenu,
    isUserLogin,
    setIsUserLogin,
    userDetails,
    setUserDetails,
    generateOTP,
    emailVerification,
    User_Api,
    refreshUserDetails
  } = useContext(UserContext);

  const openMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const logout = async () => {
    localStorage.removeItem("GKT");
    setIsUserLogin(false);
    setMobileMenu(false);
    setUserDetails("");
    toast.success("Logout Successfully");
  };

  const backToHome = () => {
    setMobileMenu(false);
  };

  // Edit user avatar
  const editUserAvatar = async () => {
    setIsLoading(true);
    const response = await axios.get(`${User_Api}/editUserAvatar`,{
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("GKT")}`
      }
    });
    if(response.status === 200) {
      toast.success(response.data);
      setUpdateAvatar(!updateAvatar);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("GKT");
    if(token) {
      refreshUserDetails(token);
    }
  }, [updateAvatar]);

  return (
    <>
      {/* main container of navbar */}
      <div className="bg-[var(--primary)] text-white flex justify-between items-center p-4 md:p-4 md:px-10 md:h-20">
        {/* Logo or name of website */}
        <div className=" text-2xl md:text-3xl font-bold headingWebName">
          <h1 className="hover:text-green-300 cursor-pointer">
            <Link to={"/"}>General Knowledge</Link>
          </h1>
        </div>

        {/* Menu icon */}
        <div className=" md:hidden font-bold headingWebpages">
          <div
            onClick={openMenu}
            className={`
              transform
              transition-transform duration-700 ease-in-out
              ${mobileMenu ? "rotate-90" : "rotate-0"}
              inline-block
            `}
          >
            <DensityMediumIcon className="!text-3xl" />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`absolute right-0 transition-all duration-700 ease-in-out ${
            mobileMenu ? "top-[50px] opacity-100" : "top-[-500px] opacity-0"
          } z-50 w-full bg-[var(--primary)]  mobileMenu`}
        >
          <div className="p-5">
            <div className="text-center flex flex-col justify-center items-center">
              {isUserLogin ? (
                <div className="flex justify-center items-center flex-col">
                  {userDetails?.userProfileImage ? (
                    <div className="flex justify-center items-center flex-col">
                      <div className="h-20 w-20 rounded-full border bg-green-400">
                      <img
                        src={userDetails?.userProfileImage}
                        alt="profile image"
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                      <button onClick={editUserAvatar} className="bg-green-500 mt-3 px-4 rounded-sm font-bold">{isLoading ? "Loading..." : "Edit Profile"}</button>
                    </div>
                  ) : (
                    <AccountCircleIcon className={`!text-7xl`} />
                  )}
                  <div className="mt-5">
                    <h1>{userDetails.userName}</h1>
                  <p className="">
                    {userDetails.email} <br />
                    {userDetails.isEmailVerified ? (
                      <span>Verified Account</span>
                    ) : (
                      <span>Unverified Account</span>
                    )}
                  </p>
                  </div>
                </div>
              ) : (
                <>
                  <AccountCircleIcon className={`!text-7xl`} />
                </>
              )}
            </div>
            <div className="mt-5">
              <ul className=" flex flex-col gap-6 text-xl font-semibold">
                <Link to={"/"}>
                  <li onClick={backToHome} className="cursor-pointer border-b">
                    Home
                  </li>
                </Link>
                <Link to={"/mcqs"}>
                  <li onClick={backToHome} className="cursor-pointer border-b">
                    MCQS
                  </li>
                </Link>
                <Link to={"/points"}>
                  <li onClick={backToHome} className="cursor-pointer border-b">
                    Points-Table
                  </li>
                </Link>
                {isUserLogin ? (
                  <>
                    {userDetails.isAdmin === true && (
                      <Link to={"/admin/dashboard"}>
                        <li
                          onClick={backToHome}
                          className="cursor-pointer border-b"
                        >
                          Admin
                        </li>
                      </Link>
                    )}

                    {/* Logout */}
                     <Link onClick={logout}>
                      <li className="cursor-pointer border-b">Logout</li>
                    </Link>

                    {userDetails.isEmailVerified === false && (
                      <Link>
                        <li
                          onClick={async () => {
                            await generateOTP(); // optional if needed
                            navigate("/verification"); // using useNavigate from react-router
                          }}
                          className="cursor-pointer border-b"
                          disabled={emailVerification}
                        >
                          {emailVerification
                            ? "Please Wait..."
                            : "Verify Your Account"}
                        </li>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to={"/signup"}>
                      <li
                        onClick={backToHome}
                        className="cursor-pointer border-b"
                      >
                        Signup
                      </li>
                    </Link>
                    <Link to={"/login"}>
                      <li
                        onClick={backToHome}
                        className="cursor-pointer border-b"
                      >
                        Login
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* pages login and signup of website */}
        <div className=" md:flex md:items-center md:gap-x-20 hidden">
          {/* pages */}
          <div className="headingWebpages">
            <ul className="md:flex text-2xl font-semibold gap-x-5">
              <Link to={"/"}>
                <li className="cursor-pointer hover:text-green-500">Home</li>
              </Link>
              <Link to={"/mcqs"}>
                <li className="cursor-pointer hover:text-green-500">MCQS</li>
              </Link>
              <Link to={"/points"}>
                <li className="cursor-pointer hover:text-green-500">
                  Points-Table
                </li>
              </Link>
              {userDetails.isAdmin === true && (
                <Link to={"/admin/dashboard"}>
                  <li
                    onClick={backToHome}
                    className="cursor-pointer hover:text-green-500"
                  >
                    Admin
                  </li>
                </Link>
              )}
            </ul>
          </div>

          {/* login signup */}
          <div className="md:flex text-xl items-center gap-x-3 headingWebLogin">
            {isUserLogin ? (
              <>
                {userDetails.userProfileImage ? (
                  <div className="flex gap-2 items-center">
                    <div
                      onClick={() => setEmailVerifyMenu(!emailVerifyMenu)}
                      className="w-16 h-16 rounded-full bg-green-400 flex justify-center items-center"
                    >
                      <img
                        className=" w-full rounded-full border cursor-pointer h-full object-cover"
                        src={userDetails?.userProfileImage}
                        alt="profile image"
                      />
                    </div>
                    <div>
                      <h1>{userDetails.userName}</h1>
                      {/* <p>{userDetails.email}</p> */}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setEmailVerifyMenu(!emailVerifyMenu)}
                    className="flex items-center gap-2"
                  >
                    <AccountCircleIcon
                      className={`!text-7xl hover:cursor-pointer`}
                    />
                    <div>
                      <h1>{userDetails.userName}</h1>
                      {/* <p>{userDetails.email}</p> */}
                    </div>
                  </div>
                )}
                <div className="border-r-1 h-16 hidden md:block"></div>
                <Link>
                  <button
                    onClick={logout}
                    className=" rounded-md cursor-pointer hover:text-green-500"
                  >
                    {" "}
                    LogOut
                  </button>
                </Link>{" "}
                <div
                  onMouseLeave={() => setEmailVerifyMenu(false)}
                  className={`flex flex-col justify-center transition-all duration-500 ease-in-out h-[250px] w-[264px] absolute top-19 right-0 bg-green-600  border-t rounded-l-md ${
                    emailVerifyMenu
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[-350px] opacity-0"
                  }`}
                >
                  <div className="text-center">
                    {userDetails.userProfileImage ? (
                      <div className="flex flex-col justify-center items-center">
                        <div className="w-24 h-24 rounded-full relative bg-green-400 overflow-hidden">
                          <img
                            className=" w-full rounded-full h-full border object-cover"
                            src={userDetails?.userProfileImage}
                            alt="profile image"
                          />
                          <span onClick={editUserAvatar} className="bg-black bottom-0 w-full left-0 opacity-0 transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer absolute">
                            Edit
                          </span>
                        </div>
                      </div>
                    ) : (
                      <AccountCircleIcon
                        className={`!text-7xl hover:cursor-pointer`}
                      />
                    )}
                    <h1>{userDetails.userName}</h1>
                    <p>{userDetails.email}</p>
                  </div>
                  {userDetails?.isEmailVerified ? (
                    <div className="text-center">
                      <p>Account Verified </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p>UnVerified Account</p>
                    </div>
                  )}
                  {userDetails.isEmailVerified !== true && (
                    <div className="text-center mt-5">
                      <button
                        onClick={async () => {
                          await generateOTP(); // optional if needed
                          navigate("/verification"); // using useNavigate from react-router
                          console.log("clicked verification");
                        }}
                        className="border rounded-md px-6 py-2 cursor-pointer transition-all duration-500 ease-in-out hover:border-green-300 shadow-md hover:text-black hover:bg-green-300"
                        disabled={emailVerification}
                      >
                        {emailVerification
                          ? "Please Wait..."
                          : "Verify Your Account"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to={"/signup"}>
                  <button className=" rounded-md cursor-pointer hover:text-green-500">
                    Signup
                  </button>
                </Link>
                <div className="border-r-1 h-7 hidden md:block"></div>
                <Link to={"/login"}>
                  <button className="  rounded-md cursor-pointer hover:text-green-500">
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
