import React from 'react'
import AdminNav from '../components/Admin/Navbar/AdminNav'
import AdminHome from '../components/Admin/Home/AdminHome'

function AdminHomePage() {
  return (
    <>
    <div className='grid grid-cols-5 px-2 md:px-8 pt-5'>
      <div className='hidden md:block'>
        <AdminNav/>
      </div>
      <div className='col-span-5 md:col-span-4'>
      <AdminHome/> 

      </div>
    </div>
     
    </>
  )
}

export default AdminHomePage
