import { PrimeReactContext } from 'primereact/api'
import { useContext, useEffect, useState } from 'react'

type Theme = 'lara-dark-blue' | 'lara-light-blue'

const themeOptions: Theme[] = ['lara-dark-blue', 'lara-light-blue']

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  return savedTheme && themeOptions.includes(savedTheme)
    ? savedTheme
    : 'lara-light-blue'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme())

  const { changeTheme } = useContext(PrimeReactContext)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme: Theme =
      theme === 'lara-dark-blue' ? 'lara-light-blue' : 'lara-dark-blue'
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)

    changeTheme!(theme, newTheme, 'theme-link', () => {
      console.log(`Theme changed to ${newTheme}`)
    })

    setTheme(newTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}
