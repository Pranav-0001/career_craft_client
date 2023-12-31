import { ProfessionalType } from "../../models/User";

export const profValidate=(name:string,val:string,err:ProfessionalType | undefined,setErr:Function)=>{
    if(name==="company") nameValidation(name,val,err,setErr) 
    if(name==="designation") nameValidation(name,val,err,setErr) 
    
    
}

const nameValidation=(name:string,val:string,err:ProfessionalType | undefined,setErr:Function)=>{
    const nameRgx:RegExp=/^[A-Za-z ]{4,10}$/
    if(val.trim().length===0) setErr({...err,[name]:"Field can't be empty"})
    else if(!nameRgx.test(val)) setErr({...err,[name]:`Enter a valid ${name}`})
    else setErr({...err,[name]:``})
}

export const passwordValidation=(val:string)=>{
    const passRgx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(val.trim().length===0) return `Field can't be empty`
    else if(!passRgx.test(val)) return `Password should Contain atleast one Uppercase lowercase number and special character`
    else return ''
}