import React from 'react'
import { Navigate } from "react-router-dom";
import { verifyAuth } from "../../utils/auth/authUser";
interface UserProtectedProps {
    children: React.ReactElement; // or React.ReactElement
}


const CandidateProtect: React.FC<UserProtectedProps>  = ({children}) => {
    const token=localStorage.getItem("user")
    let role= token ?  verifyAuth(token) : false
    console.log(role);
    
    if(role==="candidate"){
       return children
    }else{
        Navigate({to:"/"}) 
        return null
        
    } 
}

export default CandidateProtect