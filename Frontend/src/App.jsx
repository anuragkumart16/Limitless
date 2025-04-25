import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Splash from './Pages/Splash'
import Error from './Components/Template/Error'
import PageNotFound from './Pages/PageNotFound'
import ResetPassword from './Pages/ResetPassword'
import Authenticate from './Pages/Authenticate'
import DashBoard from './Pages/DashBoard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path='/auth' element={<Authenticate />} />
      <Route path='/auth/forgot-password' element={<Authenticate  />} />
      <Route path='/auth/register' element={<Authenticate  />} />
      <Route path='/auth/login' element={<Authenticate  />} />
      <Route path='/error' element={<Error />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
