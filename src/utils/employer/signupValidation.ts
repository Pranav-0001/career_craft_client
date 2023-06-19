




export const empValidate=(name:string,value:string,err:Object,setErr:Function,password:string,cpass:string)=>{
    if(name==='firstname') fname(value,err,setErr)
    else if(name==='lastname') lname(value,err,setErr)
    else if(name==='username') uname(value,err,setErr)
    else if(name==='email') email(value,err,setErr)
    else if(name==='company') company(value,err,setErr)
    else if(name==='location') location(value,err,setErr)
    else if(name==='password') pass(value,err,setErr,cpass)
    else if(name==='cnf') confirmPass(value,err,setErr,password)

}

const fname=(value :string,err:Object,setErr:Function)=>{
    const fnameRgx:RegExp=/^[A-Za-z]{4,10}$/
    if(value.trim().length===0){
        setErr({...err,firstname:`Firstname field can't be empty.`})
    }else if(!fnameRgx.test(value)){
        setErr({...err,firstname:`Enter a valid Firstname`})

    }else{
        setErr({...err,firstname:``})

    }

}
const lname=(value :string,err:Object,setErr:Function)=>{
    const lnameRgx:RegExp=/^[A-Za-z]{1,10}$/
    if(value.trim().length===0){
        setErr({...err,lastname:`Lastname field can't be empty.`})
    }else if(!lnameRgx.test(value)){
        setErr({...err,lastname:`Enter a valid Lastname`})

    }else{
        setErr({...err,lastname:``})

    }
}
const uname=(value :string,err:Object,setErr:Function)=>{
    const unameRgx:RegExp=/^[A-Za-z]{4,10}$/
    if(value.trim().length===0){
        setErr({...err,username:`Username field can't be empty.`})
    }else if(!unameRgx.test(value)){
        setErr({...err,username:`Enter a valid Username`})

    }else{
        setErr({...err,username:``})

    }
}
const email=(value :string,err:Object,setErr:Function)=>{
    const emailRgx:RegExp=/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if(value.trim().length===0){
        setErr({...err,email:`Email field can't be empty.`})
    }else if(!emailRgx.test(value)){
        setErr({...err,email:`Enter a valid Email`})
    }else{
        setErr({...err,email:``})
    }
    
}
const company=(value :string,err:Object,setErr:Function)=>{
    const companyRgx:RegExp=/^[A-Za-z]{4,10}$/
    if(value.trim().length===0){
        setErr({...err,company:`Company field can't be empty.`})
    }else if(!companyRgx.test(value)){
        setErr({...err,company:`Enter a valid Company name`})

    }else{
        setErr({...err,company:``})

    }
}
const location=(value :string,err:Object,setErr:Function)=>{
    const locationRgx:RegExp=/^[A-Za-z]{4,10}$/
    if(value.trim().length===0){
        setErr({...err,location:`Location field can't be empty.`})
    }else if(!locationRgx.test(value)){
        setErr({...err,location:`Enter a valid location`})

    }else{
        setErr({...err,location:``})

    }
}
const pass=(value :string,err:Object,setErr:Function,cnf:string)=>{
    const passRgx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(value.trim().length===0){
        if(cnf!==value){
            setErr({...err,password:`Password field can't be empty.`,cnf:'Password do not match'})
        }else{
            setErr({...err,password:`Password field can't be empty.`,cnf:''})

        }
    }else if(!passRgx.test(value)){
        if(cnf!==value){
        setErr({...err,password:`Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.`,cnf:'Password do not match'})
        }
        else{
        setErr({...err,password:`Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.`,cnf:''})
        }

    }else{
        if(cnf!==value){
        setErr({...err,password:``,cnf:'Password do not match'})
        }else{
        setErr({...err,password:``,cnf:''})

        }
    }
    
}

const confirmPass=(value :string,err:Object,setErr:Function,password:string)=>{
    console.log(password);
    
    if(value.trim().length===0){
        setErr({...err,cnf:`Field can't be empty`})

    }else if(value!==password){
        setErr({...err,cnf:'Password do not match'})

    }else{
        setErr({...err,cnf:''})
    }
}