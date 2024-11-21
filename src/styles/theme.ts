import { Theme } from './themes/types'
import { lightTheme } from './themes/lightTheme'
import { darkTheme } from './themes/darkTheme'
import { 
  createGradient, 
  createShadow, 
  createMediaQuery, 
  truncate,
  createColorVariant 
} from './themes/utils'

// Theme types
export type { Theme }
export type ThemeMode = 'light' | 'dark'
export type ThemeColors = Theme['colors']

// Theme utilities
export const themeUtils = {
  createGradient,
  createShadow,
  createMediaQuery,
  truncate,
  createColorVariant,
  
  // New color utilities
  getContrastText: (background: string) => {
    // Add logic to determine contrasting text color
    return background.startsWith('#') && 
           background.length === 7 && 
           parseInt(background.slice(1), 16) > 0xffffff / 2 
           ? '#000000' 
           : '#ffffff'
  },
  
  // New theme helper
  isThemeMode: (mode: unknown): mode is ThemeMode => {
    return mode === 'light' || mode === 'dark'
  },

  // New responsive helpers  
  mediaQuery: {
    up: (breakpoint: keyof Theme['breakpoints']) => 
      createMediaQuery(lightTheme.breakpoints[breakpoint]),
    down: (breakpoint: keyof Theme['breakpoints']) => {
      const breakpointValue = parseInt(lightTheme.breakpoints[breakpoint])
      return `@media (max-width: ${breakpointValue - 0.02}px)`
    }
  }
}

// Theme exports
export const defaultTheme = lightTheme
export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const

// Theme helpers
export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme
}

export const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  
  const savedTheme = window.localStorage.getItem('theme-mode') as ThemeMode
  if (themeUtils.isThemeMode(savedTheme)) return savedTheme

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

// CSS-in-JS helper
export const createThemedStyles = <T extends (theme: Theme) => any>(
  stylesFn: T
): T => stylesFn

// Default export
export default {
  defaultTheme,
  themes,
  getTheme,
  getInitialTheme,
  utils: themeUtils,
  createThemedStyles
} 