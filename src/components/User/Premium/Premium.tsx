import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Doughnut, Pie } from 'react-chartjs-2';

const Premium = () => {
  const data = {
    labels: ['Wrong', 'Correct'],
    datasets: [
      {
        data: [20, 100],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };
  return (
    <>
      <div className='w-full px-6 lg:grid lg:grid-cols-2 mt-10 gap-2 lg:px-40 font-exo mb-10'>
        <div className='py-2 rounded-md shadow   md:flex justify-center  items-center gap-2 border  md:px-4 px-2'>
          <div className='bg-primary-400 border-2 border-primary-900 ps-4 pe-10 py-4 font-exo text-lg'>
            <h1 className='border-t-2 border-primary-900'>Highest Score : 10</h1>
            <h1 className='border-t-2 border-primary-900'>Correct Answers : 88 </h1>
            <h1 className='border-t-2 border-primary-900'>Total Exams Attended : 10</h1>
            <h1 className='border-t-2 border-primary-900'>Total QUestions Attended : 100 </h1>
          </div>
          <div className=' h-60'>
           
            <Doughnut data={data} />
          </div>
        </div>
        <div className='shadow border rounded-md  lg:px-10 md:px-6 px-4'>
          <div className='w-full flex items-center py-4'>
            <h1 className='text-4xl'><FontAwesomeIcon className='text-yellow-500' icon={faTrophy}/> 29<span className='text-lg'>/100pts</span> </h1>
          </div>
          <div>
          <h1 className='text-xl font-bold '>Subscription Data</h1>
          <p className=''>Plan : Basic Plan</p>
          <p className=''>Plan Amount : $29</p>
          <p className=''>Purchased Date : 29/09/2023</p>
          <p className=''>Expires On : 29/09/2023</p>
          <p className='text-center text-lg pt-2'>Take your learning to the next level!</p>

          </div>
          
        </div>
        <div className='col-span-2  flex justify-end py-2'>
          <button className='bg-green-400 border-green-600 border-2 px-4 py-2 rounded text-white'>Take Test</button>
        </div>
        <div>
          <h1 className='text-xl font-bold'>Test History</h1>
        </div>
        <div className="col-span-2 shadow p-2 rounded-md ">
          <table className='w-full'>
            <thead >
              <tr className='border-b-2 border-black h-12'>
                <th className='text-start'>No</th>
                <th className='text-start'>Date</th>
                <th className='text-start'>Score</th>
                <th className='text-start'>Wrong</th>
                <th className='text-start'>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-t-2 h-12'>
                <td>1</td>
                <td>22/2/2020</td>
                <td>10</td>
                <td>8</td>
                <td>
                  <button className='border px-2 rounded py-1 bg-primary-600 text-white border-primary-900'>Results</button>
                </td>
              </tr>
              <tr className='border-t-2 h-12'>
                <td>1</td>
                <td>22/2/2020</td>
                <td>10</td>
                <td>8</td>
                <td>
                  <button className='border px-2 rounded py-1 bg-primary-600 text-white border-primary-900'>Results</button>
                </td>
              </tr>
              <tr className='border-t-2 h-12'>
                <td>1</td>
                <td>22/2/2020</td>
                <td>10</td>
                <td>8</td>
                <td>
                  <button className='border px-2 rounded py-1 bg-primary-600 text-white border-primary-900'>Results</button>
                </td>
              </tr>
              <tr className='border-t-2 h-12'>
                <td>1</td>
                <td>22/2/2020</td>
                <td>10</td>
                <td>8</td>
                <td>
                  <button className='border px-2 rounded py-1 bg-primary-600 text-white border-primary-900'>Results</button>
                </td>
              </tr>
              <tr className='border-t-2 h-12'>
                <td>1</td>
                <td>22/2/2020</td>
                <td>10</td>
                <td>8</td>
                <td>
                  <button className='border px-2 rounded py-1 bg-primary-600 text-white border-primary-900'>Results</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-span-2 flex justify-end'>
        <p className='text-blue-500 cursor-pointer hover:underline '>Show More...</p>
      </div>
      </div>
      
    </>
  )
}

export default Premium
