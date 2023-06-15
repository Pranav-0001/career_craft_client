import React from 'react'
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
    return (
        <main>
            <div className='flex justify-center align-middle md:mt-4'>
                <div className='w-96 mx-3 md:mx-0   border mt-14 rounded-md backdrop-blur-0 shadow-sm shadow-primary-400 bg-white'  >
                    <div className='flex justify-center border-b-2 border-gray-200 mx-24 mt-1 pb-4'>
                        <h1 className='font-exo text-2xl md:text-3xl '>Login Here</h1>
                    </div>
                    <div className='font-work '>
                        <form action="">
                        <h1 className='ps-6 text-md mt-6 '>Email</h1>
                        <div className='mx-auto flex justify-center mb-3'>

                            <input type="text" className='login-textbox ' />
                        </div>
                        <h1 className='ps-6 text-md '>Password</h1>
                        <div className='mx-auto flex justify-center'>

                            <input type="password" className='login-textbox' />
                        </div>
                       <div className='mt-2 mb-3'>
                         <h6 className='underline text-md  relative ms-8 mb-2  me-8 cursor-pointer mt-1 text-primary-700'>Forgot password?</h6>
                       </div>
                            <div className='flex justify-center mb-3'>
                                <button type="submit" className='bg-black text-white w-80 rounded-md h-9'>Log In</button>
                            </div>     
                            <div className='flex justify-center mt-2 border border-primary-400  mx-16 rounded-md mb-4 cursor-pointer'>
                                <h1> <FontAwesomeIcon icon={faGoogle} className='me-2' />Log in with Google </h1>
                            </div>           
                            <div className='flex justify-center mb-4'>
                                <p>Don't have an account ? <span className='text-primary-900 cursor-pointer'>Sign Up</span></p>
                            </div>
                            </form>
                          
                    </div>

                </div>
            </div>
        </main>

    )
}

export default Login 
