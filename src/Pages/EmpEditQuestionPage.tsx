import React from 'react'
import EmpNavbar from '../components/Employer/Navnar/EmpNavbar'
import EditQuestion from '../components/Employer/QuestionForm/EditQuestion'

const EmpEditQuestionPage = () => {
  return (
    <div>
      <EmpNavbar/>
      <EditQuestion role='employer'/>
    </div>
  )
}

export default EmpEditQuestionPage
