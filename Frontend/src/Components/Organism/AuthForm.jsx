import React from 'react'
import OutlineDiv from '../Atom/OutlineDiv'
import SecondaryHeading from '../Atom/SecondaryHeading'
import SmallText from '../Atom/SmallText'
import Input from '../Atom/Input'
import Button from '../Atom/Button'
import SecondaryBtn from '../Atom/SecondaryBtn'

function AuthForm() {
  return (
    <form>
        <OutlineDiv padding='3rem'  style={{gap:'1rem',display:'flex',flexDirection:'column',width:'fit-content'}}>
            <div>
            <SecondaryHeading >Login</SecondaryHeading>
            <SmallText >Enter your email to login your account</SmallText>
            </div>
            <div >
                <SmallText color='#ffffff'>Email</SmallText>
                <Input type='email' name='email' placeholder='Email' style={{width:'100%',fontSize:'1rem'}}/>
            </div>
            <div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <SmallText color='#ffffff'>Password</SmallText>
                <SmallText color='#ffffff' style={{cursor:'pointer'}}>Forgot Password?</SmallText>
                </div>
                <Input type='password' name='password' placeholder='Password' style={{width:'100%',fontSize:'1rem'}}/>
            </div>
            <div style={{marginTop:'1rem',marginBottom:'1rem'}}>
                <Button>Login</Button>
            </div>
            <div>
                <SecondaryBtn style={{width:'100%',color:'#ffffff'}}>Login with Google</SecondaryBtn>
                <SmallText color='#ffffff' style={{textAlign:'center'}}>Don't Have an account? <span style={{color:'#ffffff',textDecoration:'underline',cursor:'pointer'}}>Signup</span></SmallText>
            </div>
        </OutlineDiv>
    </form>
  )
}

export default AuthForm
