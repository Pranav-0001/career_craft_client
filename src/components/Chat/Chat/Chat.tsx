import React, { useEffect, useState } from 'react'
import './chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Chats, Message } from '../../../models/chat'
import { useSelector } from 'react-redux'
import { fetchAllChats } from '../../../services/Chats/Chat'
import SingleChat from '../SingleChat/SingleChat'
import { useSocket } from '../../../context/socketContext'
import ChatLoader from '../../Loader/ChatLoader'

interface role {
    role: string
}

const Chat: React.FC<role> = ({ role }) => {
    const socket=useSocket()
    const { EmployerId } = useSelector((state: any) => state.employer);
    const { userId } = useSelector((state: any) => state.user);
    const [isLoading,setIsLoading]=useState(false)
    const [chats, setChats] = useState<Chats[]>([])
    const [Schats, setSChats] = useState<Chats[]>([])
    const [selectedUser, setselectedUser] = useState<Chats>()
    const [lastMessage, setLastMessage] = useState<Message>()
   
    const currentUserId = (role === 'employer') ? EmployerId : userId
    

    const selectChat=(user:Chats)=>{
        setselectedUser(user)
        
    }
    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)
            let Id = (role === 'employer') ? EmployerId : userId
            const allChats = await fetchAllChats(Id)
            setChats(allChats)
            setSChats(allChats)
            setIsLoading(false)
        }
        fetch()
    }, [lastMessage])

    const search=(val:string)=>{
        if(val===''){
            setChats(Schats)
        }else{
        const array=chats.filter((obj)=>{
            let sender=obj.users[0]._id!==currentUserId ? obj.users[0] :obj.users[1]
            if(sender.firstname.toLocaleLowerCase().startsWith(val.toLocaleLowerCase())){
                return obj
            }
        })

        setChats(array)
    }
        
        
        
    }

    return (
        <div className='h-4/5'>
            <div className='w-full h-4/5  py-4 lg:px-8 px-2 font-exo'>
                
                <div className='w-full  rounded-md  overflow-hidden ' >
                    <div className='lg:grid grid-cols-4 chatpage gap-2'>
                        <div className={`bg-white h-4/5 rounded-md  shadow-md overflow-y-scroll chat-scroll ${selectedUser ? 'hidden lg:block':''}`}>
                            <div className='px-2 flex gap-2 py-2 bg-primary-700'>
                            <input placeholder='Search....' onChange={(e)=>search(e.target.value)} type="text" className='w-2/3 outline-primary-600 px-3 border rounded-full border-primary-200 py-1' />
                            </div>
                            {isLoading?
                            <ChatLoader/>
                            :<>
                            {chats.length>0 ? chats.map((obj) => <div key={obj._id} className='px-2 py-3' onClick={()=>selectChat(obj)}>
                                <div className='w-full  h-16 bg-white  flex items-center border-b-2 pb-2'>
                                    <div className='py-2 px-2'>
                                        <img className='h-12 rounded-full' src={obj.users[0]?._id === currentUserId ? obj.users[1]?.profileImg : obj.users[0]?.profileImg} alt="" />

                                    </div>
                                    <div className=''>
                                        <h1 className='text-xl p-0'>{obj.users[0]?._id === currentUserId ? obj.users[1]?.firstname + ' ' + obj.users[1]?.lastname : obj.users[0]?.firstname + ' ' + obj.users[0]?.lastname}</h1>
                                        {obj?.latestMessage?.content&&<p className='text-xs p-0 text-gray-400'>{obj.latestMessage?.content.substring(0,10)}{obj.latestMessage.content?.length>10?'...':''}</p>}
                                    </div>
                                </div>
                            </div>):
                            <h1>No Chats Found</h1>
                            }
                            </>}
                        </div>

                        {selectedUser
                            ?
                            <div className={`col-span-3 ${selectedUser ?'block' :'hidden'} lg:block`}>
                            <SingleChat setLastMessage={setLastMessage} user={selectedUser} currentUserId={currentUserId}/>
                            </div>
                            :
                            <div className='h-screen col-span-3 hidden lg:block'>
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
