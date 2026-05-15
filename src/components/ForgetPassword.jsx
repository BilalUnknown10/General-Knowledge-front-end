import React, { useContext, useState } from "react";
import Input from "./Input";
import axios from "axios";
import UserContext from "../Store/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { User_Api } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const updatePassword = async () => {
    if (!password || !CPassword) {
      return toast.error("Please fill all fields");
    }

    if (password !== CPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${User_Api}/forgetPassword/${id}`,
        { password, CPassword }
      );

      toast.success(res.data.message || "Password updated");

      setPassword("");
      setCPassword("");

      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-10 space-y-6">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600">
          Reset Password
        </h1>

        {/* New Password */}
        <div>
          <Input
            mainDivClassName={"w-full"}
            label={"New Password"}
            type={"password"}
            inputValue={password}
            placeholder={"Enter new password"}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <Input
            mainDivClassName={"w-full"}
            label={"Confirm Password"}
            type={"password"}
            inputValue={CPassword}
            placeholder={"Confirm password"}
            onChange={(e) => setCPassword(e.target.value)}
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
            onClick={updatePassword}
            disabled={loading}
            className={`w-1/2 py-3 rounded-xl font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ForgetPassword;