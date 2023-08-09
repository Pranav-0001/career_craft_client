import { api } from "../axios";

export const updatePayment=async(userId:string,orderId:string,status:string,time:string)=>{
    
    const {data}=await api.post(`/add-subscription`,{user:userId,time,orderId,status})
   
    
    
}