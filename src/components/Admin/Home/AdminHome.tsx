import React, { useEffect, useState } from 'react'
import './adminhome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faSignal, faUsers, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { fetchDashData } from '../../../services/admin/fetchUsers'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
function AdminHome() {
    const [dashBoard,setDashBoard]=useState<{users:number,prime:number,Emp?:number,revenue?:number}>({users:0,prime:0,Emp:0,revenue:0})
    const [subscrption,setSubscription]=useState<{time:string}[]>([])
    useEffect(() => {
        const fetch=async()=>{
            const data=await fetchDashData()
            console.log(data.subscription);
            setDashBoard({...dashBoard,users:data.users,prime:data.premium,Emp:data.emp,revenue:data.revenue})
            setSubscription(data.subscription)
            
        }
        fetch()
    }, [])
    const arr=subscrption.map(obj=>parseInt(obj.time.split('-')[1]))
    console.log(arr);
    
    const months = [ "January", "February", "March","April",  "May", "June","July", "August", "September", "October", "November", "December" ];
    
      
      // Function to get month and year from the 'time' field
      function getMonthYear(time:string) {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        return month;
      }
      
      // Calculate month-wise total price
      const monthWiseTotalPrice:any = {};
      subscrption.forEach((item) => {
        const monthYear = getMonthYear(item.time);
        if (!monthWiseTotalPrice[monthYear]) {
          monthWiseTotalPrice[monthYear] = 0;
        }
        monthWiseTotalPrice[monthYear] += 29;
      });
      
      
      const resultArray = Object.entries(monthWiseTotalPrice).map(([monthYear, totalPrice]) => ({
        monthYear:months[parseInt(monthYear)],
        totalPrice,
      }));
      
      console.log({resultArray});
    
    
    const Doughnutdata = {
        labels: ['Non-Premium users', 'Premium users'],
        datasets: [
            {
                data: [dashBoard.users-dashBoard.prime, dashBoard.prime],
                backgroundColor: ['#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#FFCE56'],
            },
        ],
    };

    const BarData = {
        labels: [...resultArray.map(obj=>obj.monthYear)],
        datasets: [
            {
                label: 'Sales',
                data: [...resultArray.map(obj=>obj.totalPrice)],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    return (
        <>
            <div className=' w-full '>
                <div className='md:pt-6 px-2 pt-2 mb-6'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl font-exo'>Dashboard</h1>
                </div>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-4 gap-2'>
                    <div className='border px-4 py-4 shadow-md flex items-center'>
                        <FontAwesomeIcon icon={faSignal} className='px-2 border bg-purple-200 border-purple-600  py-2 text-4xl' />
                        <div className='font-exo px-4'>
                            <h1 className='text-lg font-bold'>${dashBoard.revenue}</h1>
                            <p className='text-sm text-gray-400'>Total Revenue</p>
                        </div>
                    </div>
                    <div className='border px-4 py-4 shadow-md flex items-center'>
                        <FontAwesomeIcon icon={faUsers} className='px-2 border bg-green-200 border-green-600  py-2 text-4xl' />
                        <div className='font-exo px-4'>
                            <h1 className='text-lg font-bold'>{dashBoard.users}</h1>
                            <p className='text-sm text-gray-400'>Total Users</p>
                        </div>
                    </div>

                    <div className='border px-4 py-4 shadow-md flex items-center'>
                        <FontAwesomeIcon icon={faCrown} className='px-2 border bg-orange-200 border-orange-600  py-2 text-4xl' />
                        <div className='font-exo px-4'>
                            <h1 className='text-lg font-bold'>{dashBoard.prime}</h1>
                            <p className='text-sm text-gray-400'>Premium Users</p>
                        </div>
                    </div>

                    <div className='border px-4 py-4 shadow-md flex items-center'>
                        <FontAwesomeIcon icon={faUsersGear} className='px-2 border bg-blue-200 border-blue-600  py-2 text-4xl' />
                        <div className='font-exo px-4'>
                            <h1 className='text-lg font-bold'>{dashBoard.Emp}</h1>
                            <p className='text-sm text-gray-400'>Total Employers</p>
                        </div>
                    </div>
                </div>
                <div className=' grid grid-cols-1 md:grid-cols-3 px-4 mt-4 gap-2'>
                    <div className=' border shadow-md rounded-md'>
                        <h2 className='font-work ps-3 pt-3 text-xl'>Users Chart</h2>
                        <Doughnut data={Doughnutdata} className='my-3' />
                    </div>
                    <div className='col-span-2 md:mx-2 border rounded-md shadow-md px-2 md:px-6 mb-8 pb-4 md:mb-0 md:pb-0'>
                        <h2 className='font-work ps-3 pt-3 text-xl'>Monthly Revenue</h2>
                        <Bar data={BarData} options={options} />
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default AdminHome
