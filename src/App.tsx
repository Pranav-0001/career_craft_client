import React from 'react';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import ReginsterPage from './Pages/RegisterPage';
import Homepage from './Pages/Homepage';
import DashboardPage from './Pages/DashboardPage';
import EmpHomePage from './Pages/EmpHomePage';
import JobPostPage from './Pages/JobPostPage';
import JoblistPage from './Pages/JoblistPage';


function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Homepage/>}  />
      <Route  path='/login' element={<LoginPage />}  />
      <Route path='/register' element={<ReginsterPage/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/employer' element={<EmpHomePage/>}/>
      <Route path='/addjob' element={<JobPostPage/>}/>
      <Route path='/findjobs' element={<JoblistPage/>}/>
    </Routes>
    </>
  );
} 
 
export default App;
