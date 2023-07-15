import React, { useState } from 'react'
import { QuestionTypes } from '../../../models/Questions'
import { useSelector } from 'react-redux'

interface queModel {
    role: string
}

const QuestionForm: React.FC<queModel> = ({ role }) => {
    const {AdminId} = useSelector((state:any)=>state.admin)
    const { EmployerId } = useSelector((state: any) => state.employer);
    const addedBy:string= role==='employer' ? EmployerId : AdminId
    const [quesion,setQuesion]=useState<QuestionTypes>({addedBy:addedBy,role:role,difficulty:'Easy'})

    const QuestionEnter=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const {name,value} = e.target
        setQuesion({...quesion,[name]:value})
        console.log(quesion);
        

    }

    return (
        <>
            <div className='font-exo w-full '>
                <div className='border mb-8 rounded shadow'>
                    <h1 className='text-center text-xl mt-3'>Add Question</h1>
                    <form className='grid lg:grid-cols-2 grid-cols-1 lg:px-20 px-2 gap-2' action="">
                        <div className='col-span-2'>
                            <label className=''>Question*</label>
                            <textarea onChange={QuestionEnter} name="question" id="" className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-40' ></textarea>
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Code<span className='text-xs'>(optional)</span></label>
                            <textarea onChange={QuestionEnter} name="code" id="" className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-32' ></textarea>
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Difficulty*</label>
 
                            <select name="difficulty" id="" onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Answer*</label>
                            <input name='answer' onChange={QuestionEnter} type="text" className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' />
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Option 1*</label>
                            <input name='option1' type="text" onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' />
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Option 2*</label>
                            <input name='option2' type="text" onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' />
                        </div>
                        <div className='col-span-2 lg:col-span-1'>
                            <label className=''>Option 3*</label>
                            <input name='option3' type="text" onChange={QuestionEnter} className='outline-primary-500 border-2 rounded-md w-full border-primary-200 px-2 h-10' />
                        </div>

                        <div className='col-span-2 flex justify-center my-4'>
                            <button className='text-white bg-primary-900 px-2 py-1 rounded '>Add Question</button>
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}

export default QuestionForm
