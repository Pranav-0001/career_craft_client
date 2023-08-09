import React, { useEffect, useState } from 'react'
import { ExamType } from '../../../models/Exam'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMockTests } from '../../../services/Exam/Mock Test';

const TestHistory = () => {
  const { userId, username, image, userEmail, isPrime } = useSelector((state: any) => state.user);
    const navigate=useNavigate()
    const [mockTests, setmockTests] = useState<ExamType[]>([])
    const [pagination,setpagination]=useState<number[]>([])
    const [currpage,setPage]=useState<number>()
    const [isLoading,setIsLoading]=useState(false)


    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const str = queryParams.get('page')
    let page:number
    if(str) page=parseInt(str)
    else  page=1
    useEffect(() => {
        setIsLoading(true)
        const fetch=async()=>{
            const data=await getMockTests(userId,page)
            console.log(data);
            setmockTests(data.exams)
            setpagination(data.pagination)
            setPage(page)
            setIsLoading(false)
        }
        fetch()
    }, [page])

    return (
        <div className='lg:px-20 md:px-10 px-2 mt-10 font-exo'>
            <div className=''>
                <h1 className='text-xl font-bold mb-8'>Test History</h1>
                
            </div>
            <div className='rounded overflow-hidden'>
                <table className='w-full'>
                    <thead className='bg-primary-800 text-white h-10'>
                        <tr className=''>
                            <th className='text-start ps-2 '>S.No</th>
                            <th className='text-start ps-2 '>Date</th>
                            <th className='text-start ps-2 '>Score</th>
                            <th className='text-start ps-2 '>Wrong</th>
                            <th className='text-start ps-2 '>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTests.map((obj,i)=> <tr className='h-12 border-b border-x'>
                            <td className='ps-3'>{i+1}</td>
                            <td className='ps-3'>{obj.createdAt?.split('T')[0]}</td>
                            <td className='ps-3'>{obj.mark}</td>
                            <td className='ps-3'>{obj.mark?10-obj.mark:0}</td>
                            <td className='ps-3'><button onClick={()=>navigate(`/premium/test-result/${obj._id}`)} className='bg-primary-400 px-3 py-1 border-primary-800 border  rounded shadow '>Result</button></td>
                        </tr>)}
                    </tbody>
                </table>
                <div className='w-full flex justify-end mt-3'>
                    {pagination.map((num)=><button onClick={()=>navigate(`/premium/test-history?page=${num}`)} className={`${currpage===num ? 'bg-primary-600 text-white' : 'border border-primary-600 text-black'} px-4 py-2 `}>{num}</button>)}
                </div>
            </div>
        </div>
    )
}

export default TestHistory
