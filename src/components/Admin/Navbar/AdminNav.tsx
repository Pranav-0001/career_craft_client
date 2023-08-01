import { faArrowRightFromBracket, faCartShopping, faChartPie, faQuestion, faRankingStar, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './adminNav.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminSignout } from '../../../services/admin/adminLogin';
interface AdminNavProps {
  page: string;
}
function AdminNav({page}:AdminNavProps) {
  const {AdminUsername,AdminImage} = useSelector((state:any)=>state.admin)
  const navigate=useNavigate()
  const adminLogout=async()=>{
    const res=await adminSignout()
    if(res.signout){
      navigate("/admin/login")
    }
  }
  return (
    <>
    <div className='h-full  w-full '>
      
        <div className='w-full shadow-md border  border-gray-300  rounded-md'>
          <div className='py-8'>
            <div className='flex w-full justify-center'>
              <img src={AdminImage} alt="avatar"  className='h-24 rounded-sm'/>
            </div>
            <h1 className='text-center font-exo  text-2xl'>{AdminUsername} </h1>
            <p className='text-center text-gray-500'>Admin </p>
            
          </div>
          <div className='w-full pb-10'>
            <div onClick={()=>navigate('/admin')} className={`${page==='dash'?'bg-purple-400 border border-purple-400 text-white':''} admin-nav-item `}>
              <FontAwesomeIcon className='text-xl' icon={faChartPie}/>
              <h1 >Dashboard</h1>
            </div>
            <div onClick={()=>navigate('/admin/userlist')} className={`${page==='users'?'bg-purple-400 border border-purple-400 text-white':''} admin-nav-item `}>
              <FontAwesomeIcon className='text-xl' icon={faUsers}/>
              <h1>Users</h1>
            </div>
            <div onClick={()=>navigate('/admin/subscription')} className={`${page==='sub'?'bg-purple-400 border border-purple-400 text-white':''} admin-nav-item `}>
              <FontAwesomeIcon className='text-2xl' icon={faCartShopping}/>
              <h1>Subscription</h1>
            </div>
            <div className='admin-nav-item'>
              <FontAwesomeIcon className='text-xl ps-2' icon={faQuestion}/>
              <h1 className='ps-1'>Questions</h1>
            </div>
            <div className='admin-nav-item'>
              <FontAwesomeIcon className='text-xl' icon={faRankingStar}/>
              <h1>Ranking</h1>
            </div>
            <div className='admin-nav-item border-0 ' onClick={adminLogout}>
              <FontAwesomeIcon className='text-xl' icon={faArrowRightFromBracket}/>
              <h1>Logout</h1>
            </div>
          </div>

        </div>
    </div>
    </>
  )
}

export default AdminNav
