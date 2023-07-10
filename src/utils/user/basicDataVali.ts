import { BasicType } from "../../models/User";

export const basicDataValidation=(name:string,val:string,err:BasicType|undefined,setErr:Function)=>{
    if(name==="firstname")  fnameValidation(val,err,setErr)
    if(name==="lastname")  lnameValidation(val,err,setErr)
    if(name==="phone")  phoneValidation(val,err,setErr)
    if(name==="qualification")  QualiValidation(val,err,setErr)
    if(name==="objective") objectiveValidation(val,err,setErr)
    if(name==="about") aboutValidation(val,err,setErr)
    
}

const fnameValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    const name:RegExp=/^[A-Za-z]{4,10}$/
    if(val.trim().length===0) setErr({...err,firstname:"Field Can't be empty"})
    else if(!name.test(val)) setErr({...err,firstname:"Enter a valid Firstname"})
    else  setErr({...err,firstname:""})
}
const lnameValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    const name:RegExp=/^[A-Za-z]{1,10}$/
    if(val.trim().length===0) setErr({...err,lastname:"Field Can't be empty"})
    else if(!name.test(val)) setErr({...err,lastname:"Enter a valid Firstname"})
    else  setErr({...err,lastname:""})
}
const phoneValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    const phone:RegExp=/^\d{10}$/gm
    if(val.trim().length===0) setErr({...err,phone:"Field Can't be empty"})
    else if(!phone.test(val)) setErr({...err,phone:"Enter a valid Phone Number"})
    else  setErr({...err,phone:""})
}
const QualiValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    const name:RegExp=/^[A-Za-z ]{2,16}$/
    if(val.trim().length===0) setErr({...err,qualification:"Field Can't be empty"})
    else if(!name.test(val)) setErr({...err,qualification:"Enter a valid information"})
    else  setErr({...err,qualification:""})
}

const objectiveValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    
    if(val.trim().length===0) setErr({...err,objective:"Field Can't be empty"})
    else if(val.trim().length<20 ) setErr({...err,objective:"Objective is too short"})
    else  setErr({...err,objective:""})
}
const aboutValidation=(val:string,err:BasicType|undefined,setErr:Function)=>{
    
    if(val.trim().length===0) setErr({...err,about:"Field Can't be empty"})
    else if(val.trim().length<3 ) setErr({...err,about:"Domain is too short"})
    else  setErr({...err,about:""})
}