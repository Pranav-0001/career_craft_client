export const emailValidation=(value: string ,err:object,setErr:Function)=>{
    const emailRgx:RegExp=/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
   
    
    if((value.trim()).length===0){
       
        
        setErr({...err,email:`Email field can't be empty`})
    }
    else if(!emailRgx.test(value)){
        setErr({...err,email:'Enter a valid email'})
    }
    else{
        setErr({...err,email:''})
    }

}
export const fnamesValidation=(value:string,err:object,setErr:Function)=>{
    const fnameRgx:RegExp=/^[A-Za-z]{4,10}$/
    if((value.trim()).length===0){
        setErr({...err,firstname:`Firstname field can't be empty`})
    }
    else if(!fnameRgx.test(value)){
        setErr({...err,firstname:'Enter a valid Firstname'})
    }
    else{
        setErr({...err,firstname:''})
    }
}

export const lnamesValidation=(value:string,err:object,setErr:Function)=>{
    const lnameRgx:RegExp=/^[A-Za-z]{1,10}$/
    if((value.trim()).length===0){
        setErr({...err,lastname:`Lastname field can't be empty`})
    }
    else if(!lnameRgx.test(value)){
        setErr({...err,lastname:'Enter a valid Lastname'})
    }
    else{
        setErr({...err,lastname:''})
    }
}
export const unameValidation=(value:string,err:object,setErr:Function)=>{
    const lnameRgx:RegExp=/^[A-Za-z]{4,10}$/
    if((value.trim()).length===0){
        setErr({...err,username:`Username field can't be empty`})
    }
    else if(!lnameRgx.test(value)){
        setErr({...err,username:'Enter a valid Username'})
    }
    else{
        setErr({...err,username:''})
    }
}
export const passValidation=(value:string,err:object,setErr:Function,rePass:string)=>{
    const passRgx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
    if(value.trim().length===0){
        if(value!==rePass){
            setErr({...err,password:`Password filed can't be empty`,cnf:'Password do not match'})
        }else{
            setErr({...err,password:`Password filed can't be empty`,cnf:''})

        }
    }
    else if(!passRgx.test(value)){
        if(value!==rePass){
        setErr({...err,password:`Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.`,cnf:'Password do not match'})

        }else{
        setErr({...err,password:`Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.`,cnf:''})

        }
    }else{
        if(value!==rePass){
             setErr({...err,password:'',cnf:'Password do not match'})
        }else{
            setErr({...err,password:'',cnf:''})
        }
    }
}