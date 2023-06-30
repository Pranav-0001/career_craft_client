import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faBookmark, faBriefcase, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Dashboard() {
  return (
    <div className='lg:pe-20 w-full h-10 '>
      <div className='w-full  h-5 mt-10 md:mt-20'>
        <div className="flex items-center gap-4">
          <img src="https://res.cloudinary.com/pranav123/image/upload/v1687687065/ajeszycb6mkshn1rued3.jpg" className='rounded-md h-24' alt="" />
          <div className=''>
            <p className='font-exo text-sm'>Hello,</p>
            <h1 className='font-exo text-2xl text-primary-900'>Pranav C</h1>
          </div>

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 md:mt-10 gap-2'>
          <div className='border  rounded-sm  w-full   flex'>
            <div className='px-2 py-2'>
              <FontAwesomeIcon className='bg-purple-200 border border-purple-400 text-3xl px-4 py-4' icon={faBriefcase} />
            </div>
            <div className='flex items-center'>
              <div>
                <h1 className='text-gray-400'>Total Applied</h1>
                <h1 className='text-xl font-bold'>250</h1>
              </div>
            </div>
          </div>

          <div className='border  rounded-sm  w-full   flex'>
            <div className='px-2 py-2'>
              <FontAwesomeIcon className='bg-green-200 border border-green-400 text-3xl px-4 py-4' icon={faBookmark} />
            </div>
            <div className='flex items-center'>
              <div>
                <h1 className='text-gray-400'>Saved Jobs</h1>
                <h1 className='text-xl font-bold'>250</h1>
              </div>
            </div>
          </div>

          <div className='border  rounded-sm  w-full   flex'>
            <div className='px-2 py-2'>
              <FontAwesomeIcon className='bg-orange-200 border border-orange-400 text-3xl px-4 py-4' icon={faMessage} />
            </div>
            <div className='flex items-center'>
              <div>
                <h1 className='text-gray-400'>Messages</h1>
                <h1 className='text-xl font-bold'>250</h1>
              </div>
            </div>
          </div>

          <div className='border  rounded-sm  w-full   flex'>
            <div className='px-2 py-2'>
              <FontAwesomeIcon className='bg-sky-200 border border-sky-400 text-3xl px-4 py-4' icon={faUserGraduate} />
            </div>
            <div className='flex items-center'>
              <div>
                <h1 className='text-gray-400'>Review CV</h1>
                <h1 className='text-xl font-bold'>250</h1>
              </div>
            </div>
          </div>

        </div>

        <div className='mt-10'>
          <h1 className='font-exo text-xl mb-8'>Current Applied Jobs:</h1>
          <div className='w-full'>
            <table className='w-full font-exo'>
              <thead>
                <tr className='text-left bg-primary-800 text-white border '>
                  <th className='ps-2'>Job</th>
                  <th>Apply Date</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr  className='border-b-2  border-x-2'>
                  <td className='ps-2'>
                    <h1 className=''>React Developer</h1>
                    <p className='text-xs'>Delhi,Haryana</p>
                  </td>
                  <td>1/10/2022</td>
                  <td>Netflix</td>
                  <td>Viewed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>



      </div>
    </div>
  )
}

export default Dashboard
