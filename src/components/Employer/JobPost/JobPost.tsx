import React, { useState } from 'react'
import './addJob.css'
function JobPost() {
    const [salaryType, setSalaryType] = useState('Fixed')
    const [jobData, setJobData] = useState({ title: '', category: '', qualification: '', experience: '', deadline: '', desc: '',jobType:'' })
    const [rangeSalary, setRangeSalary] = useState({ from: '', to: '' })
    const [fixedSalary, setFixedSalary] = useState('')
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    
    
    return (
        <>
            <div className='w-full h-20 md:h-40 top-text-bg-img flex items-center justify-center mt-2'>
                <h1 className='text-2xl md:text-3xl font-bold font-work'>Post A Job</h1>
            </div>
            <div className='px-2 md:px-40 mt-6 mb-20'>
                <div className='w-full pb-8 border border-primary-200 rounded-lg grid grid-cols-1 md:grid-cols-2 px-8 md:gap-2 pt-6'>

                    <div>
                        <h1 className='text-sm'>Job Title</h1>
                        <input type="text" className='addjob-text-box' name="title" id="" onChange={(e) => setJobData({ ...jobData, [e.target.name]: e.target.value })} />
                    </div>
                    <div>
                        <h1 className='text-sm'>Job Category</h1>
                        <input type="text" className='addjob-text-box' name="category" id="" onChange={(e) => setJobData({ ...jobData, [e.target.name]: e.target.value })} />
                    </div>
                    <div>
                        <h1 className='text-sm'>Salary Type</h1>
                        {/* <input type="text" className='addjob-text-box' name="" id="" /> */}
                        <select name="" id="" className='addjob-text-box' onChange={(e) => setSalaryType(e.target.value)}>
                            <option value="Fixed">Fixed</option>
                            <option value="Range">Range</option>
                        </select>
                    </div>
                    <div>
                        <h1 className='text-sm'>Salary (Lpa)</h1>
                        {
                            salaryType === 'Range' ?
                                <div className='flex gap-2'>
                                    <input type="number" className='addjob-text-box' name="" id="" placeholder='From' onChange={(e)=>setRangeSalary({...rangeSalary,from:e.target.value})} />
                                    <input type="number" className='addjob-text-box' name="" id="" placeholder='To' onChange={(e)=>setRangeSalary({...rangeSalary,to:e.target.value})} />

                                </div>
                                : <input type="number" className='addjob-text-box' name="" id="" onChange={(e)=>setFixedSalary(e.target.value)}/>
                        }

                    </div>
                    <div>
                        <h1 className='text-sm'>Qualification </h1>
                        <input type="text" className='addjob-text-box' name="qualification" id="" onChange={(e) => setJobData({ ...jobData, [e.target.name]: e.target.value })} />
                    </div>
                    <div>
                        <h1 className='text-sm'>Experience Level</h1>
                        <select name="experience" id="" className='addjob-text-box' onChange={(e) => setJobData({ ...jobData, [e.target.name]: e.target.value })}>
                            <option value="Fresher">Fresher</option>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Year</option>
                            <option value="3 Year">3 Year</option>
                            <option value="5 Year">5 Year+</option>
                        </select>
                    </div>
                    <div>
                        <h1 className='text-sm'>Deadline</h1>
                        <input type="date" min={tomorrowDate} className='addjob-text-box' name="deadline" id="" onChange={(e)=>setJobData({...jobData,[e.target.name]:e.target.value})} />
                    </div>
                    <div>
                        <h1 className='text-sm'>Job Type</h1>
                        <select name="jobType" id="" className='addjob-text-box' onChange={(e)=>setJobData({...jobData,[e.target.name]:e.target.value})}>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <div className='md:col-span-2'>
                        <h1 className='text-sm'>Job Description</h1>
                        <textarea name="desc" id="" className=' addjob-text-box h-40' onChange={(e) => setJobData({ ...jobData, [e.target.name]: e.target.value })} ></textarea>
                    </div>
                    <div>
                        <button className='ms-2 px-2 rounded-lg py-2 bg-primary-900 text-white'>Post Now</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default JobPost
