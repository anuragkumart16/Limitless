import React,{useState} from 'react'
import ScreenDiv from '../Atom/ScreenDiv'
import LoginForm from '../Organism/LoginForm'
import PasswordReset from '../Organism/PasswordReset'
import RegisterForm from '../Organism/RegisterForm'


function Auth() {

  const [isLogin,setIsLogin] = useState(true)
  const [forgotPassword,setForgotPassword] = useState(false) 
  const [newUser,setNewUser] = useState(false)

  function handlePages(login,passwordReset,registerUser){
    setIsLogin(login)
    setForgotPassword(passwordReset)
    setNewUser(registerUser)
  }
  return (
    <ScreenDiv>
     {isLogin && <LoginForm togglePages={handlePages}/>}
     {forgotPassword && <PasswordReset togglePages={handlePages}/>}
     {newUser && <RegisterForm togglePages={handlePages}/>}
    </ScreenDiv>
  )
}

export default Auth
