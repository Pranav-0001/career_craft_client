import React, { useState } from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleQuestion, faEdit, faEye, faFile } from '@fortawesome/free-regular-svg-icons'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { faBusinessTime, faCrow, faCrown, faGears, faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons'
import { updateUser } from '../../../redux/user/userSlice'
import { api } from '../../../services/axios'



function MainNav() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const [sideMenu,setMenu]=useState(false)
    const { userId, username, image,userEmail,isPrime } = useSelector((state: any) => state.user);
    const userLogout=()=>{
        
        api.post('/logout',{userId},{withCredentials:true}).then((data)=>{
            if(data.data.status){
                setMenu(false)
                dispatch(updateUser({}))
                localStorage.removeItem('user')
            }
            
        })

    }
    return (
        <>
        
            <nav className='flex align-middle justify-between z-1' >
                <div className="logo w-20 flex items-center ms-3">
                    <img src='/Images/BLAC.svg' alt='logo' />
                </div>

                <div className=" md:flex items-center  ">
                    {userId &&
                        <div className='hidden md:block'>
                            <h1 className='nav-item'>Dashboard</h1>
                        </div>
                    }
                    <div className='hidden md:block'>
                        <h1 onClick={()=>navigate('/findjobs')} className='nav-item'>Find Jobs</h1>
                    </div>
                    {userId &&
                        <div className='hidden md:block'>
                            <h1 className='nav-item'>Chats</h1>
                        </div>
                    }
                    {userId &&
                        <div className='hidden md:block'>
                            <h1 className='nav-item text-lg'><FontAwesomeIcon icon={faBell} /></h1>
                        </div>
                    }
                    {userId &&
                        <div className='flex items-center me-4 pt-2 md:pt-0'>
                            <h1 className='nav-item me-1'>{username}</h1>
                            <div className='relative'>
                                {isPrime&&<FontAwesomeIcon icon={faCrown} className='absolute text-yellow-300 bottom-0'/>}
                               <img className={`h-10 rounded-full ${isPrime&&'border-2 border-yellow-300 shadow'}`} src={image} alt="" /> 
                            </div>
                            
                        </div>
                    }
                    {userId &&
                        <div className='nav-item hidden md:flex menubb' onClick={()=>setMenu(!sideMenu)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    }
                    {!userId && <div className='me-2 md:me-12 flex items-center'>
                        <button className='bg-primary-700 px-6 py-2 shadow-md text-white rounded-sm mt-2 md:mt-0' onClick={() => navigate('/login')}>Login</button>
                    </div>

                    }
                </div>

            </nav>
            <div className='w-full bg-gray-200  shadow-md h-10 md:hidden'>
                <div className=" flex items-center md:hidden justify-end pt-2">
                    <div>
                        <h1 className='nav-item'>Find Jobs</h1>
                    </div>
                    {userId&&
                    <div className=''>
                        <h1 className='nav-item'>Dashboard</h1>
                    </div>
                    }{userId&&
                    <div>
                        <h1 className='nav-item'>Chats</h1>
                    </div>
                    }
                    {userId&&
                    <div>
                        <h1 className='nav-item text-lg'><FontAwesomeIcon icon={faBell} /></h1>
                    </div>
                    }
                    {userId&&
                    <div className='nav-item'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    }
                </div>
            </div>
            <div className={`z-10 h-full bg-gray-100 absolute  right-0 sideMenuBar  duration-700   ${sideMenu?'w-96':'w-0'}`}>
                <div className="flex items-center ms-5 mt-5 gap-4 border-b-2 border-gray-700 me-4 pb-4">
                    <img className='h-20 rounded-full' src={image} alt="" />
                    <div>
                        <p className='font-bold text-lg'>{username}</p>
                        <p className='text-sm'>{userEmail}</p>
                    </div>
                </div>
                
                <ul className={`mt-4 font-work text-2xl cursor-pointer overflow-hidden  `}>
                    <li className='border-b-2 ps-4 pb-2 pt-2 hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faFile} />  Saved Jobs</li>
                    <li className='border-b-2 ps-4 pb-2 pt-2 hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faCircleQuestion} /> Learn and Share</li>
                    <li className='border-b-2 ps-4 pb-2 pt-2 hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faEye} /> View Resume</li>
                    <li className='border-b-2 ps-4 pb-2 pt-2 hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faCrown} className='text-yellow-400' /> Mock Test</li>
                    <li className='border-b-2 ps-4 pb-2 pt-2 hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faEdit} /> Edit Resume</li>
                    <li className='border-b-2 ps-4 pb-2 pt-2 hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faBusinessTime} /> Applied Jobs</li>
                    <li className='border-b-2 ps-4 pb-2 pt-2 hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faGears} /> Settings</li>
                    <li onClick={userLogout} className='border-b-2 ps-4 pb-2 pt-2 shadow-md hover:scale-105 transition duration-150 ease-in-out w-96'><FontAwesomeIcon icon={faPersonWalkingArrowRight} /> Logout</li>
                </ul>
            </div>
        </>
    )
}

export default MainNav
 