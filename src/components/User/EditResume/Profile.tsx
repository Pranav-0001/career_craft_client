import { faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import { ProfileType, ProjectType } from '../../../models/User';
import { profileFormValid } from '../../../utils/user/profileDataVali';
import { updateProfileInfo } from '../../../services/candidate/profile';

function Profile() {
  const { userId } = useSelector((state:any) => state.user);
  const [checked,setChecked]=useState(false)
  const [skill,setSkill]=useState<string>('')
  const [skills,setSkills]=useState<string[]>([])
  const [profile,SetProfile]=useState<ProfileType>({gender:"Male",matital:"Unmarried"})
  const [err,setErr]=useState<ProfileType>({gender:"",matital:""})
  const [skillerr,setSkillErr]=useState('')
  const [projectCnt,setProjectCnt]=useState([1])
  const [projects,setProjects]=useState<ProjectType[]>([])
  const [projectErr,setProjectErr]=useState({})


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
  console.log(projects);
  

  const profileForm=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>)=>{
    const {name,value} = e.target
    profileFormValid(name,value,err,setErr)
    SetProfile({...profile,[name]:value})
    
  }
  console.log(profile);
  
  const sameAddress=(e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.checked){
        setChecked(true)
    if(profile?.present) profileFormValid("present",profile?.present,err,setErr)

        SetProfile({...profile,present:profile?.permanent})
    }else{
        setChecked(false)
    }
    
  }
  const addnewProject=()=>{
    setProjectCnt([...projectCnt,projectCnt.length+1])
  }
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
   
    if(profile?.father&&profile.mother&&profile.dob&&profile.gender&&profile.matital&&profile.nationality&&profile.permanent&&profile.present){
      
        console.log(err);
        
        if(err?.father===''&&err?.mother===''&&err?.nationality===''&&err?.permanent===''&&err?.present===''){
            console.log("iii");
            
            if(skills.length<1) setSkillErr('Add Skills')
            else if(skills.length<2) setSkillErr('Atleast 2 Skills required')
            else {
                const {father,mother,dob,nationality,permanent,present,matital,gender}=profile
                updateProfileInfo(father,mother,dob,nationality,permanent,present,matital,gender,skills,userId)
            }
            
        }
    }
  }
  const removeProject=(ele:number)=>{
    const newArr= projectCnt.filter(obj=>obj!==ele)
    setProjectCnt(newArr)
  }
  

    return (
        <>
            <div className='w-full lg:ps-10 lg:pe-20 mt-10'>
                <div className='w-full  border-primary border-200 shadow-sm shadow-primary-600 rounded-md px-2 mb-8 pb-8 pt-4'>
                    <form onSubmit={handleSubmit} className='md:grid grid-cols-1 md:grid-cols-2 gap-2 items-center font-exo '>
                        <div className=''>
                            <h1 className=''>Father's Name</h1>
                            <input type="text" name='father' className="px-4 signupFormInput w-full" onChange={profileForm} required/>
                            <p className='text-red-600 text-xs'>{err?.father}</p>

                        </div>
                        <div>
                            <h1>Mother's Name</h1>
                            <input type="text" name='mother'  className="px-4 signupFormInput w-full" onChange={profileForm} required/>
                            <p className='text-red-600 text-xs'>{err?.mother}</p>
                        </div>
                        <div>
                            <h1>Date of Birth</h1>
                            <input type="date" name='dob'  className="px-4 signupFormInput w-full" max="2004-12-31"  onChange={profileForm} required/>
                            {/* value={"2013-01-08"} */}

                        </div>
                        <div>
                            <h1>Nationality</h1>
                            <input type="text" name='nationality' className="px-4 signupFormInput w-full"  onChange={profileForm} required/>
                            <p className='text-red-600 text-xs'>{err?.nationality}</p>

                        </div>
                        <div>
                            <h1>Permanent Address</h1>
                            <textarea name="permanent" id=""  className="px-4 signupFormInput w-full h-24"  onChange={profileForm} required ></textarea>
                            <p className='text-red-600 text-xs'>{err?.permanent}</p>

                        </div>
                        <div >
                            <h1 className='flex'>Present Address  </h1>
                            {/* <span className='text-sm flex items-center'> <input onChange={sameAddress} className='w-6' type="checkbox" name="" id="" /> Same as permanent Address</span> */}
                            <textarea name="present" id="" className="px-4 signupFormInput w-full h-24"  value={checked ? profile?.permanent : profile?.present} onChange={profileForm} required> </textarea>
                            <p className='text-red-600 text-xs'>{err?.present}</p>
                            
                        </div>
                        <div>
                            <h1>Marital Status</h1>
                            <select name="matital" className="px-4 signupFormInput w-full" id=""  onChange={profileForm} required>
                                <option value="Unmarried">Unmarried</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>
                        <div>
                            <h1>Gender</h1>
                            <select name="gender" className="px-4 signupFormInput w-full" id=""  onChange={profileForm} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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
                        <h1  className='px-1 font-exo text-2xl mt-2'>Projects</h1>
                        {projectCnt.map((obj,i)=><div className='col-span-2 mt-4'>
                            <h1 className='text-lg flex items-center gap-2'>Project {i+1} {i+1>1 ? <FontAwesomeIcon className='cursor-pointer' onClick={()=>removeProject(obj)} icon={faClose}/>:null} </h1>
                            <h1>Title</h1>
                                <input onChange={enterProject}  type="text" name={`projectTitle-${i+1}`} className="px-4 signupFormInput w-full"  required/>
                                <p className='text-red-600 text-xs'>{}</p>
                                
                            <h1>Description</h1>
                            <textarea onChange={enterProject} name={`projectDes-${i+1}`} id=""  className='px-4 signupFormInput h-24 w-full' required></textarea>
                        </div>)}
                        <div className='col-span-2 px-2 text-end text-xl text-primary-800'>
                            <h1 ><FontAwesomeIcon onClick={addnewProject} icon={faPlusCircle} /></h1>
                        </div>
                        <div className='mt-4 ms-1'>
                            <button className='bg-primary-1000 text-white px-4 py-2 rounded-md'>Update Change</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile
