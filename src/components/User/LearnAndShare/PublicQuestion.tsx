import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EditMyPublicAns, UnlikeQuestionById, getAnswers, getMyAnswer, getPublicQue, getPublicQuestions, likeAnswerById, likeQuestionById, postPublicAns, unlikeAnswerById } from '../../../services/LAS/LAS'
import { PublicAnswer, PublicQuestion } from '../../../models/PublicQuestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faClose, faThumbsUp as faThumbsUpFill } from '@fortawesome/free-solid-svg-icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { validatePublicQue } from '../../../utils/user/validatePublicQue'
import { useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'


const PublicQuestionview = () => {
  const { id } = useParams()
  const navigate=useNavigate()
  const [question, setQuestion] = useState<PublicQuestion>()
  const [topQuestion, setTopQuestion] = useState<PublicQuestion[]>([])
  const [answerModal, setAnswerModal] = useState(false)
  const [PublicAnswers, setPublicAnswers] = useState<PublicAnswer[]>([])
  const [editModal, setEditModal] = useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [myanswer, setMyanswer] = useState<PublicAnswer>({ questionId: id })
  const [editmyanswer, setEditMyanswer] = useState<PublicAnswer>({ questionId: id })
  const [err, setErr] = useState('')
  const [editErr, seteditErr] = useState('')
  const [answerData, setAnswer] = useState<PublicAnswer>()
  const { userId } = useSelector((state: any) => state.user);

  useEffect(() => {
    async function fetch() {
      if (id) {
        setIsLoading(true)
        const data = await getPublicQue(id)
        const myans = await getMyAnswer(id, userId)
        const answer = await getAnswers(id)
        const top=await getPublicQuestions(1)
  
        setQuestion(data)
        setMyanswer(myans)
        setEditMyanswer(myans)
        setTopQuestion(top.questions)
        const pAns = answer.filter((obj: PublicAnswer) => obj.addedBy?._id !== userId)
        setPublicAnswers(pAns)
        setIsLoading(false)
      }

    }
    fetch()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAnswer({ ...answerData, [name]: value })
    const Err = validatePublicQue(name, value)
    setErr(Err)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditMyanswer({ ...editmyanswer, [name]: value })
    const Err = validatePublicQue(name, value)
    seteditErr(Err)
  }

  const likeAnswer=async(answerId?:string)=>{
    if(answerId){
      const data=await likeAnswerById(answerId,userId)
      if(data){
        const newArr=PublicAnswers.map((obj)=>{
          if(obj._id===answerId){
            return {...obj,likes:obj.likes?obj.likes+1:1,likedBy:[...obj?.likedBy??[],userId]}
          }else{
            return obj
          }
        })
        setPublicAnswers(newArr)
      }
    }
  }

  const UnlikeAnswer=async(answerId?:string)=>{
    if(answerId){
      const data=await unlikeAnswerById(answerId,userId)
      if(data){
        const newArr=PublicAnswers.map((obj)=>{
          if(obj._id===answerId){
            return {...obj,likes:obj.likes?obj.likes-1:0,likedBy:[...obj?.likedBy?.filter(ele=>ele!==userId)??[]]}
          }else{
            return obj
          }
        })
        setPublicAnswers(newArr)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (answerData && question?._id) {
      const { answer, code } = answerData
      if (answer) {
        if (err === '') {
          postPublicAns(question?._id, userId, answer, code)
        }
      }
    }

  }
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editmyanswer && editmyanswer?._id) {
      const { answer, code } = editmyanswer
      if (answer) {
        if (err === '') {
          EditMyPublicAns(editmyanswer?._id, answer, code)
          setMyanswer({ ...myanswer, answer: answer, code: code })
        }
      }
    }
  }
  const likeQuestion=async()=>{
    if(question?._id){
      const data=await likeQuestionById(question?._id,userId)
      const newArr:string[]=[...question.likedBy?question.likedBy:[''],userId]
      const like=question.likes?question.likes+1:1;
      setQuestion({...question,likedBy:newArr,likes:like})
    } 
  }
  const unlikeQuestion=async()=>{
    if(question?._id){
      const data=await UnlikeQuestionById(question?._id,userId)
      const like=question.likes?question.likes-1:0;
      if(question.likedBy){
        const newArr:string[]=question.likedBy.filter((obj)=>userId!==obj)
        setQuestion({...question,likedBy:newArr,likes:like})
      }
    } 
  }

  return (
    <>

    {isLoading ? 
    <Loader/>
    :<div>
      <div className='lg:grid grid-cols-4 lg:px-20 md:px-8 px-2 font-exo gap-3'>
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
                <p className='text-xs'>Answers : {PublicAnswers.length}</p>

              </div>

              {question?.answeredBy?.includes(userId) ? <button onClick={() => setEditModal(true)} className='bg-primary-700 text-white px-3  py-2 rounded shadow'>Edit Answer</button> : <button onClick={() => setAnswerModal(true)} className='bg-primary-700 px-2 py-1 rounded text-white shadow'>Answer</button>}


            </div>
          </div>
          <div className='flex gap-4 py-3'>
            <div className='flex items-center gap-2'>
             {question?.likedBy?.includes(userId) ? <button onClick={unlikeQuestion}><FontAwesomeIcon className='text-4xl' icon={faThumbsUpFill} /></button> :  <button onClick={likeQuestion}><FontAwesomeIcon className='text-4xl' icon={faThumbsUp} /></button>}
              <h1 className='text-xl font-bold'>{question?.likes}</h1>
            </div>
            <div>
              <p className='text-lg text-justify'>{question?.question}</p>
            </div>
          </div>
          {question?.code && <div className='py-2 rounded shadow bg-white'>
            <SyntaxHighlighter language="plaintext" style={googlecode} showLineNumbers>
              {question?.code.trim()}
            </SyntaxHighlighter>
          </div>}
          <div className='mt-2 mb-6'>
            {
              myanswer && 
              <div>
                <h1 className='text-xl font-semibold font-exo mt-6 pb-2'>Your Answer</h1>
                <div className='w-full border py-2 px-3 rounded shadow'>
                  <div className='flex gap-2 pb-2 border-b-2'>
                    <div>
                      <img src={myanswer.addedBy?.profileImg} alt="" className='h-14 rounded-full' />
                    </div>
                    <div className='flex items-center justify-between w-full'>
                      <div>
                        <h1 className='text-lg'>{myanswer.addedBy?.username}</h1>
                      <p className='text-xs'>Posted On :  {myanswer.createdAt?.split('T')[0]}</p>
                      </div>
                      <div>
                        <h1>Likes :  {myanswer.likes}</h1>
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <p className='text-justify'>{myanswer.answer}</p>
                    {myanswer.code && <div className='py-2 rounded shadow bg-white'>
                      <SyntaxHighlighter language="plaintext" style={googlecode} showLineNumbers>
                        {myanswer?.code.trim()}
                      </SyntaxHighlighter>
                    </div>}
                  </div>
                </div>
              </div>
            }
            {
              PublicAnswers.length > 0 && <div>
                <h1 className='text-xl font-semibold font-exo mt-6 pb-2 mb-6'> Answers</h1>
                {PublicAnswers.map(obj =>
                  <div className='mb-2'>
                  
                  <div className='w-full border py-2 px-3 rounded shadow'>
                    <div className='flex gap-2 pb-2 border-b-2'>
                      <div>
                        <img src={obj.addedBy?.profileImg} alt="" className='h-14 rounded-full' />
                      </div>
                      <div className='flex items-center justify-between w-full'>
                        <div>
                          <h1 className='text-lg'>{obj.addedBy?.username}</h1>
                        <p className='text-xs'>Posted On :  {obj.createdAt?.split('T')[0]}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                          {obj.likedBy?.includes(userId) ? <h1 className='text-2xl cursor-pointer' onClick={()=>UnlikeAnswer(obj?._id)} ><FontAwesomeIcon icon={faThumbsUpFill}/></h1> : <h1 className='text-2xl cursor-pointer' onClick={()=>likeAnswer(obj?._id)} ><FontAwesomeIcon icon={faThumbsUp}/></h1>}
                          <h1 className='text-lg'>{obj.likes}</h1>
                        </div>
                        
                      </div>
                    </div>
                    <div>
                      <p className='text-justify'>{obj.answer}</p>
                      {obj.code && <div className='py-3 rounded shadow bg-white '>
                        <SyntaxHighlighter language="plaintext" style={googlecode} showLineNumbers>
                          {obj?.code.trim()}
                        </SyntaxHighlighter>
                      </div>}
                    </div>
                  </div>
                </div>
                )}
              </div>
            }
          </div>
        </div>
        <div className='hidden lg:block h-fit px-2 mt-10'>
          <div className='bg-primary-600'>
            <h1 className='text-white text-xl ps-2 py-2 border-b-2 w-fit px-4 '>Top Questions</h1>
            {topQuestion.map((obj,i)=>
              <p className='px-5 text-justify py-2 cursor-pointer' onClick={()=>navigate(`/publicquestion/${obj._id}`) }>{i+1}. {obj.title}</p>
              )}  
          </div>
        </div>
      </div>

      {answerModal && <div className='absolute top-0 w-full flex    justify-center px-2 py-40 font-exo'>
        <form className='w-full md:w-1/2 lg:w-1/2 shadow bg-white px-4 py-2 rounded' onSubmit={handleSubmit}>
          <h1 className='text-end text-xl cursor-pointer'><FontAwesomeIcon icon={faClose} onClick={() => setAnswerModal(false)} /></h1>
          <div className='w-full flex justify-center'>
            <h1 className='text-xl font-bold'>Submit Answer</h1>
          </div>
          <div >
            <p>Answer</p>
            <textarea onChange={handleChange} name="answer" id="" className='px-2 h-10 w-full shadow border rounded' ></textarea>
            <p className='text-xs text-red-600'>{err}</p>
          </div>
          <div >
            <p>Code <span className='text-xs'>(optional)</span></p>
            <textarea onChange={handleChange} name="code" id="" className='h-32 w-full shadow border rounded px-2' ></textarea>
          </div>
          <div className='flex w-full justify-center py-4'>
            <button className='bg-primary-800 px-3 py-2 rounded shadow text-white'>Submit</button>
          </div>
        </form>
      </div>}
      {editModal && <div className='absolute top-0 w-full flex    justify-center px-2 py-40 font-exo'>
        <form className='w-full md:w-1/2 lg:w-1/2 shadow bg-white px-4 py-2 rounded' onSubmit={handleEditSubmit}>
          <h1 className='text-end text-xl cursor-pointer'><FontAwesomeIcon icon={faClose} onClick={() => setEditModal(false)} /></h1>
          <div className='w-full flex justify-center'>
            <h1 className='text-xl font-bold'>Edit Your Answer</h1>
          </div>
          <div >
            <p>Answer</p>
            <textarea onChange={handleEditChange} name="answer" value={editmyanswer.answer} id="" className='px-2 h-16 w-full shadow border rounded py-1' ></textarea>
            <p className='text-xs text-red-600'>{editErr}</p>
          </div>
          <div >
            <p>Code <span className='text-xs'>(optional)</span></p>
            <textarea onChange={handleEditChange} value={editmyanswer.code} name="code" id="" className='h-32 w-full shadow border rounded px-2' ></textarea>
          </div>
          <div className='flex w-full justify-center py-4'>
            <button className='bg-primary-800 px-3 py-2 rounded shadow text-white'>Submit</button>
          </div>
        </form>
      </div>}
    </div>}
    </>
  )
}

export default PublicQuestionview

