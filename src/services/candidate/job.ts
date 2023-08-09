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

export const applyJob=async(jobId:string,empId:string,userId:string)=>{
   const {data} = await api.post('/applyjob',{jobId,empId,userId})
   return data
}

export const fetchsavedJobs=async(user:string)=>{
   const {data}=await api.get(`/savejobs?user=${user}`)
   return data.saved
}

export const  fetchUserApplied=async (userId:string)=>{
   const {data}= await api.get(`/user-applied-jobs/${userId}`)
   
   
   return data.jobs
}

export const jobSearch=async (key:string)=>{
  
   
   const {data}=await api.get(`/search/${key}`)
   return data
}