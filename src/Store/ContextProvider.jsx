import React, { useState } from 'react'
import UserContext from './UserContext'

function ContextProvider({children}) {
    const [mobileMenu, setMobileMenu] = useState(false);
    const User_Api = import.meta.env.VITE_USER_API_URI;
    const Admin_Api = import.meta.env.VITE_ADMIN_API_URI;

  return (
    <UserContext.Provider value={{mobileMenu, setMobileMenu, User_Api, Admin_Api}}>
      {children}
    </UserContext.Provider>
  )
}

export default ContextProvider
