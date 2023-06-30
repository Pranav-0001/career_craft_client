import React from 'react'
import { verifyAuth } from "../../utils/auth/authUser";
import { Navigate } from 'react-router-dom';


interface AdminProtectedProps {
    children: React.ReactElement; // or React.ReactElement
  }

const AdminProtected:React.FC<AdminProtectedProps> = ({children}) => {
    const token=localStorage.getItem('admin')
    const role=token ? verifyAuth(token) : false
   
    if(role==="Admin"){
      return children
    }else{
      Navigate({to:"/admin/login"})
      return null
    }
}

export default AdminProtected
