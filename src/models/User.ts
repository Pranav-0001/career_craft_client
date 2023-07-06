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
    qualification?:string
    objective?:string
    about?:string
}

export interface ProfileType{
    father?:string
    mother?:string
    dob?:string
    nationality?:string
    permanent?:string
    present?:string
    matital?:string
    gender?:string
}

export interface EducationType{
    education?:string
    result?:string
    institute?:string
    starting?:string
    ending?:string
}

export interface ProfessionalType{
    company?:string
    designation?:string
    experience?:string
}

export interface ProjectType{
    title?:string
    desc?:string
}