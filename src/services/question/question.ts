import { QuestionTypes } from "../../models/Questions";
import { api } from "../axios";

export const postQuestion=async(question:QuestionTypes)=>{
    if(question.role==='employer'){
        const {data} = await api.post('/employer/add-question',{...question})
        return data.status
    }
    if(question.role==='admin'){
        const {data}=await api.post('/admin/add-question',{...question})
        return data.status
    }
    
}

export const getAllQuestions=async(page:number,empId:string)=>{
    const {data}=await api.get(`/employer/getquestions?page=${page}&empId=${empId}`)
    return data
    
}

export const getAllQuestionsAdmin=async(page:number)=>{
    const {data}=await api.get(`/admin/getallquestions/${page}`)
    return data
}

export const updateQuestionEmp=async(qId:string,question:string,answer:string,option1:string,option2:string,option3:string,difficulty:string,code?:string)=>{
    const {data}=await api.put('/employer/questionedit',{qId,question,answer,option1,option2,option3,difficulty,code})
    return data
}

export const updateQuestionAdmin=async(qId:string,question:string,answer:string,option1:string,option2:string,option3:string,difficulty:string,code?:string)=>{
    const {data}=await api.put('/admin/questionedit',{qId,question,answer,option1,option2,option3,difficulty,code})
    return data
}

export const getQuestionAdmin=async(qId:string)=>{
    try {
       const {data}=await api.get(`/admin/question/${qId}`)
       return data

    } catch (error) {
        
    }
}

export const getQuestionEmp=async(qId:string)=>{
    try {
       const {data}=await api.get(`/employer/question/${qId}`)
       return data

    } catch (error) {
        
    }
}