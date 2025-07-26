import React, { useState } from 'react'
import UserContext from './UserContext'

function ContextProvider({children}) {
    const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <UserContext.Provider value={{mobileMenu, setMobileMenu}}>
      {children}
    </UserContext.Provider>
  )
}

export default ContextProvider
