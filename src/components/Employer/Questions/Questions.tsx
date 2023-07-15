import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface queModel{
    role:string
}

const Questions:React.FC<queModel>=({role})=>{
  return (
    
    <>
    <div className='w-full font-exo'>
        <div className='w-full flex items-center justify-end mb-4'>
            <button className='text-white bg-primary-900 px-2 py-1 rounded-md'>Add Question</button>
        </div>
        <div className='w-full ' >
            <div className='rounded-md overflow-hidden shadow hidden lg:block'>
            <table className='w-full rounded-md '>
                <thead className='bg-primary-900 h-10 '>
                    <tr>
                        <th className='text-start ps-2'>Question</th>
                        <th className='text-start w-80'>Answer</th>
                        <th className='text-start w-80'>Options</th>
                        <th className='text-start w-36'>Operations</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-100'>
                    <tr className=''>
                        <td className='ps-1 py-2 ' ><p className=''> How are String represented in memory in C?</p></td> 
                        <td className='ps-1 py-2 '>An Array of characters</td>
                        <td className='ps-1 py-2 '>
                            <li>An object of some class</li>
                            <li>Same as other primitive data types</li>
                            <li>Linked list of characters</li>
                        </td>
                        <td className='ps-1 py-2 flex items-center gap-2 py-4'>
                            <FontAwesomeIcon icon={faEyeSlash} className='bg-red-600 text-white px-2 py-2 shadow rounded-md cursor-pointer' />
                            <FontAwesomeIcon icon={faEdit}  className='bg-blue-600 text-white px-2 py-2 shadow rounded-md cursor-pointer'/>
                        </td>  
                    </tr>
                </tbody>
            </table>
            </div>
            <div className='w-full lg:hidden'>
                <div className='w-full shadow px-4 pt-2 py-4 rounded'>
                    <div className='flex w-full justify-end gap-2'>
                     <FontAwesomeIcon icon={faEyeSlash} className='bg-red-600 text-white px-2 py-2 shadow rounded-md cursor-pointer' />
                 <FontAwesomeIcon icon={faEdit}  className='bg-blue-600 text-white px-2 py-2 shadow rounded-md cursor-pointer'/>   
                    </div>
                
                    <p>How are String represented in memory in C?</p>
                    <p>Ans : An Array of characters</p>
                    <p>Options</p>
                    <li>An object of some class</li>
                            <li>Same as other primitive data types</li>
                            <li>Linked list of characters</li>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Questions
