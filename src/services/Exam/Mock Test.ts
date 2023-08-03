import { api } from "../axios";

export const generateMockTest=async(candidate:string)=>{
    const {data} = await api.post('/create-exam',{candidateId:candidate})
    return data
 }

 export const fetchMockExam=async(id:string)=>{
    const {data}=await api.get(`/get-Mockexam/${id}`)
    return data
 }

 export const setMockAttended=async(id:string)=>{
    const {data}=await api.post(`/setmockattended`,{exam:id})
    return data
 }

 export const postMockAnwer=async (answer:{ queId?: string, userAns?: string }[],id?:string,userId?:string)=>{
    const {data}=await api.post('/submitmocktest',{answer,exam:id,userId})
   return data
 }

 export const getMockTests=async(userId:string,page:number)=>{
   const {data}= await api.get(`/getallmocktests?userId=${userId}&page=${page}`)
   return data
 }