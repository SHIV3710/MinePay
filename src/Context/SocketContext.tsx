import React, { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';


export const SocketContext = createContext<{
    Socket:any,
    setSocket:(socket:any)=>void,
}>({
    Socket:"",
    setSocket:()=>{}
})