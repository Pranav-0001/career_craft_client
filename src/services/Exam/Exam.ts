import { api } from "../axios"

export const fetchExam=async(id:string)=>{
   const {data}=await api.get(`/get-exam/${id}`)
   return data
}
export const setattended=async(id:string)=>{
   const {data}=await api.post(`/setattended`,{exam:id})
   return data
}

export const postAnwer=async(answer:{ queId?: string, userAns?: string }[],id?:string)=>{
   const {data}=await api.post('/submitexam',{answer,exam:id})
   return data
   
}