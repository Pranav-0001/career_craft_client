import React, { useEffect } from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import EmpHome from '../components/Employer/Home/EmpHome'
import { useNavigate } from 'react-router-dom'
import { verifyAuth } from '../utils/auth/authUser'

function EmpHomePage() {

    
  return (
    <div>
      <EmpNavbar/>
      <EmpHome/>
    </div>
  )
}

export default EmpHomePage
