import React,{useState} from 'react'
import { ToastContainer } from 'react-toastify';
import './Login.css'
import { adminSignIn } from '../../../services/admin/adminLogin';

function AdminLogin() {

    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    const [err,setErr]= useState({email:'',password:''})
    const emailEnter=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setErr({email:"",password:""})
        setEmail(e.target.value)
    }
    const passEnter=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setErr({email:"",password:""})
        setPass(e.target.value)
    }
    const adminLogin=async(e:React.FormEvent)=>{
        e.preventDefault()
        console.log("data");
        let data=await adminSignIn(email,pass)
        if(data.email){
            setErr({...err,email:data.email})
        }else if(data.password){
            setErr({...err,password:data.password})
        }else if(data.admin){
            console.log(data.admin);
            
        }
       
        
    }

  return (
    <div>
      <main>
            <div className='flex justify-center align-middle md:mt-4'>
                <div className='w-96 mx-3 md:mx-0   border mt-14 rounded-md backdrop-blur-0 shadow-sm shadow-primary-400 bg-white'  >
                    <div className='flex justify-center border-b-2 border-gray-200 mx-24 mt-1 pb-4'>
                        <h1 className='font-exo text-2xl md:text-3xl mt-3'>Admin Login</h1>
                    </div>
                    <div className='font-work '>
                        <form onSubmit={adminLogin}>
                        <h1 className='ps-6 text-md mt-6 '>Email</h1>
                        <div className='mx-auto flex justify-center mb-3'>

                            <input type="text" className='login-textbox ' onChange={emailEnter} required/>
                        </div>
                        <p className="text-red-500 text-xs ms-4 md:ms-8">{err.email}</p>
                        <h1 className='ps-6 text-md '>Password</h1>
                        <div className='mx-auto flex justify-center'>

                            <input type="password" className='login-textbox' onChange={passEnter} required/>
                        </div>
                        <p className="text-red-500 text-xs ms-4 md:ms-8">{err.password}</p>

                       <div className='mt-2 mb-3'>
                       </div>
                            <div className='flex justify-center mb-3 mt-6'>
                                <button type="submit" className='bg-black text-white w-80 rounded-md h-9'>Log In</button>
                            </div>     
                            <div className='flex justify-center mt-2  border-primary-400  mx-16 rounded-md mb-4 cursor-pointer'>
                                {/* <h1> <FontAwesomeIcon icon={faGoogle} className='me-2' />Log in with Google </h1> */}
                            

                            </div>           
                            

                            <div className='flex justify-center mb-4'>
                                
                            </div>
                            </form>  
                    </div> 
                </div>
            </div>
            <ToastContainer/>
        </main>
    </div>
  )
}

export default AdminLogin
