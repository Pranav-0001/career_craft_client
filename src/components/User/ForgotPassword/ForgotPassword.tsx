import React from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate=useNavigate()
  return (
    <div className='fixed h-screen w-full 0 flex justify-center  bg-white px-4 md:px-10 font-exo'>
      <div className='mt-20 w-full md:w-2/3 lg:w-1/3 border rounded shadow py-6 h-fit'>
        <div className='flex justify-center'>
          <h1 className='text-3xl'>Password Succesfully updated!!</h1>
        </div>
        <div className='flex justify-center mt-4'>
          <button onClick={()=>navigate('/login')} className='text-lg bg-primary-700 px-6 py-1 text-white rounded shadow'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
