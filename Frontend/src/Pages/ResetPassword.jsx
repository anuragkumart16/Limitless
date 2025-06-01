import React, { useState,useRef, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { resetPassword } from '../Services/auth.service.js'
import ScreenDiv from '../Components/Atom/ScreenDiv.jsx'
import OutlineDiv from '../Components/Atom/OutlineDiv.jsx'
import SecondaryHeading from '../Components/Atom/SecondaryHeading.jsx'
import SmallText from '../Components/Atom/SmallText.jsx'
import Input from '../Components/Atom/Input'
import Button from '../Components/Atom/Button.jsx'
import { validatePassword } from '../Helpers/validate.helper.js'
import { handleError, handleResponseError } from '../Helpers/error.helper.js'
import { handleSuccess } from './../Helpers/successfulResponse.helper.js'


function ResetPassword() {
    const params = useParams().token
    const navigate = useNavigate()
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState('password');


    function handleUpdate() {
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if (!password || !confirmPassword) {
            setError('All fields are required')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        resetPassword(params, password)
        .then( response =>{
            handleResponseError(response, setError)
            handleSuccess(response, setMessage)
            if (response.success) {
                setTimeout(() => {
                    navigate('/auth')
                }, 2000)
            }
        })
        .catch(error => {
            handleError(error, navigate)
        })
    }

    useEffect(()=>{
        if (validatePassword(password)) {
            setError(null)
        }
        else {
            if (password !== null){
                setError('Password should not be empty!')
                return
            }
        }
        if (password === confirmPassword) {
            setError(null)
        }
        else {
            setError('Passwords do not match')
            return 
        }
    },[password, confirmPassword])

    return (
        <ScreenDiv>
            <OutlineDiv style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} >
                <SecondaryHeading>Set Password</SecondaryHeading>
                {
                    message && <SmallText style={{ color: '#ffffff' }}>{message}</SmallText>
                }
                {
                    error && <SmallText style={{ color: '#F87171' }}>{error}</SmallText>
                }
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <SmallText style={{ color: '#ffffff' }}> New password</SmallText>
                        <SmallText style={{ color: '#ffffff', marginLeft: '2rem', textDecoration: 'underline', cursor: 'pointer' }} onclick={()=>{
                            setShowPassword(!showPassword)
                            setInputType(inputType === 'password' ? 'text' : 'password')
                        }}> {showPassword ? 'Hide ' : 'Show '}Password</SmallText>
                    </div>
                    <Input type={inputType} name='password' placeholder='Password' style={{ width: '100%' }} reference={passwordRef} value={password} onchange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <SmallText style={{ color: '#ffffff' }}>Confirm password</SmallText>
                    </div>
                    <Input type={inputType} name='confirm password' placeholder='Confirm new password' style={{ width: '100%' }} reference={confirmPasswordRef} value={confirmPassword} onchange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                    <Button onclick={handleUpdate}>Update</Button>
            </OutlineDiv>
        </ScreenDiv>
    )
}

export default ResetPassword
