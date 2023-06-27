import React ,{useEffect} from 'react'
import Navbar from '../components/User/Navbar/Navbar'
import Signup from '../components/User/Signup/Signup'
import { useNavigate } from 'react-router-dom'
import { verifyAuth } from '../utils/auth/authUser'

function ReginsterPage() {
  const navigate=useNavigate()
  let user=localStorage.getItem('user')
  useEffect(() => {
    if(user){
      let role=verifyAuth(user)
      if(role==='candidate')navigate('/')
      else if(role==='employer') navigate('/employer')
    }
  }, [user,navigate])

  return (
    <div>
      <Navbar/>
      <Signup/>
    </div>
  )
}

export default ReginsterPage
