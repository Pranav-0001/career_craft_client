import React, { useEffect, useState } from 'react'
import { getPublicQuestions } from '../../../services/LAS/LAS'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { PublicQuestion } from '../../../models/PublicQuestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import Loader from '../../Loader/Loader'

const PublicQuestions = () => {
    const navigate=useNavigate()
    const [questions,setQuestions]=useState<PublicQuestion[]>([])
    const [filter,setFilter]=useState<string>()
    const [currentPage,setCurrentPage]=useState<number>(1)
    const [pages,setPages]=useState<number[]>()
    const [languages,setLanguages]=useState<string[]>([])
    const location = useLocation();
    const [isLoading,setIsLoading]=useState(false)
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    
    
    const num= page ? parseInt(page) :1
    const pagechage=(val:number)=>{
        setCurrentPage(val)
        navigate(`/Learn-and-share?page=${val}`)

    }
    useEffect(() => {
        const fetch=async()=>{
            setIsLoading(true)
            const data=await getPublicQuestions(currentPage,filter)
            console.log(data);
            setQuestions(data.questions)
            setPages(data.pageArr)
            setLanguages(data.languages)
            setIsLoading(false)
        }
        fetch()
    }, [currentPage,filter])
    
    
    return (
        <div >
            <div className='grid grid-cols-4 w-full  px-2md:px-10 lg:px-40 font-exo gap-2 mb-8'>
                <div className='col-span-3'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl py-6'  >Questions</h1>
                        <div className='flex gap-2'>
                            <button onClick={()=>navigate('/askpublicquestion')} className='bg-primary-900 text-white px-4 py-1 rounded'>Ask</button>
                            <button onClick={()=>navigate('/my-las')} className='bg-primary-900 text-white px-4 py-1 rounded'>LAS Profile</button>

                        </div>
                        
                    </div>
                    {isLoading ?
                    <Loader/>
                    :
                    <>
                    {questions?.map((obj)=><div  className='border shadow flex items-center justify-between px-4 py-3 rounded-md mb-2'>

                        <div className='flex items-center'>
                            <div className='px-4'>
                                <h1 className='text-xs'>{obj.likes} Likes</h1>
                             
                            </div>
                            <div className='pe-6'>
                                <p className='text-justify py-2 cursor-pointer' onClick={()=>navigate(`/publicquestion/${obj._id}`)}>{obj.title}</p>
                                {/* <p className='text-gray-400'>#redux #react #reducer #state</p> */}
                            </div>

                        </div>
                        <div className='h-full'>
                            <h1 className='text-xs text-end text-gray-500 lg:w-36'>Posted On : {obj.createdAt?.split('T')[0]}</h1>
                        </div>
                    </div>)}
                    </>}
                    <div className='w-full flex justify-end gap-2'>
                        {
                            pages?.map((val)=>
                            <button onClick={()=>pagechage(val)} className='text-white px-4 py-2 bg-primary-900 '>{val}</button>
                            )
                        }
                    </div>
                </div>
                <div>
                    <div className='w-full px-4 py-4  shadow rounded lg:mt-20'>
                        <div className='pb-4'>
                            <h1>Filter</h1>
                            {filter&&<h1 className='bg-primary-800 w-fit px-2 py-1 rounded-md text-white'>{filter} <FontAwesomeIcon onClick={()=>setFilter(undefined)} className='ps-2 cursor-pointer' icon={faClose}/></h1>}
                        </div>
                       {languages.map((val)=> <div className='flex gap-2 mb-2'>
                            <input checked={val===filter} onChange={(e)=>setFilter(val)} type="checkbox" className='h-6 w-6' name="" id="" />
                            <h1>{val}</h1>
                        </div>)}
                        

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicQuestions
