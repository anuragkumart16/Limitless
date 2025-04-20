import React, { useEffect } from 'react'
import ScreenDiv from '../Atom/ScreenDiv'
import OutlineDiv from '../Atom/OutlineDiv'
import { useLocation,useNavigate } from 'react-router-dom'
import {handleError} from '../../helpers/error.helper'
import healthCheck from '../../helpers/healthCheck.helper'
import { checkToken } from '../../helpers/auth.helper'

function Error() {

  const navigate = useNavigate()

  useEffect(() => {
    healthCheck().then(() => {
      checkToken().then((response) => {
        if (response.success) {
          navigate('/dashboard')
        }else{
          navigate('/auth')
        }
      })
    }).catch((error) => {
      handleError(error,navigate)
    })
  },[])

  const location = useLocation()
  const error = location.state?.error ;
  const message = location.state?.message ;
  return (
    <ScreenDiv>
      <OutlineDiv>
        <h1 style={{ textAlign: 'center',color:'#FAFAFA' }}>{error}</h1>
        <p style={{ textAlign: 'center',color:'#A1A1AA',marginBottom:'1rem'}}>{message}</p>
      </OutlineDiv>
    </ScreenDiv>
  )
}

export default Error
