import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchsavedJobs, removeSaved } from '../../../services/candidate/job';
import { Job } from '../../../models/Jobmodel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import './bookmark.css'
import { useNavigate } from 'react-router-dom';

function Bookmarklist() {
  const [jobs,setJobs]= useState<Job[] | []>([])
  const navigate=useNavigate()
  const { userId } = useSelector((state:any) => state.user);
  const removeBookmark=async(id:string)=>{
    const res=await removeSaved(id,userId)
    if(res){
      const newData=jobs.filter(obj=>obj._id!==id)
      setJobs(newData)
    }

  }
  
  useEffect(() => {
    const getJobs=async()=>{
      const data=await fetchsavedJobs(userId)
      console.log(data);
      setJobs(data)
    }
    getJobs()
  }, [])
  
  return (
    <>
      <h1 className='font-exo text-xl'>Bookmarked Jobs</h1>
      <div className='grid md:grid-cols-2 gap-2 pb-8'>

        {jobs.length>0 ? jobs.map(obj=><div className='w-full border  rounded-md shadow-md shadow-primary-200'>
          <div className='flex justify-between px-4 py-2'>
            <div className='flex items-center font-exo gap-2'>
              <img src={obj.Employer[0].profileImg} className='h-20' alt="" />
              <div>
              <h1>{obj.title}</h1>
              <p className='text-xs font-bold text-gray-500'>{obj.Employer[0].location}</p>  
              </div>
              
            </div>
            <div>
              <FontAwesomeIcon onClick={()=>removeBookmark(obj._id)} className='px-2 bg-gray-300 py-1 rounded-sm text-primary-1000 text-xl cursor-pointer' icon={faBookmark}/>
            </div>
          </div>
          <div className='px-4 pb-4'>
            <p className='text-xs mb-2'>{obj.desc}</p>
            <span className='px-1 bg-primary-600 text-white rounded-md '>{obj.salaryType==="Fixed"?obj.fixedSalary:`${obj.salaryFrom} - ${obj.salaryTo}`} Lpa</span>
            <span className='px-1 ms-2 bg-orange-300 text-white rounded-md '>{obj.jobType} </span>
          </div>
        </div>) : 
        <>
        <div className='w-full noSaved h-80 flex col-span-2 justify-center mt-4'>
          <h1 className='text-2xl font-exo'>No Saved Jobs</h1>
          
          
        </div>
        <button onClick={()=>navigate('/findjobs')} className='col-span-2 text-center  text-white'><span className='bg-primary-800 px-3 py-2 rounded-md hover:shadow-lg '> Find Jobs</span></button>
        </>
        }
      </div>
    </>
  )
}

export default Bookmarklist
