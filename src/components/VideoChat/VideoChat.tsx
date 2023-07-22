import React, { useEffect, useRef, useState } from 'react'
import { createAnswer, createOffer, init } from '../../services/Video/VideoChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPhone, faPhoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Peer from '../../services/Video/Peer'
import ReactPlayer from 'react-player'

const VideoChat:React.FC<{role:string}>=({role})=> {
  // const [user1, setUser1] = useState()
  const [myStream, setMyStream] = useState<MediaStream>()
  const user1Ref = useRef<HTMLVideoElement>(null)
  const user2Ref = useRef<HTMLVideoElement>(null)
  const ENDPOINT = process.env.REACT_APP_BASE_URL as string
  let socket: any
  socket = io(ENDPOINT)
  const {EmployerId} =useSelector((state:any)=>state.employer)
  const {userId} =useSelector((state:any)=>state.user)
  const {id}=useParams()
  
  
  
  useEffect(()=>{
    const call=async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,video:true
      })
      if (user1Ref.current && stream) {
        user1Ref.current.srcObject = stream;
      }
    }
    call()
  },[])
  

  // useEffect(() => {
  //   const fetch = async () => {
  //     const stream = await init();
  //     const {remoteStream,offer} = await createOffer()
  //     socket.emit('join video',EmployerId )
  //     socket.emit('offer',({offer,userId:id}))
  //     if (user1Ref.current && stream) {
  //       user1Ref.current.srcObject = stream;
  //     }
  //     if (user2Ref.current && remoteStream) {
  //       user2Ref.current.srcObject = remoteStream;
  //     }
  //   }
   
  //   if(role==='employer') fetch()
   
  // })
  // useEffect(()=>{
    
  //   const fetch=async()=>{
  //     const stream = await init();
  //     socket.emit('join video',userId )
  //     socket.on('offer recieved', async(offer:RTCSessionDescriptionInit) => {
  //       const answer = await createAnswer(offer)
  //       socket.emit('answer',({answer,EmpId:id}))
  //       if (user1Ref.current && stream) {
  //         user1Ref.current.srcObject = stream;
  //       }
        
  //     })
  //   }
  //   if(role==='candidate') fetch()
  // })
  






  return (
    <div className='px-20 h-full mt-4  '>
      <div className='grid grid-cols-4 gap-2'>
        <div className='col-span-3 w-full '>
          <video className='col-span-3 w-full rounded-md' autoPlay muted playsInline ref={user1Ref}></video>
        </div>

        <div>
          <video className='rounded-md shadow' ref={user1Ref} muted autoPlay playsInline ></video>
          {/* <ReactPlayer playing muted height={'100px'} url={myStream}/> */}
          <div className='flex justify-center gap-3 py-2'>
            <button><FontAwesomeIcon className='px-4 py-2 bg-blue-500 text-white rounded-full' icon={faMicrophone} /></button>
            <button><FontAwesomeIcon className='px-4 py-2 bg-blue-500 text-white rounded-full' icon={faVideo} /></button>
            <button><FontAwesomeIcon className='px-4 py-2 bg-red-500 text-white rounded-full' icon={faPhoneSlash} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoChat
