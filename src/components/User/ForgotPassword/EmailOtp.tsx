import React, { useEffect, useState } from 'react'
import { forgotPasswordOTP, forgotPasswordOTPSubmit, updatenewpassword } from '../../../services/candidate/profile'
import { ToastContainer, toast } from 'react-toastify'
import './Forgot.css'
import ForgotPassword from './ForgotPassword'


const EmailOtp = () => {
  const [valid, setValid] = useState<boolean>(false)
  const [loading1, setisLoading1] = useState<boolean>(false)
  const [loading2, setisLoading2] = useState<boolean>(false)
  const [verified, setVerified] = useState<boolean>(false)
  const [email, setemail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [otp, setOtp] = useState<string>()
  const [err, setErr] = useState<string>('')
  const [success,setSuccess]=useState<boolean>(false)


  const getOtp = async () => {
    const emailRgx: RegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

    if (email?.trim().length === 0) {
      toast.error('Enter Email')
    } else if (!emailRgx.test(email)) {
      toast.error('Enter a valid Email address')

    }
    else {
      setisLoading1(true)
      const data = await forgotPasswordOTP(email)
      if (data.error) {
        toast.error(data.error, { position: 'top-center' })
        setisLoading1(false)

      } else if (data.status) {
        setValid(true)
        setisLoading1(false)
      }
    }

  }

  const sendOTP = async () => {
    if (otp && otp.trim().length === 0) toast.error('Enter OTP')
    else if (otp) {
      const data = await forgotPasswordOTPSubmit(email, otp)
      if (data.error) toast.error(data.error)
      else setVerified(true)
    }
  }

  const submitPassword = async () => {
    
    console.log(err.length);
    
    if (password.trim().length > 0 && err?.length===0) {
      
      
      const data = await updatenewpassword(email, password)
      console.log(data);
      
      if(data.status){
        toast.success("Success")
        setSuccess(true)
      }else{
        toast.error(data.error,{position:'top-center'})
      }
    }
  }

  const passwordHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    setPassword(e.target.value)
    if (e.target.value.trim().length === 0) setErr(`Password can't be empty.`)
    else if (!passRgx.test(e.target.value)) setErr('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.')
    else setErr('')
  }


  return (
    <div className='w-full flex justify-center font-exo'>
      <div className='w-96 px-5 mx-3 md:mx-0   border mt-14 rounded-md backdrop-blur-0 shadow-sm shadow-primary-400 bg-white'  >
        <div>
          <h1 className='py-2 text-2xl text-center'>Forgot Password</h1>
        </div>
        {verified ?
          <>
            <div>
              <p>New Password</p>
              <input placeholder='' onChange={passwordHandle} type="text" className='outline-primary-500 border-2 w-80 rounded-md border-primary-200 px-2 h-10' />
              <p className='text-red-600 text-xs'>{err}</p>
            </div>
            <div className='flex justify-center py-2'>
              <button  onClick={submitPassword} className='bg-primary-900 text-white py-2 px-4 rounded shadow'>Update Password</button>
            </div>
          </>
          : <div className=''>
            <div>
              <p>Email</p>
              <input placeholder='' onChange={(e) => setemail(e.target.value)} type="email" className='outline-primary-500 border-2 w-80 rounded-md border-primary-200 px-2 h-10' readOnly={valid} />
            </div>
            {valid ? <div>
              <div>
                <p>OTP</p>
                <input placeholder='' onChange={(e) => setOtp(e.target.value)} type="text" className='outline-primary-500 border-2 w-80 rounded-md border-primary-200 px-2 h-10' />
              </div>
              <div className='flex justify-center my-4'>
                <button onClick={sendOTP} className='bg-primary-900 text-white py-2 px-4 rounded shadow'>Submit</button>

              </div>
            </div> :

              <div className='flex justify-center my-3'>
                {loading1 ?
                  <div className="load-row">
                    <span className='bg-primary-800'></span>
                    <span className='bg-primary-500'></span>
                    <span className='bg-primary-300'></span>
                    <span className='bg-primary-100'></span>
                  </div>
                  : <button onClick={getOtp} className='bg-primary-900 text-white py-2 px-1 rounded shadow'>Send OTP</button>}
              </div>}
          </div>}
      </div>
      {success&&<ForgotPassword/>}
      <ToastContainer />
    </div>
  )
}

export default EmailOtp
