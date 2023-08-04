import React from 'react'
import { deactivateAccount, userLogout } from '../../../services/candidate/profile'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../redux/user/userSlice';
interface passModal{
        setModal:Function
    }
const WarningModal:React.FC<passModal> = ({setModal}) => {
    const dispatch=useDispatch()
    const navigate = useNavigate()


    const { userId } = useSelector((state: any) => state.user);

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        

          
            const res=await deactivateAccount(userId,process.env.REACT_APP_GOOGLE_PASSWORD as string)
            if(res){
                toast("Account Deactivated")
                setModal(false)
                const data=await userLogout(userId)
                if(data.status){
                    dispatch(updateUser({}))
                    localStorage.removeItem('user')
                    navigate('/')
                }
            }
                
            
        
    }
  return (
    <div className='fixed top-0 flex justify-center items-center w-full left-0 h-screen font-exo'>
      <div className='w-96 bg-white shadow rounded px-4'>
        <h1 className='text-xl font-bold py-2'>Deactivate Account</h1>
        <form onSubmit={handleSubmit}>
            <p className='text-justify'>If you wish to regain access to your account, please contact our administration team at <b>careercraft666@gmail.com</b> . They will assist you in reactivating your account and restoring your profile and content.</p>
            <div className='flex gap-2 my-3'>
                <button className='px-2 bg-red-500 text-white py-2 shadow rounded'>Deactivate</button>
                <h1 onClick={()=>setModal(false)} className='cursor-pointer px-2 bg-blue-500 text-white py-2 shadow rounded'>Cancel</h1>
            </div>
        </form>

      </div>
    </div>
  )
}

export default WarningModal
