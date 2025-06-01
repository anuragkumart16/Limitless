import React, { useContext, useState } from 'react'
import OutlineDiv from '../Atom/OutlineDiv'
import SecondaryHeading from '../Atom/SecondaryHeading'
import SmallText from '../Atom/SmallText'
import Input from '../Atom/Input'
import Button from '../Atom/Button'
import { validateEmail, validateUsername, validatePassword , isEmail } from '../../Helpers/validate.helper.js'
import { loginUserViaEmail , loginUserViaUsername } from '../../Services/auth.service.js'
import { handleError , handleResponseError} from '../../Helpers/error.helper.js'
import { useNavigate } from 'react-router-dom'
import { handleSuccessResponse } from '../../Helpers/successfulResponse.helper.js'
import { UserAuthContext } from '../../Contexts/UserAuthContext.jsx'




function LoginForm({ togglePages }) {

    const {setIsLogin,setUserData,isLogin,userData} = useContext(UserAuthContext)

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    function handleSubmit(e) {
        // prevent deafults
        e.preventDefault()
        // get form value
        let { email, password } = e.target.elements
        email = email?.value
        password = password?.value

        if (isEmail(email)) {
            if (!validateEmail(email)){
                setErrorMessage('Email is not valid!')
                return
            } 
            if (!validatePassword(password)){
                setErrorMessage('Password is not valid!')
                return
            } else {
                loginUserViaEmail(email , password)
                .then(data => {
                    handleResponseError(data,setErrorMessage)
                    handleSuccessResponse(data,setSuccessMessage)
                    if (data.success){
                        setIsLogin(true),
                        setUserData(data.data)
                        navigate('/dashboard')
                        setTimeout(()=>{
                            console.log(isLogin,userData,'this is context apis dta')
                        },5000)
                    }
                })
                .catch(error => handleError(error,navigate))
            }
        } else {
            if (!validateUsername(email)){
                setErrorMessage('Username is not valid!')
                return
            } 
            if (!validatePassword(password)){
                setErrorMessage('Password is not valid!')
                return
            } else {
                loginUserViaUsername(email , password)
                .then(data => {
                    handleResponseError(data,setErrorMessage)
                    handleSuccessResponse(data,setSuccessMessage)
                    if (data.success){
                        navigate('/dashboard')
                    }
                })
                .catch(error => handleError(error,navigate))
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <OutlineDiv padding='3rem' style={{ gap: '1rem', display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                <div>
                    <SecondaryHeading >Login</SecondaryHeading>
                    <SmallText >Enter your email to login your account</SmallText>
                </div>
                {errorMessage && (
                    <SmallText color='#7E1E1D' style={{margin:'0rem'}}>{errorMessage}</SmallText>
                )}
                {
                    successMessage && (
                        <SmallText color='#166434' style={{margin:'0rem'}}>{successMessage}</SmallText>
                    )
                }
                <div >
                    <SmallText color='#ffffff'>Email or username</SmallText>
                    <Input type='text' name='email' placeholder='Email or username' style={{ width: '100%', fontSize: '1rem' }} />
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <SmallText color='#ffffff'>Password</SmallText>
                        <SmallText color='#ffffff' style={{ cursor: 'pointer' }} onclick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide':'Show'} Password</SmallText>
                    </div>
                    <Input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' style={{ width: '100%', fontSize: '1rem' }} />
                    <SmallText color='#ffffff' style={{ cursor: 'pointer' }} onclick={()=>togglePages(false,true,false)}>Forgot Password?</SmallText>
                </div>
                <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <Button type='submit'>Login</Button>
                </div>

                    <SmallText color='#ffffff' style={{ textAlign: 'center' }}>Don't Have an account? <span onClick={()=>navigate('/auth/register')} style={{ color: '#ffffff', textDecoration: 'underline', cursor: 'pointer' }}>Signup</span></SmallText>

            </OutlineDiv>
        </form>
    )
}

export default LoginForm
