import React, { useState } from 'react'
import './signup.css'

import CandidateForm from './CandidateForm';
import EmployerForm from './EmployerForm';

function Signup() {

    const [employer,SetEmployer]=useState(false)
    return (
        <div >
            <div className='flex justify-center'>
                <h1 className='text-2xl md:text-3xl font-exo mt-8'>Register Account</h1>
            </div>
            <div className='flex justify-center'>
                <button className={`changeForm ${!employer ? 'fill-select' : ''}`} onClick={()=>SetEmployer(false)}>Candidate</button>
                <button className={`changeForm ${!employer ? '' : 'fill-select'}`} onClick={()=>SetEmployer(true)}>Employer</button>
            </div>
            {
                employer ?<EmployerForm/>:<CandidateForm/>
            }
        </div>
    )
}

export default Signup
