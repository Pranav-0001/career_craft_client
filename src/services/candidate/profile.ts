
import axios from "axios"
import { api } from "../axios"



export const handleImgUrl=async(img:File)=>{
    try {
         const imageData= new FormData()
         imageData.append('file',img)
         imageData.append("upload_preset","career_craft")
         imageData.append("cloud_name","pranav123")
         const {data}=await axios.post(`https://api.cloudinary.com/v1_1/pranav123/image/upload`,imageData)

         const url:string=data.url
         
         
         return url
         
         
         
        
    } catch (error) {
        
    }
}

export const updateBasicInfo=(firstname:string,lastname:string,phone:string,qualification:string,objective:string,about:string,imageURL:string,user:string)=>{

    api.post(`/basic-update/${user}`,{firstname,lastname,phone,qualification,objective,about,imageURL},{withCredentials:true})
}