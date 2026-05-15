import React, { useContext, useEffect, useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Store/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    isUserLogin,
    setIsUserLogin,
    userDetails,
    setUserDetails,
    generateOTP,
    emailVerification,
    User_Api,
    refreshUserDetails,
  } = useContext(UserContext);

  // Toggle Mobile Menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("GKT");
    setIsUserLogin(false);
    setUserDetails(null);
    setMenuOpen(false);

    toast.success("Logged out successfully");
    navigate("/");
  };

  // Edit Avatar
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
        toast.success(response.data.message || "Avatar Updated");
        refreshUserDetails(token);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update avatar"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh User
  useEffect(() => {
    const token = localStorage.getItem("GKT");

    if (token) {
      refreshUserDetails(token);
    }
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[var(--primary)] text-white shadow-md">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-10 h-[70px]">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-wide"
          >
            GK <span className="text-green-200">MCQs</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-base font-medium">

            <Link
              to="/"
              className="hover:text-green-200 transition duration-300"
            >
              Home
            </Link>

            <Link
              to="/mcqs"
              className="hover:text-green-200 transition duration-300"
            >
              MCQs
            </Link>

            <Link
              to="/points"
              className="hover:text-green-200 transition duration-300"
            >
              Points
            </Link>

            {userDetails?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="hover:text-green-200 transition duration-300"
              >
                Admin
              </Link>
            )}

            {isUserLogin ? (
              <button
                onClick={logout}
                className="px-5 py-2 rounded-xl bg-white text-[var(--primary)] font-semibold hover:scale-105 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="hover:text-green-200 transition duration-300"
                >
                  Signup
                </Link>

                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl bg-white text-[var(--primary)] font-semibold hover:scale-105 transition duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center"
          >
            {menuOpen ? (
              <CloseIcon className="!text-3xl" />
            ) : (
              <DensityMediumIcon className="!text-3xl" />
            )}
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] bg-white text-gray-800 z-50 shadow-2xl transition-all duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Sidebar Top */}
        <div className="flex justify-between items-center p-5 border-b">

          <h1 className="text-2xl font-bold text-[var(--primary)]">
            GK MCQs
          </h1>

          <CloseIcon
            onClick={toggleMenu}
            className="cursor-pointer"
          />
        </div>

        {/* User Section */}
        <div className="flex flex-col items-center py-6 border-b px-5">

          {userDetails?.userProfileImage ? (
            <img
              src={userDetails.userProfileImage}
              alt="user"
              className="w-20 h-20 rounded-full border-4 border-green-100 object-cover"
            />
          ) : (
            <AccountCircleIcon className="!text-7xl text-[var(--primary)]" />
          )}

          <h2 className="mt-3 font-bold text-lg">
            {userDetails?.userName || "Guest User"}
          </h2>

          <p className="text-sm text-gray-500 text-center break-all">
            {userDetails?.email || "Welcome to GK MCQs"}
          </p>

          {userDetails?.userProfileImage && (
            <button
              onClick={editUserAvatar}
              className="mt-4 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm hover:opacity-90 transition"
            >
              {isLoading ? "Updating..." : "Edit Avatar"}
            </button>
          )}

          {/* Email Verification */}
          {isUserLogin &&
            userDetails?.isEmailVerified === false && (
              <button
                onClick={async () => {
                  await generateOTP();
                  navigate("/verification");
                  setMenuOpen(false);
                }}
                className="mt-3 text-sm text-yellow-600 font-medium"
              >
                {emailVerification
                  ? "Please Wait..."
                  : "Verify Account"}
              </button>
            )}
        </div>

        {/* Links */}
        <div className="flex flex-col p-5 gap-2">

          <Link
            to="/"
            onClick={toggleMenu}
            className="p-3 rounded-xl hover:bg-green-50 transition"
          >
            Home
          </Link>

          <Link
            to="/mcqs"
            onClick={toggleMenu}
            className="p-3 rounded-xl hover:bg-green-50 transition"
          >
            MCQs
          </Link>

          <Link
            to="/points"
            onClick={toggleMenu}
            className="p-3 rounded-xl hover:bg-green-50 transition"
          >
            Points
          </Link>

          {userDetails?.isAdmin && (
            <Link
              to="/admin/dashboard"
              onClick={toggleMenu}
              className="p-3 rounded-xl hover:bg-green-50 transition"
            >
              Admin
            </Link>
          )}

          {isUserLogin ? (
            <button
              onClick={logout}
              className="mt-3 p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="p-3 rounded-xl hover:bg-green-50 transition"
              >
                Signup
              </Link>

              <Link
                to="/login"
                onClick={toggleMenu}
                className="p-3 rounded-xl bg-[var(--primary)] text-white text-center hover:opacity-90 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;