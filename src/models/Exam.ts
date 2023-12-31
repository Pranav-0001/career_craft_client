import { QuestionTypes } from "./Questions"

export type ExamType={
    _id?:string,
    questions?:QuestionTypes[],
    answer?:[{queId:string,userAns:string,status?:boolean}],
    candidate?:string,
    employer?:string,
    startedAt?:string,
    attended?:boolean
    submitted?:boolean
    date?:string,
    mark?:number,
    createdAt?:string
    
}

export interface resultTypes{
    _id:string,
    answers:{queId:string,userAns:string,status:boolean},
    question:QuestionTypes[]
}
export interface MockresultTypes{
    _id:string,
    answers:{queId:string,userAns:string,status:boolean}[],
    questions:QuestionTypes[]
    mark:number

}