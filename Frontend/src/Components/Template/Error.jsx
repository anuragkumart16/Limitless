import React, { useEffect, useContext } from 'react'
import ScreenDiv from '../Atom/ScreenDiv'
import OutlineDiv from '../Atom/OutlineDiv'
import { useLocation,useNavigate } from 'react-router-dom'
import {handleError} from '../../Helpers/error.helper.js'
import healthCheck from '../../Helpers/healthCheck.helper.js'
import { checkToken, getAccessToken } from '../../Helpers/auth.helper.js'
import { UserAuthContext } from '../../Contexts/UserAuthContext'

function Error() {
  const {setIsLogin,setUserData} = useContext(UserAuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    healthCheck().then(() => {
      checkToken().then((response) => {
        console.log(response) //this shows that the get token is working
        if (response.success) {
          setIsLogin(true)
          setUserData(response.data)
          navigate('/dashboard')
        }else{
          getAccessToken() 
          .then(response => {
            console.log(response) //this shows that the get token is working
            if (response.success) {
              localStorage.setItem('accessToken', response.data.accessToken)
              setIsLogin(true)
              setUserData(response.data)
              navigate('/dashboard')
            } else {
              navigate('/auth')
            }
          }
          ).catch((error) => {
            handleError(error,navigate)
          })
        }
      })
    }).catch((error) => {
      handleError(error,navigate)
    })
  },[navigate,setIsLogin,setUserData])

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
