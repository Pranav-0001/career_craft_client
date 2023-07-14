import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState,useEffect } from 'react'
import { Chats, Message } from '../../../models/chat';
import { fetchAllMessages, sendMessage } from '../../../services/Chats/Chat';
import './singlechat.css'

interface selectedUser{
    user:Chats
    currentUserId:string
}

const SingleChat:React.FC<selectedUser> = ({user,currentUserId}) => {
    const [message,setMessage]=useState<string>('')
    const [messages,setMessages]=useState<Message[]>()
    const handleMessageSent=async()=>{
        if(message.trim().length>0){
          const res=await sendMessage(message,user._id,currentUserId)  
          console.log(res);
          setMessage('')
        }
        
        
       
    }
    useEffect(() => {
      const fetch=async()=>{
        const msgs=await fetchAllMessages(user._id)
        console.log(msgs);
        setMessages(msgs)
        
      }
      fetch()
    }, [])
    
  return (
    <div className='col-span-3 h-screen'>
      <div className='rounded-md bg-gray-100  h-3/4  shadow relative'>
                            <div className='w-full h-10 bg-primary-600 rounded-t-md'>
                                <h1>{user.users[0]._id===currentUserId?user.users[1].firstname+' '+user.users[1].lastname:user.users[0].firstname+' '+user.users[0].lastname}</h1>
                            </div>
                            <div className='h-full'>
                                <div className='chats h-5/6 overflow-y-scroll '>
                                    {messages?.map((obj)=>
                                    <div className='w-20 h-10 my-1 mx-2 bg-black '>
                                       <p className='text-red-700'>{obj.content}</p> 
                                    </div>)}
                                </div>
                                <div  className='w-full h-10   absolute rounded-b-md bottom-0 px-2 pb-2 flex items-center gap-2'>
                                    <input type="text" className='w-full px-4 py-2 rounded-md outline-none' value={message}  onChange={(e)=>setMessage(e.target.value)} />
                                    <button onClick={handleMessageSent} className='px-3 py-2 text-white bg-primary-700 rounded-md'><FontAwesomeIcon icon={faPaperPlane}/></button>
                                </div>
                            </div>
                        </div>
    </div>
  )
}

export default SingleChat
