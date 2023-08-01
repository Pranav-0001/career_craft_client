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

export const getMyAnswer=async(qId:string,userId:string)=>{
    const {data} = await api.get(`/getmyAnswer/${qId}`,{params:{userId}})
    return data
}

export const EditMyPublicAns=async(ansId:string,answer:string,code?:string)=>{
    console.log({ansId,answer,code});
    
    const {data}=await api.put(`/editmyanswer`,{ansId,answer,code})

    return data
}

export const getAnswers=async (ansId:string)=>{
    const {data}=await api.get(`/getanswers/${ansId}`)
    return data
}

export const likeAnswerById=async(ansId:string,userId:string)=>{
    const {data}=await api.put(`/likeanswer`,{ansId,userId})
    return data
    
}

export const unlikeAnswerById=async(ansId:string,userId:string)=>{
    const {data}=await api.put(`/unlikeanswer`,{ansId,userId})
    return data
    
}

export const likeQuestionById=async(qId:string,userId:string)=>{
    try {
        console.log({qId,userId});
        
        const {data}=await api.put(`/likequestion`,{qId,userId})
        return data
    } catch (error) {
        console.log(error);
        
    }
}

export const UnlikeQuestionById=async(qId:string,userId:string)=>{
    try {
        const {data}=await api.put(`/unlikequestion`,{qId,userId})
        return data
    } catch (error) {
        
    }
}


export const getMyPublicQuestions=async(user:string)=>{
    try {
        const {data}=await api.get(`getmypublicquestion/${user}`)
        return data
    } catch (error) {
        
    }
}

export const getMyPublicAnswers=async(user:string)=>{
    try {
        const {data}=await api.get(`getmypublicanswer/${user}`)
        return data
    } catch (error) {
        
    }
}
 export const updatepublicquestion=async(qId:string,title:string,language:string,question:string,code?:string)=>{
    try {
        const data=await api.put('/updatepublicquestion',{qId,title,language,question,code})
        return data
    } catch (error) {
        
    }
 }