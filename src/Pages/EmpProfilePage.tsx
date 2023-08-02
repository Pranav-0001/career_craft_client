import React from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import DashHead from '../components/Employer/DashHeadMenu/DashHead'
import EmpProfile from '../components/Employer/EmpProfile/EmpProfile'


const EmpProfilePage = () => {
  return (
    <>
      <EmpNavbar/>
    <DashHead page='profile'/>
    <div className='px-2 lg:px-20'>
        <EmpProfile/>
    </div>
    </>
  )
}

export default EmpProfilePage
