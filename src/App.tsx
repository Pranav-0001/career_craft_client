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
import EmployerQuestionPage from './Pages/EmployerQuestionPage';
import EmpAddQuestion from './Pages/EmpAddQuestion';
import CandidateExamPage from './Pages/CandidateExamPage';
import EmpJobEditPage from './Pages/EmpJobEditPage';
import EmpExamResult from './Pages/EmpExamResult';
import VideoChatPage from './Pages/VideoChatPage';
import EmpVideoChatPage from './Pages/EmpVideoChatPage';
import PremiumPage from './Pages/PremiumPage';
import MockTestPage from './Pages/MockTestPage';
import LASHomepage from './Pages/LASHomepage';
import AskPublicQuestionPage from './Pages/AskPublicQuestionPage';
import PublicQuestionViewPage from './Pages/PublicQuestionViewPage';
import MyLASPage from './Pages/MyLASPage';
import MyProfilePage from './Pages/MyProfilePage';
import AdminSubscriptionHist from './Pages/AdminSubscriptionHist';
import EmpProfilePage from './Pages/EmpProfilePage';
import AdminQuestionsPage from './Pages/AdminQuestionsPage';
import AdminQuestionAddPage from './Pages/AdminQuestionAddPage';
import CandidateSettingsPage from './Pages/CandidateSettingsPage';
import MockTestHistoryPage from './Pages/MockTestHistoryPage';
import MockTestResultPage from './Pages/MockTestResultPage';
import EpmployerSettings from './Pages/EpmployerSettings';
import EmployerFindCandidates from './Pages/EmployerFindCandidates';
import EmpEditQuestionPage from './Pages/EmpEditQuestionPage';


function App() {
  
  return (
    <>
    <Routes>
    



      <Route path='/' element={<CandidateOrGuest><Homepage/></CandidateOrGuest>}  />
      <Route  path='/login' element={<LoginPage />}  />
      <Route path='/register' element={<ReginsterPage/>}/>
      <Route path='/dashboard' element={<CandidateProtect><DashboardPage/></CandidateProtect>}/>
      <Route path='/findjobs' element={<JoblistPage/>}/>
      <Route path='/editResume' element={<CandidateProtect><EditResumePage/></CandidateProtect>}/>
      <Route path='/bookmarks' element={<CandidateProtect><BookmarkJobsPage/></CandidateProtect>}/>
      <Route path='/job-details/:id' element={<CandidateProtect><JobDetailPage/></CandidateProtect> } />
      <Route path='/view-resume' element={<CandidateProtect><ViewResumePage/></CandidateProtect>} />
      <Route path='/my-applications' element={<CandidateProtect><AppliedJobsPage/></CandidateProtect>} />
      <Route path='/chat' element={<CandidateProtect><ChatPage role={'candidate'} /></CandidateProtect>} />
      <Route path='/exam/:id' element={<CandidateProtect><CandidateExamPage/></CandidateProtect>}/>
      <Route path='/settings' element={<CandidateProtect><CandidateSettingsPage/></CandidateProtect>}/>
      <Route path='/premium/test-history' element={<CandidateProtect><MockTestHistoryPage/></CandidateProtect>}/>
      <Route path='/premium/test-result/:id' element={<CandidateProtect><MockTestResultPage/></CandidateProtect>}/>

      <Route path='/videochat/:id' element={<CandidateProtect><VideoChatPage/></CandidateProtect>} />
      <Route path='/premium' element={<CandidateProtect><PremiumPage/></CandidateProtect>}/>
      <Route path='/mock-test/:id' element={<CandidateProtect><MockTestPage/></CandidateProtect>}/>
      <Route path='/Learn-and-share' element={<CandidateProtect><LASHomepage/></CandidateProtect>}/>
      <Route path='/askpublicquestion' element={<CandidateProtect><AskPublicQuestionPage/></CandidateProtect>}/>
      <Route path='/publicquestion/:id' element={<CandidateProtect><PublicQuestionViewPage/></CandidateProtect>}/>
      <Route path='/my-las' element={<CandidateProtect><MyLASPage/></CandidateProtect>} />
      <Route path='/my-profile' element={<CandidateProtect><MyProfilePage/></CandidateProtect>}/>




      <Route path='/employer' element={<EmployerProtected><EmpHomePage/></EmployerProtected>}/>
      <Route path='/employer/addjob' element={<EmployerProtected><JobPostPage/></EmployerProtected>}/>
      <Route path='/employer/edit-job/:id' element={<EmployerProtected><EmpJobEditPage/></EmployerProtected>}/>
      <Route path='/employer/all-applications' element={<EmployerProtected><EmpAppliedJobListPage/></EmployerProtected>}/>
      <Route path='/employer/view-resume' element={<EmployerProtected><EmpResumeViewPage/></EmployerProtected>}/>
      <Route path='/employer/chat' element={<EmployerProtected><ChatPage role={'employer'} /></EmployerProtected>} />
      <Route path='/employer/questions' element={<EmployerProtected><EmployerQuestionPage role='employer'/></EmployerProtected>} />
      <Route path='/employer/add-question' element={<EmployerProtected><EmpAddQuestion role='employer'/></EmployerProtected>} />
      <Route path='/employer/result/:id' element={<EmployerProtected><EmpExamResult/></EmployerProtected>} />
      <Route path='/employer/videochat/:id' element={<EmployerProtected><EmpVideoChatPage/></EmployerProtected>} />
      <Route path='/employer/profile/' element={<EmployerProtected><EmpProfilePage/></EmployerProtected>} />
      <Route path='/employer/settings/' element={<EmployerProtected><EpmployerSettings/></EmployerProtected>} />
      <Route path='/employer/findcandidates/' element={<EmployerProtected><EmployerFindCandidates/></EmployerProtected>} />
      <Route path='/employer/edit-question/:id' element={<EmployerProtected><EmpEditQuestionPage/></EmployerProtected>} />
      
      <Route path='/admin/login' element={<AdminLoginPage/>}/>
      <Route path='/admin/' element={<AdminProtected><AdminHomePage/></AdminProtected>}/>
      <Route path='/admin/userlist' element={<AdminProtected><AdminUserListPage/></AdminProtected>}/>
      <Route path='/admin/subscription' element={<AdminProtected><AdminSubscriptionHist/></AdminProtected>}/>
      <Route path='/admin/questions' element={<AdminProtected><AdminQuestionsPage/></AdminProtected>}/>
      <Route path='/admin/add-question' element={<AdminProtected><AdminQuestionAddPage/></AdminProtected>}/>

    
    </Routes>
    </>
  );
} 
 
export default App;
