import React, { useContext, useState } from "react";
import Input from "../components/Input";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Store/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    CPassword: "",
  });

  const [visiblePass, setVisiblePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { User_Api, savedTokeInLocalStorage } = useContext(UserContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const signUp = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${User_Api}/userRegistration`, form);

      if (res.status === 201) {
        await savedTokeInLocalStorage(res.data.token);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data || "Signup failed");
      toast.error(err?.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

      <div className="relative w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">

        {/* Close */}
        <Link to="/">
          <ClearIcon className="absolute top-4 right-4 text-red-500 cursor-pointer hover:scale-110 transition" />
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Join the General Knowledge platform
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-600 text-sm p-2 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="mt-6 space-y-4">

          <Input
            label="Name"
            name="userName"
            value={form.userName}
            onChange={handleInput}
            placeholder="Enter your name"
            inputClassName="border rounded-lg w-full p-3 focus:ring-2 focus:ring-green-400"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleInput}
            placeholder="example@gmail.com"
            inputClassName="border rounded-lg w-full p-3 focus:ring-2 focus:ring-green-400"
          />

          {/* Password */}
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={visiblePass ? "text" : "password"}
              value={form.password}
              onChange={handleInput}
              placeholder="Enter password"
              inputClassName="border rounded-lg w-full p-3 focus:ring-2 focus:ring-green-400"
            />

            <div
              onClick={() => setVisiblePass(!visiblePass)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {visiblePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm Password"
              name="CPassword"
              type={visiblePass ? "text" : "password"}
              value={form.CPassword}
              onChange={handleInput}
              placeholder="Confirm password"
              inputClassName="border rounded-lg w-full p-3 focus:ring-2 focus:ring-green-400"
            />

            <div
              onClick={() => setVisiblePass(!visiblePass)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {visiblePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={signUp}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-xl font-semibold text-white transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Switch */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?
        </p>

        <Link to="/login">
          <button className="mt-2 w-full py-3 border border-green-500 text-green-600 rounded-xl hover:bg-green-50 transition">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;