import React from 'react'
import Questions from '../components/Employer/Questions/Questions'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import DashHead from '../components/Employer/DashHeadMenu/DashHead'

interface queModel{
    role:string
}


const EmployerQuestionPage:React.FC<queModel>=({role})=> {
  return (
    <>
    <EmpNavbar/>
    <DashHead page='que'/>
    <div className='px-2 lg:px-20'>
        <Questions role={role}/>
    </div>
    
    </>
  )
}

export default EmployerQuestionPage
