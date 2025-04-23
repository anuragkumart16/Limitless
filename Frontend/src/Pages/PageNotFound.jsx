import React from 'react'
import ScreenDiv from '../Components/Atom/ScreenDiv'
import OutlineDiv from '../Components/Atom/OutlineDiv'
import Button from '../Components/Atom/Button'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  const error = 'Page Not Found'
  const message = 'The page you are looking for does not exist.'
  return (
    <ScreenDiv>
      <OutlineDiv>
        <h1 style={{ textAlign: 'center',color:'#FAFAFA' }}>{error}</h1>
        <p style={{ textAlign: 'center',color:'#A1A1AA',marginBottom:'1rem'}}>{message}</p>
        <Button onclick={()=>navigate('/error')}>Go To Dashboard</Button>
      </OutlineDiv>
    </ScreenDiv>
  )
}

export default PageNotFound
