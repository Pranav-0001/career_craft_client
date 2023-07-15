import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react'
import { Chats, Message } from '../../../models/chat';
import { fetchAllMessages, sendMessage } from '../../../services/Chats/Chat';
import io from 'socket.io-client';
import './singlechat.css'

interface selectedUser {
  user: Chats
  currentUserId: string
}

const SingleChat: React.FC<selectedUser> = ({ user, currentUserId }) => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  const ENDPOINT = process.env.REACT_APP_BASE_URL as string
  let socket: any
  socket = io(ENDPOINT)


  const setMessageFn = (e: React.ChangeEvent<HTMLInputElement>) => {

    setMessage(e.target.value)
  }
  const handleMessageSent = async () => {
    if (message.trim().length > 0) {
      const res = await sendMessage(message, user._id, currentUserId)
      setMessage('')
      console.log(res.msg);
      socket?.emit('new message', res.msg)
      setMessages([...messages, res.msg])

    }
  }
  useEffect(() => {
    
    socket.emit('setup', currentUserId)
    return () => {
      socket.disconnect();
    }
  }, [currentUserId,socket])

  useEffect(() => {
    const fetch = async () => {
      const msgs = await fetchAllMessages(user._id)
      console.log(msgs);
      setMessages(msgs)
      socket.emit('join chat', user._id)
    }
    fetch()
  }, [])
  useEffect(() => {
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollTo(0, scrollDownRef.current.scrollHeight)
    }
  }, [messages])


  useEffect(() => {
    socket.on('message recieved', (newMessage: Message) => {
      if (user._id !== newMessage.chat._id) {
        console.log(`Message from ${newMessage.sender.firstname} ${newMessage.sender.firstname}`);

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



  return (
    <div className='col-span-3 h-screen'>
      <div className='rounded-md bg-gray-100  h-3/4  shadow relative'>
        <div className='w-full  bg-primary-900 rounded-t-md flex items-center gap-2 px-4 py-2 font-bold'>
          <img src={user.users[0]._id === currentUserId ? user.users[1].profileImg :user.users[0].profileImg} className='h-7 rounded-full' alt="" />
          <h1 className='text-white'>{user.users[0]._id === currentUserId ? user.users[1].firstname + ' ' + user.users[1].lastname : user.users[0].firstname + ' ' + user.users[0].lastname}</h1>
        </div>
        <div className='h-full'>
          <div className='chats h-5/6 overflow-y-scroll w-full ' ref={scrollDownRef}>
            {messages?.map((obj) =>
              <div key={obj._id} className={`w-full flex ${obj.sender._id === currentUserId ? 'justify-end' : 'justify-start ps-2'} `}>
                <img src={obj.sender.profileImg} alt="" className={`h-5 ${obj.sender._id === currentUserId ? 'hidden' : 'block rounded-full'}`} />
                <div className={`${obj.sender._id === currentUserId ? 'rounded-s-3xl rounded-br-3xl bg-green-300 ' : 'bg-primary-400 rounded-e-3xl rounded-bl-3xl '}  my-1 mx-2   w-fit max-w-md  px-4 py-2 break-all `}>

                  <p className=''>{obj.content}</p>
                 
                    <p className='text-end' style={{fontSize:'10px'}} >{getTime(obj.createdAt)}</p> 
                 
                 
                </div>
              </div>
            )}
          </div>
          <div className='w-full h-10   absolute rounded-b-md bottom-0 px-2 pb-2 flex items-center gap-2 '>
            <input type="text" className='w-full px-4 py-2 rounded-md outline-none' value={message} onChange={setMessageFn} />
            <button onClick={handleMessageSent} className='px-3 py-2 text-white bg-primary-700 rounded-md'><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleChat
