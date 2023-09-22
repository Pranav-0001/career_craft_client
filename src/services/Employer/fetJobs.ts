import { api } from "../axios";

export const getJobs=async(pageNo:number,filterDomain:string|null,filterType:string|null,filterSalary:string|null,sort:string|null)=>{
    try{
        // console.log(`/alljobs?page=${pageNo}&domain=${filterDomain}&type=${filterType}&salary=${filterSalary}&sort=${sort}`);
        
        const { data } = await api.get(`/alljobs?page=${pageNo}&domain=${filterDomain}&type=${filterType}&salary=${filterSalary}&sort=${sort}`, { withCredentials: true })
        return {jobs:data.jobs,pages:data.pagecount}
    }catch(err){

    }
}

export const getDomains=async()=>{
    try{
        const domain=await api.get('/domains',{withCredentials:true})
        return domain.data.domains
    }catch(err){
        console.log(err);
    }
}

export const acceptUserApplication=async(userId:string,empId:string,applicationId:string)=>{
    try {
        const {data}=await api.post('/employer/accept-application',{userId,empId,applicationId})
        return data.update
    } catch (error) {
        
    }
}

export const rejectUserApplication=async(userId:string,empId:string,applicationId:string)=>{
    try {
        const {data}=await api.post('/employer/reject-application',{userId,empId,applicationId})
        return data.update
    } catch (error) {
        
    }
}

export const fetchJobById=async(id:string|undefined)=>{
    try {
        const {data} =await  api.get(`/employer/job/${id}`)
        return data
    } catch (error) {
        
    }
}

export const updateJobTrue=async(id:string)=>{
    try {
        const {data}=await api.put(`/employer/job-true`,{job:id})
        return data
    } catch (error) {
        
    }
}

export const updateJobfalse=async(id:string)=>{
    try {
        const {data}=await api.put(`/employer/job-false`,{job:id})
        return data
    } catch (error) {
        
    }
}