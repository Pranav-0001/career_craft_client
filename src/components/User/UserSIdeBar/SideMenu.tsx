import React from 'react'
import "./SideMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBriefcase, faChartLine, faGear } from '@fortawesome/free-solid-svg-icons'
import { faBookmark, faEdit, faEye, faUser } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'

interface SideMenuProps {
    page: string;
}

const SideMenu:React.FC<SideMenuProps>= ({page}) =>{
    const navigate=useNavigate()
  return (
    <div className='w-full ps-20 pe-8'>
        <div className='bg-white  mt-20  border rounded-md shadow-sm shadow-primary-400 overflow-hidden'>
            <div onClick={()=>navigate('/dashboard')} className={`${page==="dash"?'bg-primary-900 text-white':''} flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faChartLine}/>
                <h1>DashBoard</h1>
            </div>
            <div onClick={()=>navigate('/my-profile')} className={`${page==="prof"?'bg-primary-900 text-white border-primary-900 border-2':''} flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faUser}/>
                <h1>My Profile</h1>
            </div>
            <div onClick={()=>navigate('/my-applications')} className={`${page==="apply"?'bg-primary-900 text-white border-primary-900 border-2':''} flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faBriefcase}/>
                <h1>Applied Jobs</h1>
            </div>
            <div onClick={()=>navigate('/bookmarks')} className={`${page==="saved"?'bg-primary-900 text-white border-primary-900 border-2':''} flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faBookmark}/>
                <h1>Bookmarked Jobs</h1>
            </div>
            <div onClick={()=>navigate('/editresume')} className={`${page==="edit"?'bg-primary-900 text-white':''} flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faEdit}/>
                <h1>Edit Resume</h1>
            </div>
            <div onClick={()=>navigate('/view-resume')} className={`${page==="resumeView"?'bg-primary-900 text-white':''} flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faEye}/>
                <h1>View Resume</h1>
            </div>
            <div className={`flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faGear}/>
                <h1>Settings</h1>
            </div>
            <div className={`flex items-center gap-3 py-3 cursor-pointer px-6`}>
                <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                <h1>Logout</h1>
            </div>
        </div>
      
    </div>
  )
}

export default SideMenu
