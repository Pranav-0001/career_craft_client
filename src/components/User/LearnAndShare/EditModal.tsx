import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { getPublicQue, updatepublicquestion } from '../../../services/LAS/LAS'
import { PublicQuestion } from '../../../models/PublicQuestion'
import { validatePublicQue } from '../../../utils/user/validatePublicQue'

interface editModalType{
    setEditModal:Function,
    questionId:string,
    setQuestions:Function,
    questions:PublicQuestion[] 
}

const EditModal:React.FC<editModalType> = ({setEditModal,questionId,questions,setQuestions}) => {
    const [question,setQuestion]=useState<PublicQuestion>()
    const [err,setErr]=useState<PublicQuestion>({title:'',language:'',question:''})
    useEffect(() => {
        const fetch=async()=>{
            const data=await getPublicQue(questionId)
            
            
            setQuestion(data)
        }
        fetch()
    }, [])
    const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value}=e.target
        setQuestion({...question,[name]:value})
        const Err=validatePublicQue(name,value)
        setErr({...err,[name]:Err})
      }

      const handlesubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        if(err?.title===''&&err.language===''&&err.question===''){
            if(question?.title && question.language && question.question&&question._id){
                const data=await updatepublicquestion(question._id,question.title,question.language,question.question,question?.code)
                const newArr=questions.map((obj)=>{
                    if(obj._id!==questionId) return obj
                    else return {...obj,title:question.title,question:question.question}
                })
                setQuestions(newArr)
                setEditModal(false)
            }
        }

      }
  return (
    <div className='w-full flex justify-center  fixed top-16 items-center font-exo ' style={{height:'90vh'}}>
        <div className='bg-white px-2 py-2 rounded shadow-md '>
            <div className='w-full flex justify-end '>
                <FontAwesomeIcon className='font-bold text-xl cursor-pointer' onClick={()=>setEditModal(false)} icon={faClose}/>
            </div>
            <h1 className='text-center font-bold mb-4 text-lg'>Edit Public Question</h1>
        <form onSubmit={handlesubmit} className='lg:grid grid-cols-2 gap-2 '>
            
            <div>
                <p>Title </p>
                <input name='title' onChange={handleChange} value={question?.title} className='w-96 py-2 px-2 border rounded border-primary-500 outline-primary-900' type="text" />
                <p className='text-xs text-red-600'>{err?.title}</p>
            </div>
            <div>
                <p>Language</p>
            <input  name='language' onChange={handleChange} value={question?.language} className='w-96 py-2 px-2 border rounded border-primary-500 outline-primary-900' type="text" />
            <p className='text-xs text-red-600'>{err?.language}</p>
            </div>
            <div>
            <p>Question</p>

                <textarea  onChange={handleChange} value={question?.question} name="question" id="" className='h-32 w-96 py-2 px-2 border rounded border-primary-500 outline-primary-900'></textarea>
                <p className='text-xs text-red-600'>{err?.question}</p>
            </div>
            <div>
            <p>Code <span className='text-xs'>(optional)</span></p>

                <textarea onChange={handleChange} value={question?.code} name="code" id="code" className='h-32 w-96 py-2 px-2 border rounded border-primary-500 outline-primary-900'></textarea>
            </div>
            <div className='col-span-2 flex justify-center'>
                <button className='bg-primary-800 text-white px-4 py-2 rounded shadow mb-8'>Update</button>

            </div>
        </form>
        </div>
    </div>
  )
}

export default EditModal
