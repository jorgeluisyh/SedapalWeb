import type { RouteObject } from 'react-router-dom'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { Userpage } from '../features/users/pages/Userpage'
import { ProfilePage } from '../features/profiles/pages/ProfilePage'
import { ArcgisServicePage } from '../features/arcgisServices/pages/ArcgisServicePage'
import { WmsServicePage } from '../features/wmsServices/pages/WmsServicePage'

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
      {
        path: 'arcgisServices',
        element: <ArcgisServicePage />,
      },
      {
        path: 'wmsServices',
        element: <WmsServicePage />,
      },
    ],
  },
]
