import React, { useEffect, useState } from 'react'
import DashHead from '../DashHeadMenu/DashHead'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faFileAlt } from '@fortawesome/free-regular-svg-icons'
import { faBriefcase, faBusinessTime, faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { api } from '../../../services/axios'
import { Job } from '../../../models/Jobmodel'

function EmpHome() {
    const navigate = useNavigate()
    const { EmpUsername, EmpImage ,EmployerId } = useSelector((state: any) => state.employer);
    const [jobs,setJobs]=useState<Job[]>([])
    useEffect(() => {
      const fetchData=async()=>{
        try{
        const {data} = await api.get(`/employer/employer-jobs/${EmployerId}`,{withCredentials:true})
        if (data.newAccessToken) localStorage.setItem('user',data.newAccessToken)
        setJobs(data.jobs)
        }catch(err){
            setJobs([])
        }
      }
      fetchData()
    }, [EmployerId])
    
    return (
        <>
           
            <div className='w-full '>
                <div className='flex justify-between mx-3 md:mx-16 lg:mx-16 mt-4'>
                    <div className='flex'>
                        <img src={EmpImage} alt="" className='w-20' />
                        <div className='ms-3'>
                            <h1 className='font-exo'>Hello,</h1>
                            <h1 className='text-xl font-work font-bold text-primary-1000'>{EmpUsername}</h1>
                        </div>
                    </div>
                    <div className=''>
                        <button className='hidden border border-primary-400 rounded-lg px-4 py-2 md:flex items-center'><FontAwesomeIcon className='p-2 me-2 bg-primary-500 rounded-md ' icon={faEdit} /> Edit Profile</button>
                        <button className=' border border-primary-400 rounded-lg ps-2 pt-1 md:hidden items-center'><FontAwesomeIcon className='p-2 me-2 bg-primary-500 rounded-md ' icon={faEdit} /> </button>

                    </div>
                </div>
                <div className='md:px-16 px-3 mt-4'>
                    <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-4'>
                        <div className='border flex px-2 py-4 items-center gap-2'>
                            <FontAwesomeIcon className='bg-blue-100 px-4 py-4 text-2xl' icon={faBriefcase} />
                            <div className=''>
                                <h1 className='text-xs md:text-xl'>Total Applied</h1>
                                <h1 className='text-xs md:text-lg'>10</h1>
                            </div>
                        </div>
                        <div className='border flex px-2 py-4 items-center gap-2'>
                            <FontAwesomeIcon className='bg-primary-100 px-4 py-4 text-2xl' icon={faFileAlt} />
                            <div className=''>
                                <h1 className='text-xs md:text-xl'>Posted Jobs</h1>
                                <h1 className='text-xs md:text-lg'>10</h1>
                            </div>
                        </div>
                        <div className='border flex px-2 py-4 items-center gap-2'>
                            <FontAwesomeIcon className='bg-red-100 px-4 py-4 text-2xl' icon={faBusinessTime} />
                            <div className=''>
                                <h1 className='text-xs md:text-xl'>Pending</h1>
                                <h1 className='text-xs md:text-lg'>10</h1>
                            </div>
                        </div>
                        <div className='border flex px-2 py-4 items-center gap-2'>
                            <FontAwesomeIcon className='bg-violet-100 px-4 py-4 text-2xl' icon={faClose} />
                            <div className=''>
                                <h1 className='text-xs md:text-xl'>Closed Jobs</h1>
                                <h1 className='text-xs md:text-lg'>10</h1>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='flex justify-between px-3 md:px-8 lg:px-16 mt-6 items-center'>
                    <div>
                        <h1 className='font-exo text-xl md:text-2xl'>Last Job List</h1>
                    </div>
                    <div>
                        <button onClick={() => navigate('/employer/addjob')} className='bg-primary-800 px-3 py-2 text-white rounded-md'>Create Job Post</button>
                    </div>
                </div>

                <div className='w-full px-3 md:px-6 lg:px-16 mt-6 hidden md:block'>
                    <table className='w-full mb-8'>
                        <thead className='border border-primary-600 bg-primary-600 h-10 font-bold'>
                            <td>S.No</td>
                            <td>Title</td>
                            <td className=''>Application</td>
                            <td className=''>Viewed</td>
                            <td className=' '>Not Viewed</td>
                            <td>Status</td>
                            <td>Action</td>
                        </thead>
                        <tbody>
                            {jobs.map((obj,index)=> <tr className='border-2 h-16 '>
                                <td className='ps-5'>{index+1}</td>
                                <td className=''>
                                    <h1>{obj.title}</h1>
                                    <p className='text-xs text-gray-500'>Deadline {obj.deadline}</p>
                                </td>

                                <td className='pt-3  '>
                                    <h1 className='  rounded-md items-center'>1000</h1>
                                </td>
                                <td className='pt-3  '>
                                    <h1 className='  rounded-md items-center'>1000</h1>
                                </td>
                                <td className='pt-3  '>
                                    <h1 className='  rounded-md items-center'>1000</h1>
                                </td>
                                <td className='pt-3  '>
                                    <h1 className='  rounded-md items-center'>{obj.status?'Active':'Closed'}</h1>
                                </td>
                                <td>
                                    <div className='flex gap-3'>
                                        <button className='bg-primary-400 px-2 py-1 rounded-md'><FontAwesomeIcon icon={faEdit} /></button>
                                        <button className='bg-primary-400 px-2 py-1 rounded-md'><FontAwesomeIcon icon={faEye} /></button>
                                    </div>
                                </td>

                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className='w-full px-3 md:px-6 lg:px-16 mt-6  md:hidden'>
                    <table className='w-full mb-8'>
                        <thead className='border border-primary-600 bg-primary-600 h-8'>
                            <td>Title</td>

                            <td>Action</td>
                        </thead>
                        {jobs.map((obj,index)=><tr className='' key={obj._id}>
                            <td className=''>
                                <h1>{obj.title}</h1>
                                <p className='text-xs text-gray-500'>Deadline {obj.deadline}</p>
                            </td>
                            <td>
                                <div className='flex gap-3'>
                                    <button className='bg-primary-400 px-2 py-1 rounded-md'><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className='bg-primary-400 px-2 py-1 rounded-md'><FontAwesomeIcon icon={faEye} /></button>
                                </div>
                            </td>

                        </tr>)}
                    </table>
                </div>
            </div>
        </>
    )
}

export default EmpHome
