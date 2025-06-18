import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { LoginPage } from '../features/auth/pages/LoginPage'

export const router = createBrowserRouter(
  [
    ...PrivateRoute,
    {
      path: '/',
      element: <DashboardPage />,
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
