import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchExam, fetchResults } from '../../../services/Exam/Exam'
import { ExamType, resultTypes } from '../../../models/Exam'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartData } from "chart.js";
import { User } from '../../../models/User';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);



function ExamResult() {

  const [result, setResult] = useState<resultTypes[]>()
  const [mark, setMark] = useState<number>(10)
  const [candidate,setCandidate]=useState<User>()
  const [doughnut, setDoughnutData] = useState<ChartData<"doughnut", number[], unknown>>()
  const { id } = useParams()



  useEffect(() => {
    // Update Doughnutdata whenever mark changes
    const Doughnutdata = {
      labels: ['Wrong', 'Correct'],
      datasets: [
        {
          data: [10 - mark, mark],
          backgroundColor: ['#f74f4f', '#38cf25'],
          hoverBackgroundColor: ['#e32719', '#208513'],
        },
      ],
    };
    setDoughnutData(Doughnutdata);
  }, [mark]);
  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const data = await fetchResults(id)
        data.examData.shift()
        setResult(data.examData);
        setCandidate(data.candidate.candidate)
        
        
        setMark(data.examData[0].mark)
      }
    }
    fetch()
  }, [id])
 


  return (
    <div className='lg:px-20 px-2'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 my-3'>
        <div className='lg:col-span-2 py-4'>
          <div className='flex items-center gap-2'>
            <img src={candidate?.profileImg} alt="" className='md:h-30 h-32 rounded-md' />
            <div className='font-exo'>
              <h1 className='text-xl'>{candidate?.firstname} {candidate?.lastname}</h1>
              <p className='text-sm'>{candidate?.email}</p>
              <p className='text-sm'>{candidate?.basic?.phone}</p>
            </div>
          </div>
          <div className='lg:w-2/3 w-full  mt-6'>
            <div className='bg-yellow-200 px-6 divide-y-2 divide-black'>
              <div className='flex justify-between py-2 '>
                <h1>Total Questions</h1>
            
                <h1>10</h1>
              </div>
              <div className='flex justify-between py-2'>
                <h1>Marks</h1>
                <h1>{mark}</h1>
              </div>
              <div className='flex justify-between py-2'>
                <h1>Wrong</h1>
                <h1>{10-mark}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className='   rounded-md '>
          <h2 className='font-work ps-3 pt-3 text-xl'></h2>
          {doughnut && <Doughnut data={doughnut} className='' />}
        </div>
      </div>
      <div className='grid md:grid-cols-2 mb-10'>

        {result?.map((obj, i) => <div className='px-8'>
          <h1 className='py-3'>{i + 1} . {obj?.question[0].question}</h1>
          {obj.question[0].code && <div className='rounded-lg mb-2 overflow-hidden shadow'><SyntaxHighlighter language="plaintext" style={googlecode} showLineNumbers>
            {obj.question[0].code.trim()}
          </SyntaxHighlighter></div>}
          <div className='grid grid-cols-2 gap-2'>
            {obj.question[0].options?.map((val) => <h1 className={`${obj.question[0].answer === val ? 'border-green-500 bg-green-200 ' : (obj.question[0].answer !== obj.answers.userAns && obj.answers.userAns === val) ? 'border-red-500 bg-red-200' : 'border-black'} border px-2 py-2 rounded-md `}>{val}</h1>)}
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default ExamResult
