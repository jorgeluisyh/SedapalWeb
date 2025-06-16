import { Avatar } from 'primereact/avatar'
import styles from './TopHeader.module.css'
import { useRef } from 'react'
import { Menu } from 'primereact/menu'

import type { MenuItem } from 'primereact/menuitem'

export const TopHeader = () => {
  const menuRight = useRef<Menu>(null)

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

  return (
    <header className={styles['layout-topbar']}>
      <div className={styles['layout-topbar-menu']}>
        <button
          type="button"
          className={`p-link ${styles['layout-topbar-button']}`}
        >
          <i className="pi pi-calendar"></i>
        </button>
        <button
          type="button"
          className={`p-link ${styles['layout-topbar-button']}`}
        >
          <i className="pi pi-user"></i>
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
