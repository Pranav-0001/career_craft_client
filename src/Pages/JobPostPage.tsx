import React ,{useEffect} from 'react'
import JobPost from '../components/Employer/JobPost/JobPost'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import { useNavigate } from 'react-router-dom'
import { verifyAuth } from '../utils/auth/authUser'

function JobPostPage() {
  const navigate=useNavigate()
    useEffect(() => {
    const token=localStorage.getItem('user')
    if(token){
        const role=verifyAuth (token)
        role==='employer'? navigate('/addjob') :navigate('/')
    }else{
      navigate('/')
    }
      
    }, [navigate])
  return (
    <div>
      <EmpNavbar/>
      <JobPost/>
    </div>
  )
}

export default JobPostPage
