import React, { useState } from 'react'
import './AllUsers.css'
import NonPrimeUsers from './NonPrimeUsers'
import Premium from './Premium'
import AllEmployers from './AllEmployers'

function AllUserList() {
  const [select,setSelect]=useState('non')
  return (
    <div className='w-full '>
        <div className='cursor-pointer border-2 rounded-full w-full lg:w-1/2 lg:text-lg mx-auto flex justify-between font-exo text-md text-sm   overflow-hidden '>
            <div className={`${select==="non"?'bg-primary-800 text-white':""} text-center rounded-full py-2 w-full`}>
                <h1 onClick={()=>setSelect("non")}>Non-Premium Users</h1>

            </div>
            <div  className={`${select==="prime"?'bg-primary-800 text-white':""} text-center w-full   rounded-full py-2`}>
            <h1 onClick={()=>setSelect("prime")}>Premium Users</h1>

            </div>
            <div className={`${select==="emp"?'bg-primary-800 text-white  ':""} text-center  w-full rounded-full py-2`}>
                <h1 onClick={()=>setSelect("emp")}>Employer</h1>
            </div>
        </div>
        {select==='non' ?<NonPrimeUsers/> :select==='prime'?<Premium/>:<AllEmployers/> }
        
    </div>
  )
}

export default AllUserList
