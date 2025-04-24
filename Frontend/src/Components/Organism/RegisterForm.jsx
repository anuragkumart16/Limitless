import React, { useState } from 'react'
import OutlineDiv from './../Atom/OutlineDiv'
import SecondaryHeading from '../Atom/SecondaryHeading'
import Input from '../Atom/Input'
import SmallText from '../Atom/SmallText'
import Button from '../Atom/Button'
import Span from '../Atom/Span'
import { validateEmail, validatePassword } from '../../Helpers/validate.helper'
import { createUser } from '../../Helpers/auth.helper'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from './../../Helpers/successfulResponse.helper.js'
import { handleResponseError } from '../../Helpers/error.helper.js'

function RegisterForm({ togglePages }) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    if (!validateEmail(data.email)) {
      setErrorMessage('Email is not valid!')
      return
    }
    if (!validatePassword(data.password)) {
      setErrorMessage('Password is not valid!')
      return
    }
    if (!data.username) {
      setErrorMessage('Username is required!')
      return
    }
    createUser(data.email, data.username, data.password)
    .then((response)=>{
      handleSuccess(response,setSuccessMessage)
      handleResponseError(response,setErrorMessage)
      if (response.success){
        setTimeout(()=>{
          togglePages(true,false,false)
        },2000)
      }
    })
    .catch((error) => {
      handleResponseError(error,navigate)
    })
    
  }

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  return (
    <form onSubmit={handleSubmit}>
      <OutlineDiv style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SecondaryHeading>Register</SecondaryHeading>
        {errorMessage && (
          <SmallText color='#7E1E1D' style={{ margin: '0rem' }}>{errorMessage}</SmallText>
        )}
        {
          successMessage && (
            <SmallText color='#166434' style={{ margin: '0rem' }}>{successMessage}</SmallText>
          )
        }
        <div>
          <SmallText color={'#ffffff'}>Enter your email</SmallText>
          <Input type='email' name='email' placeholder='Email' style={{ width: '16rem' , fontSize:'1rem' }} />
        </div>
        <div>
          <SmallText color={'#ffffff'}>Enter your username</SmallText>
          <Input type='text' name='username' placeholder='Username' style={{ width: '16rem', fontSize:'1rem'  }} />
        </div>
        <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <SmallText color='#ffffff'>Enter password</SmallText>
                        <SmallText color='#ffffff' style={{ cursor: 'pointer' }} onclick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide':'Show'} Password</SmallText>
                    </div>
          <Input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' style={{ width: '16rem' , fontSize:'1rem' }} />
        </div>
        <div>
          <Button type='submit'>Register</Button>
        </div>
        <div>
          <SmallText color={'#ffffff'}>Already have an account? <Span onclick={() => navigate('/auth/login')} style={{ color: '#ffffff', textDecoration: 'underline', cursor: 'pointer' }}>Login</Span></SmallText>
        </div>
      </OutlineDiv>
    </form>
  )
}

export default RegisterForm
