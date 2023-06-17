import React from 'react'
import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUserGear ,faFile ,faBriefcase ,faFilePen} from '@fortawesome/free-solid-svg-icons'


function Home() {
  return (
    <div>
      <main>
        <div className='w-full   class main-banner lg:flex lg:justify-between  ' >
          <div className='font-bold font-exo text-3xl lg:text-6xl h-full lg:flex lg:items-center lg:ms-12 lg:mx-0 mx-4 '>
            <div className='mt-4 lg:mt-0'>
              <h1 className='text-center '>To Choose The <span className='text-primary-900'>Right Jobs.</span> </h1>
              <p className='text-sm ms-2 mt-4 font-normal text-center lg:text-left text-gray-400  lg:pb-3'>2400 Peoples are daily search in this portal, 100 user added job portal!</p>

              <div>
                <img className='lg:hidden' src="Images/bannerImage.png" alt="" />
              </div>
              <div className='text-sm bg-white px-2 py-2 h-14 rounded-lg font-normal flex justify-between w-full lg:w-3/4'>
                <input className='w-full h-full bg-gray-100 shadow-inner  outline-none px-2 rounded-lg' type="text" placeholder='Search here' />
                <button className='px-2 bg-primary-900 text-white ms-2 rounded-lg'>Search</button>
              </div>
            </div>


          </div>
          <div className='lg:block hidden lg:pe-16'>
            <img className='lg:h-full w-full h-fit' src="Images/bannerImage.png" alt="" />
          </div>
        </div>

        <div className='bg-white pt-12 pb-10'>
          <div className='flex ms-3 md:ms-6'>
            <p className='font-bold font-exo'>Our Trusrted Companies</p>
            <div className='border-b-2 h-4 w-32 ms-3 border-primary-900'></div>
          </div>
          <div className='pt-5 flex overflow-y-hidden company-img px-5 md:px-20'>
            <div className='companies-img-container me-3'>
              <img className='h-full w-full md:w-80 ' src="Images/meta.png" alt="" />
            </div>
            <div className='companies-img-container  me-3'>
              <img className='h-full w-full md:w-80' src="Images/google.png" alt="" />
            </div>
            <div className='companies-img-container  me-3'>
              <img className='h-full w-full md:w-80' src="Images/amazone.png" alt="" />
            </div>
            <div className='companies-img-container  me-3'>
              <img className='h-full w-full md:w-80' src="Images/uber.png" alt="" />
            </div>
            <div className='companies-img-container  me-3'>
              <img className='h-full w-full md:w-80' src="Images/netflix.png" alt="" />
            </div>
          </div>
        </div>



        <div className='mt-8 md:mt-12 pb-8'>
          <div>
            <h1 className='text-center font-bold font-exo text-2xl md:text-4xl'>Latest <span className='text-primary-900'>Featured</span> Jobs</h1>
            <p className="text-center mt-2 font-work  mx-4 text-sm md:text-md">To choose your trending job dream & to make future bright.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12 mb-6 gap-6 mt-8'>



            <div className='card-featured border shadow-md bg-white rounded-lg pb-3'>
              <div className='px-4 pt-3'>
                <img className='rounded-md' src="Images/uiux.png" alt="" />
              </div>
              <div className='flex items-center  ms-4 mt-2'>
                <div className='border-2 w-12 h-12 flex items-center rounded-full'>
                  <img className='rounded-full' src="Images/Netflix.png" alt="avatar" />
                </div>
                <div className='ms-2'>
                  <h1 className='font-work font-bold'>UI/UX Designer</h1>
                  <h1 className='font-exo text-xs '>Netflix Entertainment</h1>

                </div>

              </div>
              <div className='w-3/4 mx-12 mt-4    border '></div>
              <div className='px-6 mt-4 mb-4'>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Salary     : 3-4 Lpa</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Experience : 3-3.5 Years</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Location   : Delhi, Haryana</h1>
              </div>
              <div className='px-4 flex justify-between '>
                <h1 className='mx-3 bg-orange-100 w-24 px-4 md:px-5 rounded-full text-sm md:text-md ' >Full Time</h1>
                <h1 className='text-primary-900'>Apply Now</h1>
              </div>
            </div>

            <div className='card-featured border shadow-md bg-white rounded-lg pb-3'>
              <div className='px-4 pt-3'>
                <img className='rounded-md' src="Images/uiux.png" alt="" />
              </div>
              <div className='flex items-center  ms-4 mt-2'>
                <div className='border-2 w-12 h-12 flex items-center rounded-full'>
                  <img className='rounded-full' src="Images/Netflix.png" alt="avatar" />
                </div>
                <div className='ms-2'>
                  <h1 className='font-work font-bold'>UI/UX Designer</h1>
                  <h1 className='font-exo text-xs '>Netflix Entertainment</h1>

                </div>

              </div>
              <div className='w-3/4 mx-12 mt-4    border '></div>
              <div className='px-6 mt-4 mb-4'>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Salary     : 3-4 Lpa</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Experience : 3-3.5 Years</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Location   : Delhi, Haryana</h1>
              </div>
              <div className='px-4 flex justify-between '>
                <h1 className='mx-3 bg-orange-100 w-24 px-4 md:px-5 rounded-full text-sm md:text-md ' >Full Time</h1>
                <h1 className='text-primary-900'>Apply Now</h1>
              </div>
            </div>


            <div className='card-featured border shadow-md bg-white rounded-lg pb-3'>
              <div className='px-4 pt-3'>
                <img className='rounded-md' src="Images/uiux.png" alt="" />
              </div>
              <div className='flex items-center  ms-4 mt-2'>
                <div className='border-2 w-12 h-12 flex items-center rounded-full'>
                  <img className='rounded-full' src="Images/Netflix.png" alt="avatar" />
                </div>
                <div className='ms-2'>
                  <h1 className='font-work font-bold'>UI/UX Designer</h1>
                  <h1 className='font-exo text-xs '>Netflix Entertainment</h1>

                </div>

              </div>
              <div className='w-3/4 mx-12 mt-4    border '></div>
              <div className='px-6 mt-4 mb-4'>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Salary     : 3-4 Lpa</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Experience : 3-3.5 Years</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Location   : Delhi, Haryana</h1>
              </div>
              <div className='px-4 flex justify-between '>
                <h1 className='mx-3 bg-orange-100 w-24 px-4 md:px-5 rounded-full text-sm md:text-md ' >Full Time</h1>
                <h1 className='text-primary-900'>Apply Now</h1>
              </div>
            </div>


            <div className='card-featured border shadow-md bg-white rounded-lg pb-3'>
              <div className='px-4 pt-3'>
                <img className='rounded-md' src="Images/uiux.png" alt="" />
              </div>
              <div className='flex items-center  ms-4 mt-2'>
                <div className='border-2 w-12 h-12 flex items-center rounded-full'>
                  <img className='rounded-full' src="Images/Netflix.png" alt="avatar" />
                </div>
                <div className='ms-2'>
                  <h1 className='font-work font-bold'>UI/UX Designer</h1>
                  <h1 className='font-exo text-xs '>Netflix Entertainment</h1>

                </div>

              </div>
              <div className='w-3/4 mx-12 mt-4    border '></div>
              <div className='px-6 mt-4 mb-4'>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Salary     : 3-4 Lpa</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Experience : 3-3.5 Years</h1>
                <h1 className='text-lg '><FontAwesomeIcon className='text-gray-400 text-xs pe-2 mt-1' icon={faCircle} />Location   : Delhi, Haryana</h1>
              </div>
              <div className='px-4 flex justify-between '>
                <h1 className='mx-3 bg-orange-100 w-24 px-4 md:px-5 rounded-full text-sm md:text-md ' >Full Time</h1>
                <h1 className='text-primary-900'>Apply Now</h1>
              </div>
            </div>




          </div>
        </div>



        <div className='bg-white pt-12 pb-12'>
          <div className='md:flex items-center'>
            <h1 className=' text-center mb-4 text-2xl md:text-4xl font-exo  font-bold md:hidden'>Learn <span className='text-primary-900'>And</span> Share</h1>

            <div className='px-8 md:ps-32 '>
              <img className='rounded-full w-96' src="Images/sandl.jpg" alt="" />
            </div>
            <div>
              <h1 className='ps-10 text-left mb-4 text-xl md:text-4xl font-exo  font-bold hidden md:block'>Learn <span className='text-primary-900'>And</span> Share</h1>
              <p className='px-10 text-md text-left md:text-xl mt-5 md:mt-0'>
                A collaborative coding Q&A platform where users can ask coding-related questions and receive  answers from a community of knowledgeable users.
              </p>
            </div>

          </div>
        </div>


        <div className='pb-20'>

          <div>
            <h1 className='text-center font-exo font-bold text-4xl pt-8'>How It <span className='text-primary-900'>Works</span></h1>
            <div className='  grid grid-cols-2 md:flex justify-around ms-12 md:mx-40 mt-12'>
              <div>
                <FontAwesomeIcon className='bg-white p-6 rounded-full ms-5  border-2 text-4xl py-7 text-primary-900' icon={faUserGear} />
                <h1 className='text-left ms-2'>Create account</h1> 
              </div>

              <div >
                <FontAwesomeIcon className='bg-white p-8 rounded-full ms-5  border-2 text-4xl py-7 text-primary-900' icon={faFile} />
                <h1 className='text-left ms-3'>Create Resume</h1> 
              </div>

              <div className='mt-6 md:mt-0'>
                <FontAwesomeIcon className='bg-white p-7 rounded-full ms-5  border-2 text-4xl py-7 text-primary-900' icon={faBriefcase} />
                <h1 className='text-left ms-8'>Find Jobs</h1> 
              </div>

              <div className='mt-6 md:mt-0'>
                <FontAwesomeIcon className='bg-white p-6 rounded-full ms-5  border-2 text-4xl py-7 text-primary-900' icon={faFilePen} />
                <h1 className='text-left ms-6'>Apply Jobs</h1> 
              </div>


            </div>
          </div>

        </div>


      </main>


    </div>
  )
}

export default Home
