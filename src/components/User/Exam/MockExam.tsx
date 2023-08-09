import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchExam, postAnwer, setattended } from '../../../services/Exam/Exam'
import { ExamType } from '../../../models/Exam'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { googlecode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { fetchMockExam, setMockAttended ,postMockAnwer } from '../../../services/Exam/Mock Test';
import Loader from '../../Loader/Loader';

const MockExam = () => {
    const [exam, setExam] = useState<ExamType>({})
    const [answer, setANswer] = useState<{ queId?: string, userAns?: string ,status?:boolean}[]>([{}])
    const [exp,setExp]=useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const { userId } = useSelector((state:any) => state.user);
    const [isLoading,setIsLoading]=useState(false)


    useEffect(() => {
        const fetch = async () => {
            
            if (id) {
                setIsLoading(true)
                const examData: ExamType = await fetchMockExam(id)
                console.log(examData);
                
                setExam(examData);
                if (examData.attended){
                    setExp(true)
                    toast.error('Access Denied: Test Expired',{position:'top-center'})
                    
                    setTimeout(() => {
                        navigate('/')
                    }, 5000);
                }
                else if(examData.candidate !== userId) {
                    toast.error('Access Denied: You are attempting to attend the exam using a different user account. Please log in with the appropriate account to proceed with the exam.',{position:'top-center'})
                    setTimeout(() => {
                        navigate('/')
                    }, 5000);
                    
                }
                else {
                    setMockAttended(id)
                }
                setIsLoading(false)
            }
        }
        fetch()
    }, [])
    



    
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const selectingAns = (qId?: string, userAns?: string,ans?:string) => {
        const newArr = answer.filter(obj => obj.queId !== qId)
        setANswer([...newArr, { queId: qId, userAns: userAns ,status:ans===userAns }])

    }
   
    
    
    const handleSubmit=async()=>{
        
        const res=await postMockAnwer(answer,exam._id,userId)
        if(res){
            navigate('/')
        }
    }
    return (
        <>

        {userId=== exam.candidate ? <div>
          
            {isLoading?<Loader/>:<div className={`${exp&&'hidden'} lg:px-80 md:px-20 px-2 my-12`}>

                {exam.questions?.map((que, i) =>
                    <>


                        <div key={i} className='w-full  mb-2 px-2 pb-4   rounded-md'>
                            <p className='break-all py-2'>
                                {i + 1}. {que.question}
                            </p>
                            {que.code?.trim() && <div className='rounded-lg overflow-hidden mb-2 shadow w-fit'>

                                <SyntaxHighlighter language="plaintext" style={googlecode} showLineNumbers>
                                    {que.code.trim()}
                                </SyntaxHighlighter>
                            </div>}
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-2 md:gap-4'>
                                {que.options?.map((val, i) =>
                                    <div onClick={() => selectingAns(que._id, val,que.answer)} className={`flex gap-2  px-2 py-2 cursor-pointer rounded-md shadow  ${answer.some(obj => obj.userAns === val) ? 'shadow-green-300 border-2 border-green-300' : 'shadow-primary-300 border'}  `}>
                                        <h1>{i + 1}. </h1>
                                        <h1>{val}</h1>
                                    </div>
                                )}
                            </div>

                        </div>

                    </>
                )}
                <div className='w-full flex justify-center mt-6 '>
                    <button onClick={handleSubmit} className='bg-primary-700 px-4 text-white py-2 rounded-md shadow-md'>Submit</button>
                </div>
            </div>}
           
        </div>
        :
        <div>
           
        </div>
        }
         <ToastContainer />
        </>
    )
}

export default MockExam
