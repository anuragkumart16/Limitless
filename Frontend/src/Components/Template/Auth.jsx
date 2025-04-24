import React,{useState,useEffect} from 'react'
import ScreenDiv from '../Atom/ScreenDiv'
import LoginForm from '../Organism/LoginForm'
import PasswordReset from '../Organism/PasswordReset'
import RegisterForm from '../Organism/RegisterForm'
import { useLocation } from 'react-router-dom'

function Auth() {
  const location = useLocation()
  const [isLogin,setIsLogin] = useState(true)
  const [forgotPassword,setForgotPassword] = useState(false) 
  const [newUser,setNewUser] = useState(false)

  function handlePages(login,passwordReset,registerUser){
    setIsLogin(login)
    setForgotPassword(passwordReset)
    setNewUser(registerUser)
  }

  useEffect(()=>{
    if (location.pathname === '/auth/login') handlePages(true,false,false);
    else if (location.pathname === '/auth/forgot-password') handlePages(false,true,false);
    else if (location.pathname === '/auth/register') handlePages(false,false,true);
  },[location.pathname])


  return (
    <ScreenDiv>
     {isLogin && <LoginForm togglePages={handlePages}/>}
     {forgotPassword && <PasswordReset togglePages={handlePages}/>}
     {newUser && <RegisterForm togglePages={handlePages}/>}
    </ScreenDiv>
  )
}

export default Auth
