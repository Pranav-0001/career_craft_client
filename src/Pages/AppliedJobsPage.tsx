import React from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import SideMenu from '../components/User/UserSIdeBar/SideMenu'
import AppliedJobs from '../components/User/AppliedJobsList/AppliedJobs'

function AppliedJobsPage() {
  return (
    <div>
        <div>
      <MainNav/>
      <div className="grid grid-cols-7">
        <div className='hidden lg:block lg:col-span-2 '>
          <SideMenu page={"apply"}/>
        </div>
        <div className='col-span-7 px-2 lg:px-0 lg:col-span-5 pt-10 lg:pt-20'>
          <AppliedJobs/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AppliedJobsPage
