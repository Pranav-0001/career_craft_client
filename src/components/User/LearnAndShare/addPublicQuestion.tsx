import React from 'react'

const AddPublicQuestion = () => {
  return (
    <>
      <div className='lg:grid grid-cols-2 lg:px-40 gap-3 px-4 md:px-10 mt-16'>
        <div className='col-span-2'>
          <h1 className='text-center text-2xl font-bold  '>Ask A Public Quesstion</h1>
        </div>
        <div>
          <p>Title</p>
          <input type="text" className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded' name="" id="" />
        </div>
        <div>
          <p>language</p>
          <input type="text" className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded' name="" id="" />
        </div>
        <div>
          <p>Question</p>
          <textarea className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded h-40' name="" id="" ></textarea>
        </div>
        <div>
          <p>Code <span className='text-xs text-gray-400'>(optional)</span> </p>
          <textarea className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded h-40' name="" id="" ></textarea>
        </div>
        <div className='col-span-2 flex justify-center'>
          <button className='px-2 py-1 rounded bg-primary-600 text-white'>Submit</button>
        </div>
      </div>
    </>
  )
}

export default AddPublicQuestion
