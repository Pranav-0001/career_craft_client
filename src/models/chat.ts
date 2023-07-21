import { Interface } from "readline";
import { User } from "./User";
import { ExamType } from "./Exam";

export interface Chats{
    _id:string,
    chatName:string,
    users:User[],
    latestMessage:latest
}

export interface latest{
    chat:string,
    content:string
}

export interface Message{
    _id:string
    sender:sender,
    content:string,
    chat:Chats
    createdAt:string,
    isExam?:boolean,
    Exam?:ExamType,
    isVideo:boolean
}

export interface sender{
    _id:string,
    username:string,
    firstname:string,
    lastname:string,
    profileImg:string

}
