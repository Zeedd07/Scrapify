import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

// This is the entry point of our React app
// We wrap the entire app with GoogleOAuthProvider so that Google login works everywhere
// The clientId comes from our environment variables (set in .env file)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* GoogleOAuthProvider gives all child components access to Google login functionality */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {/* Our main App component that handles everything */}
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
) 
