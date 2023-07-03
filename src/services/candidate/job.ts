import { api } from "../axios"

export const getSingleJob=async(id:string)=>{

   const {data}= await api.get(`/job/${id}`)
   console.log(data);
   return data.job
   
    
}

export const  saveJob=async(id:string,user:string)=>{
   const {data}= await api.post(`/bookmarkjob`,{jobId:id,user:user})
   return data
   
}

export const removeSaved=async(id:string,user:string)=>{
   const {data}= await api.post(`/removesaved`,{jobId:id,user:user})
   return data

   
}

export const applyJob=async(id:string,user:string)=>{
   const {data} = await api.post('/applyjob',{jobId:id,user})
   return data
}