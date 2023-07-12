import React from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import DashHead from '../components/Employer/DashHeadMenu/DashHead'
import EmpApplied from '../components/Employer/AppliedList/EmpApplied'

const EmpAppliedJobListPage = () => {
  return (
    <>
      <EmpNavbar/>
      <DashHead page='applied'/>
      <EmpApplied/>

    </>
  )
}

export default EmpAppliedJobListPage
