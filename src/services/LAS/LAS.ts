import { PublicQuestion } from "../../models/PublicQuestion";
import { api } from "../axios";

export const uploadQuestion=async(question:PublicQuestion,userId:string)=>{
    const {data}=await api.post('/addpublicquestion',{title:question.title,language:question.language,question:question.question,code:question.code,userId})
}

export const getPublicQuestions=async(page:number,filter?:string)=>{
    const {data}=await api.get(`/getpublicquestions`,{
        params: { page, filter },
      })
    return data
    
}

export const getPublicQue=async(id:string)=>{
    const {data}=await api.get(`/getPublicQuestion/${id}`)
    return data
}

export const postPublicAns=async(qId:string,userId:string,answer:string,code?:string)=>{
    const {data} =await api.post(`/postAnswerPublicQuestion/${qId}`,{userId,answer,code})
    return data
}