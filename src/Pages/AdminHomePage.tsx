import React, { useEffect, useState } from 'react'
import AdminNav from '../components/Admin/Navbar/AdminNav'
import AdminHome from '../components/Admin/Home/AdminHome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


function AdminHomePage() {
  const [open,setOpen]=useState(false)

  
  return (
    <>
    <div className='grid grid-cols-5 px-2 md:px-8 pt-5'>
      <div className='col-span-5 md:hidden'>
        
        <div className='fixed w-full bg-white border shadow top-0  right-1 '>
        <FontAwesomeIcon className='text-2xl ps-3 pt-3' icon={faBars} onClick={()=>setOpen(!open)}/>
        <div className={` ${open?"block":"hidden"} duration-500  transition-all ease-in-out`}>
          <AdminNav page="dash" />  
        </div>
        
        </div>
        
      </div>
      <div className='hidden md:block'>
        <AdminNav page="dash"/>
      </div>
      <div className='col-span-5 md:col-span-4 mt-10 md:mt-0'>
      <AdminHome/> 

      </div>
    </div>
     
    </>
  )
}

export default AdminHomePage
