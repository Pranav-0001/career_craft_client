import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createAnswer, createOffer, init } from '../../services/Video/VideoChat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faPhone, faPhoneSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Peer from '../../services/Video/Peer'
import { useSocket } from '../../context/socketContext'
import { fetchUserData } from '../../services/candidate/profile'


const VideoChat: React.FC<{ role: string }> = ({ role }) => {
  // const [user1, setUser1] = useState()
  const [myStream, setMyStream] = useState<MediaStream>()
  const [videobtn, setvideoButton] = useState(true)
  const [audiobtn, setaudioButton] = useState(true)
  const [start, setStart] = useState(true)
  const [remoteStreamS, setRemoteStream] = useState<MediaStream>()
  const [acceptBtn, setAcceptBtn] = useState(false)
  const [offerRec, setOffer] = useState<any>()
  const user1Ref = useRef<HTMLVideoElement>(null)
  const user2Ref = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const navigate = useNavigate()



  const ENDPOINT = process.env.REACT_APP_BASE_URL as string
  const socket = useSocket()
  const { EmployerId } = useSelector((state: any) => state.employer)
  const { userId } = useSelector((state: any) => state.user)
  const { id } = useParams()
  const currentId = role === "employer" ? EmployerId : userId
  const handleUserJoined = useCallback(async (data: string) => {

    if (currentId !== data && role === 'employer') {
      const user = await fetchUserData(data)
    }

  }, []);

  const handleOfferRecieved = useCallback(async (offer: any) => {
    console.log(offer);
    if (role === 'candidate') {

      setOffer(offer)
      // setAcceptBtn(true)
      sendAnswer(offer)
      // const answer=await Peer.getAnswer(offer)
      // console.log(answer);
      // socket.emit('answer',({answer,roomId:id}))
    }



  }, [])

  const sendStreams = useCallback((stream: any) => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        Peer.peer.addTrack(track, streamRef.current);
      }
    }
  }, []);

  useEffect(() => {

    socket.emit('join:video', ({ room: id, user: currentId }))
    // socket.on('joined',(data)=>console.log(data))
  }, [])
  const handleAnswerRecieved = useCallback(async (ans: any) => {
    console.log("got answer", ans)
    Peer.setRemoteDescription(ans)
  }, [])
  const handleIceCandidate = useCallback(async (data: any) => {
    console.log({ candi: data });

    Peer.peer.addIceCandidate(new RTCIceCandidate(data))
      .catch((err: any) => {
        console.log(err);
      })
    Peer.peer.onconnectionstatechange = () => {
      console.log('connection state changed', Peer.peer.connectionState)
    }
  }, [])

  const handleDisconnect = useCallback((data: any) => {
    console.log({ disconnect: data });
    if (data && streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      console.log(streamRef.current, "kkk");
    }
    if (role === 'employer') navigate('/employer/chat')
    else navigate('/chat')


  }, [])

  useEffect(() => {
    socket.on("joined", handleUserJoined);
    socket.on("offer:recieved", handleOfferRecieved)
    socket.on('answer:recieved', handleAnswerRecieved)
    socket.on('candidate', handleIceCandidate)
    socket.on('disconnect call', handleDisconnect)

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("offer:recieved", handleOfferRecieved)
      socket.off('answer:recieved', handleAnswerRecieved)
      socket.off('candidate', handleIceCandidate)

    };
  }, [socket]);

  const sendOffer = async () => {

    const offer = await Peer.getOffer()
    console.log(offer);
    socket.emit('offer', ({ offer, roomId: id }))
    // setStart(false)

  }


  useEffect(() => {
    const call = async () => {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true, video: true
      })
      // setMyStream(stream)
      // streamRef.current=stream

      if (user1Ref.current && streamRef.current) {
        user1Ref.current.srcObject = streamRef.current;
      }
      sendStreams(streamRef.current)
    }
    call()

  }, [])


  const sendAnswer = async (offers: any) => {
    if (role === 'candidate') {
      const answer = await Peer.getAnswer(offers)
      console.log(answer);

      socket.emit('answer', ({ answer, roomId: id }))
    }
  }

  useEffect(() => {
    Peer.peer.addEventListener("track", async (ev: any) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!", remoteStream[0]);
      setRemoteStream(remoteStream[0]);
      if (user2Ref.current && remoteStream[0]) {
        user2Ref.current.srcObject = remoteStream[0];
      }


    });


  }, [socket, sendOffer]);
  useEffect(() => {
    Peer.peer.onicecandidate = (event: any) => {
      console.log(event.candidate, "candidate check");

      if (event.candidate) {
        socket.emit('ICE', { candidate: event.candidate, roomId: id })
        console.log("sending candi");

      }
    }
  }, [])

  const callEnd = () => {

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())

      console.log(streamRef.current, "kkk");
      socket.emit('call end', id)
      if (role === 'employer') navigate('/employer/chat')
      else navigate('/chat')


    }
  }

  const videoPause = () => {
    if (streamRef.current) {
      setvideoButton(false)
      streamRef.current.getVideoTracks()[0].enabled = false
    }
  }
  const videoPlay = () => {
    if (streamRef.current) {
      setvideoButton(true)
      streamRef.current.getVideoTracks()[0].enabled = true
    }
  }
  const audioPause = () => {
    if (streamRef.current) {
      setaudioButton(false)
      streamRef.current.getAudioTracks()[0].enabled = false
    }
  }
  const audioPlay = () => {
    if (streamRef.current) {
      setaudioButton(true)
      streamRef.current.getAudioTracks()[0].enabled = true
    }
  }




  return (
    <div className='lg:px-20 h-full mt-4  px-2'>
      <div className='lg:grid grid-cols-3 gap-2 lg:relative absolute'>
        <div className='col-span-2 w-full '>
          <video className='col-span-3 w-full rounded-md '  autoPlay playsInline ref={user2Ref}></video>
        </div>

        <div>

          <video className='rounded-md shadow lg:relative lg:h-96 object-cover absolute bottom-16 lg:bottom-0 lg:right-0 right-3 h-20 ' ref={user1Ref} muted autoPlay playsInline ></video>

          <div className='flex justify-center gap-3 py-2'>
            {role === 'employer' && start && <button className='px-4  text-white bg-blue-500 rounded-full' onClick={sendOffer}>Start</button>}
            {/* {offerRec&&<button onClick={sendAnswer}>accept</button>} */}
            {audiobtn ? <button onClick={audioPause}><FontAwesomeIcon className='px-4 py-2 bg-red-500 text-white rounded-full' icon={faMicrophoneSlash} /></button> : <button onClick={audioPlay}><FontAwesomeIcon className='px-4 py-2 bg-blue-500 text-white rounded-full' icon={faMicrophone} /></button>}
            {videobtn ? <button><FontAwesomeIcon onClick={videoPause} className='px-4 py-2 bg-red-500 text-white rounded-full' icon={faVideoSlash} /></button> : <button><FontAwesomeIcon onClick={videoPlay} className='px-4 py-2 bg-blue-500 text-white rounded-full' icon={faVideo} /></button>}
            <button><FontAwesomeIcon className='px-4 py-2 bg-red-500 text-white rounded-full' onClick={callEnd} icon={faPhoneSlash} /></button>
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default VideoChat
