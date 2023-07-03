import React from 'react'
import Dashboard from '../components/User/Dashboard/Dashboard'
import MainNav from '../components/User/Navbar/MainNav'
import SideMenu from '../components/User/UserSIdeBar/SideMenu'

function DashboardPage() {

  
  return (
    <div>
      <MainNav/>
      <div className="grid grid-cols-7">
        <div className='hidden lg:block lg:col-span-2 '>
          <SideMenu page={"dash"}/>
        </div>
        <div className='col-span-7 px-4 lg:px-0 lg:col-span-5 '>
          <Dashboard/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
