import { api } from "../axios"

type admin={
    email:string
    password:string
    username:string
    admin:{
        _id:string,
        email:string,
        username:string
    }
}


export const adminSignIn=async(email:string,password:string): Promise<admin>  =>{
    const {data} =await  api.post("/admin/login",{email,password},{withCredentials:true})
    
    return data
}