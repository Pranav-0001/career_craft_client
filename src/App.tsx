import React from 'react';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import ReginsterPage from './Pages/RegisterPage';
import Homepage from './Pages/Homepage';
import DashboardPage from './Pages/DashboardPage';
import EmpHomePage from './Pages/EmpHomePage';
import JobPostPage from './Pages/JobPostPage';
import JoblistPage from './Pages/JoblistPage';
import AdminLoginPage from './Pages/adminLoginPage';
import AdminHomePage from './Pages/AdminHomePage';
import AdminUserListPage from './Pages/AdminUserListPage';
import EmployerProtected from './Routes/Employer/EmployerProtected';
import AdminProtected from './Routes/Admin/AdminProtected';
import CandidateOrGuest from './Routes/User/CandidateOrGuestOnly';
import CandidateProtect from './Routes/User/CandidateProtected';
import EditResumePage from './Pages/EditResumePage';
import JobDetailPage from './Pages/JobDetailPage';
import BookmarkJobsPage from './Pages/BookmarkJobsPage';
import ViewResumePage from './Pages/ViewResumePage';
import AppliedJobsPage from './Pages/AppliedJobsPage';
import EmpAppliedJobListPage from './Pages/EmpAppliedJobListPage';
import EmpResumeViewPage from './Pages/EmpResumeViewPage';
import ChatPage from './Pages/ChatPage';


function App() {
  
  return (
    <>
    <Routes>
    



      <Route path='/' element={<CandidateOrGuest><Homepage/></CandidateOrGuest>}  />
      <Route  path='/login' element={<LoginPage />}  />
      <Route path='/register' element={<ReginsterPage/>}/>
      <Route path='/dashboard' element={<CandidateProtect><DashboardPage/></CandidateProtect>}/>
      <Route path='/findjobs' element={<JoblistPage/>}/>
      <Route path='/editResume' element={<EditResumePage/>}/>
      <Route path='/bookmarks' element={<BookmarkJobsPage/>}/>
      <Route path='/job-details/:id' element={<JobDetailPage/>} />
      <Route path='/view-resume' element={<ViewResumePage/>} />
      <Route path='/my-applications' element={<AppliedJobsPage/>} />
      




      <Route path='/employer' element={<EmployerProtected><EmpHomePage/></EmployerProtected>}/>
      <Route path='/employer/addjob' element={<EmployerProtected><JobPostPage/></EmployerProtected>}/>
      <Route path='/employer/all-applications' element={<EmployerProtected><EmpAppliedJobListPage/></EmployerProtected>}/>
      <Route path='/employer/view-resume' element={<EmployerProtected><EmpResumeViewPage/></EmployerProtected>}/>
      <Route path='/employer/chat' element={<EmployerProtected><ChatPage role={'employer'} /></EmployerProtected>} />
      
      <Route path='/admin/login' element={<AdminLoginPage/>}/>
      <Route path='/admin/' element={<AdminProtected><AdminHomePage/></AdminProtected>}/>
      <Route path='/admin/userlist' element={<AdminProtected><AdminUserListPage/></AdminProtected>}/>
    </Routes>
    </>
  );
} 
 
export default App;
