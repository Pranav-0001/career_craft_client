import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { fetchUserData, handleImgUrl, updateBasicInfo } from '../../../services/candidate/profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { url } from 'inspector'
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import { BasicType, User } from '../../../models/User'
import { basicDataValidation } from '../../../utils/user/basicDataVali'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'
import SubmitBtnLoader from '../../Loader/SubmitBtnLoader'

function Basic() {
  const [imgurl, setImgUrl] = useState<string>()
  const [isLoading,setIsLoading]=useState(false)
  const [isBtnLoading,setIsBtnLoading]=useState(false)
  const [imgUp,setImgUp]=useState(false)
  const [basic,setBasic] = useState<BasicType>()
  const [err,setErr] = useState<BasicType>()
  const { userId,userEmail } = useSelector((state:any) => state.user);


  useEffect(() => {
    const fetchData=async()=>{
      setIsLoading(true)
        const user:User=await fetchUserData(userId)
        
        

        if(user?.basic) {
          setBasic(user.basic)
          setImgUrl(user.basic.imageURL)
          setErr({firstname:'',lastname:'',phone:'',about:'',objective:'',qualification:'',email:''})
          
        }
        setIsLoading(false)
    }
    fetchData()
}, [])

  const generateUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgUp(true)
      
      const url = await handleImgUrl(e.target.files[0])
      if (url) {
        setImgUp(false)
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
    const {name,value}=e.target

    setBasic({...basic,objective:e.target.value})
    basicDataValidation(name,value,err,setErr)

  }
  const handleSubmit=async(e:FormEvent)=>{
    setIsBtnLoading(true)
    e.preventDefault()
    if(imgurl){
      
      if(basic?.firstname&&basic.lastname&&basic.phone&&basic.qualification&&basic.objective&&basic.about){
        console.log(err);
        
        if(err?.about===''&&err?.firstname===''&&err.lastname===''&&err.phone===''&&err.objective===''&& err.qualification===''){
          console.log(basic);
          const {firstname,lastname,phone,qualification,objective,about} =basic
          const res=await updateBasicInfo(firstname,lastname,phone,qualification,objective,about,imgurl,userId)
          console.log(res);
          setIsBtnLoading(false)
        }
      }
    }else{
      toast.error("Upload Image")
    }
    

  }
  
  return (
    <>
      {isLoading?
      <Loader/>
      :<div className='w-full lg:ps-10 lg:pe-20 mt-10'>
        <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8'>
        <div className='w-full md:hidden'>
                <div className="flex items-center justify-end w-full py-2 ">


                  {imgurl ? <div className='mt-3 w-28 h-24 flex items-center shadow-sm rounded-lg px-2 relative  bg-profile-img' style={{ backgroundImage: `url("${imgurl}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <FontAwesomeIcon className='bg-white absolute top-0 right-0 cursor-pointer text-lg  rounded-full  text-black' onClick={() => setImgUrl(undefined)} icon={faCircleXmark} />

                  </div>
                    :
                    imgUp
                    ?
                      <div>
                        <div className="dot-spinner mt-5">
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                        </div>
                      </div> 
                    :
                    <label className=" flex flex-col items-center justify-center w-full  h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100   ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>

                      </div>
                      <input onChange={generateUrl} type="file" className="hidden" />
                    </label>
                    
                    }
                </div>
              </div>
          <form className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo' onSubmit={handleSubmit}>
            <div>
              <h1>Firstname</h1>

              <input type="text" name='firstname' value={basic?.firstname} onChange={basicForm} className="signupFormInput w-full" required/>
              <p className='text-xs text-red-600'>{err?.firstname}</p>

            </div>
            <div className='md:grid md:grid-cols-3 items-center gap-1'>
              <div className='w-full col-span-2'>
                <h1>Lastname</h1>
                <input type="text" name='lastname' value={basic?.lastname} onChange={basicForm} className="signupFormInput w-full"  required/>
                <p className='text-xs text-red-600'>{err?.lastname}</p>
              </div>
              <div className='md:block hidden w-full'>
                <div className="flex items-center justify-center w-full py-2 ">


                  {imgurl ? <div className='mt-3 w-28 h-24 flex items-center shadow-sm rounded-lg px-2 relative  bg-profile-img' style={{ backgroundImage: `url("${imgurl}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <FontAwesomeIcon className='bg-white absolute top-0 right-0 cursor-pointer text-lg  rounded-full  text-black' onClick={() => setImgUrl(undefined)} icon={faCircleXmark} />

                  </div>
                    :
                    imgUp
                    ?
                      <div>
                        <div className="dot-spinner mt-5">
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                          <div className="dot-spinner__dot"></div>
                        </div>
                      </div> 
                    :
                    <label className=" flex flex-col items-center justify-center w-full  h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100   ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>

                      </div>
                      <input onChange={generateUrl} type="file" className="hidden" />
                    </label>
                    
                    }
                </div>
              </div>

            </div>
            <div>
              <h1>Email</h1>
              <input type="text"  onChange={basicForm} name='email' value={userEmail} className="signupFormInput w-full" disabled/>
              <p className='text-xs text-red-600'>{err?.email}</p>

            </div>
            <div>
              <h1>Phone</h1>
              <input type="number" onChange={basicForm} value={basic?.phone} name='phone' className="signupFormInput w-full"  required/>
              <p className='text-xs text-red-600'>{err?.phone}</p>

            </div>
            <div>
              <h1>Qualification</h1>
              <input type="text" onChange={basicForm} value={basic?.qualification} name='qualification' className="signupFormInput w-full" required />
              <p className='text-xs text-red-600'>{err?.qualification}</p>
            </div>
            <div>
            <h1>Domain</h1>
              <input type="text" onChange={basicForm} name="about" value={basic?.about}  className="signupFormInput w-full"  required/>
              <p className='text-xs text-red-600'>{err?.about}</p>

            </div>
            <div className='col-span-2'>
              <h1>Career Objective</h1>
              <textarea  name='objective' id="" className='signupFormInput h-40' value={basic?.objective} onChange={basicAbout}  required></textarea>
              <p className='text-xs text-red-600'>{err?.objective}</p>

              

            </div>
            <div className="col-span-2 mx-2">
              {isBtnLoading ? <button className='bg-primary-800 text-white px-4 rounded-md py-1' disabled><SubmitBtnLoader/></button> :<button className='bg-primary-800 text-white px-4 rounded-md py-1'>Update</button>}
            </div>

          </form>
        </div>
      </div>}
      <ToastContainer/>
    </>
  )
}

export default Basic
 