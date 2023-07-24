import React, { ChangeEvent, useState } from 'react'

import { api } from '../../../services/axios';
import { emailValidation, fnamesValidation, lnamesValidation, passValidation, unameValidation } from '../../../utils/user/signupVali';
import { useNavigate } from 'react-router-dom';
import {CredentialResponse, GoogleLogin} from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/user/userSlice';
import { AxiosError } from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CandidateForm() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePass, setRepass] = useState('')
    const [err, setErr] = useState({ firstname: '', lastname: '', email: '', username: '', password: '', cnf: '',otp:'' })
    const [otp, setOTP] = useState<number|string|null>(null)
    const [userOTP,setUserOTP]=useState<number|string|null>(null)

    const addEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        emailValidation(value, err, setErr)
        setEmail(e.target.value)
    }
    const addName = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === 'firstname') {
            fnamesValidation(value, err, setErr)
            setFirstname(value)

        }
        else if (name === 'lastname') {
            lnamesValidation(value, err, setErr)
            setLastname(value)
        }
        else if (name === 'username') {
            unameValidation(value, err, setErr)
            setUsername(value)
        }

    }
    const addPass = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        passValidation(value, err, setErr, rePass)
        setPassword(value)
    }
    const checkPass = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setRepass(value)
        if (value !== password) {
            setErr({ ...err, cnf: 'Password do not match' })
        } else {
            setErr({ ...err, cnf: '' })

        }
    }


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (firstname && lastname && username && email && password) {
            if (err.cnf === '' && err.email === '' && err.firstname === '' && err.lastname === '' && err.password === '' && err.username === '') {
              try{
                const { data } = await api.post('/generate-otp', { email }, { withCredentials: true })
                setOTP(data)
              }catch(err){
                console.log(err);
              }
            }
        }
    }
    const verifyOTP: React.FormEventHandler<HTMLFormElement>=async(e)=>{
        e.preventDefault()
        
        if(otp?.toString()===userOTP){
            try{
                 const {data}= await api.post('/register',{firstname,lastname,username,email,password},{withCredentials:true})
            if(data.user){
            setErr({...err,otp:''})
            if(data?.user?.role==='candidate'){
                const {accessToken,user}=data
                localStorage.setItem('user',accessToken)
                dispatch(updateUser({userId:user._id,username:user.username,image:user.profileImg,userEmail:user.email,isPrime:false}))
                navigate('/')
            }
                // navigate('/')
            }else{
                navigate('/register')
            }
            }catch(Err){

                console.log(Err);
                setOTP(null)
                setErr({...err,email:'Email Already registered .'})
                
            }
           
        }else{
            setErr({...err,otp:'Inavlid OTP. Try again'})
            
        }

    }
    const gSignup=async(res:CredentialResponse)=>{
        
        const result:any=jwtDecode(res.credential as string)
        const user={
            firstname:result.name.split(' ')[0],
            lastname:result.name.split(' ')[1],
            username:result.email.split('@')[0],
            email:result.email,
            password:'123Google@@',
            profileImg:result.picture,
            isGoogle:true
        }
        try{
         const {data} = await api.post('/register',{...user},{withCredentials:true})
        if(data?.user?.role==='candidate'){
            const {accessToken,user}=data
            localStorage.setItem('user',accessToken)
            dispatch(updateUser({userId:user._id,username:user.username,image:user.profileImg,userEmail:user.email}))
            navigate('/')
        }
      
        }catch(err:any){
            console.log(err.response.data.message);
            toast.error(err.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
        }
        
    }




    return (
        <div className='mb-16'>
            {otp ?

                <form onSubmit={verifyOTP}>
                    <div className='flex justify-center font-work md:mt-8' >
                        <div className='border-2 bg-white border-primary-400 md:w-1/4 w-96 md:mx-0 mx-3  pt-5   mt-4 rounded-lg px-5 md:px-10 grid grid-cols-1 gap-2 md:grid-cols-1'>
                            <div>
                                <h1 className='font-bold  text-xl text-primary-1000'>Verify your Email</h1>
                                <p className='text-xs'>An OTP has been sent to your email.</p>
                            </div>
                            <div className='mt-2 md:mt-4 mb-1'>
                                <p>Enter OTP</p>
                                <div className='flex justify-center '>
                                    <input className='signupFormInput' type="number" name='otp' required onChange={(e)=>setUserOTP(e.target.value)}/>
                                </div>
                                <p className="text-xs text-red-600 pt-1">{err.otp}</p> 
                                <div className='flex justify-center mb-5'>
                                    <button type='submit' className='py-2 px-6 rounded-md mt-4 bg-primary-700 text-white'>Verify</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </form>
                :
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-center font-work'>

                        <div className='border-2 bg-white border-primary-400 md:w-1/2 w-96 md:mx-0 mx-3  pt-5   mt-4 rounded-lg px-5 md:px-10 grid grid-cols-1 gap-2 md:grid-cols-2'>

                            <div className='mt-2 md:mt-4'>
                                <p>First Name</p>
                                <div className='flex justify-center '>
                                    <input className=' signupFormInput' type="text" name='firstname' onChange={addName} required />
                                </div>
                                <p className="text-xs text-red-600">{err.firstname}</p>
                            </div>
                            <div className='mt-2 md:mt-4 '>
                                <p>Last Name</p>
                                <div className='flex justify-center '>
                                    <input className=' signupFormInput' type="text" name='lastname' onChange={addName} required />
                                </div>
                                <p className="text-xs text-red-600">{err.lastname}</p>
                            </div>
                            <div className='mt-2 md:mt-4 '>
                                <p>Username</p>
                                <div className='flex justify-center '>
                                    <input className=' signupFormInput' type="text" name='username' onChange={addName} required />
                                </div>
                                <p className="text-xs text-red-600">{err.username}</p>
                            </div>
                            <div className='mt-2 md:mt-4'>
                                <p>Email</p>
                                <div className='flex justify-center '>
                                    <input className=' signupFormInput' type="text" name='email' onChange={addEmail} required />
                                </div>
                                <p className="text-xs text-red-600">{err.email}</p>
                            </div>
                            <div className='mt-2 md:mt-4 '>
                                <p>Password</p>
                                <div className='flex justify-center '>
                                    <input className=' signupFormInput' type="password" name='password' onChange={addPass} required />

                                </div>
                                <p className="text-xs text-red-600">{err.password}</p>
                            </div>
                            <div className='mt-2 md:mt-4 '>
                                <p>Confirm Password</p>
                                <div className='flex justify-center '>
                                    <input className=' signupFormInput' type="password" onChange={checkPass} required />
                                </div>
                                <p className='text-red-500 text-xs'>{err.cnf}</p>
                            </div>
                            <div className='mt-4 flex justify-center md:col-span-2 rounded-lg'>
                                <button className='bg-black text-white  h-10 w-full md:w-3/4 rounded-md ' type="submit" >Register</button>

                            </div>
                            <div className='text-sm flex md:col-span-2 justify-evenly'>
                                <p>Already have an account ? <span className='cursor-pointer text-primary-1000'>Login </span>here </p>
                            </div>
                            <div className='md:col-span-2 flex justify-center  mx-8 md:mx-56 rounded-md cursor-pointer mb-4'>
                                
                            <GoogleLogin size='medium'  onSuccess={credentialResponse => {gSignup(credentialResponse);}} onError={() => { console.log('Login Failed'); }}/>
                                
                                {/* <h1> <FontAwesomeIcon icon={faGoogle} className='me-2' />Register with Google </h1> */}
                            </div>
                        </div>

                    </div>
                </form>
            }
            <ToastContainer/>
        </div>
    )
}

export default CandidateForm
