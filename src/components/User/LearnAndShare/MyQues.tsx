import React, { useEffect, useState } from 'react'
import { PublicQuestion } from '../../../models/PublicQuestion'
import { getMyPublicQuestions } from '../../../services/LAS/LAS'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import EditModal from './EditModal'

const MyQues = () => {
    const navigate=useNavigate()
    const [questions, setQuestions] = useState<PublicQuestion[]>([])
    const { userId ,image} = useSelector((state: any) => state.user);
    const [editModal,setEditModal]=useState<boolean>(false)
    const [editQueId,setEditQueId]=useState<string>('')

    useEffect(() => {
        const fetch = async () => {
            const data = await getMyPublicQuestions(userId)
            setQuestions(data)

        }
        fetch()
    }, [])
    const edit=(id?:string)=>{
        if(id){
          setEditQueId(id)
        setEditModal(true)  
        }
        


    }
    return (
        <>
            <div className='lg:grid grid-cols-2 px-2 lg:px-10 md:px-4 font-exo gap-2 mb-8 mt-4'>
                {questions.map((obj) => <div className='w-full border px-3 mb-2 lg:mb-0 lg:px-6 py-2'>
                    <div className='flex items-center justify-between pb-2 gap-2'>
                     <p onClick={()=>navigate(`/publicquestion/${obj._id}`)} className='text-justify font-bold flex items-center gap-2'><span><img className='w-4 rounded-full' src={image} alt="" /></span> {obj.title}</p> 
                     <button onClick={()=>edit(obj?._id)} className='px-2 py-1  rounded shadow text-white bg-primary-800'><FontAwesomeIcon icon={faEdit} className=''/></button>
                    </div>
                    
                    <p>{obj.question}</p>
                    <div className='flex gap-2'>
                        <h1 className='text-sm pt-3'>Likes : {obj.likes}</h1>
                        <h1 className='text-sm pt-3'>Answers :{obj.answeredBy?.length} </h1>
                    </div>
                </div>)}
            </div>
            {editModal&&<EditModal questionId={editQueId}  setEditModal={setEditModal} questions={questions} setQuestions={setQuestions} />}
        </>
    )
}

export default MyQues
