import React from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import QuestionForm from '../components/Employer/QuestionForm/QuestionForm'

interface queModel{
    role:string
}

const EmpAddQuestion:React.FC<queModel> = ({role}) => {
  return (
    <>
      <EmpNavbar/>
      <div className={`w-full lg:px-60 mt-8 px-2`}>
        <QuestionForm role={role}/>
      </div>
      
    </>
  )
}

export default EmpAddQuestion
