import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Basic from './Basic'

function EditResume() {
    return (
        <>
            <div className='mt-20 w-full'>
                <div className='flex justify-between items-center text-xs md:text-md lg:text-lg'>
                    <div className='w-full text-center lg:px-10'>
                        <h1 className={`bg-primary-800 py-2 text-white rounded-md`}>Basic Information</h1>
                    </div>
                   
                    <div className='w-full text-center lg:px-10'>
                        <h1>Profile</h1>
                    </div>
                    
                    <div className='w-full text-center lg:px-10'>
                        <h1>Education</h1>

                    </div>
      

                    <div className='w-full text-center lg:px-10'>
                        <h1>Professional</h1>
                    </div>
                </div>
            </div>
            <Basic/>
        </>
    )
}

export default EditResume
