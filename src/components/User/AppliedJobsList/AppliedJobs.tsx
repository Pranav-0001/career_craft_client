import React, { useEffect } from 'react'
import "./applied.css"
import { useSelector } from 'react-redux';
import { fetchUserApplied } from '../../../services/candidate/job';

function AppliedJobs() {
    const { userId } = useSelector((state:any) => state.user);
    useEffect(() => {
      const fetch=async()=>{
        // const jobs=await fetchUserApplied(userId)
      }
    fetch()
    }, [])
    
  return (
    <div className='font-exo'>
      <h1 className='text-xl lg:text-2xl mb-2'>Applied Jobs</h1>
      <div className='lg:pe-24'>
        <table className='w-full rounded-md'>
            <thead className='bg-primary-800   text-white border-b-2 border-gray-600'>
                <tr className='text-xs md:text-base lg:text-xl text-left '>
                    <th className='px-2 py-3'>No.</th>
                    <th className='px-2 py-3'>Job</th>
                    <th className='px-2 py-3'>Applied On</th>
                    <th className='px-2 py-3'>Company</th>
                    <th className='px-2 py-3'>Status</th>
                </tr>
            </thead>
            <tbody className='bg-gray-100'>
                <tr className='text-xs md:text-base lg:text-lg overflow-auto'>
                    <td className='table-data'>1</td>
                    <td className='table-data'>react Dev</td>
                    <td className='table-data'>22/02/2022</td>
                    <td className='table-data'>Google</td>
                    <td className={`table-data `}><span className='bg-yellow-100 py-1 px-2 rounded-xl text-sm font-bold text-yellow-600'>Applied</span></td>
                </tr>
            </tbody> 
        </table>
      </div>
    </div>
  )
}

export default AppliedJobs
