import { api } from "../axios"


export const fetchApplicationByEmp=async(empId:string,page:number)=>{
    const {data}=await api.get(`/employer/getapplicationsbyemp?empId=${empId}&page=${page}`)
    return data
    
}