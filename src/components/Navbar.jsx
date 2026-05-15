import React, { useEffect, useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import UserContext from "../Store/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

function Navbar() {
  const [emailVerifyMenu, setEmailVerifyMenu] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    refreshUserDetails,
  } = useContext(UserContext);

  const openMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const backToHome = () => {
    setMobileMenu(false);
  };

  const logout = () => {
    localStorage.removeItem("GKT");
    setIsUserLogin(false);
    setUserDetails(null);
    setMobileMenu(false);
    toast.success("Logout Successfully");
  };

  const editUserAvatar = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("GKT");

      const response = await axios.get(`${User_Api}/editUserAvatar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Avatar updated");
        setUpdateAvatar((prev) => !prev);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating avatar");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("GKT");
    if (token) {
      refreshUserDetails(token);
    }
  }, [updateAvatar]);

  return (
    <div className="bg-[var(--primary)] text-white flex justify-between items-center p-4 md:px-10 md:h-20">
      
      {/* Logo */}
      <div className="text-2xl md:text-3xl font-bold">
        <Link to={"/"}>General Knowledge</Link>
      </div>

      {/* Mobile icon */}
      <div className="md:hidden" onClick={openMenu}>
        <DensityMediumIcon className="!text-3xl cursor-pointer" />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute right-0 w-full bg-[var(--primary)] z-50 transition-all duration-500 ${
          mobileMenu ? "top-[50px] opacity-100" : "top-[-500px] opacity-0"
        }`}
      >
        <div className="p-5 text-center">
          
          {isUserLogin ? (
            <div>
              {userDetails?.userProfileImage ? (
                <div>
                  <img
                    src={userDetails.userProfileImage}
                    className="h-20 w-20 rounded-full mx-auto"
                  />
                  <button
                    onClick={editUserAvatar}
                    className="mt-2 bg-green-500 px-3 py-1 rounded"
                  >
                    {isLoading ? "Loading..." : "Edit Profile"}
                  </button>
                </div>
              ) : (
                <AccountCircleIcon className="!text-7xl" />
              )}

              <h1 className="mt-3">{userDetails?.userName}</h1>
              <p>{userDetails?.email}</p>
            </div>
          ) : (
            <AccountCircleIcon className="!text-7xl" />
          )}

          {/* Links */}
          <ul className="flex flex-col gap-5 mt-5 text-xl">
            <Link to="/" onClick={backToHome}><li>Home</li></Link>
            <Link to="/mcqs" onClick={backToHome}><li>MCQS</li></Link>
            <Link to="/points" onClick={backToHome}><li>Points</li></Link>

            {isUserLogin ? (
              <>
                {userDetails?.isAdmin && (
                  <Link to="/admin/dashboard" onClick={backToHome}>
                    <li>Admin</li>
                  </Link>
                )}

                {userDetails?.isEmailVerified === false && (
                  <li
                    onClick={async () => {
                      await generateOTP();
                      navigate("/verification");
                    }}
                  >
                    {emailVerification ? "Please Wait..." : "Verify Account"}
                  </li>
                )}

                <li onClick={logout}>Logout</li>
              </>
            ) : (
              <>
                <Link to="/signup" onClick={backToHome}><li>Signup</li></Link>
                <Link to="/login" onClick={backToHome}><li>Login</li></Link>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-8 items-center text-xl">
        <Link to="/">Home</Link>
        <Link to="/mcqs">MCQS</Link>
        <Link to="/points">Points</Link>

        {userDetails?.isAdmin && (
          <Link to="/admin/dashboard">Admin</Link>
        )}

        {isUserLogin ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;