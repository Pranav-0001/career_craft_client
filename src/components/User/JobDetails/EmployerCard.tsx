import React from 'react'
import { User } from '../../../models/User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { faClose } from '@fortawesome/free-solid-svg-icons'

interface Employer{
  user?:User
}

const EmployerCard:React.FC<Employer> = ({user}) => {
  return (
    <div className='w-full h-screen fixed top-0 left-0 flex justify-center font-exo px-4'>
      <div className='bg-white h-fit py-5 px-4 lg:w-1/3 md:w-1/2 w-full rounded shadow border border-primary-500'>
      <div className='w-full flex justify-end'>
            <FontAwesomeIcon icon={faClose}/>
          </div>
        <div className='flex items-center gap-3 pb-4 border-b-2 w-full'>
          
          <img className='h-12 rounded-full' src={user?.profileImg}  alt="" />
          <div className=''>
            <h1>{user?.firstname} {user?.lastname}</h1>
            <p>{user?.email}</p>
          </div>
          
        </div>
        <div>
            <h1>Company : {user?.company}</h1>
            <h1>Location : {user?.location}</h1>
        </div>

        <div className='flex items-center px-2 gap-2 text-2xl'>
          {user?.facebook&&<Link to={user?.facebook} target='_blank' className='text-blue-600'><FontAwesomeIcon icon={faFacebook}/></Link>}
          {user?.instagram&&<Link to={user?.instagram}  target='_blank' className='text-pink-600'><FontAwesomeIcon icon={faInstagram}/></Link>}
          {user?.linkedIn&&<Link to={user?.linkedIn}  target='_blank' className='text-blue-600'><FontAwesomeIcon icon={faLinkedin}/></Link>}
        </div>
      </div>
    </div>
  )
}

export default EmployerCard
