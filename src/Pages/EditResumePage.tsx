import React from 'react'
import MainNav from '../components/User/Navbar/MainNav'
import SideMenu from '../components/User/UserSIdeBar/SideMenu'
import EditResume from '../components/User/EditResume/EditResume'

function EditResumePage() {
    return (
        <>
            <div>
                <MainNav />
                <div className="grid grid-cols-7">
                    <div className='hidden lg:block lg:col-span-2 '>
                        <SideMenu page={"edit"} />
                    </div>
                    <div className='col-span-7 px-4 lg:px-0 lg:col-span-5 '>
                        <EditResume />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditResumePage
