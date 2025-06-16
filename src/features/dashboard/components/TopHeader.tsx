import { Avatar } from 'primereact/avatar'
import styles from './TopHeader.module.css'
import { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { useTheme } from '../../../shared/hooks/useTheme'

import type { MenuItem } from 'primereact/menuitem'

interface TopHeaderProps {
  onCollapse: () => void
}

export const TopHeader = ({ onCollapse }: TopHeaderProps) => {
  const menuRight = useRef<Menu>(null)
  const { toggleTheme, theme } = useTheme()

  const items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Export',
          icon: 'pi pi-upload',
        },
      ],
    },
  ]

  const handleChangeTheme = () => {
    toggleTheme()
  }

  return (
    <header className="layout-topbar">
      <div className={styles['layout-topbar-toggle']}>
        <button
          type="button"
          className={`p-link ${styles['layout-topbar-button']} `}
          onClick={onCollapse}
        >
          <i className="pi pi-bars"></i>
        </button>
      </div>

      <div className={styles['layout-topbar-menu']}>
        <button
          type="button"
          className={`p-link ${styles['layout-topbar-button']}`}
          onClick={() => handleChangeTheme()}
        >
          <i
            className={`pi ${
              theme === 'lara-dark-blue' ? 'pi-moon' : 'pi-sun'
            }`}
          ></i>
        </button>
        <button
          onClick={(event) => menuRight?.current?.toggle(event)}
          className="p-link"
          aria-controls="popup_menu_left"
          aria-haspopup
        >
          <Avatar
            image="https://avatars.githubusercontent.com/u/66085756?v=4"
            size="large"
            shape="circle"
          />
        </button>
      </div>
      <Menu
        model={items}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </header>
  )
}
