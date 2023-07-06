import React from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import Resume from '../components/User/Resume/Resume'
import SideMenu from '../components/User/UserSIdeBar/SideMenu'

function ViewResumePage() {
  return (
    <div>
      <MainNav/>
      <div className="grid grid-cols-7">
        <div className='hidden lg:block lg:col-span-2 '>
          <SideMenu page={"resumeView"}/>
        </div>
        <div className='col-span-7 px-4 lg:px-0 lg:col-span-5 '>
          <Resume/>
        </div>
      </div>
    </div>
  )
}

export default ViewResumePage
