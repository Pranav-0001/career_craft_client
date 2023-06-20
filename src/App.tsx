import React from 'react';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import ReginsterPage from './Pages/RegisterPage';
import Homepage from './Pages/Homepage';
import DashboardPage from './Pages/DashboardPage';


function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Homepage/>}  />
      <Route  path='/login' element={<LoginPage />}  />
      <Route path='/register' element={<ReginsterPage/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
    </Routes>
    </>
  );
} 
 
export default App;
