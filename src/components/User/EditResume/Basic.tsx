import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { handleImgUrl } from '../../../services/candidate/profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faClose } from '@fortawesome/free-solid-svg-icons'
import { url } from 'inspector'
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import { BasicType } from '../../../models/User'
import { basicDataValidation } from '../../../utils/user/basicDataVali'

function Basic() {
  const [imgurl, setImgUrl] = useState<string>()
  const [basic,setBasic] = useState<BasicType>()
  const [err,setErr] = useState<BasicType>()
  const generateUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = e.target.files[0]
      const url = await handleImgUrl(e.target.files[0])
      if (url) {
        setImgUrl(url)
      }
    }

  }
  const basicForm=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setBasic({...basic,[name]:value})
    basicDataValidation(name,value,err,setErr)
    
  }
  const basicAbout=(e:ChangeEvent<HTMLTextAreaElement>)=>{
    setBasic({...basic,about:e.target.value})
  }
  console.log(err);
  
  return (
    <>
      <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
        <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8'>
          <form className='grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo'>
            <div>
              <h1>Firstname</h1>

              <input type="text" name='firstname' onChange={basicForm} className="signupFormInput w-full" />

            </div>
            <div className='md:grid md:grid-cols-3 items-center gap-1'>
              <div className='w-full col-span-2'>
                <h1>Lastname</h1>
                <input type="text" name='lastname' onChange={basicForm} className="signupFormInput w-full" />
              </div>
              <div className='w-full'>
                <div className="flex items-center justify-center w-full py-2 ">

                  {imgurl ? <div className='w-24 h-24 flex items-center shadow-sm rounded-lg px-2 relative  bg-profile-img' style={{ backgroundImage: `url("${imgurl}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <FontAwesomeIcon className='bg-white absolute top-0 right-0 cursor-pointer text-lg  rounded-full  text-black' onClick={() => setImgUrl(undefined)} icon={faCircleXmark} />

                  </div>
                    : <label className=" flex flex-col items-center justify-center w-full  h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100   ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>

                      </div>
                      <input onChange={generateUrl} type="file" className="hidden" />
                    </label>}
                </div>
              </div>

            </div>
            <div>
              <h1>Email</h1>
              <input type="text" onChange={basicForm} name='email' value={"demo"} className="signupFormInput w-full" disabled/>
            </div>
            <div>
              <h1>Phone</h1>
              <input type="number" onChange={basicForm} name='phone' className="signupFormInput w-full" />
            </div>
            <div>
              <h1>Qualification</h1>
              <input type="text" onChange={basicForm} name='qualification' className="signupFormInput w-full" />
            </div>
            <div>
              <h1>Career Objective</h1>
              <input type="text" onChange={basicForm} name='objective' className="signupFormInput w-full" />
            </div>
            <div className='col-span-2'>
              <h1>About</h1>
              <textarea name="about" id="" className='signupFormInput h-28' onChange={basicAbout} ></textarea>
              

            </div>
            <div className="col-span-2 mx-2">
              <button className='bg-primary-800 text-white px-4 rounded-md py-1'>Update</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Basic
 