import type { MenuItem } from 'primereact/menuitem'
import styles from './Sidebar.module.css'
import { Menu } from 'primereact/menu'
import { useNavigate } from 'react-router-dom'
import logoSedapal from '../../../assets/logoSedapal.png'

export const Sidebar = () => {
  const navigate = useNavigate()

  const items: MenuItem[] = [
    {
      label: 'Gestión de Usuarios',
      items: [
        {
          label: 'Usuarios',
          icon: 'pi pi-users',
          command: () => navigate('/dashboard/users'),
        },
        {
          label: 'Perfiles',
          icon: 'pi pi-graduation-cap',
          command: () => navigate('/dashboard/perfiles'),
        },
        {
          label: 'Mapas',
          icon: 'pi pi-map',
          command: () => navigate('/dashboard/mapas'),
        },
        {
          label: 'Equipos',
          icon: 'pi pi-briefcase',
          command: () => navigate('/dashboard/equipos'),
        },
      ],
    },
    {
      label: 'Gestión de Servicios',
      items: [
        {
          label: 'Servicios Arcgis Server , MXD',
          icon: 'pi pi-map',
          command: () => navigate('/dashboard/arcgisServices'),
        },
        {
          label: 'Servicios WMS',
          icon: 'pi pi-globe',
          command: () => navigate('/dashboard/wmsServices'),
        },
      ],
    },
    {
      label: 'Históricos',
      items: [
        {
          label: 'Usuarios',
          icon: 'pi pi-calendar-clock',
          command: () => navigate('/dashboard/history'),
        },
      ],
    },
    {
      label: 'Sesion',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
        },
      ],
    },
  ]
  return (
    <aside className="layout-sidebar">
      <div className={styles['layout-topbar-logo']}>
        <img src={logoSedapal} alt="Logo" className="layout-logo" />
      </div>
      <div className={styles.layoutTopbarMenu}>
        <Menu model={items} className={styles['layout-menu']} />
      </div>
    </aside>
  )
}
