import { TopHeader } from '../components/TopHeader'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import '../../../assets/styles/layout.css'

export const DashboardPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div
      className={`layout-wrapper ${
        isSidebarCollapsed ? 'layout-collapsed' : ''
      }`}
    >
      <TopHeader onCollapse={handleSidebarCollapse} />
      <Sidebar />
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  )
}
