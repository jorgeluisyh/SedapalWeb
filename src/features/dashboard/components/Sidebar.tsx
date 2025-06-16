import type { MenuItem } from 'primereact/menuitem'
import styles from './Sidebar.module.css'
import { Menu } from 'primereact/menu'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// importar logo
import logoSedapal from '../../../assets/logoSedapal.png'

export const Sidebar = () => {
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const dashboardElemento = document.getElementById('dashboard')
    debugger

    if (isCollapsed && dashboardElemento) {
      dashboardElemento.dataset.sidebarCollapsed = 'true'
    } else {
      dashboardElemento?.removeAttribute('data-sidebar-collapsed')
    }
  }, [isCollapsed])

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
          icon: 'pi pi-search',
          command: () => navigate('/dashboard/perfiles'),
        },
        {
          label: 'Mapas',
          icon: 'pi pi-map',
          command: () => navigate('/dashboard/perfiles'),
        },
        {
          label: 'Equipos',
          icon: 'pi pi-briefcase',
          command: () => navigate('/dashboard/perfiles'),
        },
      ],
    },
    {
      label: 'Gestión de Servicios',
      items: [
        {
          label: 'Servicios Arcgis Server , MXD',
          icon: 'pi pi-map',
          command: () => navigate('/dashboard/users'),
        },
        {
          label: 'Servicios WMS',
          icon: 'pi pi-globe',
          command: () => navigate('/dashboard/perfiles'),
        },
      ],
    },
    {
      label: 'Históricos',
      items: [
        {
          label: 'Usuarios',
          icon: 'pi pi-calendar-clock',
          command: () => navigate('/dashboard/users'),
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
    <aside className={` ${styles['layout-sidebar']} `}>
      <div className={styles['layout-topbar-logo']}>
        <img src={logoSedapal} alt="Logo" />
        <button
          type="button"
          className={`p-link ${styles['layout-topbar-button']} `}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className="pi pi-bars"></i>
        </button>
      </div>
      <div className={styles.layoutTopbarMenu}>
        <Menu model={items} className={styles['layout-menu']} />
      </div>
    </aside>
  )
}
