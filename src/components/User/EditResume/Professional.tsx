import React, { useEffect, useState } from 'react'
import { ProfessionalType, User } from '../../../models/User'
import { profValidate } from '../../../utils/user/profVali'
import { fetchUserData, updateProfessionalInfo } from '../../../services/candidate/profile'
import { useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'
import SubmitBtnLoader from '../../Loader/SubmitBtnLoader'
import { ToastContainer, toast } from 'react-toastify'

function Professional() {
    const [prof,setProf]=useState<ProfessionalType>({experience:"1"})
    const [err,setErr]=useState<ProfessionalType>()
    const { userId } = useSelector((state:any) => state.user);
    const [isLoading,setIsLoading]=useState(false)
    const [isBtnLoading,setIsBtnLoading]=useState(false)


    const profForm=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name,value} = e.target
        setProf({...prof,[name]:value})
        profValidate(name,value,err,setErr)
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        setIsBtnLoading(true)
        if(err?.company===''&& err?.designation===''){
            const {company,designation,experience} = prof
            if(company&&designation&&experience){
                await updateProfessionalInfo(company,designation,experience,userId)
                toast.success('Chnage updated')
            }
        }
        setIsBtnLoading(true)

        
    }

    useEffect(() => {
      const fetch=async()=>{
        setIsLoading(true)
        const user:User=await fetchUserData(userId)
        if(user?.professional){
            setProf(user.professional)
            setErr({company:"",designation:"",experience:""})
        }
        setIsLoading(false)
      } 
      fetch()
    }, [])
    

    return (
        <>
            <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
                <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8 pt-4'>
                    {isLoading?
                    <Loader/>
                    :
                    <form onSubmit={handleSubmit} className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo '>
                        <div className='col-span-2'>
                            <h1 className='text-xl'>Add Your Experiences <span className='text-gray-400 text-sm'>(optional)</span></h1>
                        </div>
                        <div>
                            <h1 className=''>Company Name</h1>
                            <input type="text" name='company' value={prof.company} className="px-4 signupFormInput w-full" onChange={profForm} required/>
                            <p className='text-xs text-red-600'>{err?.company}</p>
                        </div>
                        <div>
                            <h1 className=''>Designation</h1>
                            <input type="text" name='designation' value={prof.designation} className="px-4 signupFormInput w-full" onChange={profForm} required/>
                            <p className='text-xs text-red-600'>{err?.designation}</p>

                        </div>
                        <div>
                            <h1 className=''>Year of Experience</h1>
                          
                            <select name="experience" value={prof.experience} id="" onChange={profForm} className='px-4 signupFormInput w-full' >
                                <option value="1">1 Year</option>
                                <option value="2">2 Year</option>
                                <option value="3">3 Year</option>
                                <option value="5">5 Year+</option>
                            </select>
                        </div>
                        <div></div>
                        <div>
                        {isBtnLoading?<button className='bg-primary-1000 text-white px-4 py-2 rounded-md' disabled><SubmitBtnLoader/></button>:<button className='bg-primary-1000 text-white px-4 py-2 rounded-md'>Update Change</button>}
                        

                        </div>
                    </form>}
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Professional
