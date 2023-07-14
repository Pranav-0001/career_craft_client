import { Job } from "./Jobmodel";
import { User } from "./User";

export  interface appliedJobsByUser{
    jobId:string,
    empId:string,
    status:string,
    job:Job[],
    employer:User[],
    appliedOn:string
}
export  interface appliedJobsByEmp{
    _id:string
    jobId:string,
    empId:string,
    status:string,
    job:Job[],
    user:User[],
    appliedOn:string
}