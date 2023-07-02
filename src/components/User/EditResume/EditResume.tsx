import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Basic from './Basic'
import Profile from './Profile'
import Education from './Education'
import './EditResume.css'

function EditResume() {
    const [page,setPage]=useState('education')
    return (
        <>
            <div className='mt-20 w-full'>
                <div className='flex justify-between items-center text-xs md:text-md lg:text-lg'>
                    <div className='w-full text-center lg:px-10'>
                        <h1 className={`${page==='basic'? 'bg-primary-800 py-2 text-white rounded-md':''}`}>Basic Information</h1>
                    </div>
                   
                    <div className='w-full text-center lg:px-10'>
                        <h1 className={`${page==='profile'? 'bg-primary-800 py-2 text-white rounded-md':''}`}>Profile</h1>
                    </div>
                    
                    <div className='w-full text-center lg:px-10'>
                        <h1 className={`${page==='education'? 'bg-primary-800 py-2 text-white rounded-md':''}`}>Education</h1>

                    </div>
      

                    <div className='w-full text-center lg:px-10'>
                        <h1>Professional</h1>
                    </div>
                </div>
            </div>
            {page==="basic" && <Basic/>}
            {page==="profile" && <Profile/>}
            {page==="education" && <Education/>}
        </>
    )
}

export default EditResume
