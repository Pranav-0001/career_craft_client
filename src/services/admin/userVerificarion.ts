import { wait } from "@testing-library/user-event/dist/utils";
import { api } from "../axios"


export const verifyEmp=async(empId:string,email:string)=>{
    
    
    const {data}= await api.post('/admin/verify-emp',{empId,email},{withCredentials:true})
    console.log(data.result);
    return data.result

}

export const blockUser=async(userId:string)=>{
    const {data} = await api.put(`/admin/blockuser/${userId}`)
    return data
}

export const unBlockUser=async(userId:string)=>{
    const {data} = await api.put(`/admin/unblockuser/${userId}`)
    return data
}