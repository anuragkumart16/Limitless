import React from 'react'
import Navbar from '../Components/Organism/Navbar'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
  const navigate = useNavigate()
  return (
    <>
    <Navbar/>
    <button onClick={()=>{navigate('/auth')}}>Click me </button>
    </>
  )
}

export default DashBoard
