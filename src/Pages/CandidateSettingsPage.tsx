import React from 'react'
import CandidateSettings from '../components/User/Settings/CandidateSettings'
import MainNav from '../components/User/Navbar/MainNav'
import SideMenu from '../components/User/UserSIdeBar/SideMenu'

const CandidateSettingsPage = () => {
  return (
    <div className=''>
    <MainNav/>
    <div className="grid grid-cols-7">
      <div className='hidden lg:block lg:col-span-2 '>
        <SideMenu page={"settings"}/>
      </div>
      <div className='col-span-7 px-4 lg:px-0 lg:col-span-5 '>
        <CandidateSettings/>
      </div>
    </div>
  </div>
  )
}

export default CandidateSettingsPage
