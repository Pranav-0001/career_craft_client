import React, { useEffect, useState } from 'react'
import "./applied.css"
import { useSelector } from 'react-redux';
import { fetchUserApplied } from '../../../services/candidate/job';
import { appliedJobsByUser } from '../../../models/applicationModel';
import Loader from '../../Loader/Loader';

function AppliedJobs() {
  const [applied,setApplied]=useState<appliedJobsByUser[]>()
  const [isLoading,setIsLoading]=useState(true)
    const { userId } = useSelector((state:any) => state.user);
    useEffect(() => {
      const fetch=async()=>{
        const jobs=await fetchUserApplied(userId)
        if(jobs) {
          setApplied(jobs)
          setIsLoading(false)
        }
        

      }
    fetch()
    }, [])
    
  return (
    <div className='font-exo'>
      <h1 className='text-xl lg:text-2xl mb-2 '>Applied Jobs</h1>
      <div className={`lg:pe-24 ${isLoading? 'flex justify-center' :''}`}>
        {isLoading?
        <Loader/>
        :
        <table className='w-full rounded-md'>
            <thead className='bg-primary-800   text-white border-b-2 border-gray-600'>
                <tr className='text-xs md:text-base lg:text-xl text-left '>
                    {/* <th className='px-2 py-3'>No.</th> */}
                    <th className='px-2 py-3'>Job</th>
                    <th className='px-2 py-3'>Applied On</th>
                    <th className='px-2 py-3'>Domain</th>
                    <th className='px-2 py-3'>Status</th>
                </tr>
            </thead>
            <tbody className='bg-gray-100'>
                {applied?.map((obj,i)=><tr key={obj.jobId} className='text-xs md:text-base lg:text-lg overflow-auto'>
                    {/* <td className='table-data'>{i+1}</td> */}
                  <td className='table-data flex items-center gap-2'>
                    <img className='h-10 hidden lg:block' src={obj.employer[0].profileImg} alt="" />
                    <div>
                      <h1>{obj.job[0].title}</h1>
                    <p className='text-gray-400 text-xs lg:text-sm'>{obj.employer[0].company},{obj.employer[0].location}</p>
                    </div>
                    
                  </td>
                    <td className='table-data'>{obj.appliedOn}</td>
                    <td className='table-data'>{obj.job[0].category}</td>
                    <td className={`table-data `}><span className='bg-yellow-100 py-1 px-2 rounded-xl text-sm font-bold text-yellow-600'>{obj.status}</span></td>
                </tr>)}
            </tbody> 
        </table>}
      </div>
    </div>
  )
}

export default AppliedJobs
