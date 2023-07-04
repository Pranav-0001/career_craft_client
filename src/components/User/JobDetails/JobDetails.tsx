import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { applyJob, getSingleJob, removeSaved, saveJob } from '../../../services/candidate/job'
import { jobData } from '../../../models/jobDetails'
import { useSelector } from 'react-redux'
import { Job } from '../../../models/Jobmodel'

function JobDetails() {
    const [jobData, setJobData] = useState<jobData >()
    const { id } = useParams<{ id: string }>()
    const { userId } = useSelector((state: any) => state.user);



    useEffect(() => {
        const fetchJob = async () => {
            if (id) {
                const res: jobData = await getSingleJob(id)
                setJobData(res)
            }
        }
        fetchJob()

    }, [])
    const bookMarkJob = async () => {
        if (jobData?._id) {
            const id = jobData._id
            const res = await saveJob(id, userId)
            if(res){
                const edited:jobData={...jobData,savedBy:[...jobData.savedBy,userId]}
                setJobData(edited)
            }
        }

        
    }
    const removeBookmark = async () => {

        if (jobData?._id) {
            const id = jobData._id
            const res = await removeSaved(id, userId)
            if (res) {
                const edited: jobData = {...jobData,savedBy:jobData.savedBy.filter(obj=> obj!==userId)}
                setJobData(edited)
            }
        }


    }

    const applyNow=async () =>{
        if (jobData?._id) {
            const id = jobData._id
            const res=await applyJob(id,userId)
            if(res){
               console.log(res);
               let newData:jobData={...jobData,appliedBy:[...(jobData.appliedBy),{user:userId,appliedOn:"",status:"Applied"}]}
               console.log(newData);
               
               
            }
        }
    }


    return (
        <div>
            <div className='bg-top-text-bg w-full h-20 md:h-40 mt-2 flex justify-center items-center shadow-sm'>
                <h1 className='font-exo text-2xl  md:text-3xl'>Job Details</h1>
            </div>
            <div className='lg:px-10'>
                <div className='flex px-2 items-center mt-6 justify-between'>
                    <div className='flex items-center gap-1'>
                        <img className='w-14 h-14  border-2 rounded-full' src={jobData?.Employer[0].profileImg} alt="" />
                        <div className='font-exo'>
                            <h1 >{jobData?.title}</h1>
                            <p className='text-xs font-exo text-gray-500'>{jobData?.Employer[0].company}</p>
                        </div>
                    </div>
                    <div className='hidden lg:block font-exo text-sm'>
                        <h1>Location : <span>{jobData?.Employer[0].location}</span></h1>
                        <h1>Category : <span>{jobData?.category}</span></h1>
                    </div>
                    <div className='hidden lg:block font-exo text-sm'>
                        <h1>Job Type: {jobData?.jobType}</h1>
                        <p>Salary :{jobData?.salaryType === "Fixed" ? jobData.fixedSalary : `${jobData?.salaryFrom + ' - ' + jobData?.salaryTo}`} Lpa</p>
                    </div>
                    <div className='font-exo text-sm flex items-center gap-1'>
                        {jobData?.savedBy.includes(userId) ? <><h1 className='hidden lg:block'>Bookmarked </h1><FontAwesomeIcon onClick={removeBookmark} className='bg-gray-200 text-primary-1000 text-xl rounded-sm shadow-sm px-2 py-2' icon={solidBookmark} /></> : <><h1 className='hidden lg:block'>Bookmark Job </h1><FontAwesomeIcon onClick={bookMarkJob} className='bg-gray-200 text-primary-1000 text-xl rounded-sm shadow-sm px-2 py-2' icon={faBookmark} /></>}


                    </div>
                    <div>
                        {jobData&& jobData.appliedBy && jobData?.appliedBy.some(obj => obj.user === userId) ? <h1 className='bg-primary-600 px-4 py-2 rounded-md shadow-md text-white'>Applied</h1> : <button onClick={applyNow} className='font-exo bg-primary-800 text-white px-3 py-2 rounded-md'>Apply Now</button>}  
                    </div>
                </div>

                <div className='grid md:grid-cols-4 grid-cols-3 px-4 mt-8'>
                    <div className='col-span-2 md:col-span-3 md:pe-20'>
                        <h1 className='text-xl mb-2 font-exo'>Job Description</h1>
                        <p className='text-sm font-exo'>{jobData?.desc}</p>

                        <h1 className='text-xl mb-2 font-exo mt-8'>Educational Requirements</h1>
                        <p className='text-sm font-exo'>{jobData?.qualification}</p>

                        <h1 className='text-xl mb-2 font-exo mt-8'>Experiences:</h1>
                        <p className='text-sm font-exo'>{jobData?.experience}</p>
                    </div>
                    <div className='w-full lg:px-2'>
                        <div className='w-full bg-gray-100  rounded-md border font-exo lg:px-6 py-2'>
                            <h1 className='text-lg mb-4 '>Job Summary</h1>
                            <h1>Category : <span className='text-gray-500'> {jobData?.category}</span> </h1>
                            <h1>Expiration : <span className='text-gray-500'>{jobData?.deadline}</span> </h1>
                            <h1>Location : <span className='text-gray-500'>{jobData?.Employer[0].location}</span> </h1>
                            <h1>Job Type : <span className='text-gray-500'>{jobData?.jobType}</span> </h1>
                            <h1>Experience : <span className='text-gray-500'>{jobData?.experience}</span> </h1>
                            <h1>Education : <span className='text-gray-500'>{jobData?.qualification}</span> </h1>
                        </div>
                    </div>



                </div>
                <div className='mt-8 ps-4 font-exo'>
                    <h1 className='text-xl mb-2 mt-24'>Related Jobs : </h1>
                    <div className='w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mb-10'>
                        <div className='border px-4 py-3 rounded-md bg-orange-50 mb-6'>

                            <div className='flex font-exo gap-2'>
                                <img src="/Images/Netflix.png" alt="" className='w-12 h-12 border bg-white rounded-md' />
                                <div>
                                    <h1>Job Title</h1>
                                    <p className='text-xs text-gray-400'>Full Time</p>
                                </div>
                            </div>
                            <div className='bg-gray-50 w-full mt-4 px-2 py-4 rounded-md'>
                                <p>Salary : 4lpa</p>
                                <p>Deadline : 12/2/2022</p>
                            </div>
                            <div className='flex justify-end items-center gap-1 text-primary-800 mt-2'>
                                <FontAwesomeIcon icon={faArrowRightToBracket} /> <h1>Apply Now</h1>
                            </div>


                        </div>
                        <div className='border px-4 py-3 rounded-md bg-orange-50 mb-6'>

                            <div className='flex font-exo gap-2'>
                                <img src="/Images/Netflix.png" alt="" className='w-12 h-12 border bg-white rounded-md' />
                                <div>
                                    <h1>Job Title</h1>
                                    <p className='text-xs text-gray-400'>Full Time</p>
                                </div>
                            </div>
                            <div className='bg-gray-50 w-full mt-4 px-2 py-4 rounded-md'>
                                <p>Salary : 4lpa</p>
                                <p>Deadline : 12/2/2022</p>
                            </div>
                            <div className='flex justify-end items-center gap-1 text-primary-800 mt-2'>
                                <FontAwesomeIcon icon={faArrowRightToBracket} /> <h1>Apply Now</h1>
                            </div>


                        </div>
                        <div className='border px-4 py-3 rounded-md bg-orange-50 mb-6'>

                            <div className='flex font-exo gap-2'>
                                <img src="/Images/Netflix.png" alt="" className='w-12 h-12 border bg-white rounded-md' />
                                <div>
                                    <h1>Job Title</h1>
                                    <p className='text-xs text-gray-400'>Full Time</p>
                                </div>
                            </div>
                            <div className='bg-gray-50 w-full mt-4 px-2 py-4 rounded-md'>
                                <p>Salary : 4lpa</p>
                                <p>Deadline : 12/2/2022</p>
                            </div>
                            <div className='flex justify-end items-center gap-1 text-primary-800 mt-2'>
                                <FontAwesomeIcon icon={faArrowRightToBracket} /> <h1>Apply Now</h1>
                            </div>


                        </div>
                        <div className='border px-4 py-3 rounded-md bg-orange-50 mb-6'>

                            <div className='flex font-exo gap-2'>
                                <img src="/Images/Netflix.png" alt="" className='w-12 h-12 border bg-white rounded-md' />
                                <div>
                                    <h1>Job Title</h1>
                                    <p className='text-xs text-gray-400'>Full Time</p>
                                </div>
                            </div>
                            <div className='bg-gray-50 w-full mt-4 px-2 py-4 rounded-md'>
                                <p>Salary : 4lpa</p>
                                <p>Deadline : 12/2/2022</p>
                            </div>
                            <div className='flex justify-end items-center gap-1 text-primary-800 mt-2'>
                                <FontAwesomeIcon icon={faArrowRightToBracket} /> <h1>Apply Now</h1>
                            </div>


                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default JobDetails
