import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Basic from './Basic'
import Profile from './Profile'
import Education from './Education'
import './EditResume.css'
import Professional from './Professional'
import { fetchUserData } from '../../../services/candidate/profile'
import { useSelector } from 'react-redux'
import { User } from '../../../models/User'

function EditResume() {
    const [page,setPage]=useState('basic')
    
    const { userId } = useSelector((state:any) => state.user);

    useEffect(() => {
        const fetchData=async()=>{
            const user:User=await fetchUserData(userId)
            
            
        }
        fetchData()
    }, [])
    
    return (
        <>
            <div className='mt-20 w-full'>
                <div className='flex justify-between items-center text-xs md:text-md lg:text-lg'>
                    <div className='w-full text-center lg:px-10 '>
                        <h1 onClick={()=>setPage('basic')} className={`${page==='basic'? 'bg-primary-800 py-2 text-white rounded-md':''}  cursor-pointer`}>Basic Information</h1>
                    </div>
                   
                    <div className='w-full text-center lg:px-10'>
                        <h1 onClick={()=>setPage('profile')} className={`${page==='profile'? 'bg-primary-800 py-2 text-white rounded-md':''}  cursor-pointer`}>Profile</h1>
                    </div>
                    
                    <div className='w-full text-center lg:px-10'>
                        <h1 onClick={()=>setPage('education')} className={`${page==='education'? 'bg-primary-800 py-2 text-white rounded-md':''}  cursor-pointer`}>Education</h1>

                    </div>
      

                    <div className='w-full text-center lg:px-10'>
                        <h1 onClick={()=>setPage('prof')} className={`${page==='prof'? 'bg-primary-800 py-2 text-white rounded-md':''}  cursor-pointer`}>Professional</h1>
                    </div>
                </div>
            </div>
            {page==="basic" && <Basic/>}
            {page==="profile" && <Profile/>}
            {page==="education" && <Education/>}
            {page==="prof" && <Professional/>}
        </>
    )
}

export default EditResume
