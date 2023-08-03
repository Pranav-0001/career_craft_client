import React, { useEffect, useState } from 'react'
import { passwordValidation } from '../../../utils/user/profVali'
import { changePassword, fetchUserData } from '../../../services/candidate/profile'
import { useSelector } from 'react-redux'
import { User } from '../../../models/User'
import { ToastContainer, toast } from 'react-toastify'

const CandidateSettings = () => {
    const [newPassword, setPassword] = useState<{ current: string, newP: string, confirm: string }>({ current: '', newP: '', confirm: '' })
    const [err, setErr] = useState<{ current: string, newP: string, confirm: string }>({ current: '', newP: '', confirm: '' })
    const { userId, userEmail } = useSelector((state: any) => state.user);
    const [user,setUser]=useState<User>()

    useEffect(() => {
     const fetch=async()=>{
        const data=await fetchUserData(userId)
        setUser(data)
        
     }
     fetch()
    }, [])
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log({ name, value });

        setPassword({ ...newPassword, [name]: value })
        if (name == 'newP') {
            const Err = passwordValidation(value)
            if (newPassword.confirm === value) setErr({ ...err, newP: Err, confirm: '' })
            else setErr({ ...err, newP: Err, confirm: 'Password do not match' })

        }
        if (name === 'confirm') {
            if (newPassword.newP === value) setErr({ ...err, confirm: '' })
            else setErr({ ...err, confirm: 'Password do not match' })
        }




    }
    console.log(err);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { current, newP, confirm } = newPassword
        if (current && newP && confirm) {
            if (err.confirm === '' && err.newP === '') {
                const data = await changePassword(userId, newP, current)
                
                
                if(data.error) toast.error(data.error)
                if(data.message){
                    setPassword({confirm:'',current:'',newP:''})
                    toast.success(data.message)
                }

            }
        }

    }

    return (
        <div className='md:pe-10 px-2 font-exo  mt-20'>
            <div className='border border-primary-200  rounded shadow px-8 py-6 mb-4'>
            <div className=''>
                    <h1 className='text-xl'>Deactivate Account </h1>
            </div>
            <div>
                <p className='my-2 text-justify text-sm'>Please note that during this period, all your account data and information will be temporarily hidden from other users. However, your data will be securely stored, and you will have the option to reactivate your account at any time.</p>
                <p  className='my-2 text-justify text-sm'>If you wish to regain access to your account, please contact our administration team at <span className='font-bold'>careercraft666@gmail.com</span> . They will assist you in reactivating your account and restoring your profile and content.</p>
                <button  className='px-4 py-1 bg-red-600 shadow text-white rounded'>Deactivate</button>
            </div>
            </div>
            {user?.isGoogle?null:<div className='border border-primary-200  rounded shadow px-8 py-6'>
                <div className=''>
                    <h1 className='text-xl'>Change Your Password </h1>
                </div>

                <form onSubmit={handleSubmit} className='md:grid grid-cols-2 gap-2'>
                    <div>
                        <p>Current Password</p>
                        <input type="password" name='current' value={newPassword.current} onChange={handleChange} className='w-full p-2 rounded border border-primary-300 outline-primary-700' required />
                    </div>
                    <div>
                        <p>New Password</p>
                        <input type="password" name='newP' value={newPassword.newP} onChange={handleChange} className='w-full p-2 rounded border border-primary-300 outline-primary-700' required />

                        <p className='text-xs text-red-600'>{err.newP}</p>
                    </div>
                    <div>
                        <p>Confirm Password</p>
                        <input type="password" name='confirm' value={newPassword.confirm} onChange={handleChange} className='w-full p-2 rounded border border-primary-300 outline-primary-700' required />
                        <p className='text-xs text-red-600'>{err.confirm}</p>

                    </div>
                    <div className='col-span-2 mt-2'>
                        <button className='bg-primary-900 text-white rounded py-2 px-2 shadow'>Update Password</button>
                    </div>
                </form>
            </div>}
            <ToastContainer/>
        </div>
    )
}

export default CandidateSettings
