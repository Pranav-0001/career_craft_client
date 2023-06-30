import { api } from "../axios"

type admin={
    email:string
    password:string
    username:string
    admin:{
        _id:string,
        email:string,
        username:string,
        profileImg:string,
        accessToken:string
    }
}


export const adminSignIn=async(email:string,password:string): Promise<admin>  =>{
    const {data} =await  api.post("/admin/login",{email,password},{withCredentials:true})
    localStorage.setItem('admin',data.accessToken)
    return data
}

export const adminSignout=async()=>{
    const {data}=await api.post("/admin/logout",{},{withCredentials:true})
    if(data.signout) localStorage.removeItem('admin')
    return data
}