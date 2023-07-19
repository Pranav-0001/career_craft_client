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



const Exam = () => {
    const [exam, setExam] = useState<ExamType>({})
    const [timeup,setTimeup] =useState(false)
    const [timer, setTimer] = useState(900);
    const [answer, setANswer] = useState<{ queId?: string, userAns?: string ,status?:boolean}[]>([{}])
    const [timerId, setTimerId] = useState<NodeJS.Timeout|null>();
    const { id } = useParams()
    const navigate = useNavigate()
    const { userId } = useSelector((state:any) => state.user);

    useEffect(() => {
        const fetch = async () => {
            if (id) {
                const examData: ExamType = await fetchExam(id)
                setExam(examData);
                if (examData.attended) navigate('/chat')
                else if(examData.candidate !== userId) {
                    toast.error('Access Denied: You are attempting to attend the exam using a different user account. Please log in with the appropriate account to proceed with the exam.',{position:'top-center'})
                    setTimeout(() => {
                        navigate('/')
                    }, 5000);
                    
                }
                else {
                    setattended(id)
                }
            }
        }
        fetch()
    }, [])
    
    useEffect(() => {
        
        
        const startTimer = () => {
          const id = setTimeout(() => {
          
            setTimeup(true)
 
          }, 15 * 60 * 1000); 
          setTimerId(id);
        };
        startTimer();
        return () => {
          if(timerId) clearTimeout(timerId);
        };
      }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    return prevTimer;
                }
                return prevTimer - 1;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
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
        
        const res=await postAnwer(answer,exam._id)
        if(res){
            navigate('/')
        }
    }
    return (
        <>
        {timeup &&
        <div className='w-full h-96 flex justify-center items-center'>
            <div className='lg:w-1/3 md:w-2/3 w-full  bg-white rounded-md shadow-md text-center ' >
                <h1 className='font-exo py-3 text-2xl'>Time Exceeded: The time limit for the exam has been exceeded.</h1>
                <button onClick={handleSubmit} className='px-2 py-1 bg-red-500 text-white text-xl font-bold font-exo rounded-lg mb-2'>OK</button>
            </div>

        </div>
        }
        {userId=== exam.candidate && timeup===false ? <div>
            <div className='w-full flex justify-end sticky top-0  pe-20 pt-10'>
                <h1 className='font-work font-bold text-xl text-red-600'><FontAwesomeIcon icon={faClock} /> {formatTime(timer)}</h1>
            </div>
            <div className='lg:px-80 md:px-20 px-2 my-12'>

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
            </div>
           
        </div>
        :
        <div>
           
        </div>
        }
         <ToastContainer />
        </>
    )
}

export default Exam
