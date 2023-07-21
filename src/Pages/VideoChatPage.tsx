import React from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import VideoChat from '../components/VideoChat/VideoChat'

function VideoChatPage() {
  return (
    <div className='pb-8'>
    <div className='video   overflow-hidden ' style={{height:'94vh'}}>
      <MainNav/>
      <VideoChat role='candidate'/>
    </div>
    </div>
  )
}

export default VideoChatPage
