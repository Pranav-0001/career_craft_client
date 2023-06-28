import React from 'react'
import './adminhome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faSignal, faUsers, faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
function AdminHome() {
    const Doughnutdata = {
        labels: ['Non-Premium users', 'Premium users'],
        datasets: [
            {
                data: [30, 20],
                backgroundColor: ['#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#FFCE56'],
            },
        ],
    };

    const BarData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [120, 150, 200, 180, 220, 190],
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
                            <h1 className='text-lg font-bold'>₹50,000</h1>
                            <p className='text-sm text-gray-400'>Total Revenue</p>
                        </div>
                    </div>
                    <div className='border px-4 py-4 shadow-md flex items-center'>
                        <FontAwesomeIcon icon={faUsers} className='px-2 border bg-green-200 border-green-600  py-2 text-4xl' />
                        <div className='font-exo px-4'>
                            <h1 className='text-lg font-bold'>50</h1>
                            <p className='text-sm text-gray-400'>Total Users</p>
                        </div>
                    </div>

                    <div className='border px-4 py-4 shadow-md flex items-center'>
                        <FontAwesomeIcon icon={faCrown} className='px-2 border bg-orange-200 border-orange-600  py-2 text-4xl' />
                        <div className='font-exo px-4'>
                            <h1 className='text-lg font-bold'>20</h1>
                            <p className='text-sm text-gray-400'>Premium Users</p>
                        </div>
                    </div>

                    <div className='border px-4 py-4 shadow-md flex items-center'>
                        <FontAwesomeIcon icon={faUsersGear} className='px-2 border bg-blue-200 border-blue-600  py-2 text-4xl' />
                        <div className='font-exo px-4'>
                            <h1 className='text-lg font-bold'>15</h1>
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
                <div className='mx-4 grid md:grid-cols-2'>
                    <div className=' '>
                        <h1 className='mb-2'>Users</h1>
                        <div className='flex justify-around border rounded-t-md py-2'>
                            <h1>Profile</h1>
                            <h1>LAS Points</h1>
                        </div>
                        <div className='flex justify-around border py-2'>
                            <div className='flex items-center gap-2'>
                                <img src="Images/a.jpg" className='w-10 rounded-md' alt="" />
                                <h1>Pranav</h1>
                            </div>
                            <h1>112 pts</h1>
                        </div>
                        <div className='flex justify-around border py-2'>
                            <div className='flex items-center gap-2'>
                                <img src="Images/a.jpg" className='w-10 rounded-md' alt="" />
                                <h1>Pranav</h1>
                            </div>
                            <h1>112 pts</h1>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminHome
