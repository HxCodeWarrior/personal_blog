// 主题钩子
import { useState, useEffect } from 'react'
import { Theme } from '@/styles/themes/types'
import { lightTheme, darkTheme } from '@/styles/themes'

export interface ThemeContextType {
  currentTheme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
}

export const useTheme = (): ThemeContextType => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)

  useEffect(() => {
    // 检查系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme')
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark
    
    setIsDarkMode(initialDarkMode)
    setCurrentTheme(initialDarkMode ? darkTheme : lightTheme)

    // 添加主题切换监听
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches)
        setCurrentTheme(e.matches ? darkTheme : lightTheme)
      }
    }
    
    mediaQuery.addEventListener('change', handleThemeChange)
    return () => mediaQuery.removeEventListener('change', handleThemeChange)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDarkMode
    setIsDarkMode(newIsDark)
    setCurrentTheme(newIsDark ? darkTheme : lightTheme)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  return {
    currentTheme,
    isDarkMode,
    toggleTheme,
  }
}