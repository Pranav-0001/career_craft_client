export interface Job {
    _id:string
    title:string;
    category:string;
    qualification:string;
    experience:string;
    deadline:string
    desc:string;
    jobType:string;
    salaryType:string;
    rangeSalary?:string
    fixedSalary?:string
    EmployerId:string
    status:boolean 
    Employer?:any
}