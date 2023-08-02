import { api } from "../axios"


export const generateNewExam=async(candidate:string,empId:string)=>{
   const {data} = await api.post('/employer/create-exam',{candidateId:candidate,empId})
   return data.exam
}


export const fetchExam=async(id:string)=>{
   const {data}=await api.get(`/get-exam/${id}`)
   return data
}

export const fetchResults=async(id:string)=>{
   const {data}=await api.get(`/employer/get-results/${id}`)
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

export const enableQueByAdmin=async(qId?:string)=>{
   const {data}=await api.post('/admin/enable-question',{qId})
   return data
}

export const disableQueByAdmin=async(qId?:string)=>{
   const {data}=await api.post('/admin/disable-question',{qId})
   return data
}
export const enableQueByEmp=async(qId?:string)=>{
   const {data}=await api.post('/employer/enable-question',{qId})
   return data
}

export const disableQueByEmp=async(qId?:string)=>{
   const {data}=await api.post('/employer/disable-question',{qId})
   return data
}