import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './MyProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faGithub, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { UpdateMyProfile, fetchUserData, handleImgUrl } from '../../../services/candidate/profile';
import { User } from '../../../models/User';
import { ToastContainer, toast } from 'react-toastify';
import { updateUser } from '../../../redux/user/userSlice';
import Loader from '../../Loader/Loader';

const MyProfile = () => {
  const dispatch=useDispatch()
  const [isLoading,setIsLoading]=useState(false)
  const { userId, userEmail, username, image ,isPrime } = useSelector((state: any) => state.user);
  const [profile, setProfile] = useState<User>()
  const [imageUp, setImgUp] = useState(false)
  const [err, setErr] = useState({ username: '', facebook: '', instagram: '', linkedIn: '', gitHub: '' })
  

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const data = await fetchUserData(userId)
      setProfile(data)
      setIsLoading(false)

    }
    fetch()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      const { name, value } = e.target
      setProfile({ ...profile, [name]: value })
      if (name === 'username') {
        const nameRgx = /^[A-Za-z0-9]{4,16}$/
        if (value.trim().length === 0) setErr({ ...err, username: `field can't be empty.` })
        else if (!nameRgx.test(value)) setErr({ ...err, username: `Enter a valid username.` })
        else setErr({ ...err, username: `` })
      }
      if (name === 'facebook' || name === 'instagram' || name === 'linkedIn' || name === 'gitHub') {
        const urlRgx = /^(https?|ftp):\/\/[^\s\$.?#].[^\s]*$/
        if (!urlRgx.test(value)) setErr({ ...err, [name]: 'Enter a valid url' })
        else setErr({ ...err, [name]: '' })
      }
    }
  }
  const generateUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && profile) {
      setImgUp(true)

      const url = await handleImgUrl(e.target.files[0])
      if (url) {
        setImgUp(false)
        setProfile({ ...profile, profileImg: url })
      }
    }

  }
  const handleSubmit=async (e:React.FormEvent)=>{
    try {
      e.preventDefault()
      if(profile){
       
        
        const {username,facebook,linkedIn,gitHub,instagram,profileImg} =profile
        if(username){
          
         
          
          if(err.username==='' && err.facebook==='' &&err.gitHub==='' && err.linkedIn==='' &&err.instagram===''){
            
            const data=await UpdateMyProfile(userId,username,profileImg,{facebook,linkedIn,gitHub,instagram})
            if(data.modifiedCount!==0){
              toast.success('Change Applied')
              dispatch(updateUser({userId,username,image:profile.profileImg,userEmail,isPrime}))
            }
            
            
          }
        }
      }
      
    } catch (error) {
      
    }
  }


  return (
    <div className='lg:pe-8 font-exo'>
      <div className='border shadow mt-20 rounded-md overflow-hidden '>
        <div className='w-full h-2 bg-primary-900'> </div>
        {isLoading?
        <Loader/>
        :<>
        <div className='flex gap-2 items-center px-10 mt-10'>
          <div className=''>
            {imageUp?<div>
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
                      </div>  :<img src={profile?.profileImg} className='w-24 rounded' alt="" />}
          </div>
          <div>
            <h1 className='text-lg font-bold'>{username}</h1>
            <div className="file-input mt-2">
              <input
                type="file"
                name="file-input"
                id="file-input"
                className="file-input__input"
                onChange={generateUrl}
              />
              <label className="border rounded border-primary-300 px-2 py-1 shadow" >

                <span><FontAwesomeIcon className='text-primary-900' icon={faImage} /></span></label>
            </div>
          </div>

        </div>
        <form onSubmit={handleSubmit} className='w-full md:grid grid-cols-2 gap-2 px-10 '>
          <div>
            <p>Username</p>
            <input onChange={handleChange} name='username' type="text" value={profile?.username} className='w-full p-2 border border-primary-200 outline-primary-800 rounded-md' />
            <p className='text-xs text-red-600 '>{err.username}</p>
          </div>
          <div>
            <p>Email</p>
            <input type="text" onChange={handleChange} name='' value={userEmail} className='w-full p-2 border border-primary-200 outline-primary-800 rounded-md' disabled />
          </div>
          <div className='col-span-2'>
            <h1 className='text-lg'>Social Links</h1>
          </div>
          <div>
            <p><FontAwesomeIcon className='text-blue-700' icon={faFacebook} /> Facebook</p>
            <input value={profile?.facebook} type="text" onChange={handleChange} name='facebook' className='w-full p-2 border border-primary-200 outline-primary-800 rounded-md' />
            <p className='text-xs text-red-600 '>{err.facebook}</p>
          </div>
          <div>
            <p><FontAwesomeIcon className='text-pink-700' icon={faInstagram} /> Instagram</p>
            <input type="text" value={profile?.instagram} onChange={handleChange} name='instagram' className='w-full p-2 border border-primary-200 outline-primary-800 rounded-md' />
            <p className='text-xs text-red-600 '>{err.instagram}</p>
          </div>
          <div>
            <p><FontAwesomeIcon className='text-blue-900' icon={faLinkedinIn} /> LinkedIn</p>
            <input type="text" value={profile?.linkedIn} onChange={handleChange} name='linkedIn' className='w-full p-2 border border-primary-200 outline-primary-800 rounded-md' />
            <p className='text-xs text-red-600 '>{err.linkedIn}</p>

          </div>
          <div>
            <p><FontAwesomeIcon icon={faGithub} /> GitHub</p>
            <input type="text" value={profile?.gitHub} onChange={handleChange} name='gitHub' className='w-full p-2 border border-primary-200 outline-primary-800 rounded-md' />
            <p className='text-xs text-red-600 '>{err.gitHub}</p>

          </div>
          <div className='col-span-2 flex justify-center items-center'>
            <button className='bg-primary-900 my-8 px-2 py-1 text-white rounded shadow'>Submit</button>
          </div>
        </form>
        </>}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default MyProfile
