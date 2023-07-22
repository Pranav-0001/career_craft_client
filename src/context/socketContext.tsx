import React, { createContext, useContext, useMemo } from "react";
import { io,Socket } from "socket.io-client";



interface SocketProviderProps {
    children: React.ReactNode;
  }

  const SocketContext = createContext<any>(null);

  export const useSocket = () =>{
    const socket =useContext(SocketContext)
    return socket
  }

const ENDPOINT = process.env.REACT_APP_BASE_URL as string
export const SocketProvider=(props:SocketProviderProps)=>{
    const socket = useMemo(() => io(ENDPOINT), []);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}
