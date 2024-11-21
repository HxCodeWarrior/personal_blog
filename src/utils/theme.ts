import { Theme } from '@/styles/themes/types'
import { darkTheme, lightTheme } from '@/styles/themes'

export const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const getThemeByName = (themeName: string): Theme => {
  switch (themeName) {
    case 'dark':
      return darkTheme
    case 'light':
      return lightTheme
    default:
      return lightTheme
  }
}

export const saveThemePreference = (theme: 'dark' | 'light') => {
  localStorage.setItem('theme-preference', theme)
}

export const getSavedTheme = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('theme-preference')
} 