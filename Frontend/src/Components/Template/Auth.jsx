import React,{useState} from 'react'
import ScreenDiv from '../Atom/ScreenDiv'
import LoginForm from '../Organism/LoginForm'
import PasswordReset from '../Organism/PasswordReset'
function Auth() {
  const [isLogin,setIsLogin] = useState(false)
  const [forgotPassword,setForgotPassword] = useState(true) 
  const [newUser,setNewUser] = useState(false)
  return (
    <ScreenDiv>
     {isLogin && <LoginForm/>}
     {forgotPassword && <PasswordReset/>}
     {/* {newUser && <PasswordReset/>} */}
    </ScreenDiv>
  )
}

export default Auth
