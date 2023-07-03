import React from 'react'

function Education() {
    return (
        <>
            <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
                <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8 pt-4'>
                    <div className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo '>
                        <div className='col-span-2'>
                            <h1 className='font-exo text-xl'>Qualification</h1>
                            <h1 className='text-sm text-gray-500 mt-4'>Acadamic Information</h1>
                        </div>
                        <div >
                        <h1 className=''>Educational level</h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div >
                        <h1 className=''>Result <span className='text-gray-400 text-sm'>(Percentage/GPA)</span></h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div >
                        <h1 className=''>Institute/Technology </h1>
                            <input type="text" className="px-4 signupFormInput w-full" /> 
                        </div>
                        <div>

                        </div>
                        <div >
                        <h1 className=''>Starting Period </h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div >
                        <h1 className=''>Ending Period </h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
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

export default Education
