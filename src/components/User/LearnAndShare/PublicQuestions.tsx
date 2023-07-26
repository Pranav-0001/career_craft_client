import React from 'react'

const PublicQuestions = () => {
    return (
        <div >
            <div className='grid grid-cols-4 w-full  px-2md:px-10 lg:px-40 font-exo gap-2'>
                <div className='col-span-3'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl py-6' >Questions</h1>
                        <button className='bg-primary-900 text-white px-4 py-1 rounded'>Ask</button>
                    </div>
                    <div className='border shadow flex items-center justify-between px-4 py-3 rounded-md'>

                        <div className='flex items-center'>
                            <div className='px-4'>
                                <h1 className='text-xs'>5 Likes</h1>
                             
                            </div>
                            <div>
                                <p>Redux reducer with state value type that depends on action</p>
                                <p className='text-gray-400'>#redux #react #reducer #state</p>
                            </div>

                        </div>
                        <div className=''>
                            <p className='text-sm'>Posted On : 27/02/2022</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='w-full px-4 py-4  shadow rounded lg:mt-20'>
                        <div className='pb-4'>
                            <h1>Filter</h1>
                        </div>
                        <div className='flex gap-2 mb-2'>
                            <input type="checkbox" className='h-6 w-6' name="" id="" />
                            <h1>Node</h1>
                        </div>
                        <div className='flex gap-2 mb-2'>
                            <input type="checkbox" className='h-6 w-6' name="" id="" />
                            <h1>Node</h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicQuestions
