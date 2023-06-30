import React ,{useEffect} from 'react'
import JobPost from '../components/Employer/JobPost/JobPost'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import { useNavigate } from 'react-router-dom'
import { verifyAuth } from '../utils/auth/authUser'

function JobPostPage() {
  return (
    <div>
      <EmpNavbar/>
      <JobPost/>
    </div>
  )
}

export default JobPostPage
