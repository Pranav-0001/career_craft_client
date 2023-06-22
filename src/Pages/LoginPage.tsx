import React, { useEffect } from 'react'
import Navbar from '../components/User/Navbar/Navbar'
import Login from '../components/User/Login/login'
import { useNavigate } from 'react-router-dom'
import { verifyAuth } from '../utils/auth/authUser'

function LoginPage() {
  const navigate=useNavigate()

  let user=localStorage.getItem('user')
  useEffect(() => {

    if(user){
      let role=verifyAuth(user)
      if(role==='candidate')navigate('/')
      else if(role==='employer') navigate('/employer')
    }
  }, [navigate])
  
  return (
    <div>
      <Navbar/>
      <Login/>
    </div>
  )
}

export default LoginPage
