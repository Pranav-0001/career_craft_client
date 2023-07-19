import { api } from "../axios";

export const fetchAllChats=async(userId:string)=>{
    const {data}=await api.get(`/employer/fetchChats/${userId}`)
    return data.chats
}

export const sendMessage=async(content:string,chatId:string,senderId:string,isExam?:boolean)=>{
    const {data}= await api.post(`/msg/send`,{content,chatId,senderId,isExam})
    return data
}

export const fetchAllMessages=async(chatId:string)=>{
    const {data}= await api.get(`/msg/${chatId}`)
    return data.messages
}