
import axios from "axios"
import { api } from "../axios"
import { ProjectType, socialType } from "../../models/User"



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

export const updateBasicInfo=async(firstname:string,lastname:string,phone:string,qualification:string,objective:string,about:string,imageURL:string,user:string)=>{

    const {data}=await api.post(`/basic-update/${user}`,{firstname,lastname,phone,qualification,objective,about,imageURL},{withCredentials:true})
    return data
}

export const updateProfileInfo=async(father:string,mother:string,dob:string,nationality:string,permanent:string,present:string,marital:string,gender:string,skills:string[],projects:ProjectType[],user:string)=>{

    const {data}=await api.post(`/profile-update/${user}`,{father,mother,dob,nationality,permanent,present,marital,gender,skills,projects},{withCredentials:true})
    return data
}

export const updateEducationalInfo=async(education:string,result:string,institute:string,starting:string,ending:string,user:string)=>{
    try {
        const {data}=await api.put(`/education-update/${user}`,{education,result,institute,starting,ending},{withCredentials:true})
        return data
    } catch (error) {
        console.log(error);
        
    }
    
}

export const updateProfessionalInfo=async(company:string,designation:string,experience:string,userId:string)=>{
    try {
        const {data}=await api.put(`/professional-update/${userId}`,{company,designation,experience},{withCredentials:true})
        return data
    } catch (error) {
        
    }
}


export const fetchUserData=async(userId:string)=>{
    try {
        const {data}=await api.get(`/getuserdata/${userId}`,{withCredentials:true})
        
        
        return data.user
    }catch(err){
        
    }
}

export const fetchDashBoard=async(userId:string)=>{
    try {
        const {data}=await api.get(`/dashboard/${userId}`)
        return data
    } catch (error) {
        
    }
}

export const UpdateMyProfile=async(userId:string,userName:string,profileImg:string,social:socialType)=>{
    try {
        
        const {data}=await api.put(`/myprofile`,{userId,userName,profileImg,facebook:social.facebook,instagram:social.instagram,linkedIn:social.linkedIn,gitHub:social.gitHub})
        return data
    }catch(err){

    }
}

export const changePassword=async(userId:string,newPassword:string,password:string)=>{
    try {
        const {data}=await api.put('/changepassword',{password,newPassword,userId})
        return data
    } catch (error) {
        
    }
}

export const changeEmpPassword=async(userId:string,newPassword:string,password:string)=>{
    try {
        const {data}=await api.put('/employer/changepassword',{password,newPassword,userId})
        return data
    } catch (error) {
        
    }
}

export const deactivateAccount=async(userId:string,password:string)=>{
    try {
        const {data}=await api.put('/deactivate',{userId,password})
        return data
    } catch (error) {
        
    }
}

export const userLogout=async(userId:string)=>{
        
    const {data}=await api.post('/logout',{userId},{withCredentials:true})
    
    return data

}

export const forgotPasswordOTP=async(email:string)=>{
    const {data}=await api.post('/forgotpassword',{email})
    return data
}

export const forgotPasswordOTPSubmit=async(email:string,otp:string)=>{
    const {data}=await api.post('/forgotsubmitOtp',{email,otp})
    return data
}

export const updatenewpassword=async(email:string,password:string)=>{
    try {
        
        
        const {data}=await api.post('/updatenewpassword',{email,password})
        return data
    } catch (error) {
        console.log(error);
        
    }
}