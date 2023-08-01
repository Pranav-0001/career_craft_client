import React from 'react'
import MyProfile from '../components/User/MyProfile/MyProfile'
import SideMenu from '../components/User/UserSIdeBar/SideMenu'
import MainNav from '../components/User/Navbar/MainNav'

const MyProfilePage = () => {
  return (
    <div className=''>
      <MainNav/>
      <div className="grid grid-cols-7">
        <div className='hidden lg:block lg:col-span-2 '>
          <SideMenu page={"prof"}/>
        </div>
        <div className='col-span-7 px-4 lg:px-0 lg:col-span-5 '>
          <MyProfile/>
        </div>
      </div>
    </div>
  )
}

export default MyProfilePage
