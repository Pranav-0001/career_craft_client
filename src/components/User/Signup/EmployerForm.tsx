import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


function EmployerForm() {
  return (
    <div>
      <form action="">
                <div className='flex justify-center font-work'>

                    <div className='border-2 bg-white border-primary-400 md:w-1/2 w-96 md:mx-0 mx-3  pt-5   mt-4 rounded-lg px-5 md:px-10 grid grid-cols-1 gap-2 md:grid-cols-2'>

                        <div className='mt-2 md:mt-4'>
                            <p>First Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text"  />
                            </div>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Last Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text"  />
                            </div>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Username</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text"  />
                            </div>
                        </div>
                        <div className='mt-2 md:mt-4'>
                            <p>Email</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="email" />
                            </div>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Company Name</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text"  />
                            </div>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Location</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="text"  />
                            </div>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Password</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="password"  />
                            </div>
                        </div>
                        <div className='mt-2 md:mt-4 '>
                            <p>Confirm Password</p>
                            <div className='flex justify-center '>
                                <input className=' signupFormInput' type="password"  />
                            </div>
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
                    </div>

                </div>
            </form>
    </div>
  )
}

export default EmployerForm
