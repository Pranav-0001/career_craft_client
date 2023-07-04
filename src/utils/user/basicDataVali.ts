import { BasicType } from "../../models/User";

export const basicDataValidation=(name:string,val:string,err:BasicType|undefined,setErr:Function)=>{
    if(name==="firstname")  fnameValidation(val,err,setErr)
    if(name==="lastname")  lnameValidation(val,err,setErr)
    
}

const fnameValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    const name:RegExp=/^[A-Za-z]{4,10}$/
    if(val.trim().length===0) setErr({...err,firstname:"Filed Can't be empty"})
    else if(!name.test(val)) setErr({...err,firstname:"Enter a valid Firstname"})
    else  setErr({...err,firstname:""})
}
const lnameValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    const name:RegExp=/^[A-Za-z]{1,10}$/
    if(val.trim().length===0) setErr({...err,lastname:"Filed Can't be empty"})
    else if(!name.test(val)) setErr({...err,lastname:"Enter a valid Firstname"})
    else  setErr({...err,lastname:""})
}