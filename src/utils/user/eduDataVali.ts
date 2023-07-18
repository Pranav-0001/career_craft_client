import { EducationType } from "../../models/User";

export const educationDataValidation=(name:string,val:string,err:EducationType | undefined,setErr:Function)=>{
 
    if(name==='education') eduValidate(val,err,setErr)
    if(name==='result') resValidate(val,err,setErr)
    if(name==='institute') insValidate(val,err,setErr)
    if(name==='starting') YearValidate(name,val,err,setErr)
    if(name==='ending') YearValidate(name,val,err,setErr)
    
}

const eduValidate=(val:string,err:EducationType| undefined,setErr:Function)=>{
    if(val.trim().length===0) setErr({...err,education:"Field can't be empty."})
    else if(val.trim().length<2) setErr({...err,education:"Enter a valid qualification"})
    else setErr({...err,education:""})
}
const resValidate=(val:string,err:EducationType| undefined,setErr:Function)=>{
    if(val.trim().length===0) setErr({...err,result:"Field can't be empty."})
    else if(parseInt(val.trim())<0 || parseInt(val.trim())>100 ) {
        setErr({...err,result:"Result should be between 0-100"})
    }
    else setErr({...err,result:""})
}
const insValidate=(val:string,err:EducationType| undefined,setErr:Function)=>{
    const nameRgx:RegExp=/^[A-Za-z ]{4,24}$/
    if(val.trim().length===0) setErr({...err,institute:"Field can't be empty."})
    else if(!nameRgx.test(val)) setErr({...err,institute:"Enter a valid qualification"})
    else setErr({...err,institute:""})
}

const YearValidate=(name:string,val:string,err:EducationType| undefined,setErr:Function)=>{
    const value=parseInt(val)
    if(val.trim().length===0) setErr({...err,[name]:`Field can't be empty.`})
    else if(value>2024) setErr({...err,[name]:`${value} is invalid`})
    else if(value<1875) setErr({...err,[name]:`${value} is invalid`})
    else setErr({...err,[name]:``})
}