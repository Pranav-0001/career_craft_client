import React, { useEffect, useState } from 'react'
import { fetchUserData } from '../../../services/candidate/profile'
import { useSelector } from 'react-redux';
import { User } from '../../../models/User';
import { url } from 'inspector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function Resume() {
  const { userId } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<User>()
  const [show,setShow]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const user:User = await fetchUserData(userId)
      
      if(user.basic && user.profile && user.education){
        setShow(true)
        setUserData(user)
      }
    }
    fetchData()

  }, [])

  return (
    <>
      <div className='w-full lg:pe-20 font-exo'>
        {show ? <div className='w-full border shadow-md rounded-md  grid grid-cols-3 mb-8'>
          <div className='bg-cvPrimary px-2 py-2 overflow-hidden rounded-sm'>
            <div>
              <div className='flex justify-center'>
                <div className='lg:h-36 lg:w-36 h-24 w-24 bg-cover rounded-full border-2 ' style={{ backgroundImage: `url(${userData?.basic?.imageURL})` }}> </div>
              </div>
              <h1 className='text-center text-md lg:text-xl font-exo text-white'>{userData?.firstname} {userData?.lastname} </h1>
              <div className='lg:px-4 pt-4 mb-4'>
                <h1 className='text-sm lg:text-xl text-white underline mb-2'>Contact</h1>
                <p className='text-white mb-1 lg:text-lg text-xs flex items-center ' ><FontAwesomeIcon className='pe-1 hidden md:block' icon={faEnvelope} /> {userData?.email}</p>
                <p className='text-white mb-1 lg:text-lg text-xs flex items-center' ><FontAwesomeIcon className='pe-1 hidden md:block' icon={faPhone} /> {userData?.basic?.phone}</p>
              </div>

              <div className='lg:px-4 pt-4 mb-4'>
                <h1 className='text-sm lg:text-xl text-white underline mb-2'>Skills</h1>
                <p className='text-white'>{userData?.profile?.skills?.map((obj, i) => <span className='text-xs lg:text-lg' key={i}>{obj}  </span>)}</p>
              </div>

              <div className='lg:px-4 pt-4 mb-4 text-white'>
                <h1 className='text-sm lg:text-xl text-white underline mb-2'>Education</h1>
                <p className='text-sm lg:text-lg'>Education : {userData?.education?.education}</p>
                <p className='text-sm lg:text-lg'>Institure/university :  {userData?.education?.institute}</p>
                <p className='text-sm lg:text-lg'>Result : {userData?.education?.result}%</p>
                <p className='text-sm lg:text-lg'>Acadamic Year : {userData?.education?.starting} - {userData?.education?.ending}</p>
              </div>

            </div>
          </div>
          <div className='col-span-2 lg:px-2 py-2'>
            <div className='w-full bg-gray-200 pb-4 flex justify-center'>
              <div className='text-center'>
                <h1 className='pt-4 text-2xl lg:text-4xl font-bold pb-2'>{userData?.firstname} {userData?.lastname}</h1>
                <div className='border-2 border-black '></div>
                <p className='text-lg pt-2 uppercase'>{userData?.basic?.about}</p>
              </div>

            </div>
            <div className='lg:px-2 mt-4 '>
              <h1 className='uppercase text-xl underline pb-1'>Objectives</h1>
              <p className='text-justify'> {userData?.basic?.objective}</p>
            </div>
            <div className='lg:px-2 mt-4 '>
            <h1 className='uppercase text-xl underline pb-1'>Basic Information</h1>
            <div className='grid grid-cols-2'>
            <div>
                <h1>Gender : {userData?.profile?.gender}</h1>
              </div>
              <div>
                <h1>Marital Status : {userData?.profile?.marital}</h1>
              </div>
              <div>
                <h1>Date Of Birth : {userData?.profile?.dob}</h1>
              </div>
              <div>
                <h1>Nationality : {userData?.profile?.nationality}</h1>
              </div>
              <div>
                <h1>Father : {userData?.profile?.father}</h1>
              </div>
              <div>
                <h1>Mother : {userData?.profile?.mother}</h1>
              </div>
              <div>
              <p>Present Address: {userData?.profile?.present}</p>

              </div>
              <div>
              <p>Permanent Address: {userData?.profile?.permanent}</p>

              </div>
              

            </div>
            </div>
            {userData?.professional && <div className='lg:px-2 mt-4'>
              <h1 className='uppercase text-xl underline pb-1'>experience</h1>
              <p>Previous Company : {userData.professional.company}</p>
              <p>Designation : {userData.professional.designation}</p>
              <p>Experience : {userData.professional.experience} Years</p>
            </div>}
            {userData?.profile?.projects && <div  className='lg:px-2 mt-4'>
            <h1 className='uppercase text-xl underline pb-1'>Projects</h1>
              {userData.profile.projects.map((obj,i)=><div className='px-2 '>
                <h1 className='text-xl'>{i+1}. {obj.title}</h1>
                <p className='text-justify pb-4'>{obj.desc}</p>

              </div>)}  
            </div>}
          </div>
        </div>
        :
        <div className='px-2 lg:px-28'>
          <div className=' px-4 '>
            <h1 className='text-center py-2 text-2xl font-exo'>Profile is not Updated!!</h1>       
            <p className='text-justify text-lg'>Please update your profile before generating the CV to ensure accurate and relevant information. Thank you!</p>
          </div>
        </div>
        }
      </div>
    </>
  )
}

export default Resume
