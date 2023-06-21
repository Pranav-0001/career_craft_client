import React,{useEffect} from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import Home from '../components/User/Home/Home'
import Footer from '../components/User/Footer/Footer'
import { api } from '../services/axios'

function Homepage() {
  useEffect(() => {
    const auth=async()=>{
      let token = localStorage.getItem('candidate')
    if (token){
      const {data}= await api.post('/',{token},{withCredentials:true})
      if(data.status){
        if(data.accessToken){
          localStorage.removeItem('candidate')
          localStorage.setItem('candidate',data.accessToken)
        }
      }else{
        localStorage.removeItem('candidate')
      }
    }
    }
    auth()
  }, [])
  
  return (
    <div>
      <MainNav/>
    
      <Home/>
      <Footer/>
    </div>
  )
}

export default Homepage
