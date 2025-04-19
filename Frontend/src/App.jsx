import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplashScreen from './Components/Template/SplashScreen'
import Auth from './Components/Template/Auth'
import ServerError from './Components/Template/ServerError'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/servererror' element={<ServerError />} />
      </Routes>
    </Router>
  )
}

export default App
