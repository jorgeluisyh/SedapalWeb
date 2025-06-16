import type { RouteObject } from 'react-router-dom'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { Userpage } from '../features/users/pages/Userpage'
import { ProfilePage } from '../features/profiles/pages/ProfilePage'

export const PrivateRoute: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,

    children: [
      {
        path: 'users',
        element: <Userpage />,
      },
      {
        path: 'perfiles',
        element: <ProfilePage />,
      },
    ],
  },
]
