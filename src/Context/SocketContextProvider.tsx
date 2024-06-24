'use client'

import React, { useEffect, useState } from 'react'
import { SocketContext } from './SocketContext';

const SocketContextProvider = ({ children }: Readonly<{children: React.ReactNode;}>) =>  { 

    const [Socket,setSocket] = useState("");

    return (
        <SocketContext.Provider value={{Socket,setSocket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;