import { User } from "./User"

export interface applied {
    user:string,
    appliedOn:string,
    status:string
}

export interface jobData{
    _id:string
    title:string
    EmployerId:string
    category:string
    deadline:string
    desc:string
    experience:string
    fixedSalary:number
    jobType:string
    qualification:string
    salaryFrom:number
    salaryTo:number
    salaryType:string
    status:true
    savedBy:string[]
    Employer:User[]
    appliedBy:applied[]

}