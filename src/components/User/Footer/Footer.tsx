import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <div className='bg-black w-full'>
    <div className='w-full bg-black grid grid-cols-1 content-center md:flex justify-between text-white pt-16 pb-12 ps-20 font-exo'>
        <div >
            <h1 className='font-bold text-2xl'>About Us</h1>
            <ul className='ms-4 mt-2'>
                <li>Contact us</li>
                <li>Terms and policy</li>
                <li>Privacy and policy</li>
                <li>Candidate Listing</li>
            </ul>
        </div>
        <div className='w-60'>
            
            <img className='w-1/2 ms-8' src="/Images/ONLY_LOGO.svg" alt="" />
            <h1 className='text-sm'>Support Line : +91 9846071341</h1>
        </div>

        <div>
            <h1>Follow Us</h1>
            <div className="flex mt-3">
                <FontAwesomeIcon icon={faFacebook} className='me-6   text-3xl'/>
                <FontAwesomeIcon icon={faInstagram} className='me-6 text-3xl'  />
                <FontAwesomeIcon icon={faLinkedin} className='me-6 text-3xl' />
                <FontAwesomeIcon icon={faYoutube} className='me-6 text-3xl' />
            </div>
        </div>
    </div>
    <hr  className='bg-white mx-32'/>
    <h1 className="text-center text-white mt-2 pb-3">©Copyright 2023 JOB | Design By Pranav</h1>
    </div>
  )
}

export default Footer
