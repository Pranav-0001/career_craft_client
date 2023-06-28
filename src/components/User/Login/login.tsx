import React, { ChangeEvent, useState } from 'react'
import './login.css'
import { api } from '../../../services/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/user/userSlice';
import { updateEmp } from '../../../redux/employer/employerSlice';
import {CredentialResponse, GoogleLogin} from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';


function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [email,setEmail]=useState<string>('')
    const [password,setPass]=useState<string>('')
    const [err,setErr]=useState({email:'',password:''})

    const emailEnter=(e:ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
        if(e.target.value.trim().length===0) setErr({...err,email:`Email field can't be empty.`})
        else setErr({...err,email:``})


    }
    const gLogin=async(res:any)=>{
        const result:any=jwtDecode(res.credential as string)
        const email=result.email
        const password='123Google@@'
        const {data}=await api.post('/login',{email,password},{withCredentials:true})
        if(data?.user?.role==='candidate'){
            const {accessToken,user}=data
            localStorage.setItem('user',accessToken)
            dispatch(updateUser({userId:user._id,username:user.username,image:user.profileImg,userEmail:user.email}))
            
            navigate('/')
        }



    }
    const passEnter=(e:ChangeEvent<HTMLInputElement>)=>{
        setPass(e.target.value)
        if(e.target.value.trim().length===0) setErr({...err,password:`Email field can't be empty.`})
        else setErr({...err,password:``})
    }

    const LoginUser:React.FormEventHandler<HTMLFormElement>=async(e)=>{
        e.preventDefault()
        if(email.trim().length===0) setErr({...err,email:`Email field can't be empty.`})
        else if(password.trim().length===0) setErr({...err,password:`Password field can't be empty.`})
        else {
            const {data}=await api.post('/login',{email,password},{withCredentials:true})
            console.log(data);
            
            if(data?.user?.role==='candidate'){
                const {accessToken,user}=data
                localStorage.setItem('user',accessToken)
                dispatch(updateUser({userId:user._id,username:user.username,image:user.profileImg,userEmail:user.email}))
                
                navigate('/')
            }else if(data?.user?.role==='employer'){
                const {accessToken,user}=data
                localStorage.setItem('user',accessToken)
                dispatch(updateEmp({EmployerId:user._id,EmpUsername:user.username,EmpImage:user.profileImg,EmpEmail:user.email}))
                navigate('/employer')
            }
            else{
                if(data.message==='Invalid Email'){
                    setErr({...err,email:`Invalid Email`})
                }
                else if(data.message==='Invalid password'){
                    setErr({...err,password:`Invalid Password`})
                }else if(data.notVerified){
                    toast.info(data.message,{
                        position:"top-center"
                    })
                }
            }
        }

    }
    return (
        <main>
            <div className='flex justify-center align-middle md:mt-4'>
                <div className='w-96 mx-3 md:mx-0   border mt-14 rounded-md backdrop-blur-0 shadow-sm shadow-primary-400 bg-white'  >
                    <div className='flex justify-center border-b-2 border-gray-200 mx-24 mt-1 pb-4'>
                        <h1 className='font-exo text-2xl md:text-3xl '>Login Here</h1>
                    </div>
                    <div className='font-work '>
                        <form onSubmit={LoginUser}>
                        <h1 className='ps-6 text-md mt-6 '>Email</h1>
                        <div className='mx-auto flex justify-center mb-3'>

                            <input type="text" className='login-textbox ' onChange={emailEnter}/>
                        </div>
                        <p className="text-red-500 text-xs ms-4 md:ms-8">{err.email}</p>
                        <h1 className='ps-6 text-md '>Password</h1>
                        <div className='mx-auto flex justify-center'>

                            <input type="password" className='login-textbox' onChange={passEnter}/>
                        </div>
                        <p className="text-red-500 text-xs ms-4 md:ms-8">{err.password}</p>

                       <div className='mt-2 mb-3'>
                         <h6 className='underline text-md  relative ms-8 mb-2  me-8 cursor-pointer mt-1 text-primary-700'>Forgot password?</h6>
                       </div>
                            <div className='flex justify-center mb-3'>
                                <button type="submit" className='bg-black text-white w-80 rounded-md h-9'>Log In</button>
                            </div>     
                            <div className='flex justify-center mt-2  border-primary-400  mx-16 rounded-md mb-4 cursor-pointer'>
                                {/* <h1> <FontAwesomeIcon icon={faGoogle} className='me-2' />Log in with Google </h1> */}
                            <GoogleLogin size='medium'  onSuccess={credentialResponse => {gLogin(credentialResponse);}} onError={() => { console.log('Login Failed'); }}/>

                            </div>           
                            

                            <div className='flex justify-center mb-4'>
                                <p>Don't have an account ? <span className='text-primary-900 cursor-pointer'>Sign Up</span></p>
                            </div>
                            </form>  
                    </div> 
                </div>
            </div>
            <ToastContainer/>
        </main>

    )
}

export default Login 
