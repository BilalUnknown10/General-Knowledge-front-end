import React, { useEffect, useState, useContext } from "react";
import Input from "../components/Input";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UserContext from "../Store/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { User_Api, savedTokeInLocalStorage } = useContext(UserContext);

  const togglePassword = () => setVisiblePass(!visiblePass);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const LoginUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${User_Api}/userLogin`, {
        email,
        password,
      });

      const { token, message } = response.data;

      if (response.status === 200) {
        await savedTokeInLocalStorage(token);
        toast.success(message);
        navigate("/");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      setLoginError(error?.response?.data || "Login failed");
      toast.error(error?.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login | Knowledge Hub";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">

        {/* Close */}
        <button
          onClick={() => navigate("/", { replace: true })}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-red-100 transition"
        >
          <ClearIcon className="text-red-500" />
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Login to continue learning
        </p>

        {/* Error */}
        {loginError && (
          <p className="text-red-500 text-center mt-4 text-sm bg-red-50 py-2 rounded-md">
            {loginError}
          </p>
        )}

        {/* Inputs */}
        <div className="mt-8 space-y-4">

          <Input
            label="Email"
            type="email"
            name="email"
            inputValue={email}
            placeholder="example@gmail.com"
            onChange={handleInput}
            disabled={loading}
            inputClassName="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Password */}
          <div className="relative">
            <Input
              label="Password"
              type={visiblePass ? "text" : "password"}
              name="password"
              inputValue={password}
              placeholder="Enter password"
              onChange={handleInput}
              disabled={loading}
              inputClassName="border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div
              onClick={togglePassword}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {visiblePass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={LoginUser}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition-all duration-300
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Links */}
        <div className="text-center mt-5 space-y-2">
          <Link to="/forgetPassword" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>

          <p className="text-gray-500 text-sm">
            Don’t have an account?
          </p>

          <Link to="/signup">
            <button className="w-full mt-2 py-3 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;