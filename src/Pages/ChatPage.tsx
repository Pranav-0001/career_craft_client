import React from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import Chat from '../components/Chat/Chat/Chat'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'

interface chat{
    role:string
}

const ChatPage:React.FC<chat> = ({role}) => {
    
  return (
    <>
    {role==="employer" ? <EmpNavbar/> :  <MainNav/>}
     <Chat role={role}/>
      
    </>
  )
}

export default ChatPage
