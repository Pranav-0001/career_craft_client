import React, { useEffect } from 'react'
import Navbar from '../components/User/Navbar/Navbar'
import Login from '../components/User/Login/login'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate=useNavigate()
  let candidate=localStorage.getItem('candidate')
  let employer=localStorage.getItem('employer')
  useEffect(() => {
    if(candidate){
      navigate('/')
    }else if(employer){
      console.log("employer");
      
    }
  }, [candidate,employer,navigate])
  
  return (
    <div>
      <Navbar/>
      <Login/>
    </div>
  )
}

export default LoginPage
