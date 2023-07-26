import { api } from "../axios";

export const premiumPageData=async(user:string)=>{
    const {data}=await api.get(`/premiumpage/${user}`)
    return data
}