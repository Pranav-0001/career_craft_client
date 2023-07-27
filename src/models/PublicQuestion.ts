import { User } from "./User"

export type PublicQuestion={
    _id?:string
    title?:string,
    language?:string,
    question?:string,
    addedBy?:User
    code?:string,
    likes?:number,
    likedBy?:string[],
    status?:boolean,
    createdAt?:string,
    answeredBy?:string[]
}

export type PublicAnswer={
    _id?:string
    addedBy?:User
    code?:string,
    likes?:number,
    likedBy?:string[],
    status?:boolean,
    createdAt?:string,
    answer?:string
}