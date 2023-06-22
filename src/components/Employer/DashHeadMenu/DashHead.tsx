import React from 'react'
import './DashHead.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faClipboardQuestion, faCube, faGears, faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { api } from '../../../services/axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateEmp } from '../../../redux/employer/employerSlice'
function DashHead() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const empLogout=()=>{
        localStorage.removeItem('user')
        api.post('/employer/logout',{},{withCredentials:true})
        dispatch(updateEmp({}))
        navigate('/login')
    }
  return (
    <>
      <div>
        <div className='w-full px-2 md:px-16 mt-6 md:mt-16'>
            <div className='w-full border-2 rounded-md h-24 px-2 py-3 bg-white'>
                <div className='w-full h-full dash-head rounded-md flex items-center text-xl justify-between md:justify-around   overflow-hidden'>
                    <div className='flex items-center justify-center gap-3 bg-primary-800 h-full w-full text-white cursor-pointer'>
                        <FontAwesomeIcon icon={faCube}/>
                        <h1 className='hidden lg:block'>DashBoard</h1>
                    </div>
                    <div className='flex items-center justify-center gap-3  h-full w-full cursor-pointer'>
                        <FontAwesomeIcon icon={faAddressCard}/>
                        <h1 className='hidden lg:block'>Profile</h1>
                    </div>
                    <div className='flex items-center justify-center gap-3  h-full w-full cursor-pointer'>
                        <FontAwesomeIcon icon={faBriefcase}/>
                        <h1 className='hidden lg:block'>Applied List</h1>
                    </div>
                    <div className='flex items-center justify-center gap-3  h-full w-full cursor-pointer'>
                        <FontAwesomeIcon icon={faGears}/>
                        <h1 className='hidden lg:block'>Settings</h1>
                    </div>
                    <div className='flex items-center justify-center gap-3  h-full w-full cursor-pointer'>
                        <FontAwesomeIcon icon={faClipboardQuestion}/>
                        <h1 className='hidden lg:block'>Questions</h1>
                    </div>
                    <div className='flex items-center justify-center gap-3  h-full w-full cursor-pointer' onClick={empLogout}>
                        <FontAwesomeIcon icon={faPersonWalkingArrowRight}/>
                        <h1 className='hidden lg:block'>Logout</h1>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}

export default DashHead
