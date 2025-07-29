import React, { useState } from "react";
import UserContext from "./UserContext";
import { useEffect } from "react";

function ContextProvider({ children }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const User_Api = import.meta.env.VITE_USER_API_URI;
  const Admin_Api = import.meta.env.VITE_ADMIN_API_URI;

  const savedTokeInLocalStorage = (token) => {
    localStorage.setItem("GKT", token);
    setIsUserLogin(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("GKT");

    if (token) {
      setIsUserLogin(true);
    }
  }, [isUserLogin]);

  return (
    <UserContext.Provider
      value={{
        mobileMenu,
        setMobileMenu,
        User_Api,
        Admin_Api,
        savedTokeInLocalStorage,
        isUserLogin,
        setIsUserLogin
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default ContextProvider;
