import React, { useEffect, useState } from 'react'
import {  fetchPrime } from '../../../services/admin/fetchUsers'
import { User } from '../../../models/User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import Loader from '../../Loader/Loader'
import { blockUser, unBlockUser } from '../../../services/admin/userVerificarion'

function Premium() {
    const [users,SetUsers]=useState<User[]>([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(() => {
     const fetchData=async()=>{
      setIsLoading(true)
      const Prime=await fetchPrime()
      SetUsers(Prime)
      setIsLoading(false)
      
     }
     fetchData()
    }, [])
   
    const block=async(userId:string)=>{
      const data=await blockUser(userId)
      const updatedUsers=users.map(user=>user._id === userId ?{ ...user, status: false }:user)
      SetUsers(updatedUsers)
    }

    const unBlock=async(userId:string)=>{
      const data=await unBlockUser(userId)
      const updatedUsers=users.map(user=>user._id === userId ?{ ...user, status: true }:user)
      SetUsers(updatedUsers)
    }
    
    
  return (

    <div className='md:ps-20 mt-10 '>
      {isLoading?
      <Loader/>
      :<>
      <div className='hidden lg:block'>
      <table className='w-full '>
        <thead className='border '>
          <tr className='text-left ps-10 bg-blue-200 h-12 border '>
            <th className='ps-4'>S.No</th>
            <th>Profile</th>
            <th className=''>Email</th>
            <th>Las Point</th>
            <th>Applied</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((obj,index)=><tr className='h-14 border-b-2'>
            <td className='ps-4'>{index+1}</td>
            <td className='flex gap-2 items-center h-14'>
              <img src={obj.profileImg} className='h-8 rounded-full' alt="" />
              <h1>{obj.username}</h1>
            </td>
            <td>
              {obj.email}
            </td>
            <td>100</td>
            <td>10</td>
            <td>{obj.status?"Active" : "Banned"}</td>
            <td>{obj.status?<FontAwesomeIcon onClick={()=>block(obj._id)} className='bg-red-500 text-white px-3 py-2 rounded-lg'  icon={faEyeSlash}/> : <FontAwesomeIcon onClick={()=>unBlock(obj._id)} className='bg-green-500 text-white px-3 py-2 rounded-lg' icon={faEye}/>}</td>
          </tr>)}
        </tbody>
      </table>
      </div>
      <table className='w-full lg:hidden'>
        <thead className='border '>
          <tr className='text-left ps-10 bg-blue-200 h-12 border '>
            <th className='ps-4'>S.No</th>
            <th>Profile</th>
         
           
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((obj,index)=><tr className='h-14 border-b-2'>
            <td className='ps-4'>{index+1}</td>
            <td className='flex gap-2 items-center h-14'>
              <img src={obj.profileImg} className='h-8 rounded-full' alt="" />
              <div className='text-sm'>
                <h1>{obj.username}</h1>
                <h1 className='text-xs'>{obj.email}</h1>
              </div>
              
            </td>
           
           
            <td>{obj.status?"Active" : "Banned"}</td>
            <td>{obj.status?<FontAwesomeIcon className='bg-red-500 text-white px-3 py-2 rounded-lg' onClick={()=>block(obj._id)}  icon={faEye}/> : <FontAwesomeIcon onClick={()=>unBlock(obj._id)} className='bg-green-500 text-white px-3 py-2 rounded-lg' icon={faEyeSlash}/>}</td>
          </tr>)}
        </tbody>
      </table>
    </>}
    </div>
  )
}

export default Premium
