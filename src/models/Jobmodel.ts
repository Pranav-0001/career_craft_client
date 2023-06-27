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
    rangeSalary?:string;
    salaryFrom?:number;
    salaryTo?:number
    fixedSalary?:string
    EmployerId:string
    status:boolean 
    Employer?:any
}

export interface filterTyes {
    domain?:string,
    Type?:string,
    Salary?:string
}