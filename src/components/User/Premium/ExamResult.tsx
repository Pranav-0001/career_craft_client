import React, { useEffect, useState } from 'react'
import { fetchMockResults } from '../../../services/Exam/Exam'
import { useParams } from 'react-router-dom'
import { MockresultTypes } from '../../../models/Exam'
import Loader from '../../Loader/Loader'

const ExamResult = () => {
    const {id}=useParams()
    const [result,setResult]=useState<MockresultTypes>()
    const [mark,setMark]=useState(0)
    const [isLoading,setIsLoading]=useState(false)

    useEffect(() => {
        const fetch=async()=>{

            if(id){
              setIsLoading(true)
                const data=await fetchMockResults(id)
                data.answers.shift()
                console.log(data);
                setResult(data)
                setMark(data.mark??0)
                setIsLoading(false)
            }
         
        }
        fetch()
    }, [])
    
  return (
    <div>
        
      {isLoading?
      <Loader/>
      :<div className='lg:grid grid-cols-2 lg:px-20 md:px-10 px-2 font-exo gap-2 mb-14'>
        <div className="col-span-2 mt-10 mb-2">
        <h1 className='text-2xl font-bold'>Result</h1>
        
        </div>
        <div className="col-span-2 mt-5 mb-8 text-lg bg-primary-200 w-fit px-8 py-4 rounded border border-primary-700 shadow">
            <h1 className='text-xl font-bold'>Marks : {mark}/10</h1>
            <h1 className={`${mark<=2?'text-red-600 ':'hidden'}`}>Poor Performance! Need Improvement 😭</h1>
            <h1 className={`${mark<=5 && mark>2?'text-orange-600 ':'hidden'}`}>Critical! Need Improvement 🥹</h1>
            <h1 className={`${mark<=7 && mark>5?'text-blue-600 ':'hidden'}`}>Good!😃</h1>
            <h1 className={`${mark<=9  && mark>7?'text-green-600 ':'hidden'}`}>Excellent! 😍</h1>
            <h1 className={`${mark==10?'text-green-600 ':'hidden'}`}>Extra Ordinary! 🤩</h1>
        </div>
        
        {result?.questions.map((obj,i)=><div key={obj._id} className=''>
            <p className='text-xl'>{i+1}. {obj.question}</p>
            {result.answers.find((ans)=>ans.queId===obj._id)?.userAns!==obj.answer&& <p className='rounded bg-red-200 mt-3 border border-red-500 w-1/2 py-2 px-2'>{result.answers.find((ans)=>ans.queId===obj._id)?.userAns ?? 'Not Answerd'}</p>}
            <p className='rounded bg-green-200 mt-3 border border-green-500 w-1/2 py-2 px-2'>{obj.answer}</p>

        </div>)}
      </div>}
    </div>
  )
}

export default ExamResult
