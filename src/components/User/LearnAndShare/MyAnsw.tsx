import React, { useEffect, useState } from 'react'
import { PublicAnswer, PublicAnswerWithQUe } from '../../../models/PublicQuestion'
import { getMyPublicAnswers } from '../../../services/LAS/LAS'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyAnsw = () => {
    const [answers,setAnswers]=useState<PublicAnswerWithQUe[]>([])
    const { userId,image ,username} = useSelector((state:any) => state.user);
    const navigate=useNavigate()


    useEffect(()=>{
        const fetch=async()=>{
            const data=await getMyPublicAnswers(userId)
            setAnswers(data)
        }
        fetch()
    },[])
  return (
    <div className='md:grid grid-cols-2 px-2 gap-2 lg:px-10 md:px-6 font-exo  mb-8 mt-4'>
    {answers.map((ans)=><div className='px-2 border rounded py-2 mb-2 md:mb-0'>
        <p className='cursor-pointer ' onClick={()=>navigate(`/publicquestion/${ans.questionId?._id}`)}>{ans.questionId?.question}</p>
        <div className='border shadow py-2 rounded mt-2'>
            <div className='flex px-2  justify-between'>
                <div className='flex gap-2 font-bold'>
                <img src={image} className='h-8 rounded-full' alt="" />
                <h1>{username}</h1>
                </div>
                <div>
                    <h1>likes : {ans.likes}</h1>
                </div>
                

            </div>
            <div className=' px-4'>
                <div className='shadow bg-white my-2 px-2 rounded'>
                   <p className='py-2'>{ans.answer}</p> 
                </div>
                
            </div>
        </div>
    </div>)}
    </div>
  )
}

export default MyAnsw
