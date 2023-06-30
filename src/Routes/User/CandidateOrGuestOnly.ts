import React from 'react'
import { Navigate } from "react-router-dom";
import { verifyAuth } from "../../utils/auth/authUser";
interface UserProtectedProps {
    children: React.ReactElement; // or React.ReactElement
}


const CandidateOrGuest: React.FC<UserProtectedProps>  = ({children}) => {
    const token=localStorage.getItem("user")
    const admin=localStorage.getItem("admin")
    let role= token ?  verifyAuth(token) : false
    if(role==="employer"){
        Navigate({to:"/employer"}) 
        return null
    }else if(admin){
        Navigate({to:"/admin"}) 
        return null
    }
    else{
        return children
    } 
}

export default CandidateOrGuest
