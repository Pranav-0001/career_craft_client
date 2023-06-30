import React from 'react'
import { Navigate } from "react-router-dom";
import { verifyAuth } from "../../utils/auth/authUser";
interface EmployerProtectedProps {
    children: React.ReactElement; // or React.ReactElement
}

const ProtectedRoute: React.FC<EmployerProtectedProps> = ({children}) => {
    const token=localStorage.getItem('user')
    if(token && verifyAuth(token)==="employer"){
      Navigate({to:"/"})
      return null
    }
    else if(token && verifyAuth(token)==="employer"){
      Navigate({to:"/employer"})
      return null

    }
    else{
      return children
    }
 
}

export default ProtectedRoute








