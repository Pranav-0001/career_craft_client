import { faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ProfileType, ProjectType, User } from '../../../models/User';
import { profileFormValid } from '../../../utils/user/profileDataVali';
import { fetchUserData, updateProfileInfo } from '../../../services/candidate/profile';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Loader from '../../Loader/Loader';
import SubmitBtnLoader from '../../Loader/SubmitBtnLoader';

function Profile() {
  const { userId } = useSelector((state:any) => state.user);
  const [checked,setChecked]=useState(false)
  const [skill,setSkill]=useState<string>('')
  const [skills,setSkills]=useState<string[]>([])
  const [profile,SetProfile]=useState<ProfileType>({gender:"Male",marital:"Unmarried"})
  const [err,setErr]=useState<ProfileType>({gender:"",marital:""})
  const [skillerr,setSkillErr]=useState('')
  const [projects,setProjects]=useState<ProjectType[]>([])
  const [project,setProject]=useState<ProjectType>()
  const [projectErr,setProjectErr]=useState<ProjectType>()
  const [isProjectModal,setisProjectModal]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [isBtnLoading,setIsBtnLoading]=useState(false)

  useEffect(() => {
    const fetchData=async()=>{
        setIsLoading(true)
        const user:User=await fetchUserData(userId)
        if(user.profile) {
          SetProfile(user.profile)
          if(user.profile?.skills) setSkills(user.profile.skills)
          setErr({father:'',mother:'',gender:'',marital:'',nationality:'',permanent:'',present:''})
          console.log(user.profile.projects,"kkkk")
          if(user.profile?.projects) setProjects(user.profile.projects)
        }
       setIsLoading(false)
        
    }
    fetchData()
}, [])

  const projectForm=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value} = e.target
    if(name==='title') {
        setProject({...project,title:value})
        if(value.trim().length===0) setProjectErr({...projectErr,title:"field can't be empty"})
        else if(value.trim().length<5) setProjectErr({...projectErr,title:"Title is too short"})
        else setProjectErr({...projectErr,title:""})
    }
    if(name==='desc') {
        setProject({...project,desc:value})
        if(value.trim().length===0) setProjectErr({...projectErr,desc:"field can't be empty"})
        else if(value.trim().length<15) setProjectErr({...projectErr,desc:"Description is too short"})
        else setProjectErr({...projectErr,desc:""})
    }

  }


  const addSkill=()=>{
    if(skill.trim().length!==0){
        if(!skills.includes(skill.trim())) setSkills([...skills,skill.trim()])
        setSkill('')
        if(skills.length===1) setSkillErr('')
    }
  }

  const removeSkill=(ele:string)=>{
    const newarr=skills.filter(obj=>obj!=ele)
    setSkills(newarr)
  }
  
  const enterProject=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    let {name,value}=e.target
    let nameArr = name.split('-')
    if(nameArr[0]==="projectTitle") {
        
        

    }
    if(nameArr[0]==="projectDes") {
        let i=parseInt(nameArr[1])
        projects[i].desc=value
    }
  }
  
  

  const profileForm=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>)=>{
    const {name,value} = e.target
    profileFormValid(name,value,err,setErr)
    SetProfile({...profile,[name]:value})
    
  }

  
  const sameAddress=(e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.checked){
        setChecked(true)
    if(profile?.present) profileFormValid("present",profile?.present,err,setErr)

        SetProfile({...profile,present:profile?.permanent})
    }else{
        setChecked(false)
    }
    
    
  }

  const handleProjectFormSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    if(projectErr?.title===''&&projectErr?.desc===''){
        if(project?.title&&project.desc){
            setProjects([...projects,project])
            setisProjectModal(false)
        }
    }
    
    
  }


  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
   
   setIsBtnLoading(true)
    if(profile?.father&&profile.mother&&profile.dob&&profile.gender&&profile.marital&&profile.nationality&&profile.permanent&&profile.present){
      
       
        
        if(err?.father===''&&err?.mother===''&&err?.nationality===''&&err?.permanent===''&&err?.present===''){
            
            
            if(skills.length<1) setSkillErr('Add Skills')
            else if(skills.length<2) setSkillErr('Atleast 2 Skills required')
            else {
                const {father,mother,dob,nationality,permanent,present,marital,gender}=profile
                updateProfileInfo(father,mother,dob,nationality,permanent,present,marital,gender,skills,projects,userId)
            }
            
        }
    }
    setIsBtnLoading(false)
  }

  const deleteProject=(obj:ProjectType)=>{
    const newArray= projects.filter(ele=>ele!==obj)
    setProjects(newArray)
  }

  

    return (
        <>
            {isLoading?
            <Loader/>
            :<div className={`w-full lg:ps-10 lg:pe-20 mt-10 ${isProjectModal?'blur-sm ':''}`}>
                <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8 pt-4'>
                    <form onSubmit={handleSubmit} className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo  ' >
                        <div className=''>
                            <h1 className=''>Father's Name</h1>
                            <input value={profile?.father} type="text" name='father' className="px-4 signupFormInput w-full" onChange={profileForm} required/>
                            <p className='text-red-600 text-xs'>{err?.father}</p>

                        </div>
                        <div>
                            <h1>Mother's Name</h1>
                            <input value={profile?.mother} type="text" name='mother'  className="px-4 signupFormInput w-full" onChange={profileForm} required/>
                            <p className='text-red-600 text-xs'>{err?.mother}</p>
                        </div>
                        <div>
                            <h1>Date of Birth</h1>
                            <input type="date" name='dob' value={profile?.dob} className="px-4 signupFormInput w-full" max="2004-12-31"  onChange={profileForm} required/>
                            {/* value={"2013-01-08"} */}

                        </div>
                        <div>
                            <h1>Nationality</h1>
                            <input type="text" name='nationality' value={profile?.nationality} className="px-4 signupFormInput w-full"  onChange={profileForm} required/>
                            <p className='text-red-600 text-xs'>{err?.nationality}</p>

                        </div>
                        <div>
                            <h1>Permanent Address</h1>
                            <textarea name="permanent" id=""  className="px-4 signupFormInput w-full h-24" value={profile?.permanent}  onChange={profileForm} required ></textarea>
                            <p className='text-red-600 text-xs'>{err?.permanent}</p>

                        </div>
                        <div >
                            <h1 className='flex'>Present Address  </h1>
                            {/* <span className='text-sm flex items-center'> <input onChange={sameAddress} className='w-6' type="checkbox" name="" id="" /> Same as permanent Address</span> */}
                            <textarea name="present" id="" className="px-4 signupFormInput w-full h-24"  value={profile?.present} onChange={profileForm} required> </textarea>
                            <p className='text-red-600 text-xs'>{err?.present}</p>
                            
                        </div>
                        <div>
                            <h1>Marital Status</h1>
                            <select name="marital" className="px-4 signupFormInput w-full" id=""  onChange={profileForm}  required>
                                {profile.marital==="Unmarried"?
                                <> <option value="Unmarried" selected>Unmarried</option>
                                <option value="Married" >Married</option></>
                                :profile.marital==="Married"?
                                <>
                                <option value="Married" selected>Married</option>
                                <option value="Unmarried" >Unmarried</option></>
                                :
                                <>
                                <option value="Unmarried" selected>Unmarried</option>
                                <option value="Married" selected>Married</option>
                                </>
                                }
                                
                                
                            </select>
                        </div>
                        <div>
                            <h1>Gender</h1>
                            <select name="gender" className="px-4 signupFormInput w-full" id=""  onChange={profileForm} required>
                                {profile.gender==="Male"?
                                <><option value="Male" selected>Male</option>
                                <option value="Female">Female</option></>
                                :profile.gender==="Female"?
                                <><option value="Male">Male</option>
                                <option value="Female" selected>Female</option></>
                                :<><option value="Male">Male</option>
                                <option value="Female">Female</option></>
                               }
                            </select>
                        </div>
                        <div className='col-span-2 '>
                            <h1 className='mt-3 text-xl mb-2'>Your Skills</h1>
                            <div className='w-full mb-2'>
                                <div className='w-full  flex overflow-x-scroll overflow-y-hidden scroll'>
                                    {skills.map(obj=><div className='bg-primary-200 me-2 px-2 py-1 flex items-center gap-3 rounded-md'><h1>{obj}</h1><FontAwesomeIcon className='cursor-pointer' icon={faClose} onClick={()=>removeSkill(obj)} /> </div>)}
                                </div>

                            </div>
                            <div className="flex gap-1 items-center">
                                <input value={skill} type="text" className="px-4 signupFormInput w-full" onChange={(e)=>setSkill(e.target.value)}/>
                                <h1 onClick={addSkill} className='px-4 rounded py-3 text-white bg-primary-800'>Add</h1>
                            </div>
                            <p className='text-red-600 text-xs'>{skillerr}</p>

                        </div>

                        <h1  className='col-span-2 px-1 font-exo text-2xl mt-2 flex items-center gap-2'>Projects  <FontAwesomeIcon icon={faPlusCircle} onClick={()=>setisProjectModal(true)} className='text-' /> </h1>
                        
                        <div className='col-span-2 px-1 font-exo'>
                            {projects.map((obj,i)=><div className='mb-2 w-full rounded-md border border-primary-300 px-2'>
                                
                                <div  className='flex justify-between pt-2'>
                                    <h1 className='text-2xl font-exo '>Project {i+1}</h1>
                                    
                                 <FontAwesomeIcon className='text-xl text-red-600 cursor-pointer' icon={faCircleXmark} onClick={()=>deleteProject(obj)}/>
                                </div>
                                <h1 className='text-xl font-exo pt-4'><span className='font-exo font-bold'> Title :</span> {obj.title}</h1>
                                <p className='pb-2'><span className='font-bold'> Description : </span> {obj.desc}</p>
                            </div>)}
                        </div>
                        <div className='mt-4 ms-1'>
                        {isBtnLoading?<button className='bg-primary-1000 text-white px-4 py-2 rounded-md' disabled><SubmitBtnLoader/></button>:<button className='bg-primary-1000 text-white px-4 py-2 rounded-md'>Update Change</button>}
                        </div>
                    </form>
                </div>
            </div>}
            {isProjectModal && <div className='fixed px-2 left-0 lg:left-1/4 lg:ps-40  w-full lg:w-4/5 lg:pe-96 top-20 py-36  h-screen'>
                <form onSubmit={handleProjectFormSubmit} className=' border w-full bg-white border-primary-200 rounded-md px-2  py-4 shadow-md'>
                    <div className='flex justify-end'>
                        <FontAwesomeIcon icon={faCircleXmark} className='cursor-pointer text-xl text-red-600' onClick={()=>setisProjectModal(false)}/>
                    </div>
                <h1 className='text-xl text-center'>Project Information</h1>
                    <div className='mt-4'>
                    <h1>Project Title</h1>
                    <input type="text" name='title' onChange={projectForm} className="px-4 signupFormInput w-full"  required/>
                    <p className='text-red-600 text-xs'>{projectErr?.title}</p>

                    </div>
                    <div className=''>
                    <h1>Project Description</h1>
                    <textarea  name='desc' onChange={projectForm} className="px-4 signupFormInput w-full h-24"  required></textarea>
                    <p className='text-red-600 text-xs'>{projectErr?.desc}</p>

                    </div>
                    <div className='flex justify-center mt-2'>
                        <button className='bg-primary-700 text-white px-2 py-2 rounded-md'>Add Project</button>
                    </div>
                </form>

            </div>}
        </>
    )
}

export default Profile
