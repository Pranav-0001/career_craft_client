import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faBookmark, faBriefcase, faTrophy, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchDashBoard } from '../../../services/candidate/profile';
import { appliedJobsByUser } from '../../../models/applicationModel';
import Loader from '../../Loader/Loader';

function Dashboard() {
  const [isLoading,setIsLoading]=useState(false)
  const { userId,userEmail,username ,image} = useSelector((state:any) => state.user);
  const [applications,setApplications]=useState(0)
  const [chat,setchat]=useState(0)
  const [saved,setsaved]=useState(0)
  const [LAS,setLAS]=useState(0)
  const [apply,setApply]=useState<appliedJobsByUser[]>([])
  useEffect(() => {
   const fetch=async()=>{
    setIsLoading(true)
    const data=await fetchDashBoard(userId)
    console.log(data);
    
    setApplications(data.applications)
    if(data?.chat?.count) setchat(data.chat.count)
    if(data?.saved?.count) setsaved(data.saved.count)
    if(data?.LAS?.totalMarks) setLAS(data.LAS.totalMarks)
    if(data.applied) setApply(data.applied)
    setIsLoading(false)
   }
   fetch()
  }, [])
  

  return (
    <div className='lg:pe-20 w-full mb-10 '>
      {isLoading? 
      <Loader/>
      :<div className='w-full  h-5 mt-10 md:mt-20'>
        <div className="flex items-center gap-4">
          <img src={image} className='rounded-md h-24' alt="" />
          <div className=''>
            <p className='font-exo text-sm'>Hello,</p>
            <h1 className='font-exo text-2xl text-primary-900'>{username}</h1>
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
                <h1 className='text-xl font-bold'>{applications}  </h1>
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
                <h1 className='text-xl font-bold'>{saved}</h1>
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
                <h1 className='text-xl font-bold'>{chat}</h1>
              </div>
            </div>
          </div>

          <div className='border  rounded-sm  w-full   flex'>
            <div className='px-2 py-2'>
              <FontAwesomeIcon className='bg-sky-200 border border-sky-400 text-3xl px-4 py-4' icon={faTrophy} />
            </div>
            <div className='flex items-center'>
              <div>
                <h1 className='text-gray-400'>LAS Point</h1>
                <h1 className='text-xl font-bold'>{LAS}</h1>
              </div>
            </div>
          </div>

        </div>

        <div className='mt-10 ' style={{paddingBottom:'6rem'}}>
          <h1 className='font-exo text-xl mb-8'>Current Applied Jobs:</h1>
          <div className='w-full'>
            <table className='w-full font-exo pb-10'>
              <thead>
                <tr className='text-left bg-primary-800 text-white border '>
                  <th className='ps-2'>Job</th>
                  <th>Deadline</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {apply.map((obj)=><tr  className='border-b-2  border-x-2 h-14'>
                  <td className='ps-2'>
                    <h1 className=''>{obj.job[0].title}</h1>
                    <p className='text-xs'>{obj.employer[0].location}</p>
                  </td>
                  <td>{obj.job[0].deadline}</td>
                  <td>{obj.employer[0].company}</td>
                  <td>{obj.status}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>



      </div>}
    </div>
  )
}

export default Dashboard
