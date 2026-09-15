"use client"

import React from 'react'
import { useContext, createContext, useState } from "react";

const EveryWhere = createContext()

export const EveryProvider = ({children}) => {

  const [openSidebar, setOpenSidebar] = useState(true)
    
  return (
    <EveryWhere.Provider value={{openSidebar, setOpenSidebar}}>
        {children}
    </EveryWhere.Provider>
  )
}

export const useEveryWhere = () => useContext(EveryWhere)