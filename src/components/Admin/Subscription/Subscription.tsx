import React, { useEffect, useState } from 'react'
import { subscriptionHist } from '../../../services/Premium/Premium'
import { useLocation, useNavigate } from 'react-router-dom';
import { SubscriptionHistory } from '../../../models/User';
import Loader from '../../Loader/Loader';

const Subscription = () => {
    const location = useLocation();
    const navigate= useNavigate()
    const searchParams = new URLSearchParams(location.search);
    const [page,setPage]=useState<number>(1)
    const [pagination,setPagination]=useState<number[]>([])
    const [isLoading,setIsLoading]=useState(false)
    const [subscription,setSubscription]=useState<SubscriptionHistory[]>([])
    let pg=searchParams.get('page')
    let pageNum=1
    
    
    useEffect(() => {
        const fetch=async()=>{
          setIsLoading(true)
          if(pg){
             pageNum=parseInt(pg)
            setPage(pageNum)
          }
        
            const data=await subscriptionHist(pageNum)
            console.log(data);
            setSubscription(data.subs)
            setPagination(data.pages)
          setIsLoading(false)
        }
        fetch()
    }, [page,pg])
    
  return (
    <div className='lg:px-10 md:px-5 px-3 font-exo'>
      <div className='flex justify-start'>
        <h1 className='text-lg font-bold mb-8'>Subscription History</h1>
      </div>
      {isLoading ? 
      <Loader/>
      :<div className=''>
        <table className='w-full'>
          <thead>
            <tr className='h-10 border border-primary-900 bg-primary-400 '>
              <th className='text-start ps-2' >S.No</th>
              <th className='text-start ps-2' >User</th>
              <th className='text-start ps-2' >Payment ID</th>
              <th className='text-start ps-2' >Payment Date</th>
              <th className='text-start ps-2' >Expiry Date</th>
              <th className='text-start ps-2' >Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {subscription.map((sub,i)=><tr className='h-10 border-b-2 border-x-2'>
              <td className='ps-2'>{i+1}</td>
              <td className='ps-2'>{sub.user?.username}</td>
              <td className='ps-2'>{sub.orderId}</td>
              <td className='ps-2'>{sub.user?.subscribedDate}</td>
              <td className='ps-2'>{sub.user?.Expiry}</td>
              <td className='ps-2'>{sub.status}</td>
            </tr>)}
          </tbody>
        </table>
      </div>}
      <div className='w-full flex justify-end mt-4' >
        {pagination.map((obj)=>
        <h1 onClick={()=>navigate(`?page=${obj}`)} className={`${page===obj?'bg-primary-800 text-white ':'bg-white border border-primary-700'} h-10 w-10 items-center text-lg flex justify-center`}>{obj}</h1>
        )}
      </div>
    </div>
  )
}

export default Subscription
function usestate(): [any, any] {
    throw new Error('Function not implemented.');
}

