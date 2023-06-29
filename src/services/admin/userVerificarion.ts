import { api } from "../axios"


export const verifyEmp=async(empId:string,email:string)=>{
    
    
    const {data}= await api.post('/admin/verify-emp',{empId,email},{withCredentials:true})
    console.log(data.result);
    return data.result

}