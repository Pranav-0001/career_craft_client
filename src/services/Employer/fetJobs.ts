import { api } from "../axios";

export const getJobs=async(pageNo:number,filterDomain:string|null,filterType:string|null,filterSalary:string|null,sort:string|null)=>{
    try{
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