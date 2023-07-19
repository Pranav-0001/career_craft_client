import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchExam, fetchResults } from '../../../services/Exam/Exam'
import { ExamType, resultTypes } from '../../../models/Exam'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);



function ExamResult() {
  
  const [result, setResult] = useState<resultTypes[]>()
  const [mark,setMark]=useState<number>(1)
  const { id } = useParams()
 
  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const data = await fetchResults(id)
        data.shift()
        setResult(data);
        setMark(data.mark)
      }
    }
    fetch()
  }, [])
  console.log(result);
  
  const Doughnutdata = {
    labels: ['Non-Premium users', 'Premium users'],
    datasets: [
      {
        data: [1,mark],
        backgroundColor: ['#f74f4f', '#38cf25'],
        hoverBackgroundColor: ['#e32719', '#208513'],
      },
    ],
  };


  return (
    <div className='lg:px-20'>
      <div className=''>
        <div className='   rounded-md w-1/4'>
          <h2 className='font-work ps-3 pt-3 text-xl'>Users Chart</h2>
          <Doughnut data={Doughnutdata} className='my-3' />
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
