import React from 'react'
import DashHead from '../components/Employer/DashHeadMenu/DashHead'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import EmpSettings from '../components/Employer/Settings/EmpSettings'

const EpmployerSettings = () => {
  return (
    <div>
      <EmpNavbar/>
      <DashHead page='settings'  />
      <EmpSettings/>
    </div>
  )
}

export default EpmployerSettings
