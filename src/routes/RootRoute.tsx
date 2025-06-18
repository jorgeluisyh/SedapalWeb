import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { isAuthenticated } from '../shared/utils/auth'

export const router = createBrowserRouter(
  [
    ...PrivateRoute,
    {
      path: '/',
      element: isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />,
    },
    {
      path: '/login/',
      element: <LoginPage />,
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH || undefined,
  }
)
