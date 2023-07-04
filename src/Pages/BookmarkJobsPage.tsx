import React from 'react'
import SideMenu from '../components/User/UserSIdeBar/SideMenu'
import MainNav from '../components/User/Navbar/MainNav'
import Bookmarklist from '../components/User/BookmarkList/Bookmarkslist'


function BookmarkJobsPage() {
  return (
    <>
      <MainNav/>
      <div className="grid grid-cols-7">
        <div className='hidden lg:block lg:col-span-2 '>
          <SideMenu page={"saved"}/>
        </div>
        <div className='col-span-7 px-4 lg:px-0 lg:col-span-5 mt-20'>
          <Bookmarklist/>
        </div>
      </div>
    </>
  )
}

export default BookmarkJobsPage
