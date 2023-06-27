import React, { ChangeEvent, useState } from 'react'
import './addJob.css'
import { jobFormValidate } from '../../../utils/employer/jobFormValid'
import { api } from '../../../services/axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function JobPost() {
    const navigate=useNavigate()
    const {EmployerId} = useSelector((state: any) => state.employer);
    
    const [salaryType, setSalaryType] = useState('Fixed')
    
    const [jobData, setJobData] = useState({ title: '', category: 'React Js', qualification: '', experience: 'Fresher', deadline: '', desc: '',jobType:'Full Time' })
    const [rangeSalary, setRangeSalary] = useState({ from: '', to: '' })
    const [fixedSalary, setFixedSalary] = useState('')
    const [err,setErr]=useState({ title: '', category: '', qualification: '', experience: '', deadline: '', desc: '',jobType:'',salaryType:'',from:'',to:'',fixed:'' })
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    

    const FormInput=(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
        const {name,value}=e.target
        if(name==="salaryType") setSalaryType(value)
        else if(name==="from") setRangeSalary({...rangeSalary,from:value})
        else if(name==="to") setRangeSalary({...rangeSalary,to:value})
        else if(name==="fixed") setFixedSalary(value)
        else setJobData({...jobData,[name]:value})
        jobFormValidate(name,value,rangeSalary,err,setErr)
        

    }
    

    const required:React.FormEventHandler<HTMLFormElement>=async(e)=>{
        e.preventDefault()
       
        
        if( err.title=== ''&& err.category=== ''&& err.qualification=== ''&& err.experience=== ''&& err.deadline=== ''&& err.desc=== ''&&err.jobType===''&&err.salaryType===''&&err.from===''&&err.to===''&&err.fixed===''){
            const {title,category,qualification,deadline,desc,experience,jobType} = jobData
            const {from,to}=rangeSalary
            console.log(jobData);
            
            if(title&&category&&qualification&&deadline&&desc&&experience&&jobType){
                if(fixedSalary || (from&&to)){

                    
                    
                    const job={
                        title,
                        category,
                        qualification,
                        deadline,
                        desc,
                        salaryType,
                        experience,
                        jobType,
                        salaryFrom:parseInt(from),
                        salaryTo:parseInt(to),
                        fixedSalary:parseInt(fixedSalary),
                        EmployerId
                    }
                    
                    const {data} =await api.post('/employer/postjob',{...job},{withCredentials:true})
                    if(data?.status){
                        navigate('/employer')
                    }
                    
                    
                }
            }
        }
    }
    
    
    
    return (
        <>
            <div className='w-full h-20 md:h-40 top-text-bg-img flex items-center justify-center mt-2'>
                <h1 className='text-2xl md:text-3xl font-bold font-work'>Post A Job</h1>
            </div>
            <div className='px-2 md:px-40 mt-6 mb-20'>
                <form onSubmit={required} className='w-full pb-8 border border-primary-200 rounded-lg grid grid-cols-1 md:grid-cols-2 px-8 md:gap-2 pt-6'>

                    <div>
                        <h1 className='text-sm'>Job Title</h1>
                        <input type="text" className='addjob-text-box' name="title" id="" onChange={FormInput} required/>
                        <p className='text-red-500 text-xs'>{err.title}</p>
                    </div>
                    <div>
                        <h1 className='text-sm'>Domain</h1>
                        {/* <input type="text" className='addjob-text-box' name="category" id="" onChange={FormInput} required/> */}
                        <select name="category" id="" className='addjob-text-box' onChange={FormInput}>
                            <option value="React Js">React Js</option>
                            <option value="Node js">Node js</option>
                            <option value="MERN">MERN</option>
                            <option value="MEAN">MEAN</option>
                            <option value="Angular">Angular</option>
                            <option value="Django">Django</option>
                            <option value="Flutter">Flutter</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="Android">Android</option>
                            <option value="IOS">IOS</option>


                        </select>

                        <p className='text-red-500 text-xs'>{err.category}</p>

                    </div>
                    <div>
                        <h1 className='text-sm'>Salary Type</h1>
                        {/* <input type="text" className='addjob-text-box' name="" id="" /> */}
                        <select name="salaryType" id="" className='addjob-text-box'  onChange={FormInput}>
                            <option value="Fixed">Fixed</option>
                            <option value="Range">Range</option>
                        </select>
                    </div>
                    <div>
                        <h1 className='text-sm'>Salary (Lpa)</h1> 
                        {
                            salaryType === 'Range' ?
                                <div className='flex gap-2'>
                                    <div className='w-full'>
                                        <input type="number" className='addjob-text-box ' name="from" id="" placeholder='From' onChange={FormInput} />
                                        <p className='text-red-500 text-xs'>{err.from}</p>

                                    </div>
                                    <div className='w-full'> 
                                    <input type="number" className='addjob-text-box' name="to" id="" placeholder='To' onChange={FormInput} />
                                    <p className='text-red-500 text-xs'>{err.to}</p>

                                    </div>

                                </div>
                                : <div> <input type="number" className='addjob-text-box' name="fixed" id="" onChange={FormInput}/>
                                    <p className='text-red-500 text-xs'>{err.fixed}</p>
                                </div>
                        }

                    </div>
                    <div>
                        <h1 className='text-sm'>Qualification </h1>
                        <input type="text" className='addjob-text-box' name="qualification" id="" onChange={FormInput} required/>
                        <p className='text-red-500 text-xs'>{err.qualification}</p>

                    </div>
                    <div>
                        <h1 className='text-sm'>Experience Level</h1>
                        <select name="experience" id="" className='addjob-text-box' onChange={FormInput}>
                            <option value="Fresher">Fresher</option>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Year</option>
                            <option value="3 Year">3 Year</option>
                            <option value="5 Year">5 Year+</option>
                        </select>
                    </div>
                    <div>
                        <h1 className='text-sm'>Deadline</h1>
                        <input type="date" min={tomorrowDate} className='addjob-text-box' name="deadline" id="" onChange={FormInput} required/>
                    </div>
                    <div>
                        <h1 className='text-sm'>Job Type</h1>
                        <select name="jobType" id="" className='addjob-text-box' onChange={FormInput}>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Intern">Intern</option>
                        </select>
                    </div>
                    <div className='md:col-span-2'>
                        <h1 className='text-sm'>Job Description</h1>
                        <textarea name="desc" id="" className=' addjob-text-box h-40' onChange={FormInput} required></textarea>
                        <p className='text-red-500 text-xs'>{err.desc}</p>

                    </div>
                    <div>
                        <button type='submit' className='ms-2 px-2 rounded-lg py-2 bg-primary-900 text-white'>Post Now</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default JobPost
