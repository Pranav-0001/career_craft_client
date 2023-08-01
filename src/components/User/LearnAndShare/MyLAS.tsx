import React, { useState } from 'react'
import { PublicAnswer, PublicQuestion } from '../../../models/PublicQuestion'
import MyQues from './MyQues'
import MyAnsw from './MyAnsw'

const MyLAS = () => {
  const [page,setPage]=useState<string>('ans')
  const [questions,setQuestions]=useState<PublicQuestion[]>([])
  const [answers,setAnswers]=useState<PublicAnswer[]>([])
  return (
    <div>
      <div className='flex items-center w-full justify-center'>
        <div className='div flex items-center gap-2  rounded-full overflow-hidden mt-4'>
          <h1 onClick={()=>setPage('que')} className={`px-4 ${page==='que' ?  'bg-primary-700 text-white' : 'bg-white text-black'} cursor-pointer py-1 shadow border font-exo font-bold rounded-full`}> My Questions</h1>
          <h1 onClick={()=>setPage('ans')} className={`px-4  ${page==='ans' ?  'bg-primary-700 text-white' : 'bg-white text-black'} cursor-pointer py-1 shadow border font-exo font-bold  rounded-full`}> My Answers</h1>

        
        </div>
      </div>
      {page==='que'?<MyQues/>:<MyAnsw/>}
    </div>
  )
}

export default MyLAS
