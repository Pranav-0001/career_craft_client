import React, { useState } from 'react'
import { passwordValidation } from '../../../utils/user/profVali'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { changeEmpPassword, changePassword } from '../../../services/candidate/profile';

const EmpSettings = () => {
    const { EmployerId } = useSelector((state: any) => state.employer);

    const [newPassword, setPassword] = useState<{ current: string, newP: string, confirm: string }>({ current: '', newP: '', confirm: '' })
    const [err, setErr] = useState<{ current: string, newP: string, confirm: string }>({ current: '', newP: '', confirm: '' })
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
    console.log(newPassword);
    
    
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
   
        
        const { current, newP, confirm } = newPassword
        if (current && newP && confirm) {
            
            
            
            
            
            if (err.confirm === '' && err.newP === '') {
                
                
                const data = await changeEmpPassword(EmployerId, newP, current)
               
                
                if(data.error) toast.error(data.error)
                if(data.message){
                    setPassword({confirm:'',current:'',newP:''})
                    toast.success(data.message)
                    setPassword({confirm:'',current:'',newP:''})
                }

            }
        }
    }
    console.log(err);
    
  return (
    <div className='lg:px-20 px-4 md:px-8'>
      <div className='border border-primary-200  rounded shadow px-8 py-6 '>
                <div className=''>
                    <h1 className='text-xl'>Change Your Password </h1>
                </div>

                <form onSubmit={handleSubmit} className='md:grid grid-cols-3 gap-2 '>
                    <div>
                        <p>Current Password</p>
                        <input type="password" name='current'   onChange={handleChange} className='w-full p-2 rounded border border-primary-300 outline-primary-700' required />
                        <p className='text-xs text-red-600'>{err.current}</p>
                    </div>
                    <div>
                        <p>New Password</p>
                        <input type="password" name='newP' onChange={handleChange} className='w-full p-2 rounded border border-primary-300 outline-primary-700' required />

                        <p className='text-xs text-red-600'>{err.newP}</p>
                    </div>
                    <div>
                        <p>Confirm Password</p>
                        <input type="password" name='confirm'  onChange={handleChange} className='w-full p-2 rounded border border-primary-300 outline-primary-700' required />
                        <p className='text-xs text-red-600'>{err.confirm}</p>

                    </div>
                    <div className='col-span-2 mt-2'>
                        <button className='bg-primary-900 text-white rounded py-2 px-2 shadow'>Update Password</button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
    </div>
  )
}

export default EmpSettings
