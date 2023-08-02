import React, { useEffect, useState } from 'react'
import './chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Chats, Message } from '../../../models/chat'
import { useSelector } from 'react-redux'
import { fetchAllChats } from '../../../services/Chats/Chat'
import SingleChat from '../SingleChat/SingleChat'
import { useSocket } from '../../../context/socketContext'

interface role {
    role: string
}

const Chat: React.FC<role> = ({ role }) => {
    const socket=useSocket()
    const { EmployerId } = useSelector((state: any) => state.employer);
    const { userId } = useSelector((state: any) => state.user);

    const [chats, setChats] = useState<Chats[]>([])
    const [selectedUser, setselectedUser] = useState<Chats>()
    const [lastMessage, setLastMessage] = useState<Message>()
   
    const currentUserId = (role === 'employer') ? EmployerId : userId
    

    const selectChat=(user:Chats)=>{
        setselectedUser(user)
    }


    useEffect(() => {
        const fetch = async () => {
            let Id = (role === 'employer') ? EmployerId : userId
            const allChats = await fetchAllChats(Id)
            setChats(allChats)
        }
        fetch()
    }, [lastMessage])

    return (
        <div className='h-4/5'>
            <div className='w-full h-4/5  py-4 lg:px-8 px-2 font-exo'>
                <div className='flex pe-32 ps-2  mb-2'>
                    <input type="text" className='w-1/4 outline-none py-2 px-4 rounded-full' />
                </div>
                <div className='w-full  rounded-md  overflow-hidden ' >
                    <div className='lg:grid grid-cols-4 chatpage gap-2'>
                        <div className={`bg-white h-4/5 rounded-md  shadow-md overflow-y-scroll chat-scroll ${selectedUser ? 'hidden lg:block':''}`}>

                            {chats.map((obj) => <div key={obj._id} className='px-2 py-3' onClick={()=>selectChat(obj)}>
                                <div className='w-full  h-16 bg-white  flex items-center border-b-2 pb-2'>
                                    <div className='py-2 px-2'>
                                        <img className='h-12 rounded-full' src={obj.users[0]._id === currentUserId ? obj.users[1].profileImg : obj.users[0].profileImg} alt="" />

                                    </div>
                                    <div className=''>
                                        <h1 className='text-xl p-0'>{obj.users[0]._id === currentUserId ? obj.users[1].firstname + ' ' + obj.users[1].lastname : obj.users[0].firstname + ' ' + obj.users[0].lastname}</h1>
                                        {obj?.latestMessage?.content&&<p className='text-xs p-0 text-gray-400'>{obj.latestMessage.content.substring(0,10)}{obj.latestMessage.content.length>10?'...':''}</p>}
                                    </div>
                                </div>
                            </div>)}
                        </div>

                        {selectedUser
                            ?
                            <div className={`col-span-3 ${selectedUser ?'block' :'hidden'} lg:block`}>
                            <SingleChat setLastMessage={setLastMessage} user={selectedUser} currentUserId={currentUserId}/>
                            </div>
                            :
                            <div className='h-screen col-span-3'>
                            <div className='flex  w-full h-4/5 border rounded-md justify-center items-center'>
                                <h1 className='text-2xl'>Please click any chat to begin our conversation.</h1>
                            </div>
                            </div>
                           }

                    </div>
                </div>
                <br />
            </div>
        </div>
    )
}

export default Chat
