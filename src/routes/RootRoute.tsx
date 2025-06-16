import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'

export const router = createBrowserRouter([
  ...PrivateRoute,
  {
    path: '/',
    element: <DashboardPage />,
  },
])
