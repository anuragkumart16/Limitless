import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplashScreen from './Components/Template/SplashScreen'
import Auth from './Components/Template/Auth'
import Error from './Components/Template/Error'
import PageNotFound from './Pages/PageNotFound'
import ResetPassword from './Pages/ResetPassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/error' element={<Error />} />
        <Route path='/dashboard' element={<div>Dashboard</div>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
