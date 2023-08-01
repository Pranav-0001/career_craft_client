import React, { useEffect, useState } from 'react'
import { subscriptionHist } from '../../../services/Premium/Premium'
import { useLocation } from 'react-router-dom';
import { SubscriptionHistory } from '../../../models/User';

const Subscription = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [page,setPage]=useState<number>(1)
    const [subscription,setSubscription]=useState<SubscriptionHistory>()
    let pg=searchParams.get('page')
    if(pg){
        const pageNum=parseInt(pg)
        setPage(pageNum)
    }
    
    useEffect(() => {
        const fetch=async()=>{
            const data=await subscriptionHist(page)
            console.log(data);
            
        }
        fetch()
    }, [])
    
  return (
    <div>
      hsfkljdfd
    </div>
  )
}

export default Subscription
function usestate(): [any, any] {
    throw new Error('Function not implemented.');
}

