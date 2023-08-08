import React, { useEffect, useState } from 'react'
import { EducationType, User } from '../../../models/User'
import { educationDataValidation } from '../../../utils/user/eduDataVali'
import { useSelector } from 'react-redux'
import { fetchUserData, updateEducationalInfo } from '../../../services/candidate/profile'
import Loader from '../../Loader/Loader'

function Education() {
    const [edu,setEdu]=useState<EducationType>()
    const [err,setErr]=useState<EducationType>()
    const { userId } = useSelector((state:any) => state.user);
    const [isLoading,setIsLoading]=useState(false)

    const eduForm=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setEdu({...edu,[name]:value})
        educationDataValidation(name,value,err,setErr)
        
    }
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        if(err?.education===''&&err?.result===''&&err.institute===''&&err.starting===''&&err.ending===''){
            if(edu?.education&&edu.result&&edu.institute&&edu.starting&&edu.ending){
                const {education,result,institute,starting,ending} = edu
                updateEducationalInfo(education,result,institute,starting,ending,userId)
            }
        }
    }
    useEffect(() => {
        const fetchData=async()=>{
        setIsLoading(true)
        const user:User=await fetchUserData(userId)
          if(user?.education){
            setEdu(user.education)
            setErr({education:'',institute:'',result:'',starting:'',ending:''})
          }
          setIsLoading(false)

        }
        fetchData()
    }, [])
    
    return (
        <>
            <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
                <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8 pt-4'>
                    {isLoading?
                    <Loader/>
                    :<form onSubmit={handleSubmit} className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo '>
                        <div className='col-span-2'>
                            <h1 className='font-exo text-xl'>Qualification</h1>
                            <h1 className='text-sm text-gray-500 mt-4'>Acadamic Information</h1>
                        </div>
                        <div >
                        <h1 className=''>Educational level</h1>
                            <input name='education' type="text" value={edu?.education} className="px-4 signupFormInput w-full" onChange={eduForm} />
                            <p className='text-xs text-red-700'>{err?.education}</p>

                        </div>
                        <div >
                        <h1 className=''>Result <span className='text-gray-400 text-sm'>(Percentage)</span></h1>
                            <input value={edu?.result} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} name='result' type="number" onChange={eduForm} className="px-4 signupFormInput w-full" />
                            <p className='text-xs text-red-700'>{err?.result}</p>
                        </div>
                        <div >
                        <h1 className=''>Institute/University </h1>
                            <input onChange={eduForm} name='institute' value={edu?.institute} type="text" className="px-4 signupFormInput w-full" /> 
                            <p className='text-xs text-red-700'>{err?.institute}</p>

                        </div>
                        <div>

                        </div>
                        <div >
                        <h1 className=''>Starting Period </h1>
                            <input value={edu?.starting} onChange={eduForm} name='starting' type="number" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} className="px-4 signupFormInput w-full" />
                            <p className='text-xs text-red-700'>{err?.starting}</p>
                            
                        </div>
                        <div >
                        <h1 className=''>Ending Period </h1>
                            <input value={edu?.ending} onChange={eduForm} name='ending' type="number" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} className="px-4 signupFormInput w-full" />
                            <p className='text-xs text-red-700'>{err?.ending}</p>
                        </div>
                        <div className='mt-4 ms-1'>
                            <button className='bg-primary-1000 text-white px-4 py-2 rounded-md'>Update Change</button>
                        </div>
                    </form>}
                </div>
            </div>
        </>
    )
}

export default Education
