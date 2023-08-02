import React, { useState } from 'react'

const CandidateSettings = () => {
    const [newPassword,setPassword]=useState<{current:string,new:string,confirm:string}>()

  return (
    <div className='md:pe-10 px-2 font-exo'>
     <div className='border border-primary-200  rounded shadow px-8 py-6 mt-20'>
        <div className=''>
            <h1 className='text-xl'>Change Your Password </h1>
        </div>
        <form className='md:grid grid-cols-2 gap-2'>
            <div>
                <p>Current Password</p>
                <input type="text" name='current' className='w-full p-2 rounded border border-primary-300 outline-primary-700' required/>
            </div>
            <div>
                <p>New Password</p>
                <input type="text" name='new' className='w-full p-2 rounded border border-primary-300 outline-primary-700' required/>
            </div>
            <div>
                <p>Confirm Password</p>
                <input type="text" name='confirm' className='w-full p-2 rounded border border-primary-300 outline-primary-700' required/>
            </div>
            <div className='col-span-2 mt-2'>
                <button className='bg-primary-800 text-white rounded py-2 px-2 shadow'>Update Password</button>
            </div>
        </form>
    </div> 
    </div>
  )
}

export default CandidateSettings
