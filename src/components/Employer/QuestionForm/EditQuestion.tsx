import React, { useEffect, useState } from 'react'
import { QuestionTypes } from '../../../models/Questions'
import { QuestionFormVali } from '../../../utils/Questions/QuestionValidation'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuestionAdmin, getQuestionEmp, updateQuestionAdmin, updateQuestionEmp } from '../../../services/question/question'
import { async } from 'q'
import Loader from '../../Loader/Loader'

interface editQue{
    role:string
}

const EditQuestion:React.FC<editQue> = ({role}) => {
    const {id}=useParams() 
    const [questions,setQuestion]=useState<QuestionTypes>()
    const [err,setErr] = useState<QuestionTypes>({question:'',answer:'',option1:'',option2:'',option3:''})
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()

    useEffect(() => {
        const fetch=async()=>{
            setIsLoading(true)
            if(role==='employer'&&id){
                let {data}=await getQuestionEmp(id)
                console.log(data);
                const options=data.options.filter((obj:string)=>obj!==data.answer)
                data={...data,option1:options[0],option2:options[1],option3:options[2]}
                setQuestion(data)

            }
            if(role==='admin'&&id){
                const data=await getQuestionAdmin(id)
                
                setQuestion(data)

            }
            setIsLoading(false)
        }
        fetch()
    }, [])


    
    



    const QuestionEnter=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const {name,value} = e.target
        setQuestion({...questions,[name]:value})
        QuestionFormVali(name,value,err,setErr)
        console.log(questions);
    }
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        if(questions && id){
            if(err.question==='',err.answer==='',err.option1==='',err.option2==='',err.option3===''){
                const {question,answer,difficulty,option1,option2,option3,code } = questions
                console.log({question,answer,difficulty,option1,option2,option3,code});
                
                if(question&&answer&&option1&&option2&&option3&&difficulty){
                
                   if(role==='employer'){
                    const res=await updateQuestionEmp(id,question,answer,option1,option2,option3,difficulty,code)
                    navigate('/employer/questions')
                   }else if(role==='admin'){
                    const res=await updateQuestionAdmin(id,question,answer,option1,option2,option3,difficulty,code)
                    navigate('/admin/questions')

                   }

                    
                }
            }
        }
    }
  return (
    <>
            <div className='font-exo w-full lg:px-60 mt-4'>
                {isLoading?
                <Loader/>
                :
                <div className='border mb-8 rounded shadow'>
                    <h1 className='text-center text-xl mt-3'>Edit Question</h1>
                    <form className='grid lg:grid-cols-2 grid-cols-1 lg:px-20 px-2 gap-2' onSubmit={handleSubmit} >
                        <div className='col-span-2'>
                            <label className=''>Question*</label>
                            <textarea onChange={QuestionEnter} value={questions?.question} name="question" id="" className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-40' required></textarea>
                            <p className='text-xs text-red-600 '>{err.question}</p>
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Code<span className='text-xs'>(optional)</span></label>
                            <textarea onChange={QuestionEnter} name="code" value={questions?.code} id="" className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-32' ></textarea>
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Difficulty*</label>
 
                            <select name="difficulty" id="" value={questions?.difficulty} onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Answer*</label>
                            <input name='answer' value={questions?.answer} onChange={QuestionEnter} type="text" className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' required/>
                            <p className='text-xs text-red-600 '>{err.answer}</p>

                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Option 1*</label>
                            <input name='option1' type="text" value={questions?.option1} onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' required/>
                            <p className='text-xs text-red-600 '>{err.option1}</p>

                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Option 2*</label>
                            <input name='option2' type="text" value={questions?.option2} onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' required/>
                            <p className='text-xs text-red-600 '>{err.option2}</p>

                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Option 3*</label>
                            <input name='option3' type="text" value={questions?.option3} onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' required/>
                            <p className='text-xs text-red-600 '>{err.option3}</p>

                        </div>

                        <div className='col-span-2 flex justify-center my-4'>
                            <button className='text-white bg-primary-900 px-2 py-1 rounded '>Add Question</button>
                        </div>


                    </form>
                </div>}
            </div>
        </>
  )
}

export default EditQuestion
