import React, { useEffect, useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const logout = () => {
    localStorage.removeItem("GKT");
    setIsUserLogin(false);
    setUserDetails(null);
    setMenuOpen(false);
    toast.success("Logged out successfully");
  };

  const editUserAvatar = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("GKT");

      const response = await axios.get(`${User_Api}/editUserAvatar`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Avatar updated");
        refreshUserDetails(token);
      }
    } catch (error) {
      toast.error("Failed to update avatar");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("GKT");
    if (token) refreshUserDetails(token);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--primary)]/95 backdrop-blur-md text-white shadow-lg">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-10 h-16">

        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-wide">
          GK <span className="text-green-200">MCQs</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">

          <Link className="hover:text-green-200 transition" to="/">Home</Link>
          <Link className="hover:text-green-200 transition" to="/mcqs">MCQs</Link>
          <Link className="hover:text-green-200 transition" to="/points">Points</Link>

          {userDetails?.isAdmin && (
            <Link className="hover:text-green-200 transition" to="/admin/dashboard">
              Admin
            </Link>
          )}

          {isUserLogin ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-white text-green-700 font-semibold hover:scale-105 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="hover:text-green-200 transition" to="/signup">Signup</Link>
              <Link className="hover:text-green-200 transition" to="/login">Login</Link>
            </>
          )}
        </nav>

        {/* Mobile Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? (
            <CloseIcon className="!text-3xl" />
          ) : (
            <DensityMediumIcon className="!text-3xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full left-0 bg-[var(--primary)] transition-all duration-300 ${
          menuOpen ? "top-16 opacity-100" : "-top-[500px] opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-5 text-lg">

          {/* User */}
          <div className="flex flex-col items-center text-center">
            {userDetails?.userProfileImage ? (
              <img
                src={userDetails.userProfileImage}
                className="w-20 h-20 rounded-full border-2 border-white"
                alt="user"
              />
            ) : (
              <AccountCircleIcon className="!text-7xl" />
            )}

            <h2 className="mt-2 font-bold">{userDetails?.userName}</h2>
            <p className="text-sm text-white/70">{userDetails?.email}</p>

            {userDetails?.userProfileImage && (
              <button
                onClick={editUserAvatar}
                className="mt-3 px-4 py-1 bg-green-500 rounded-lg text-sm"
              >
                {isLoading ? "Updating..." : "Edit Avatar"}
              </button>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 text-center">

            <Link onClick={toggleMenu} to="/">Home</Link>
            <Link onClick={toggleMenu} to="/mcqs">MCQs</Link>
            <Link onClick={toggleMenu} to="/points">Points</Link>

            {userDetails?.isAdmin && (
              <Link onClick={toggleMenu} to="/admin/dashboard">Admin</Link>
            )}

            {isUserLogin ? (
              <button onClick={logout} className="text-red-200">
                Logout
              </button>
            ) : (
              <>
                <Link onClick={toggleMenu} to="/signup">Signup</Link>
                <Link onClick={toggleMenu} to="/login">Login</Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;