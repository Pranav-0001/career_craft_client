import React from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import VideoChat from '../components/VideoChat/VideoChat'



const EmpVideoChatPage = () => {
  return (
    
      <div className='pb-8'>
    <div className='video   overflow-hidden ' style={{height:'94vh'}}>
      <EmpNavbar/>
      <VideoChat role='employer'/>
    </div>
    </div>
   
  )
}

export default EmpVideoChatPage
