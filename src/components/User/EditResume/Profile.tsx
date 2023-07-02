import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Profile() {
    return (
        <>
            <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
                <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8 pt-4'>
                    <div className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo '>
                        <div className=''>
                            <h1 className=''>Father's Name</h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div>
                            <h1>Mother's Name</h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div>
                            <h1>Date of Birth</h1>
                            <input type="date" className="px-4 signupFormInput w-full" max="2004-12-31" />

                        </div>
                        <div>
                            <h1>National Id</h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div>
                            <h1>Permanent Address</h1>
                            <textarea name="" id="" className="px-4 signupFormInput w-full h-24" ></textarea>
                        </div>
                        <div>
                            <h1>Present Address</h1>
                            <textarea name="" id="" className="px-4 signupFormInput w-full h-24" ></textarea>
                        </div>
                        <div>
                            <h1>Marital Status</h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div>
                            <h1>Gender</h1>
                            <select name="" className="px-4 signupFormInput w-full" id="">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className='col-span-2 '>
                            <h1 className='mt-3 text-xl mb-2'>Your Skills</h1>
                            <div className="flex gap-1">
                                <input type="text" className="px-4 signupFormInput w-full" />
                                <button className='px-4 rounded bg-primary-800'>Add</button>
                            </div>
                        </div>
                        <div className='mt-4 ms-1'>
                            <button className='bg-primary-1000 text-white px-4 py-2 rounded-md'>Update Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
