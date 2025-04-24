import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserAuthProvider } from './Contexts/UserAuthContext'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <UserAuthProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
      </UserAuthProvider>
  // </StrictMode>
)
