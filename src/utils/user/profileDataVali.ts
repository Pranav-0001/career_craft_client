import { ProfileType } from "../../models/User";

export const profileFormValid=(name:string,val:string,err:ProfileType | undefined,setErr:Function)=>{
    if(name==='father') validateName(name,val,err,setErr)
    if(name==='mother') validateName(name,val,err,setErr)
    if(name==='nationality') validateName(name,val,err,setErr)
    if(name==='permanent') validateAddress(name,val,err,setErr)
    if(name==='present') validateAddress(name,val,err,setErr)

    console.log(name);
    
    
}
const validateName=(name:string,val:string,err:ProfileType|undefined,setErr:Function)=>{
    const nameRgx:RegExp=/^[A-Za-z]{4,10}$/
    if(val.trim().length===0) setErr({...err,[name]:"Field can't be empty"})
    else if(!nameRgx.test(val)) setErr({...err,[name]:`Enter a valid ${name}  ${name!=='nationality'? "'s name":''}`})
    else setErr({...err,[name]:``})
    
}
const validateAddress=(name:string,val:string,err:ProfileType|undefined,setErr:Function)=>{
    if(val.trim().length===0) setErr({...err,[name]:"Field can't be empty"})
    else if(val.trim().length<5) setErr({...err,[name]:`${name} is too short`})
    else setErr({...err,[name]:``})

}
