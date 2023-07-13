import React from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import ResumeEmp from '../components/Employer/Resume/ResumeEmp'

function EmpResumeViewPage() {
  return (
    <>
     <EmpNavbar/>
     <div className='lg:ps-60 lg:pe-40 mt-16 pb-8'>
       <ResumeEmp/>  
     </div>
     
    </>
  )
}

export default EmpResumeViewPage
