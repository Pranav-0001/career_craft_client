// import React, { createContext, useContext, useMemo } from "react";
// import { io,Socket } from "socket.io-client";


import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
interface SocketProviderProps {
    children: React.ReactNode;
  }

//   const SocketContext = createContext<any>(null);

//   export const useSocket = () =>{
//     const socket =useContext(SocketContext)
//     return socket
//   }


// export const SocketProvider=(props:SocketProviderProps)=>{
//     const socket = useMemo(() => io(ENDPOINT), []);

//     return (
//         <SocketContext.Provider value={socket}>
//             {props.children}
//         </SocketContext.Provider>
//     )
// }
const ENDPOINT = process.env.REACT_APP_BASE_URL as string
// const ENDPOINT='http://10.4.3.148:5000'

const SocketContext = createContext<any>(null);

export const useSocket = () => {
  const socket = io(ENDPOINT)
  return socket;
};

export const SocketProvider = (props:SocketProviderProps) => {
  const socket = useMemo(() => io(ENDPOINT), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
