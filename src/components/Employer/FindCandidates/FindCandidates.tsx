import React, { useEffect, useState } from 'react'
import { fetchAllCandidates } from '../../../services/Employer/Candidates'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User } from '../../../models/User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCrown, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'
import { createChatFromCandidates } from '../../../services/Chats/Chat'

const FindCandidates = () => {
    const navigate=useNavigate()
   const {EmployerId}  = useSelector((state: any) => state.employer);

    const [user,setUser]=useState<User[]>([])
    const [pagination,setPagination]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const {search}=useLocation()
    const queryParams = new URLSearchParams(search);
    const page= queryParams.get("page")
    useEffect(() => {
        const fetch=async () => {
          setIsLoading(true)
            let p=page ? parseInt(page) : 1
            const data=await fetchAllCandidates(p)
            console.log(data);
            setUser(data.users)
            setPagination(data.pagination)
            setIsLoading(false) 
        }
        fetch()
    }, [page])

    const chat=async(userId:string)=>{
      const data=await createChatFromCandidates(userId,EmployerId)
      navigate('/employer/chat')
    }
    
  return (
    <div className='lg:px-16 md:px-8 px-2 font-exo'>
        <div>
            <h1 className='py-2 text-3xl font-bold'>Candidates</h1>
        </div>
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 font-exo mt-2'>
      {
        user.map((obj)=> <div className='w-full px-2 border rounded  shadow py-4'>
            <div className=' flex justify-center relative'> 
           
            <img className={`w-32 rounded-full ${obj.isPrime?'border-4 border-yellow-300 ':''}`} src={obj.profileImg} alt="" />
            {obj.isPrime&&<FontAwesomeIcon className='absolute  bottom-0 text-3xl text-yellow-300 ' icon={faCrown}/>}
            
         
            </div>
            <div>
            <h1 className='text-center text-lg'>{obj.firstname} {obj.lastname}</h1>
            <p className='text-center text-sm'>{obj.email}</p>
            <div className='flex justify-center w-full gap-2 my-2'>
               {obj.facebook&& <Link to={obj.facebook} target='_blank'><FontAwesomeIcon className='text-3xl cursor-pointer text-blue-800' icon={faFacebook}/></Link>}
                {obj.instagram&&<Link to={obj.instagram} target='_blank'><FontAwesomeIcon className='text-3xl cursor-pointer text-pink-600' icon={faInstagram}/></Link>}
                {obj.gitHub&&<Link to={obj.gitHub} target='_blank'><FontAwesomeIcon className='text-3xl cursor-pointer' icon={faGithub}/></Link>}
                {obj.linkedIn&&<Link to={obj.linkedIn} target='_blank'><FontAwesomeIcon className='text-3xl cursor-pointer text-blue-800' icon={faLinkedin}/></Link>}
            </div>
            {obj.mockPer&&<div className='w-full flex justify-center'>
                <h1 className='text-lg'><FontAwesomeIcon className='text-yellow-400' icon={faTrophy}/> {obj.mockPer}<span className='text-sm'>/100pts</span> </h1>
            </div>}
            <div className='flex justify-center py-2 gap-2'>
            {obj.basic&&obj.education&&obj.profile&&
                <button className='bg-blue-600 text-white px-2 py-1 rounded shadow' onClick={()=>navigate(`/employer/view-resume?user=${obj._id}`)}>View Resume</button>
            }
            <button onClick={()=>chat(obj._id)} className='bg-primary-600 px-4 rounded shadow text-white py-1'><FontAwesomeIcon icon={faPaperPlane}/> Chat</button>
            </div>
            </div>
            <div>

            </div>
        </div> )
      }
      
    </div>
    <div className='w-full flex justify-end mt-4'>
        {pagination.map((num)=> <button onClick={()=>navigate(`?page=${num}`)} className='shadow w-10 h-10 bg-primary-700 text-xl text-white'>{num}</button> )}
      </div>
    </div>
  )
}

export default FindCandidates
