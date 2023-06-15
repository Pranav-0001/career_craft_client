import React from 'react';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import ReginsterPage from './Pages/RegisterPage';

function App() {
  return (
    <>
    <Routes>
      
      <Route  path='/login' element={<LoginPage />}  />
      <Route path='/register' element={<ReginsterPage/>}/>
    </Routes>
    </>
  );
} 
 
export default App;
