import React, { ChangeEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function CandidateForm() {
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPass,setConfirmPass]=useState(true)
    const [err,setErr]=useState({firstname:'',lastname:'',email:'',username:'',password:''})

    const addEmail=(e:ChangeEvent<HTMLInputElement>)=>{
        emailValidation(e.target.value)
        setEmail(e.target.value)
    }
    
    const addName=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        
        if(name==='firstname'){
             fnamesValidation(value)
             setFirstname(value)
             
        }
        else if(name==='lastname'){
            lnamesValidation(value)
             setLastname(value)
            }
        else if(name==='username'){ 
            unameValidation(value)
            setUsername(value)
        }

    }

    const emailValidation=(value: string)=>{
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

    const fnamesValidation=(value:string)=>{
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
    const lnamesValidation=(value:string)=>{
        const lnameRgx:RegExp=/^[A-Za-z]{4,10}$/
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
    const unameValidation=(value:string)=>{
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
    
    
    
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        const fnameRgx:RegExp=/^[A-Za-z]{3,10}$/
        const lnameRgx:RegExp=/^[A-Za-z]{1,10}$/
        const unameRgx:RegExp=/^[A-Za-z]{3,10}$/
        const emailRgx:RegExp=/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        const passRgx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if(!fnameRgx.test(firstname)){
            setErr({...err,firstname:"Enter a valid Firstname"})
        }
        else if(!lnameRgx.test(lastname)){
            setErr({...err,lastname:"Enter a valid Lastname"})     
        }
        else if(!unameRgx.test(username)){
            setErr({...err,username:"Enter a valid firstname"})
        }
        else if(!emailRgx.test(email)){
            setErr({...err,email:"Enter a valid Email"})
        }
        else if(!passRgx.test(password)){
            setErr({...err,password:"Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."})
        }
        else if(!confirmPass){

        }
        else{
            setErr({firstname:'',lastname:'',email:'',username:'',password:''})
        }
    }

  return (
    <div className='mb-16'>
      <form onSubmit={handleSubmit}>
                <div className='flex justify-center font-work'>

                    <div className='border-2 bg-white border-primary-400 md:w-1/2 w-96 md:mx-0 mx-3  pt-5   mt-4 rounded-lg px-5 md:px-10 grid grid-cols-1 gap-2 md:grid-cols-2'>

                        <div className='mt-2 md:mt-4'>
                            <p>First Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text" name='firstname' onChange={addName}  required/>
                            </div>
                            <p className="text-xs text-red-600">{err.firstname}</p>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Last Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text" name='lastname' onChange={addName} required/>
                            </div>
                            <p className="text-xs text-red-600">{err.lastname}</p>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Username</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text" name='username' onChange={addName}  required/>
                            </div>
                            <p className="text-xs text-red-600">{err.username}</p>
                        </div>
                        <div className='mt-2 md:mt-4'>
                            <p>Email</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="email" name='email' onChange={addEmail} required/>
                            </div>
                            <p className="text-xs text-red-600">{err.email}</p>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Password</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="password" name='password' onChange={(e)=>{setPassword(e.target.value)}}  required/>
                                
                            </div>
                            <p className="text-xs text-red-600">{err.password}</p>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Confirm Password</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="password" onChange={(e)=>setConfirmPass(e.target.value===password)}  required/>
                            </div>
                            {confirmPass?null:<p className='text-red-500 text-xs'>Password do not match</p>}
                        </div>
                        <div className='mt-4 flex justify-center md:col-span-2 rounded-lg'>
                            <button className='bg-black text-white  h-10 w-full md:w-3/4 rounded-md ' type="submit" >Register</button>
                            
                        </div>
                        <div className='text-sm flex md:col-span-2 justify-evenly'>
                            <p>Already have an account ? <span className='cursor-pointer text-primary-1000'>Login </span>here </p>
                        </div>
                        <div className='md:col-span-2 flex justify-center border-2 border-primary-400 mx-8 md:mx-56 rounded-md cursor-pointer mb-4'>
                        <h1> <FontAwesomeIcon icon={faGoogle} className='me-2' />Register with Google </h1>
                        </div>
                    </div>

                </div>
            </form>
    </div>
  )
}

export default CandidateForm
