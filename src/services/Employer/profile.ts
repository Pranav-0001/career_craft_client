import { socialType } from "../../models/User";
import { api } from "../axios";

export const updateEmployer=async(empId:string,image:string,firstname:string,lastname:string,username:string,company:string,location:string,social?:socialType)=>{
    try {
        const {data}=await api.put('/updateEmployer',{EmpId:empId,image,firstname,lastname,username,company,location,facebook:social?.facebook,instagram:social?.instagram,linkedIn:social?.linkedIn})
        return data
    } catch (error) {
        
    }
}
