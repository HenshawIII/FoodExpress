import { StrictMode,Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import {ErrorBoundary} from "react-error-boundary"
import Fallback from "./components/fallback.jsx"
import LoadingScreen from "./components/LoadingScreen.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ErrorBoundary fallback={<Fallback/>}>
      <Suspense fallback={<LoadingScreen />}>
      <App />
      </Suspense>
      </ErrorBoundary>
    </UserProvider>
  </StrictMode>,
)
