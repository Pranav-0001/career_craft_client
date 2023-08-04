import { api } from "../axios";

export const fetchAllCandidates=async(page:number)=>{
    const {data}=await api.get(`/employer/candidates/${page}`)
    return data
}