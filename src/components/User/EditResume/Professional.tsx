import React from 'react'

function Professional() {
    return (
        <>
            <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
                <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8 pt-4'>
                    <div className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo '>
                        <div className='col-span-2'>
                            <h1 className='text-xl'>Add Your Experiences</h1>
                        </div>
                        <div>
                            <h1 className=''>Company Name</h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div>
                            <h1 className=''>Designation</h1>
                            <input type="text" className="px-4 signupFormInput w-full" />
                        </div>
                        <div>
                            <h1 className=''>Experience</h1>
                            <input type="number" className="px-4 signupFormInput w-full" />
                        </div>
                        <div></div>
                        <div>
                        <button className='bg-primary-1000 text-white px-4 py-2 rounded-md'>Update Change</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Professional
