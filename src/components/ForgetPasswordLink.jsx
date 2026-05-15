import React, { useContext, useState } from "react";
import Input from "./Input";
import axios from "axios";
import UserContext from "../Store/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgetPasswordLink() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { User_Api } = useContext(UserContext);

  const sendForgetPasswordLink = async () => {
    if (!email) {
      return toast.error("Please enter your email");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${User_Api}/forgetPasswordLink`,
        { email }
      );

      toast.success(res.data.message || "Email sent successfully");

      setEmail("");

      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to send email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
            Forgot Password
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Enter your registered email and we’ll send you a reset link
          </p>
        </div>

        {/* Email Input */}
        <div>
          <Input
            mainDivClassName={"w-full"}
            type={"email"}
            name={"email"}
            inputValue={email}
            placeholder={"Enter your email"}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">

          <button
            onClick={() => navigate(-1)}
            className="w-1/2 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Back
          </button>

          <button
            onClick={sendForgetPasswordLink}
            disabled={loading}
            className={`w-1/2 py-3 rounded-xl font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Sending..." : "Send Link"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ForgetPasswordLink;