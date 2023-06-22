import React,{useEffect} from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import Home from '../components/User/Home/Home'
import Footer from '../components/User/Footer/Footer'
import { api } from '../services/axios'
import { verifyAuth } from '../utils/auth/authUser'
import { useNavigate } from 'react-router-dom'

function Homepage() {
  const navigate=useNavigate()
  let token = localStorage.getItem('user')
  useEffect(() => {
    const auth=async()=>{
    if(token){
      let role=verifyAuth(token)
      if(role==='employer') navigate('/employer')
    }
    }
    auth()
  }, [])
  
  return (
    <div>
      <MainNav/>
    
      <Home/>
      <Footer/>
    </div>
  )
}

export default Homepage
