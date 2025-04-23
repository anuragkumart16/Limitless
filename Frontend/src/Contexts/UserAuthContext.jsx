import { createContext, useState  } from "react";

const UserAuthContext = createContext({})

function UserAuthProvider({children}) {
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  return (
    <UserAuthContext.Provider value={{isLogin, setIsLogin, userData, setUserData, loading, setLoading, error, setError}}>
      {children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthProvider
