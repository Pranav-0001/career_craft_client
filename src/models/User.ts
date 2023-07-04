export interface User{
    _id:string,
    email:string,
    username:string,
    firstname:string,
    lastname:string,
    company:string,
    location:string,
    role:string,
    profileImg:string,
    status:boolean,
    isPrime:boolean
}

export interface BasicType{
    firstname?:string
    lastname?:string
    email?:string
    phone?:string
    qualification?:number
    objective?:string
    about?:string
}