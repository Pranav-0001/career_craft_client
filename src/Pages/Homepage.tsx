import React,{useEffect} from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import Home from '../components/User/Home/Home'
import Footer from '../components/User/Footer/Footer'
import { verifyAuth } from '../utils/auth/authUser'
import { useNavigate } from 'react-router-dom'

function Homepage() {

  
  return (
    <div>
      <MainNav/>
    
      <Home/>
      <Footer/>
    </div>
  )
}

export default Homepage
