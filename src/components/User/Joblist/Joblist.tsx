import React, { ChangeEvent, useEffect, useState } from 'react'
import './Joblist.css'
import { api } from '../../../services/axios'
import { Job, JobExtended } from '../../../models/Jobmodel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as solidbookmark } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightToBracket, faClose } from '@fortawesome/free-solid-svg-icons'
import { getDomains, getJobs } from '../../../services/Employer/fetJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { jobSearch, removeSaved, saveJob } from '../../../services/candidate/job'

function Joblist() {
    const navigate = useNavigate()
    const { userId } = useSelector((state: any) => state.user);

    const [jobs, setJobs] = useState<Job[]>([])
    const [domain, setDomain] = useState<string[]>([])
    const [filterDomain, setFilterDomain] = useState<string | null>(null)
    const [pages, setPages] = useState<number[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [filterType, setFilterType] = useState<string | null>(null)
    const [filterSalary, setFilterSalary] = useState<string | null>(null)
    const [searchJobs, setSearchJobs] = useState<JobExtended[]>([])
    const [search, setSearch] = useState<string>('')
    const jobtype = ['Full Time', 'Part Time', 'Remote', 'Internship']
    const Salary = ['1 - 3', '3 - 6', '6 - 9 ', '9 - 12', '12 - 16', '16 - 20', '20+']
    const [sort, setSort] = useState<string | null>('')

    const filterSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'domain') {
            setFilterDomain(value)
            setPageNo(1)
        }
        if (name === 'Type') {
            setFilterType(value)
            setPageNo(1)
        }
        if (name === 'Salary') {
            setPageNo(1)
            setFilterSalary(value)
        }
    }

    const bookMarkJob = async (id: string) => {
        const res = await saveJob(id, userId)
        if (res) {
            const edited: Job[] = jobs.map((obj) => {
                if (obj._id === id) return { ...obj, savedBy: [...(obj.savedBy ?? []), userId] }
                else return obj
            })
            setJobs(edited)
        }
    }
    const removeBookmark = async (id: string) => {

        const res = await removeSaved(id, userId)
        if (res) {
            const edited: Job[] = jobs.map((obj) => {
                if (obj._id === id) return { ...obj, savedBy: obj.savedBy?.map(ele => ele !== userId) }
                else return obj
            })
            setJobs(edited)
        }
    }

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const domains = await getDomains()
                const jobs = await getJobs(pageNo, filterDomain, filterType, filterSalary, sort)


                setJobs(jobs?.jobs)
                setPages(jobs?.pages)
                setDomain(domains);
            } catch (err) {
                console.log(err);
            }
        }
        fetchJobs()
    }, [pageNo, filterDomain, filterSalary, filterType, sort])

    const serachJob = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length > 0) {
            setSearch(e.target.value)
            const data = await jobSearch(e.target.value)
            console.log(data);
            setSearchJobs(data.job)

        } else {
            setSearchJobs([])
            setSearch('')
        }


    }



    return (
        <>
            <div className='bg-top-text-bg w-full h-20 md:h-40 mt-2 flex justify-center items-center shadow-sm'>
                <h1 className='font-exo text-2xl  md:text-3xl'>Find Jobs</h1>
            </div>
            <div className='lg:px-20 px-2 w-full mt-5 '>
                <div className=' relative w-full h-20 flex justify-end items-center gap-2'>
                    <div >
                        <input placeholder='Search...' onChange={serachJob} type="text" className='border border-primary-200 outline-primary-700 px-2 py-1 rounded shadow font-exo' />
                    </div>
                    <h1 className='font-bold'>Sort By : </h1> <select name="" id="" className='text-xs lg:text-sm bg-transparent outline-none' onChange={(e) => setSort(e.target.value)}>
                        <option >Default</option>

                        <option value="low">Salary: Low to High</option>
                        <option value="high">Salary: High to Low</option>
                    </select>
                    {search.trim().length > 0 && <div className='absolute top-16 w-full max-h-96 overflow-y-scroll rounded shadow md:w-1/2 lg:w-1/3  py-2 bg-white'>
                        {searchJobs.length > 0 ?
                            searchJobs.map((obj) => <div onClick={()=>navigate(`/job-details/${obj._id}`)} className='cursor-pointer border-y-2 px-1 py-2'>
                                <div className=' flex justify-between'>


                                    <div className='flex gap-2'>
                                        <img className='h-10 rounded-full' src={obj.EmployerId.profileImg} alt="" />
                                        <div>
                                            <h1>{obj.title}</h1>
                                            <p>{obj.EmployerId.location}</p>
                                        </div>

                                    </div>
                                    <div>
                                        <h1>Salaryn upto:{obj.salaryTo} Lpa</h1>
                                    </div>
                                </div>
                                <div className='flex my-1 gap-2'>
                                    <h1 className='px-2  rounded-full bg-green-200'>{obj.category}</h1>
                                    <h1 className='px-2  rounded-full bg-blue-200'>{obj.jobType}</h1>
                                    
                                </div>
                            </div>)
                            :
                            <h1>No Results found</h1>
                        }
                    </div>}
                </div>
            </div>
            <div className='flex'>

            </div>
            <div className='grid grid-cols-3 mt-2 lg:mx-16 mx-1'>
                <div className='my-2 bg-gray-100 shadow-md rounded-md  px-2 py-2 hidden md:block'>
                    <div className='w-full bg-white rounded-md px-3 pb-5' >
                        <div className='flex items-center gap-2'>
                            {filterDomain && <div className='mt-5 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full'>
                                <h1>{filterDomain}</h1>
                                <FontAwesomeIcon onClick={(e) => setFilterDomain(null)} icon={faClose} />
                            </div>}
                            {filterType && <div className='mt-5 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full'>
                                <h1>{filterType}</h1>
                                <FontAwesomeIcon onClick={(e) => setFilterType(null)} icon={faClose} />
                            </div>}
                            {filterSalary && <div className='mt-5 flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full'>
                                <h1>{filterSalary}</h1>
                                <FontAwesomeIcon onClick={(e) => setFilterSalary(null)} icon={faClose} />
                            </div>}
                        </div>
                        <h1 className='font-bold font-work text-2xl py-3 '>Domain</h1>
                        {domain.map((obj, index) => <div className='flex gap-2 mb-2 items-center'>
                            <input type="checkbox" value={obj} onChange={filterSelect} checked={filterDomain === obj} name="domain" id="" className='w-5 h-5' />
                            <h1>{obj}</h1>
                        </div>)}

                    </div>

                    <div className='w-full bg-white rounded-md px-3 pb-5' >
                        <h1 className='font-bold font-work text-2xl py-3 '>Job Type</h1>
                        {jobtype.map((obj, index) => <div className='flex gap-2 mb-2 items-center'>
                            <input type="checkbox"
                                name="Type"
                                id=""
                                value={obj}
                                onChange={filterSelect}
                                checked={filterType === obj}
                                className='w-5 h-5' />
                            <h1>{obj}</h1>
                        </div>)}

                    </div>

                    <div className='w-full bg-white rounded-md px-3 pb-5' >
                        <h1 className='font-bold font-work text-2xl py-3 '>Salary Range</h1>
                        {Salary.map((obj, index) => <div className='flex gap-2 mb-2 items-center'>
                            <input type="checkbox" name="Salary" id="" value={obj}
                                onChange={filterSelect}
                                checked={filterSalary === obj} className='w-5 h-5' />
                            <h1>{obj} Lpa</h1>
                        </div>)}

                    </div>
                </div>
                <div className='col-span-3 md:col-span-2  md:px-4 px-1  '>
                    {jobs.length > 0 ? jobs.map((obj, index) =>
                        <div className='  w-full my-2 border-2 rounded-md font-exo px-4 py-2' key={index}>
                            <div className='w-full flex  my-4'>
                                <div className='flex w-full gap-4'>
                                    <img src={obj.Employer[0].profileImg} alt="" className='h-12 ' />
                                    <div>
                                        <h1 onClick={() => navigate(`/job-details/${obj._id}`)} className='text-2xl cursor-pointer'>{obj.title}</h1>
                                        <p className='text-sm'>{obj.Employer[0].company}</p>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <h1 className='text-lg'>Salary : {obj.salaryType === 'Range' ? `${obj.salaryFrom} -  ${obj.salaryTo}` : obj.fixedSalary} Lpa</h1>
                                    <p className='text-sm'>Deadline : {obj.deadline}</p>
                                </div>
                                <div className='cursor-pointer text-xl'>
                                    {obj.savedBy?.includes(userId) ?
                                        <FontAwesomeIcon className='p-2 rounded-md bg-gray-200 text-primary-700' icon={solidbookmark} onClick={() => removeBookmark(obj._id)} />

                                        :
                                        <FontAwesomeIcon className='p-2 rounded-md bg-gray-200 text-primary-700' icon={faBookmark} onClick={() => bookMarkJob(obj._id)} />

                                    }

                                </div>

                            </div>
                            <div className='flex justify-between pt-4 '>
                                <div className='flex mb-2' >
                                    <div className='bg-red-200 px-3  rounded-full text-xs md:text-lg me-2'>{obj.category}</div>
                                    <div className='bg-blue-200 px-3 rounded-full text-xs md:text-lg me-2'>{obj.jobType}</div>
                                    <div className='bg-green-200 px-3 rounded-full text-xs md:text-lg me-2 hidden md:block'>{obj.qualification}</div>
                                </div>

                                <div>
                                    <div className='flex items-center gap-2 text-primary-1000 cursor-pointer'>
                                        <FontAwesomeIcon className='pt-1' icon={faArrowRightToBracket} />
                                        <p>Apply now</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ) :
                        <div className='w-full flex justify-center'>
                            <h1 className='font-exo text-2xl pt-10 font-bold'>No Results Found...</h1>
                        </div>
                    }
                </div>
            </div>
            <div className='lg:mx-20 mx-4 flex justify-end gap-2 mb-6 '>
                {pages.map(num =>
                    <h1 onClick={(e) => setPageNo(num)} className='bg-primary-800 px-3 py-1 shadow-md cursor-pointer text-white'>{num}</h1>
                )}
            </div>
        </>
    )
}

export default Joblist
