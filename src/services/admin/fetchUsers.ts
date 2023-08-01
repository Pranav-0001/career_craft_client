import { api } from "../axios"
import { User } from "../../models/User"

export const fetchNonPrime=async():Promise<User[]>=>{
    const {data}=await api.get("/admin/non-premium-users",{withCredentials:true})
    
    
    return data.users
}

export const fetchPrime= async():Promise<User[]>=>{
    const {data}=await api.get("/admin/premium-users",{withCredentials:true})
    return data.users
}

export const fetchEmp =async():Promise<User[]>=>{
    const {data}=await api.get("/admin/employerlist",{withCredentials:true})
    return data.users
}

export const fetchDashData=async()=>{
    const {data}=await api.get('/admin/getadmindashboard')
    return data
}