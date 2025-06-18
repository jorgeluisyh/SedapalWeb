import { Navigate, type RouteObject } from 'react-router-dom'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { Userpage } from '../features/users/pages/Userpage'
import { ProfilePage } from '../features/profiles/pages/ProfilePage'
import { ArcgisServicePage } from '../features/arcgisServices/pages/ArcgisServicePage'
import { WmsServicePage } from '../features/wmsServices/pages/WmsServicePage'

const isAuthenticated = () => {
  // Aquí puedes poner la lógica que verifica si el usuario está autenticado
  // Por ejemplo, revisando un token en localStorage o una variable de estado global
  // return localStorage.getItem('authToken') !== null
  return localStorage.getItem('authToken') == null
}

export const PrivateRoute: RouteObject[] = [
  {
    path: '/dashboard',
    element: isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />,

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
