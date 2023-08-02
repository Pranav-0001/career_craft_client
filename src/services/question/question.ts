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