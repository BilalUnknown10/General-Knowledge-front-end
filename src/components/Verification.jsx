import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../Store/UserContext";
import Input from "./Input";

function Verification() {
  const [OTP, setOTP] = useState("");
  const [OTPError, setOTPError] = useState("");
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(59);
  const [verifyingOTP, setVerifyingOTP] = useState(false);

  const navigate = useNavigate();

  const { userDetails, User_Api, loginUserToken, refreshUserDetails } =
    useContext(UserContext);

  // OTP input (only numbers, max 4 digits)
  const handleEvent = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOTP(value);
    setOTPError("");
  };

  // Verify OTP
  const emailVerification = async () => {
    setVerifyingOTP(true);

    try {
      const response = await axios.post(
        `${User_Api}/userEmailVerification`,
        { OTP },
        {
          headers: {
            Authorization: `Bearer ${loginUserToken}`,
          },
        }
      );

      if (response.status === 200) {
        setOTP("");
        toast.success(response.data.message);

        await refreshUserDetails(loginUserToken);
        navigate("/");
      }
    } catch (error) {
      setOTPError(error?.response?.data?.message || "Verification failed");
    } finally {
      setVerifyingOTP(false);
    }
  };

  // Timer FIXED (no stale state bug)
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          setMinutes((m) => (m > 0 ? m - 1 : 0));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isOtpValid = OTP.length === 4;

  return (
    <div className="bg-[var(--primary)] h-screen flex justify-center items-center px-5">
      <div className="bg-white w-full md:w-1/2 rounded-2xl p-6">

        <h1 className="text-2xl font-bold text-center">
          Email Verification OTP
        </h1>

        <p className="text-center mt-3">
          OTP sent to:{" "}
          <strong>{userDetails?.email}</strong>
        </p>

        <div className="mt-4 text-center font-semibold">
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>

        <div className="mt-6 flex justify-center">
          <Input
            type="text"
            placeholder="Enter 4-digit OTP"
            inputClassName="border w-[80%]"
            inputValue={OTP}
            onChange={handleEvent}
          />
        </div>

        {OTPError && (
          <p className="text-red-500 text-center mt-2">{OTPError}</p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={emailVerification}
            disabled={!isOtpValid || verifyingOTP}
            className={`px-8 py-2 rounded-md font-bold transition-all duration-300 ${
              isOtpValid && !verifyingOTP
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {verifyingOTP ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;