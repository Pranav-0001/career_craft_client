import { QuestionTypes } from "../../models/Questions";
import { api } from "../axios";

export const postQuestion=async(question:QuestionTypes)=>{
    const {data} = await api.post('/employer/add-question',{...question})
    return data.status
}

export const getAllQuestions=async(page:number,empId:string)=>{
    const {data}=await api.get(`/employer/getquestions?page=${page}&empId=${empId}`)
    return data
    
}