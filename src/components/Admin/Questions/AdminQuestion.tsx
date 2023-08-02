import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuestionTypes } from '../../../models/Questions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { getAllQuestionsAdmin } from '../../../services/question/question'
import { useSelector } from 'react-redux'
import { disableQueByAdmin, enableQueByAdmin } from '../../../services/Exam/Exam'

const AdminQuestion = () => {
    const navigate=useNavigate()
    const [questions,setQuestions]=useState<QuestionTypes[]>([])
    const [pages,setPages]=useState<number[]>([])
    const [selectedPage,setSelectedPage]=useState<number>(1)
    const {AdminId}=useSelector((state:any)=>state.admin)
    useEffect(() => {
        const fetch = async () => {
            const data = await getAllQuestionsAdmin(selectedPage)
            setQuestions(data.questions)
            setPages(data.pagination)
            
        }
        fetch()
    }, [selectedPage])
    const enable=async(qId?:string)=>{
        const data=await enableQueByAdmin(qId)
        if(data){
            let arr=questions.map((obj)=>{
                if(obj._id===qId){
                    return {...obj,status:true}
                }else{
                    return obj
                }
            })
            setQuestions(arr)

        }
    }
    const disable=async(qId?:string)=>{
        const data=await disableQueByAdmin(qId)
        if(data){
            let arr=questions.map((obj)=>{
                if(obj._id===qId){
                    return {...obj,status:false}
                }else{
                    return obj
                }
            })
            setQuestions(arr)
        }
    }
    
  return (
    <>
    <div className='w-full font-exo px-4 mb-8'>
        <div className='w-full flex items-center justify-end mb-4'>
            <button onClick={()=>navigate('/admin/add-question')} className='text-white bg-primary-900 px-2 py-1 rounded-md'>Add Question</button>
        </div>
        <div className='w-full ' >
            <div className='rounded-md overflow-hidden shadow hidden lg:block'>
            <table className='w-full rounded-md '>
                <thead className='bg-primary-900 h-10 '>
                    <tr>
                        <th className='text-start ps-2'>Question</th>
                        <th className='text-start w-80'>Answer</th>
                        <th className='text-start w-80'>Options</th>
                        <th className='text-start w-36'>Operations</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-100'>
                    {questions.map(obj=><tr className='border-2'>
                    
                        <td className='ps-1 py-2 ' ><p className=''> {obj.question}</p></td> 
                        <td className='ps-1 py-2 '>{obj.answer}</td>
                        <td className='ps-1 py-2 '>
                            {obj.options?.map((ele)=>{return  ele!==obj.answer ?  <><li>{ele}</li></> : ""})}
                        </td>
                        <td className='ps-1 flex items-center gap-2 py-4'>
                        {obj?.status ?  <FontAwesomeIcon onClick={()=>disable(obj._id)} icon={faEyeSlash} className='bg-red-600 text-white px-2 py-2 shadow rounded-md cursor-pointer' />: <FontAwesomeIcon onClick={()=>enable(obj._id)} icon={faEye} className='bg-green-600 text-white px-2 py-2 shadow rounded-md cursor-pointer' />}
                            {AdminId===obj.addedBy&&<FontAwesomeIcon icon={faEdit}  className='bg-blue-600 text-white px-2 py-2 shadow rounded-md cursor-pointer'/>}
                        </td>  
                    </tr>)}
                </tbody>
            </table>
            </div>
            <div className='w-full lg:hidden'>
            {questions.map(obj=><div className='w-full shadow px-4 pt-2 py-4 rounded'>
                    <div className='flex w-full justify-end gap-2'>
                        
                     {obj?.status ?  <FontAwesomeIcon onClick={()=>disable(obj._id)} icon={faEyeSlash} className='bg-red-600 text-white px-2 py-2 shadow rounded-md cursor-pointer' />: <FontAwesomeIcon onClick={()=>enable(obj._id)} icon={faEye} className='bg-green-600 text-white px-2 py-2 shadow rounded-md cursor-pointer' />}
                 {AdminId===obj.addedBy&& <FontAwesomeIcon icon={faEdit}  className='bg-blue-600 text-white px-2 py-2 shadow rounded-md cursor-pointer'/>   }
                    </div>
                
                    <p>{obj.question}</p>
                    <p>Ans : {obj.answer}</p>
                    <p>Options</p>
                    {obj.options?.map(ele=>{return obj.answer!==ele?<><li>{ele}</li> </>:''})}
                </div>)}
            </div>
            <div className='flex justify-end gap-1 mt-8'>
            {pages.map((obj)=>
                <button onClick={()=>setSelectedPage(obj)} className={`px-4 py-2 border border-primary-700 ${selectedPage===obj?'bg-primary-800 text-white ':''}`}>{obj}</button>
            )}
        </div>
        </div>
        
    </div>
    </>
  )
}

export default AdminQuestion
