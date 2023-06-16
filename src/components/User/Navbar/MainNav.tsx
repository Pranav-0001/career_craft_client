import React from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'


function MainNav() {
    return (
        <>
            <nav className='flex align-middle justify-between ' >
                <div className="logo w-20 flex items-center ms-3">
                    <img src='/Images/BLAC.svg' alt='logo' />
                </div>

                <div className=" md:flex items-center  ">
                    <div className='hidden md:block'>
                        <h1 className='nav-item'>Dashboard</h1>
                    </div>
                    <div  className='hidden md:block'>
                        <h1 className='nav-item'>Find Jobs</h1>
                    </div>
                    <div className='hidden md:block'>
                        <h1 className='nav-item'>Chats</h1>
                    </div>
                    <div className='hidden md:block'>
                        <h1 className='nav-item text-lg'><FontAwesomeIcon icon={faBell} /></h1>
                    </div>
                    <div className='flex items-center me-4 pt-2 md:pt-0'>
                        <h1 className='nav-item me-1'>Pranav</h1>
                        <img className='h-10 rounded-full' src="Images/a.jpg" alt="" />
                    </div>
                    <div className='nav-item hidden md:flex '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>

            </nav>
            <div className='w-full bg-gray-200 shadow-md h-10 md:hidden'>
            <div className=" flex items-center md:hidden justify-end pt-2">
                    <div className=''>
                        <h1 className='nav-item'>Dashboard</h1>
                    </div>
                    <div>
                        <h1 className='nav-item'>Find Jobs</h1>
                    </div>
                    <div>
                        <h1 className='nav-item'>Chats</h1>
                    </div>
                    <div>
                        <h1 className='nav-item text-lg'><FontAwesomeIcon icon={faBell} /></h1>
                    </div>
                    
                    <div className='nav-item'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainNav
