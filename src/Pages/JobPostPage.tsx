import React ,{useEffect} from 'react'
import JobPost from '../components/Employer/JobPost/JobPost'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'


function JobPostPage() {
  return (
    <div>
      <EmpNavbar/>
      <JobPost/>
    </div>
  )
}

export default JobPostPage
