import React from "react";
import { Route,useNavigate,Navigate } from "react-router-dom";
import { verifyAuth } from "../../utils/auth/authUser";

interface EmployerProtectedProps {
  children: React.ReactElement; // or React.ReactElement
}

const EmployerProtected: React.FC<EmployerProtectedProps> = ({children}) => {
    const token=localStorage.getItem('user')
    const role=token ? verifyAuth(token) : false
    if(role==="employer"){
      return children
    }else{
      Navigate({to:"/login"})
      return null
    }
}

export default EmployerProtected
