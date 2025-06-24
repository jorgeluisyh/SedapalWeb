// src/routes/RootRoute.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { Userpage } from '../features/users/pages/Userpage'
import { ProfilePage } from '../features/profiles/pages/ProfilePage'
import { ArcgisServicePage } from '../features/arcgisServices/pages/ArcgisServicePage'
import { WmsServicePage } from '../features/wmsServices/pages/WmsServicePage'
import { TeamPage } from '../features/teams/pages/TeamPage'
import { MapPage } from '../features/maps/pages/MapPage'
import { UserHistoryPage } from '../features/usersHistory/pages/UserHistoryPage'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { useAuth } from '../contexts/AuthContext'

const LoginRedirect = () => {
  const { authenticated } = useAuth()
  if (authenticated) {
    return <Navigate to="/" />
  }
  return <LoginPage />
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '',
          element: <DashboardPage />,
        },
        {
          path: 'dashboard',
          element: <DashboardPage />,
          children: [
            { path: 'users', element: <Userpage /> },
            { path: 'perfiles', element: <ProfilePage /> },
            { path: 'mapas', element: <MapPage /> },
            { path: 'equipos', element: <TeamPage /> },
            { path: 'arcgisServices', element: <ArcgisServicePage /> },
            { path: 'wmsServices', element: <WmsServicePage /> },
            { path: 'history', element: <UserHistoryPage /> },
          ],
        },
      ],
    },
    {
      path: '/login',
      element: <LoginRedirect />,
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_PATH || undefined,
  }
)
