import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, handleImgUrl } from '../../../services/candidate/profile';
import { User } from '../../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { empProfile } from '../../../utils/employer/profileValidation';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { updateEmployer } from '../../../services/Employer/profile';
import { ToastContainer, toast } from 'react-toastify';
import { updateEmp } from '../../../redux/employer/employerSlice';
import Loader from '../../Loader/Loader';

const EmpProfile = () => {
  const dispatch=useDispatch()
  const {EmployerId,EmpUsername,EmpImage,EmpEmail}  = useSelector((state: any) => state.employer);
  const [emp,setEmp]=useState<User>()
  const [err,setErr]=useState({firstname:'',lastname:'',username:'',company:'',location:'',facebook:'',instagram:'',linkedIn:''})
  const [imageUp,setImgUp]=useState(false)
  const [isLoading,setIsLoading]=useState(false)


    useEffect(() => {
      const fetch=async()=>{
        setIsLoading(true)
        const data=await fetchUserData(EmployerId)
        console.log(data);
        setEmp(data)
        setIsLoading(false)
        
      }
      fetch()
    }, [])

    const generateUrl = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && emp) {
          setImgUp(true)
          const url = await handleImgUrl(e.target.files[0])
          if (url) {
            setImgUp(false)
            setEmp({ ...emp, profileImg: url })
          }
        }
    
      }

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        const data=empProfile(name,value)
        if(emp){
           setEmp({...emp,[name]:value}) 
           
        }
        setErr({...err,[name]:data})
        
    }
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        if(emp){
            const {firstname,lastname,username,company,location,facebook,instagram,linkedIn} =emp
            if(firstname&&lastname&&username&&company&&location){
                if(err.company===''&& err.facebook===''&&err.firstname===''&&err.instagram===''&&err.lastname===''&&err.linkedIn===''&&err.location===''&&err.username===''){
                    const data=await updateEmployer(EmployerId,emp.profileImg,firstname,lastname,username,company,location,{facebook,instagram,linkedIn})
                    dispatch(updateEmp({EmployerId:EmployerId,EmpUsername:emp.username,EmpImage:emp.profileImg,EmpEmail:EmpEmail}))
                    if (data) toast.success('Changes applied')
                    
                }
            }
        }
    }
    
  return (
    <div className='w-full font-exo '>
      {isLoading?
      <Loader/>
      : <form onSubmit={handleSubmit} className='border md:grid grid-cols-2 px-4 md:gap-2 rounded shadow mb-10 '>
        <div className='col-span-2'>
            <h1 className='text-2xl py-2 '>Employer Information</h1>
        </div>
        <div className='col-span-2'>
                  <div className='w-1/2 flex items-end gap-2'>
                      {imageUp ? 
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
                      :<img src={emp?.profileImg} alt="" className='h-24 rounded shadow ' />}
                      <div className="file-input mt-2">
                          <input
                              type="file"
                              name="file-input"
                              id="file-input"
                              className="file-input__input"
                              onChange={generateUrl}
                          />
                          <label className="border rounded border-primary-300 px-2 py-1 shadow" >

                              <span><FontAwesomeIcon className='text-primary-900' icon={faCamera} /></span></label>
                      </div>

                  </div>
        </div>
        <div>
            <p>Firstname</p>
            <input onChange={handleChange}  value={emp?.firstname} name='firstname' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" required/>
            <p className='text-xs text-red-600'>{err.firstname}</p>
        </div>
        <div>
            <p>Lastname</p>
            <input onChange={handleChange}  value={emp?.lastname} name='lastname' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" required/>
            <p className='text-xs text-red-600'>{err.lastname}</p>

        </div>
        <div>
            <p>Username</p>
            <input onChange={handleChange}  value={emp?.username} name='username' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" required/>
            <p className='text-xs text-red-600'>{err.username}</p>

        </div>
        <div>
            <p>Email</p>
            <input  value={emp?.email} name='email' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" disabled/>
        </div>
        <div className='col-span-2'>
            <h1 className='text-2xl py-2 '>Company Information</h1>
        </div>
        <div>
            <p>Company Name</p>
            <input  onChange={handleChange} value={emp?.company} name='company' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" required/>
            <p className='text-xs text-red-600'>{err.company}</p>

        </div>
        <div>
            <p>Location</p>
            <input  onChange={handleChange} value={emp?.location} name='location' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" required/>
            <p className='text-xs text-red-600'>{err.location}</p>

        </div>
        <div>
            <p><FontAwesomeIcon className='text-lg text-blue-700' icon={faFacebook}/> Facebook</p>
            <input  onChange={handleChange} value={emp?.facebook} name='facebook' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" />
            <p className='text-xs text-red-600'>{err.facebook}</p>

        </div>
        <div>
            <p><FontAwesomeIcon className='text-lg text-pink-700' icon={faInstagram}/> Instagram</p>
            <input  onChange={handleChange} value={emp?.instagram} name='instagram' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" />
            <p className='text-xs text-red-600'>{err.instagram}</p>

        </div>
        <div>
            <p><FontAwesomeIcon className='text-lg text-blue-700' icon={faLinkedin}/> LinkedIn</p>
            <input  onChange={handleChange} value={emp?.linkedIn} name='linkedIn' className='w-full py-2 px-2 border-primary-400 border rounded outline-primary-800' type="text" />
            <p className='text-xs text-red-600'>{err.linkedIn}</p>

        </div>
        <div>
            
        </div>
        <div  className='col-span-2 flex  w-full justify-center my-2 mb-6'>
            <button className='bg-primary-900 px-3 py-2 rounded text-white shadow'>Submit</button>
        </div>
      </form>}
      <ToastContainer />
    </div>
  )
}

export default EmpProfile
