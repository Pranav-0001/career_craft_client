import React from 'react'

function Basic() {
  return (
    <>
      <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
        <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md '>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>

            </div>
            <div className='grid md:grid-cols-2'>
              <div className='w-full'>

              </div>
              <div className="flex items-center justify-center w-full   ">
                <label className="flex flex-col items-center justify-center w-15 py-2 px-2 h-15 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-white hover:bg-gray-100 dark:border-gray-600  dark:hover:bg-white ">
                  <div className="flex flex-col items-center justify-center  ">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default Basic
