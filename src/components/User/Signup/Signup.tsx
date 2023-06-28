import React, { useState } from 'react'
import './signup.css'

import CandidateForm from './CandidateForm';
import EmployerForm from './EmployerForm';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate()
    const [employer, SetEmployer] = useState(false)
    const [empSuccess, setempSuccess] = useState(false)
    return (
        <>
        {empSuccess&& <div className={`fixed w-full lg:w-1/2  lg:h-auto px-4 top-36 lg:left-96 z-20`}>
            <div className='w-full h-full  border-2 border-primary-400 rounded-lg bg-white shadow-md '>
                <div className="flex justify-center">
                    <h1 className='font-exo text-xl md:text-2xl lg:text-3xl mt-4 text-primary-900'>CONGRATULATIONS!</h1>
                </div>
                <div className='flex justify-center font-exo'>
                    <p>You have now successfully registered!❤️ </p>
                </div>
                <div className='flex  px-4 md:text-lg md:px-8 lg:px-10 mt-8 font-work'>
                    <p>"Your account is currently under verification. Once verified, you will receive an email notification. Upon receiving the email, you can proceed to log in to your account. Thank you for your patience."</p>
                </div>
                <div className='font-exo mt-8 justify-center flex mb-8'>  
                <button onClick={()=>navigate('/')} className='border-2 px-4 py-2 rounded-md border-primary-800'>Alright</button>
                </div>
            </div>
        </div>}
            <div className={`${empSuccess ? 'blur-sm' : ''}`} >
                <div className={`flex justify-center`}>
                    <h1 className='text-2xl md:text-3xl font-exo mt-8'>Register Account</h1>
                </div>
                <div className='flex justify-center'>
                    <button className={`changeForm ${!employer ? 'fill-select' : ''}`} onClick={() => SetEmployer(false)}>Candidate</button>
                    <button className={`changeForm ${!employer ? '' : 'fill-select'}`} onClick={() => SetEmployer(true)}>Employer</button>
                </div>
                <div className={`${empSuccess?"hidden":""}`}>
                {
                    employer ? <EmployerForm setempSuccess={setempSuccess} /> : <CandidateForm />
                }
                </div>
            </div>
        </>

    )
}

export default Signup
