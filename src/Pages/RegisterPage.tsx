import React ,{useEffect} from 'react'
import Navbar from '../components/User/Navbar/Navbar'
import Signup from '../components/User/Signup/Signup'
import { useNavigate } from 'react-router-dom'

function ReginsterPage() {
  const navigate=useNavigate()
  let candidate=localStorage.getItem('candidate')
  let employer=localStorage.getItem('employer')
  useEffect(() => {
    if(candidate){
      navigate('/')
    }else if(employer){
      console.log("employer");
    }
  }, [candidate,employer,navigate])

  return (
    <div>
      <Navbar/>
      <Signup/>
    </div>
  )
}

export default ReginsterPage
