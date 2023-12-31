import { faEye, faPaperPlane, faThumbsUp, faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchApplicationByEmp, fetchApplicationCountByEmp } from '../../../services/Employer/applications'
import { appliedJobsByEmp } from '../../../models/applicationModel'
import { useNavigate } from 'react-router-dom'
import { acceptUserApplication, rejectUserApplication } from '../../../services/Employer/fetJobs'
import Loader from '../../Loader/Loader'

function EmpApplied() {
  const navigate=useNavigate()
  const [applications,setApplications]=useState<appliedJobsByEmp[]>()
  const [pages,setPages]=useState<number[]>([])
  const [page,setPage]=useState(1)
  const [isLoading,setIsLoading]=useState(false)
  
  const {EmployerId}  = useSelector((state: any) => state.employer);


  const acceptApplication=async(userId:string,applicationId:string)=>{
    const status=await acceptUserApplication(userId,EmployerId,applicationId)
    if(status){
      const newArray=applications?.map(obj=>{
        if(obj._id===applicationId){
          obj.status="Accepted"
          return obj
        }else{
          return obj
        }
      })
      setApplications(newArray)
    }
  }

  const rejectApplication=async(userId:string,applicationId:string)=>{
    const status=await rejectUserApplication(userId,EmployerId,applicationId)
    if(status){
      const newArray=applications?.map(obj=>{
        if(obj._id===applicationId){
          obj.status="Rejected"
          return obj
        }else{
          return obj
        }
      })
      setApplications(newArray)
    }
  }

  useEffect(() => {
    console.log(EmployerId);
    
    const fetch=async()=>{
      setIsLoading(true)
      const data=await fetchApplicationByEmp(EmployerId,page)
      
      setApplications(data.applications)
      setPages(data.pagecount)
      setIsLoading(false)
      
      
      
    }
    fetch()
    
  }, [page])
  
  return (
    <div className='px-1 md:px-6 lg:px-20 pb-8'>
      <div className='overflow-auto rounded-md shadow hidden md:block'>
        {isLoading?
        <Loader/>
        :
          <table className='w-full font-exo'>
          <thead className='bg-primary-800 text-white border-b-2 border-gray-500'>
            <tr>
              <th className='w-20 p-3  tracking-wide text-left'>S.No</th>
              <th className=' p-3  tracking-wide text-left'>Candidate</th>
              <th className='w-52 p-3  tracking-wide text-left'>Applied Date</th>
              <th className='w-80 p-3  tracking-wide text-left'>Job Title</th>
              <th className='w-40 p-3  tracking-wide text-left'>Status</th>
              <th className='w-48 p-3  tracking-wide text-left'>Options</th>
            </tr>
          </thead>
          <tbody className='divide-y  divide-gray-400'>
            {applications?.map((obj,i)=> <tr className='bg-gray-100'>
              <td className='p-3 whitespace-nowrap text-gray-600'>{i+1}</td>
              <td className='p-3 whitespace-nowrap text-gray-600 flex items-center gap-2'>
                <img src={obj.user[0].basic?.imageURL} className='h-20 rounded-md' alt="" />
                <h1>{obj.user[0].firstname} {obj.user[0].lastname}</h1></td>
              <td className='p-3 whitespace-nowrap text-gray-600'>{obj.appliedOn}</td>
              <td className='p-3 whitespace-nowrap text-gray-600'>
                <h1>{obj.job[0].title}</h1>
                <p>{obj.job[0].category}</p>
              </td>
              {obj.status==='Applied' &&<td className='p-3 whitespace-nowrap text-gray-600 '><span className={`text-yellow-600 bg-yellow-100 px-2 py-1 font-bold rounded-lg`}>Received</span></td>}
              {obj.status==='Viewed' &&<td className='p-3 whitespace-nowrap text-gray-600 '><span className={`text-blue-600 bg-blue-100 px-2 py-1 font-bold rounded-lg`}>Viewed</span></td>}
              {obj.status==='Accepted' && <td className='p-3 whitespace-nowrap text-gray-600 '><span className={`text-green-600 bg-green-100 px-2 py-1 font-bold rounded-lg`}>Accepted</span></td>}
              {obj.status==='Rejected'&& <td className='p-3 whitespace-nowrap text-gray-600 '><span className={`text-red-600 bg-red-100 px-2 py-1 font-bold rounded-lg`}>Rejected</span></td>}
              <td className='p-3 whitespace-nowrap text-gray-600'>
                <h1 className='py-1'> <span onClick={()=>navigate(`/employer/view-resume?user=${obj.user[0]._id}`)} className='bg-blue-500 px-2 py-1 rounded-md text-white cursor-pointer'><FontAwesomeIcon icon={faEye} /> View resume</span></h1>

                {obj.status==="Accepted" ? 
                <h1 className='py-1' onClick={()=>navigate('/employer/chat')}><span  className='bg-green-500 px-2 py-1 rounded-md text-white cursor-pointer'><FontAwesomeIcon icon={faPaperPlane} /> Go To Chat</span></h1>
                :obj.status==="Rejected" ? '' :<><h1 className='py-1'><span onClick={()=>acceptApplication(obj.user[0]._id , obj._id)} className='bg-green-500 px-2 py-1 rounded-md text-white cursor-pointer'><FontAwesomeIcon icon={faThumbsUp} /> Accept</span></h1>
                <h1 className='py-1'><span className='bg-red-500 px-2 py-1 rounded-md text-white cursor-pointer' onClick={()=>rejectApplication(obj.user[0]._id,obj._id)}><FontAwesomeIcon icon={faXmarkCircle}  /> Reject</span></h1>
                </>}

              </td>
            </tr>)}
            
          </tbody>
        </table>}
      </div>
      <div className='grid grid-cols-1 gap-4 md:hidden font-exo '>
      {applications?.map((obj,i)=><div className='bg-white p-4 rounded-lg shadow '>
          <div className='flex items-center space-x-2'>
            <div>
              <span className=''>{i+1}</span>
            </div>
            <div className='flex items-center'>
              <h1>{obj.user[0].firstname} {obj.user[0].lastname}</h1></div>
            <div>{obj.status==='Applied' && <span className={`text-yellow-600 bg-yellow-100 px-2 py-1 font-bold rounded-lg`}>Received</span>}
              {obj.status==='Viewed' && <span className={`text-blue-600 bg-blue-100 px-2 py-1 font-bold rounded-lg`}>Viewed</span>}
              {obj.status==='Accepted' && <span className={`text-green-600 bg-green-100 px-2 py-1 font-bold rounded-lg`}>Accepted</span>}
              {obj.status==='Rejected'&& <span className={`text-red-600 bg-red-100 px-2 py-1 font-bold rounded-lg`}>Rejected</span>} </div>
          </div>
          <div className='flex justify-between'>
            <div>Applied On : {obj.appliedOn}</div>

          </div>
          <div className='flex items-center gap-4 mt-2'>
            <h1 className='py-1'> <span onClick={()=>navigate(`/employer/view-resume?user=${obj.user[0]._id}`)}  className='bg-blue-500 px-2 py-1 rounded-md text-white cursor-pointer'><FontAwesomeIcon icon={faEye} /> View resume</span></h1>
            <h1 className='py-1'><span className='bg-green-500 px-2 py-1 rounded-md text-white cursor-pointer'><FontAwesomeIcon icon={faThumbsUp} /> Accept</span></h1>
            <h1 className='py-1' onClick={()=>rejectApplication(obj.user[0]._id,obj._id)}><span className='bg-red-500 px-2 py-1 rounded-md text-white cursor-pointer'><FontAwesomeIcon icon={faXmarkCircle} /> Reject</span></h1>

          </div>
        </div>)}
      </div>
      <div className='flex items-center justify-end mt-4 gap-1'>
        {pages.map(p=><div onClick={()=>setPage(p)} className='w-10 h-10 bg-primary-900 flex items-center cursor-pointer justify-center text-white font-exo font-semibold rounded-sm'>{p}</div>)}
      </div>
    </div>
  )
}

export default EmpApplied
