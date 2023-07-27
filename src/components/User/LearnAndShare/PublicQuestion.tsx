import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPublicQue, postPublicAns } from '../../../services/LAS/LAS'
import { PublicAnswer, PublicQuestion } from '../../../models/PublicQuestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClose, faThumbsUp as faThumbsUpFill } from '@fortawesome/free-solid-svg-icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { validatePublicQue } from '../../../utils/user/validatePublicQue'
import { useSelector } from 'react-redux'


const PublicQuestionview = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState<PublicQuestion>()
  const [answerModal,setAnswerModal]=useState(false)
  const [err,setErr]=useState('')
  const [answerData,setAnswer]=useState<PublicAnswer>()
  const { userId } = useSelector((state:any) => state.user);

  useEffect(() => {
    async function fetch() {
      if (id) {
        const data = await getPublicQue(id)
        console.log(data);
        setQuestion(data)
      }

    }
    fetch()
  }, [])

  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {name,value}=e.target
     setAnswer({...answerData,[name]:value})
     const Err=validatePublicQue(name,value)
     setErr(Err)
  }

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    if (answerData&&question?._id){
      const {answer,code} = answerData
      if(answer){
        if(err===''){
          postPublicAns(question?._id,userId,answer,code)
        }
      }
    }
    
  }

  return (
    <div>
      <div className='grid grid-cols-4 lg:px-20 md:px-8 px-2 font-exo '>
        <div className='col-span-3 pt-6 '>
          <div className='border-b-2'>
            <p className='text-2xl'>{question?.title}</p>
            <div className='flex gap-2 items-center'>
                <img src={question?.addedBy?.profileImg} alt="" className='h-10 rounded-full' />
                <div>
                <h1>{question?.addedBy?.username}</h1>
                </div>
            </div>
            <div className='flex gap-2 py-2 justify-between'>
            
              <div className='flex gap-2'>
                <p className='text-xs'>Posted on : {question?.createdAt?.split('T')[0]}</p>
              <p className='text-xs'>Answers :</p>
              
              </div>
              
              {question?.answeredBy?.includes(userId) ? <button className='bg-primary-700 text-white px-3  py-2 rounded shadow'>Edit Answer</button>: <button onClick={()=>setAnswerModal(true)} className='bg-primary-700 px-2 py-1 rounded text-white shadow'>Answer</button>}
              

            </div>
          </div>
          <div className='flex gap-4 py-3'>
            <div className='flex items-center gap-2'>
              <button><FontAwesomeIcon className='text-4xl' icon={faThumbsUp}/></button>
              <h1 className='text-xl font-bold'>{question?.likes}</h1>
            </div>
            <div>
              <p className='text-lg text-justify'>{question?.question}</p>
            </div>
          </div>  
          {question?.code&&<div className='py-2 rounded shadow bg-white'>
            <SyntaxHighlighter language="plaintext" style={googlecode} showLineNumbers>
              {question?.code.trim()}
            </SyntaxHighlighter>  
          </div>}
        </div>
        <div>
        </div>
      </div>
      {answerModal&&<div className='absolute top-0 w-full flex    justify-center px-2 py-40 font-exo'>
        <form className='w-full md:w-1/2 lg:w-1/2 shadow bg-white px-4 py-2 rounded' onSubmit={handleSubmit}>
          <h1 className='text-end text-xl cursor-pointer'><FontAwesomeIcon icon={faClose} onClick={()=>setAnswerModal(false)} /></h1>
          <div className='w-full flex justify-center'>
            <h1 className='text-xl font-bold'>Submit Answer</h1>
          </div>
          <div >
            <p>Answer</p>
            <textarea onChange={handleChange}  name="answer" id="" className='px-2 h-10 w-full shadow border rounded' ></textarea>
            <p className='text-xs text-red-600'>{err}</p>
          </div>
          <div >
            <p>Code <span className='text-xs'>(optional)</span></p>
            <textarea onChange={handleChange}  name="code" id="" className='h-32 w-full shadow border rounded px-2' ></textarea>
          </div>
          <div className='flex w-full justify-center py-4'>
            <button className='bg-primary-800 px-3 py-2 rounded shadow text-white'>Submit</button>
          </div>
        </form>
      </div>}
    </div>
  )
}

export default PublicQuestionview

