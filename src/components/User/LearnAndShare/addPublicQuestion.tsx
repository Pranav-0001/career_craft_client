import React, { ChangeEvent, useState } from 'react'
import { PublicQuestion } from '../../../models/PublicQuestion'
import { validatePublicQue } from '../../../utils/user/validatePublicQue'
import { uploadQuestion } from '../../../services/LAS/LAS'
import { useSelector } from 'react-redux'

const AddPublicQuestion = () => {
  const { userId } = useSelector((state:any) => state.user);
  
  const [Pquestion,setQuestion]=useState<PublicQuestion>()

  const [err,setErr]=useState<PublicQuestion>()
  const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value}=e.target
    setQuestion({...Pquestion,[name]:value})
    const Err=validatePublicQue(name,value)
    setErr({...err,[name]:Err})
  }
  const handleSUbmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    if(Pquestion){
      const {title,language,question} = Pquestion
      if(title&&language&&question){
        if(err?.title===''&&err.language===''&&err.question===''){
          const res=await uploadQuestion(Pquestion,userId)
        }
      }
    }
    
  }
  return (
    <>
      <form onSubmit={handleSUbmit}  className='lg:grid grid-cols-2 lg:px-40 gap-3 px-4 md:px-10 mt-16'>
        <div className='col-span-2'>
          <h1 className='text-center text-2xl font-bold  '>Ask A Public Question</h1>
        </div>
        <div>
          <p>Title</p>
          <input  type="text" onChange={handleChange} className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded' name="title" id="" required/>
          <p className='text-xs text-red-600'>{err?.title}</p>
        </div>
        <div>
          <p>language</p>
          <input type="text" onChange={handleChange} className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded' name="language" id="" required/>
          <p className='text-xs text-red-600'>{err?.language}</p>
        </div>
        <div>
          <p>Question</p>
          <textarea onChange={handleChange} className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded h-40' name="question" id="" required></textarea>
          <p className='text-xs text-red-600'>{err?.question}</p>
        </div>
        <div>
          <p>Code <span className='text-xs text-gray-400'>(optional)</span> </p>
          <textarea onChange={handleChange} className='w-full py-2 px-2 outline-primary-600 border border-primary-400 rounded h-40' name="code" id="" ></textarea>
        </div>
        <div className='col-span-2 flex justify-center'>
          <button className='px-2 py-1 rounded bg-primary-600 text-white'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default AddPublicQuestion
