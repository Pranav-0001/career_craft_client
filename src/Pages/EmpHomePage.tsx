import React, { useEffect } from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import EmpHome from '../components/Employer/Home/EmpHome'
import { useNavigate } from 'react-router-dom'

function EmpHomePage() {
    const navigate=useNavigate()
    useEffect(() => {
    const token=localStorage.getItem('employer')
    if(token){
        
    }else{
        navigate('/login')
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
