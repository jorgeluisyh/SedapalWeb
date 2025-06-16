import styles from './DashboardPage.module.css'
import { TopHeader } from '../components/TopHeader'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export const DashboardPage = () => {
  return (
    <div
      className={styles['layout-wrapper']}
      id="dashboard"
      data-sidebar-collapsed="false"
    >
      <TopHeader />
      <Sidebar />
      <main className={styles['layout-main']}>
        <Outlet />
      </main>
    </div>
  )
}
