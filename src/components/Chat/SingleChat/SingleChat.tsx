import { faCircleArrowUp, faFilePen, faL, faPaperPlane, faPaperclip, faVideo, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react'
import { Chats, Message } from '../../../models/chat';
import { fetchAllMessages, sendMessage } from '../../../services/Chats/Chat';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import './singlechat.css'
import { useSelector } from 'react-redux';
import { generateNewExam } from '../../../services/Exam/Exam';
import { useNavigate } from 'react-router-dom';
import { createOffer, init } from '../../../services/Video/VideoChat';
import { useSocket } from '../../../context/socketContext';
import ChatLoader from '../../Loader/ChatLoader';
import MessageLoader from '../../Loader/MessageLoader';

interface selectedUser {
  user: Chats
  currentUserId: string 
  setLastMessage:Function
}



const SingleChat: React.FC<selectedUser> = ({ user, currentUserId ,setLastMessage }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setisOpen] = useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const ENDPOINT = process.env.REACT_APP_BASE_URL as string

  // let socket: any
  // socket = io(ENDPOINT)
  let socket=useSocket()


  const setMessageFn = (e: React.ChangeEvent<HTMLInputElement>) => {

    setMessage(e.target.value)
  }
  const handleMessageSent = async () => {
    if (message.trim().length > 0) {
      const res = await sendMessage(message, user._id, currentUserId)
      setMessage('')
      console.log(res.msg);
      socket?.emit('new message', res.msg)
      setLastMessage(res.msg)
      setMessages([...messages, res.msg])

    }
  }
  useEffect(() => {

    socket.emit('setup', currentUserId)
    return () => {
      socket.disconnect();
    }
  }, [currentUserId, socket])

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const msgs = await fetchAllMessages(user._id)
      setMessages(msgs)
      socket.emit('join chat', user._id)
      setIsLoading(false)
    }
    fetch()
  }, [user])
  useEffect(() => {
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollTo(0, scrollDownRef.current.scrollHeight)
    }
  }, [messages])

  const generateExam = async () => {
    const candidate = user.users[0]._id === currentUserId ? user.users[1]._id : user.users[0]._id
    const exam = await generateNewExam(candidate, currentUserId)
    const res = await sendMessage(exam._id, user._id, currentUserId, true, false)
    socket?.emit('new message', res.msg)
   
    setMessages([...messages, res.msg])
  }
  const createVideoCall = async () => {

    // await init()
    // const {offer}=await createOffer()
    // console.log();

    const res = await sendMessage(uuidv4(), user._id, currentUserId, false, true)
    socket?.emit('new message', res.msg)
    setMessages([...messages, res.msg])
  }


  useEffect(() => {
    socket.on('message recieved', (newMessage: Message) => {
      if (user._id !== newMessage.chat._id) {
        // console.log(`Message from ${newMessage.sender.firstname} ${newMessage.sender.firstname}`);

      } else {
        setMessages((messages) => [...messages, newMessage])
      }
    })
  })

  const getTime = (timestamp: string) => {
    const dateObj = new Date(timestamp);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    let formattedHours = hours % 12;
    if (formattedHours === 0) formattedHours = 12;
    const amPm = hours >= 12 ? 'pm' : 'am';
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes}${amPm}`;
    return formattedTime
  }

  const handleEnterEmpVideoChat=(content:string)=>{
    // socket.emit('join:video',({room:content,user:"employer"}))
    
    navigate(`/employer/videochat/${content}`)


  }

  const handleEnterCanVideoChat=(content:string)=>{
    
    navigate(`/videochat/${content}`)
  }

  const role = user.users[0]._id === currentUserId ? user.users[0].role : user.users[1].role
  let candidate: string
  let employer:string
  if (role === 'employer') candidate = user.users[0]?._id !== currentUserId ? user.users[0]?._id : user.users[1]?._id
  if (role === 'candidate') employer = user.users[0]?._id !== currentUserId ? user.users[0]?._id : user.users[1]?._id

 

  return (
    <div className='col-span-3 h-screen'>
      <div className='rounded-md bg-gray-100  h-4/5  shadow relative'>
        <div className='w-full  bg-primary-900 rounded-t-md flex items-center gap-2 px-4 py-2 font-bold'>
          <img src={user.users[0]._id === currentUserId ? user.users[1]?.profileImg : user.users[0]?.profileImg} className='h-7 rounded-full' alt="" />
          <h1 className='text-white'>{user.users[0]?._id === currentUserId ? user.users[1]?.firstname + ' ' + user.users[1]?.lastname : user.users[0]?.firstname + ' ' + user.users[0]?.lastname}</h1>
        </div>
        <div className='h-full'>
          <div className='chats h-5/6 overflow-y-scroll w-full ' ref={scrollDownRef}>
            {isLoading?
            <div className='w-full'>
              <MessageLoader/>
            </div>
            
            :<>
            {messages?.map((obj) =>
              <div key={obj._id} className={`w-full flex ${obj.sender?._id === currentUserId ? 'justify-end' : 'justify-start ps-2'} `}>
                <img src={obj.sender.profileImg} alt="" className={`h-5 ${obj.sender?._id === currentUserId ? 'hidden' : 'block rounded-full'}`} />
                <div className={`my-1 overflow-hidden ${obj.sender?._id === currentUserId ? 'rounded-s-3xl  rounded-br-3xl bg-green-300 ' : 'bg-primary-400 rounded-e-3xl rounded-bl-3xl '}   mx-2   w-fit max-w-md  ${obj.isExam || obj.isVideo ? 'px-0 py-0' : '  px-4 py-2'} break-all `}>
                  {obj.isExam ?
                    <div className=''>

                      <div >
                        {role === 'employer' ?
                          <>
                            <h1 className='font-bold pe-20  px-4 py-2'><FontAwesomeIcon icon={faFilePen} /> Technical Round</h1>
                            <p className='px-8 '>Status :  <span className='p-1 rounded-lg bg-yellow-100'>{obj.Exam?.submitted ? 'submitted' : obj.Exam?.attended ? 'Attended' : 'Not Attended'}</span></p>
                            {obj.Exam?.submitted ? <div className='w-full h-10 bg-green-500 mt-2'>
                              <h1 onClick={() => navigate(`/employer/result/${obj.Exam?._id}`)} className='text-center text-white font-bold pt-1 cursor-pointer'>Check Results</h1>
                              <p className='text-end pe-3' style={{ fontSize: '10px' }} >{getTime(obj.createdAt)}</p>

                            </div> : <p className='text-end pe-3' style={{ fontSize: '10px' }} >{getTime(obj.createdAt)}</p>}

                          </>
                          :
                          <>
                            <h1 className='ps-4  pe-10 pt-4 text-xl font-bold underline mb-2'>Technical Test</h1>
                            <div className='px-4 pb-2'>


                              <li>This exam consists of 10 questions.</li>
                              <li>The total time allotted for the test is 15 minutes.</li>
                              <li>You are required to complete the exam within the given time limit.</li>
                              <li>The exam should be taken within 24 hours from the time it was posted.</li>
                              <li>Please ensure that you have a reliable internet connection and a suitable environment to concentrate during the test.</li>
                              <li>Make sure to submit your answers before the time runs out. </li>
                              <p className='font-bold'>All The Best</p>
                            </div>
                            <div className='w-full  bg-primary-1000'>
                              {
                                obj.Exam?.submitted
                                  ?
                                  <h1 className='text-center font-bold text-white pt-2 text-xl'>Test Submitted</h1>
                                  : obj.Exam?.attended ? <h1 className='text-center font-bold text-white pt-2 text-xl '>Test Attended </h1>
                                    : <h1 onClick={() => navigate(`/exam/${obj.Exam?._id}`)} className='text-center font-bold text-white pt-2 text-xl cursor-pointer'>Take Test</h1>
                              }

                              <p className='text-end pe-3' style={{ fontSize: '10px' }} >{getTime(obj.createdAt)}</p>

                            </div>
                          </>

                        }
                      </div>

                    </div>
                    : obj.isVideo ?
                      <>
                        <div className=''>
                          <h1 className='pe-10 ps-5  py-4  font-bold font-exo '><FontAwesomeIcon icon={faVideo} />  Video Interview</h1>
                          <div className={`${role === 'employer' ? 'bg-green-500 text-center' : 'bg-primary-800 text-center'}`}>
                            {role === 'employer' ? <button onClick={() => handleEnterEmpVideoChat(obj.content)} className='text-lg pt-1 text-white font-bold'>Start Now</button> : <button onClick={()=>handleEnterCanVideoChat(obj.content)} className='text-lg pt-1 text-white font-bold'>Join Now</button>}
                            <p className='text-end pe-3' style={{ fontSize: '10px' }} >{getTime(obj.createdAt)}</p>
                          </div>

                        </div>
                      </>
                      :
                      <>
                        <p className=''>{obj.content}</p>
                        <p className='text-end' style={{ fontSize: '10px' }} >{getTime(obj.createdAt)}</p>
                      </>
                  }
                </div>
              </div>
            )}
            </>}
          </div>
          {role === 'employer' && <div className={`${isOpen ? 'h-36' : 'h-0'} bg-white overflow-hidden duration-500 flex  shadow w-60 rounded-md text-white  absolute bottom-12 right-14 justify-center items-center gap-2 `}>
            <div className={`text-center bg-primary-900 p-8 rounded-full cursor-pointer`} onClick={generateExam}>
              <FontAwesomeIcon className='text-2xl' icon={faFilePen} />

              {/* <h1>Create Exam</h1> */}
            </div>
            <div className='text-center bg-primary-900  rounded-full p-8 cursor-pointer' onClick={createVideoCall}>
              <FontAwesomeIcon className='text-2xl' icon={faVideoCamera} />
              {/* <p className='break-all'>Start Interview</p> */}
            </div>
          </div>}
          <div className='w-full h-10   absolute rounded-b-md bottom-0 px-2 pb-2 flex items-center gap-2 '>
            <input type="text" className='w-full px-4 py-2 rounded-md outline-none' value={message} onChange={setMessageFn} />
            {role === 'employer' && <button onClick={() => setisOpen(!isOpen)} className='bg-primary-700 px-3 py-2 rounded-md'><FontAwesomeIcon className='text-lg text-white' icon={faPaperclip} /></button>}
            <button onClick={handleMessageSent} className='px-3 py-2 text-white bg-primary-700 rounded-md'><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleChat
