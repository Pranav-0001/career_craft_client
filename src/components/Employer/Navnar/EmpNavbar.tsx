import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EmpNavbar() {
    const {EmpUsername,EmpImage } = useSelector((state: any) => state.employer);
    const navigate= useNavigate()

    return (
        <>
            <nav className='flex align-middle justify-between z-1' >
                <div className="logo w-20 flex items-center ms-3">
                    <img src='/Images/BLAC.svg' alt='logo' />
                </div>
                <div className="flex items-center  ">
                    <div className='hidden md:block'>
                        <h1 onClick={()=>navigate('/employer/findcandidates')} className='nav-item'>Find Candidates</h1>
                    </div>
                    <div className='hidden md:block'>
                        <h1 onClick={()=>navigate('/employer/chat')} className='nav-item'>Chats</h1>
                    </div>
                   
                    <div className='flex items-center me-4 pt-2 md:pt-0 gap-2'>
                            <h1 className='nav-item me-1'>{EmpUsername}</h1>
                            <img className='h-10 rounded-full' src={EmpImage} alt="" />
                    </div>
                </div>
            </nav>
            <div className='w-full h-10 bg-gray-400 shadow-md md:hidden flex justify-end items-center text-white'>
                <h1 className='nav-item'>Find Candidates</h1>
                <h1 className='nav-item text-lg'><FontAwesomeIcon icon={faBell} /></h1>
                <h1 className='nav-item'>Chats</h1>
            </div>

        </>
    )
}

export default EmpNavbar
