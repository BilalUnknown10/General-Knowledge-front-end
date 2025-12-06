import React, { useState } from "react";
import UserContext from "./UserContext";
import { useEffect } from "react";
import axios from "axios";

function ContextProvider({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [emailVerification, setEmailVerification] = useState(false);

  const Admin_Api = import.meta.env.VITE_ADMIN_API_URI;
  const User_Api = import.meta.env.VITE_USER_API_URI;

  const loginUserToken = localStorage.getItem("GKT");

  const savedTokeInLocalStorage = (token) => {
    localStorage.setItem("GKT", token);
    setIsUserLogin(true);
  };

  // Generate OTP for email verification
  const generateOTP = async () => {
    setEmailVerification(true);
    try {
       await axios.get(`${User_Api}/userVerificationOTP`, {
        headers: {
          Authorization: `Bearer ${loginUserToken}`,
        },
      });

      // console.log(response);
    } catch (error) {
      console.log("error in email verification function : ", error);
    } finally {
      setEmailVerification(false)
    }
  };

  const refreshUserDetails = async (loginUserToken) => {
        try {
          const response = await axios.get(`${User_Api}/userDetails`, {
            headers: {
              Authorization: `Bearer ${loginUserToken}`,
            },
          });

          if (response.status === 200) {
            setUserDetails(response.data);
          }
        } catch (error) {
          console.log(
            "error in userDetails function in context provider file",
            error
          );
        }
      };

useEffect(() => {
  const token = localStorage.getItem("GKT");

  if (token) {
    setIsUserLogin(true);

    const userDetail = async (token) => {
      try {
        const response = await axios.get(`${User_Api}/userDetails`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.log("error in userDetails function in context provider file", error);
      }
    };

    userDetail(token);
  }
}, [isUserLogin, User_Api]);


  return (
    <UserContext.Provider
      value={{
        mobileMenu,
        setMobileMenu,
        User_Api,
        Admin_Api,
        savedTokeInLocalStorage,
        isUserLogin,
        setIsUserLogin,
        userDetails,
        setUserDetails,
        loginUserToken,
        generateOTP,
        refreshUserDetails,
        emailVerification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default ContextProvider;
