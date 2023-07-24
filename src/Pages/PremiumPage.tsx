import React from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import { useSelector } from 'react-redux';
import Subscription from '../components/User/Premium/Subscription';
import Premium from '../components/User/Premium/Premium';

const PremiumPage = () => {
    const { userId, username, image,userEmail,isPrime } = useSelector((state: any) => state.user);

  return (
    <>
      <MainNav/>
      {isPrime 
      ?
      <Premium/>
      :
      <Subscription/>
      
      
      }
    </>
  )
}

export default PremiumPage
