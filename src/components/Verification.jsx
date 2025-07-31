import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useContext } from "react";
import UserContext from "../Store/UserContext";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verification() {
  const [OTP, setOTP] = useState("");
  const [OTPError, setOTPError] = useState("");
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(59);

  const navigate = useNavigate();

  const { userDetails, User_Api, loginUserToken } = useContext(UserContext);

  const handleEvent = (e) => {
    const OTP_Value = e.target.value;

    if (OTP_Value.length < 5) {
      setOTP(e.target.value);
    }
  };

  const emailVerification = async () => {
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
      
      if(response.status === 200) {
        setOTP("");
        console.log(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("error in email verification function : ", error);
       setOTPError(error.response.data.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          return 59;
        } else {
          return prevSeconds - 1;
        }
      });

      setMinutes((prevMinutes) => {
        if (seconds === 0) {
          if (prevMinutes === 0) {
            clearInterval(interval);
            return 0;
          }
          return prevMinutes - 1;
        }
        return prevMinutes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="bg-green-700 h-[100vh] flex justify-center items-center flex-col px-8 md:px-20">
      <div className="md:h-[50vh] h-[50vh] bg-white rounded-2xl w-[100%] md:w-[50%]">
        <div className=" text-center my-5">
          <h1 className="md:text-3xl font-bold text-xl">Verification OTP</h1>
          <p className="p-5">
            We use verification OTP based through gmail We just send OTP on your
            register email <strong>{userDetails.email}</strong> please enter
            your 4 digit OTP{" "}
          </p>
        </div>
        <div className="md:px-20 px-10">
          <p>
            Remaining Time : {minutes} : {seconds}{" "}
          </p>
        </div>
        <div className="text-center">
          <Input
            type={"number"}
            placeholder={"Enter OTP e.g 0987"}
            inputClassName={"border w-[80%]"}
            inputValue={OTP}
            onChange={handleEvent}
          />
        </div>
        <div className="md:px-20 px-10">
          <p className="text-red-600">{OTPError}</p>
        </div>
        <div className="text-center my-5">
          <button
            onClick={emailVerification}
            className={`bg-green-500 px-8 rounded-md font-bold md:text-xl text-white py-2 cursor-pointer hover:bg-green-300 hover:text-black ${
              OTP.length === 4 ? "opacity-100" : "opacity-0"
            }`}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
