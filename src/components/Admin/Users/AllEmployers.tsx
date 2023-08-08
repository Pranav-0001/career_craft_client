import React, { useEffect, useState } from 'react'
import { fetchEmp } from '../../../services/admin/fetchUsers'
import { User } from '../../../models/User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { blockUser, verifyEmp } from '../../../services/admin/userVerificarion'
import { toast } from 'react-toastify'
import Loader from '../../Loader/Loader'

function AllEmployers() {
    const [users,SetUsers]=useState<User[]>([])
    const [isLoading,setIsLoading]=useState(false)
    const verifyEmployer=async(empId:string,email:string)=>{
        const res=await verifyEmp(empId,email)
        if(res.modifiedCount===1){
            const updatedUsers=users.map(user=>user._id === empId ?{ ...user, status: true }:user)
            SetUsers(updatedUsers)
        }
        
    }
    useEffect(() => {
     const fetchData=async()=>{
      setIsLoading(true)
      const emp=await fetchEmp()
    
      
      SetUsers(emp)
      setIsLoading(false)
     }
     fetchData()
    }, [])

    const block=async(userId:string)=>{
      const data=await blockUser(userId)
      const updatedUsers=users.map(user=>user._id === userId ?{ ...user, status: false }:user)
      SetUsers(updatedUsers)
    }
  return (
    <>    
    {isLoading ? 
    <Loader/>
    :<div className='md:ps-20 mt-10 '>
        <div className='hidden lg:block'>
      <table className='w-full  '>
        <thead className='border '>
          <tr className='text-left ps-10 bg-blue-200 h-12 border '>
            <th className='ps-4'>S.No</th>
            <th>Profile</th>
            <th className=''>Email</th>
            <th>Company</th>
            <th>Location</th>
            <th>Posted Jobs</th>
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
            <td>{obj.company}</td>
            <td>{obj.location}</td>
            <td>100</td>
            <td>{obj.status?"Verified" : "Not Verified"}</td>
            <td className=''>{obj.status?<FontAwesomeIcon onClick={()=>block(obj._id)} className='cursor-pointer bg-red-500 text-white px-3 py-2 rounded-lg'  icon={faCircleXmark}/> :  <FontAwesomeIcon onClick={()=>verifyEmployer(obj._id,obj.email)} className='cursor-pointer bg-green-500 text-white px-3 py-2 rounded-lg' icon={faCircleCheck}/>}</td>
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
            <td className='flex gap-2 items-center lg:h-14'>
              <img src={obj.profileImg} className='h-8 rounded-full' alt="" />
              <div className='text-md'>
                <h1 >{obj.username}</h1>
                <h1 className='text-xs'>{obj.company}</h1>
                <h1 className='text-xs'>{obj.email}</h1>
                <h1 className='text-xs'>{obj.location}</h1>
                </div>
            </td>
           
            
            <td>{obj.status?"Verified" : "Not Verified"}</td>
            <td className=''>{obj.status?<FontAwesomeIcon onClick={()=>block(obj._id)} className='cursor-pointer bg-red-500 text-white px-3 py-2 rounded-lg'  icon={faCircleXmark}/> :  <FontAwesomeIcon onClick={()=>verifyEmployer(obj._id,obj.email)} className='cursor-pointer bg-green-500 text-white px-3 py-2 rounded-lg' icon={faCircleCheck}/>}</td>
          </tr>)}
        </tbody>
      </table>
    </div>}
    </>

  )
}

export default AllEmployers
