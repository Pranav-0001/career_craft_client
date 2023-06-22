import React, { useEffect } from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import EmpHome from '../components/Employer/Home/EmpHome'
import { useNavigate } from 'react-router-dom'
import { verifyAuth } from '../utils/auth/authUser'

function EmpHomePage() {
    const navigate=useNavigate()
    useEffect(() => {
    const token=localStorage.getItem('user')
    if(token){
        const role=verifyAuth (token)
        role==='employer'?navigate('/employer'):navigate('/')
    }else{
      navigate('/')
    }
      
    }, [navigate])
    
  return (
    <div>
      <EmpNavbar/>
      <EmpHome/>
    </div>
  )
}

export default EmpHomePage
