import React,{ChangeEvent, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { empValidate } from '../../../utils/employer/signupValidation';
import { api } from '../../../services/axios';
import { useNavigate } from 'react-router-dom';


function EmployerForm() {
    const navigate=useNavigate()
    const [employer,setEmployer]=useState({firstname:'',lastname:'',username:'',email:'',company:'',location:'',password:'',cnf:''}) 
    const [err,setErr]=useState({firstname:'',lastname:'',username:'',email:'',company:'',location:'',password:'',cnf:'',otp:''}) 
    const [otp,setOTP]=useState<number|string|null>(null)
    const [userOTP,setUserOtp]=useState<number|string|null>(null)
    const addEmpData=(e: ChangeEvent<HTMLInputElement>)=>{
        setEmployer({...employer,[e.target.name]:e.target.value})
        const {name,value}=e.target
        empValidate(name,value,err,setErr,employer.password,employer.cnf)
    }
  

    const EmpSignUp:React.FormEventHandler<HTMLFormElement>=async(e)=>{
        e.preventDefault()
        const {firstname,lastname,username,email,company,location,password,cnf}=employer
        if(firstname!=='' && lastname!==''&&username!==''&&email!==''&&company!==''&&location!==''&&password!==''&&cnf!==''){
        const {firstname,lastname,username,email,company,location,password,cnf}=err
            if(firstname==='' && lastname===''&&username===''&&email===''&&company===''&&location===''&&password===''&&cnf===''){
                const {email}=employer
                console.log("done");
                const {data}=await api.post("/employer/generate-otp",{email},{withCredentials:true})
                console.log(data);
                setOTP(data)
                
            }
        }
    }

    const verify:React.FormEventHandler<HTMLFormElement>=async(e)=>{
        e.preventDefault()

        if(otp?.toString()===userOTP){
            setErr({...err,otp:''})
            api.post("/employer/register",{...employer},{withCredentials:true})
            navigate('/')

        }else{
            setErr({...err,otp:'Invalid OTP. Try again .'})
        }

    }

    
  return (
    <div>
      
                <div className='flex justify-center font-work'>
                    {otp?
                    <form onSubmit={verify} className='border-2 mb-8 bg-white border-primary-400 md:w-1/4 w-96 md:mx-0 mx-3  pt-5   mt-4 rounded-lg px-5 md:px-10 grid grid-cols-1 gap-2 md:grid-cols-1'>
                        <div>
                        <h1 className='font-bold  text-xl text-primary-1000'>Verify your Email</h1>
                        </div>

                        <div className='mt-2 md:mt-4'>
                            <p>Enter OTP</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="number" name='otp' onChange={(e)=>setUserOtp(e.target.value)}  />
                            </div>
                        </div>
                        <p className="text-xs text-red-600 pt-1">{err.otp}</p> 
                                <div className='flex justify-center mb-5'>
                                    <button type='submit' className='py-2 px-6 rounded-md mt-4 bg-primary-700 text-white'>Verify</button>
                                </div>

                    </form>
                    :
                    <form onSubmit={EmpSignUp} className='border-2 mb-8 bg-white border-primary-400 md:w-1/2 w-96 md:mx-0 mx-3  pt-5   mt-4 rounded-lg px-5 md:px-10 grid grid-cols-1 gap-2 md:grid-cols-2'>

                        <div className='mt-2 md:mt-4'>
                            <p>First Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text" name='firstname' onChange={addEmpData}  />
                            </div>
                            <p className='text-red-600 text-xs '>{err.firstname}</p>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Last Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text" name='lastname' onChange={addEmpData} />
                            </div>
                            <p className='text-red-600 text-xs '>{err.lastname}</p>
                            
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Username</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text"  name='username' onChange={addEmpData} />
                            </div>
                            <p className='text-red-600 text-xs '>{err.username}</p>

                        </div>
                        <div className='mt-2 md:mt-4'>
                            <p>Email</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="email" name='email' onChange={addEmpData}/>
                            </div>
                            <p className='text-red-600 text-xs '>{err.email}</p>

                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Company Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text" name='company' onChange={addEmpData}/>
                            </div>
                            <p className='text-red-600 text-xs '>{err.company}</p>

                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Location</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text" name='location' onChange={addEmpData}/>
                            </div>
                            <p className='text-red-600 text-xs '>{err.location}</p>

                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Password</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="password" name='password' onChange={addEmpData} />
                            </div>
                            <p className='text-red-600 text-xs '>{err.password}</p>

                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Confirm Password</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' name='cnf' type="password" onChange={addEmpData} />
                            </div>
                            <p className='text-red-600 text-xs '>{err.cnf}</p>

                        </div>
                        <div className='mt-4 flex justify-center md:col-span-2 rounded-lg'>
                            <button className='bg-black text-white  h-10 w-full md:w-3/4 rounded-md' type="submit">Register</button>
                            
                        </div>
                        <div className='text-sm flex md:col-span-2 justify-evenly'>
                            <p>Already have an account ? <span className='cursor-pointer text-primary-1000'>Login </span>here </p>
                        </div>
                        <div className='md:col-span-2 flex justify-center border-2 border-primary-400 mx-8 md:mx-56 rounded-md cursor-pointer mb-4'>
                        <h1> <FontAwesomeIcon icon={faGoogle} className='me-2' />Register with Google </h1>
                        </div>
                    </form>
                    }

                </div>
            
    </div>
  )
}

export default EmployerForm
