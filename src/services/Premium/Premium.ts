import { api } from "../axios";

export const premiumPageData=async(user:string)=>{
    const {data}=await api.get(`/premiumpage/${user}`)
    return data
}

export const subscriptionHist=async(page:number)=>{
   

    const {data}=await api.get(`/admin/subscriptionhistory/${page}`)
    
    return data
}