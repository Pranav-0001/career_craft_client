import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalScriptProvider, PayPalButtons  } from "@paypal/react-paypal-js";
import { updatePayment } from '../../../services/candidate/Payment';
import { updateUser } from '../../../redux/user/userSlice';
const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT as string,
    currency: "USD",
    intent: "capture",
};



const Subscription = () => {
    const dispatch=useDispatch()

    const { userId, username, image, userEmail, isPrime } = useSelector((state: any) => state.user);
    const createOrder = (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: 29,
                currency_code: 'USD', // Replace 'USD' with your desired currency code
              },
            },
          ],
        });
      };
      const onApproveHandler = (data: any, actions: any) => {
        console.log('Payment was approved:', data);
        
        return actions.order.capture().then(async(details: any) => {
          console.log('Funds captured:', details.status);
          
          if(details.status==="COMPLETED"){
            await updatePayment(userId,data.orderID,details.status,details.create_time)
            dispatch(updateUser({userId,username,image,userEmail,isPrime:true}))
          }
        });
      };

    return (
        <>
            <div className='lg:px-96 md:px-20 px-2 mt-10 font-exo'>
                <h1 className='text-xl '>Dear <span className='font-bold text-primary-700'>{username} ,</span></h1>
                <p className='text-lg text-justify'>The mock test feature is now available on our platform to further enhance your exam preparation. Please note that this feature is exclusively reserved for our premium members.</p>

                <p className='text-center text-2xl'>Upgrade now and take your learning to the next level!</p>

                <div className='mt-8 '>
                    <h1 className='text-xl font-bold text-center pb-4'>Our Pricing</h1>
                    <div className='flex justify-center'>
                        <div className='border-2 rounded-lg shadow-md bg-primary-500 text-white px-4 lg:px-8 border-primary-900 py-2'>
                            <h1 className='text-2xl  pb-5 text-center'><FontAwesomeIcon className='text-yellow-400' icon={faCrown} /> Monthly Plan</h1>
                            <p className='text-4xl text-center font-extrabold py-2'>$29<span className='text-lg'>/month</span></p>

                            <ul className='py-4 list-disc text-sm gap-2'>
                                <li className='pb-2'>Unlock access to unlimited mock tests</li>
                                <li className='pb-2'>Detailed performance analysis</li>
                                <li className='pb-2'>Enhance your interview preparation</li>
                            </ul>
                            <button className='w-full bg-primary-500 h-10 mt-4 mb-4 rounded shadow font-bold'>
                                Subscribe Now
                            </button>
                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons  style={{ layout: "horizontal" }} createOrder={createOrder} onApprove={onApproveHandler} />
                            </PayPalScriptProvider>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription
