import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/RootRoute'
import { PrimeReactProvider } from 'primereact/api'
import './index.css' /* 
import 'primereact/resources/themes/lara-light-blue/theme.css' */
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PrimeReactProvider>
  </StrictMode>
)
