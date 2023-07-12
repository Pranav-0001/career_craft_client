import React from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import EmpHome from '../components/Employer/Home/EmpHome'
import DashHead from '../components/Employer/DashHeadMenu/DashHead'


function EmpHomePage() {

    
  return (
    <div>
      <EmpNavbar/>
      <DashHead page='dash'  />
      <EmpHome/>
    </div>
  )
}

export default EmpHomePage
