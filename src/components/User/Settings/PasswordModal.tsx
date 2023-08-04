import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deactivateAccount, userLogout } from '../../../services/candidate/profile';
import { toast } from 'react-toastify';
import { updateUser } from '../../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

interface passModal{
    setModal:Function
}

const PasswordModal:React.FC<passModal> = ({setModal}) => {
    const dispatch=useDispatch()
    const navigate = useNavigate()

    const [password,setPassword]=useState<string>('')
    const [err,setErr]=useState<string>('')
    const { userId } = useSelector((state: any) => state.user);
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        if(password?.trim().length===0) setErr(`Password can't be empty`)
        else{
            setErr('')
            const data=await deactivateAccount(userId,password)
            if(data.error){
                setErr(data.error)
            }else{
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
    }
  return (
    <div className='fixed top-0 flex justify-center items-center w-full left-0 h-screen font-exo'>
      <div className='w-96 bg-white shadow rounded px-4'>
        <h1 className='text-xl font-bold py-2'>Deactivate Account</h1>
        <form onSubmit={handleSubmit}>
            <div className=''>
                <p className=''>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} className='w-full border border-primary-300 outline-primary-600 py-2 px-2 rounded shadow' type="password" name="" id="" />
                <p className='text-red-600 text-xs'>{err}</p>
            </div>
            <div className='flex gap-2 my-3'>
                <button className='px-2 bg-red-500 text-white py-2 shadow rounded'>Deactivate</button>
                <h1 onClick={()=>setModal(false)} className='cursor-pointer px-2 bg-blue-500 text-white py-2 shadow rounded'>Cancel</h1>
            </div>
        </form>

      </div>
    </div>
  )
}

export default PasswordModal
