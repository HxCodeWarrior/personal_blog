'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme, getInitialTheme, getTheme, themeUtils, type Theme, type ThemeMode } from '@/styles/theme'

// Context types
interface ThemeContextValue {
  theme: Theme
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
  isDark: boolean
  isDarkMode: boolean
  systemTheme: ThemeMode
  isSystemTheme: boolean
  setIsSystemTheme: (value: boolean) => void
  resetTheme: () => void
  applyTheme: (theme: Partial<Theme>) => void
  isLoading: boolean
}

// Create context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// Props type
interface ThemeProviderProps {
  children: React.ReactNode
  defaultMode?: ThemeMode
  storageKey?: string
  enableSystem?: boolean
  enableTransitions?: boolean
  disableTransitionsOnChange?: boolean
}

// Constants
const MEDIA = '(prefers-color-scheme: dark)'
const TRANSITION_DURATION = 200

/**
 * Custom Theme Provider Component
 */
export function ThemeProvider({
  children,
  defaultMode = 'light',
  storageKey = 'theme-mode',
  enableSystem = true,
  enableTransitions = true,
  disableTransitionsOnChange = false
}: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => getInitialTheme())
  const [isSystemTheme, setIsSystemTheme] = useState<boolean>(() => {
    if (typeof window === 'undefined') return enableSystem
    return enableSystem && !localStorage.getItem(storageKey)
  })
  const [systemTheme, setSystemTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode
    return window.matchMedia(MEDIA).matches ? 'dark' : 'light'
  })
  const [isLoading, setIsLoading] = useState(true)
  
  // Refs for transition handling
  const transitionRef = useRef<number>()
  const removeTransitionsRef = useRef<number>()

  // 添加自定义主题状态
  const [customTheme, setCustomTheme] = useState<Partial<Theme>>({})

  // Handle system theme changes
  useEffect(() => {
    if (!enableSystem) return

    const mediaQuery = window.matchMedia(MEDIA)
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme: ThemeMode = e.matches ? 'dark' : 'light'
      setSystemTheme(newTheme)
      if (isSystemTheme) {
        handleThemeChange(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [enableSystem, isSystemTheme])

  // Handle theme transitions
  const handleThemeChange = useCallback((newTheme: ThemeMode) => {
    if (disableTransitionsOnChange && enableTransitions) {
      document.documentElement.classList.add('disable-transitions')
      removeTransitionsRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove('disable-transitions')
      }, TRANSITION_DURATION)
    }

    if (enableTransitions) {
      document.documentElement.classList.add('theme-transition')
      transitionRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, TRANSITION_DURATION)
    }

    setThemeModeState(newTheme)
  }, [enableTransitions, disableTransitionsOnChange])

  // Cleanup transitions
  useEffect(() => {
    return () => {
      if (transitionRef.current) clearTimeout(transitionRef.current)
      if (removeTransitionsRef.current) clearTimeout(removeTransitionsRef.current)
    }
  }, [])

  // Theme mode setter with storage
  const setThemeMode = useCallback((mode: ThemeMode) => {
    if (themeUtils.isThemeMode(mode)) {
      handleThemeChange(mode)
      setIsSystemTheme(false)
      localStorage.setItem(storageKey, mode)
    }
  }, [storageKey, handleThemeChange])

  // Toggle theme mode
  const toggleTheme = useCallback(() => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }, [themeMode, setThemeMode])

  // Reset theme to default
  const resetTheme = useCallback(() => {
    setThemeMode(defaultMode)
    if (enableSystem) {
      setIsSystemTheme(true)
      localStorage.removeItem(storageKey)
    }
  }, [defaultMode, enableSystem, setThemeMode, storageKey])

  // Apply custom theme
  const applyTheme = useCallback((newCustomTheme: Partial<Theme>) => {
    setCustomTheme(prev => ({
      ...prev,
      ...newCustomTheme
    }))
  }, [])

  // Set system theme preference
  const handleSetIsSystemTheme = useCallback((value: boolean) => {
    setIsSystemTheme(value)
    if (value) {
      localStorage.removeItem(storageKey)
      handleThemeChange(systemTheme)
    } else {
      setThemeMode(themeMode)
    }
  }, [storageKey, systemTheme, themeMode, setThemeMode, handleThemeChange])

  // Current theme object
  const currentTheme = useMemo(() => {
    const mode = isSystemTheme ? systemTheme : themeMode
    const baseTheme = getTheme(mode)
    // 合并基础主题和自定义主题
    return {
      ...baseTheme,
      ...customTheme
    }
  }, [isSystemTheme, systemTheme, themeMode, customTheme])

  // Extended theme with utils
  const extendedTheme = useMemo(() => ({
    ...currentTheme,
    utils: {
      mediaQuery: {
        up: (breakpoint: keyof Theme['breakpoints']) => 
          `@media (min-width: ${currentTheme.breakpoints[breakpoint]})`,
        down: (breakpoint: keyof Theme['breakpoints']) => {
          const value = parseInt(currentTheme.breakpoints[breakpoint])
          return `@media (max-width: ${value - 0.02}px)`
        },
        between: (start: keyof Theme['breakpoints'], end: keyof Theme['breakpoints']) => {
          const minWidth = currentTheme.breakpoints[start]
          const maxWidth = parseInt(currentTheme.breakpoints[end]) - 0.02
          return `@media (min-width: ${minWidth}) and (max-width: ${maxWidth}px)`
        }
      },
      color: {
        alpha: (color: string, opacity: number) => 
          `${color}${Math.round(opacity * 255).toString(16)}`,
        lighten: (color: string, amount: number) => color,
        darken: (color: string, amount: number) => color,
        getContrastText: themeUtils.getContrastText
      },
      spacing: {
        multiply: (value: keyof Theme['spacing'], multiplier: number) => 
          `${parseFloat(currentTheme.spacing[value]) * multiplier}px`,
        add: (...values: Array<keyof Theme['spacing']>) => 
          values.map(v => currentTheme.spacing[v]).join(' ')
      },
      typography: {
        truncate: {
          single: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
          multi: (lines: number) => 
            `display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: ${lines}; -webkit-box-orient: vertical;`
        },
        responsive: (sizes: Partial<Record<keyof Theme['breakpoints'], keyof Theme['typography']['fontSize']>>) => 
          Object.entries(sizes)
            .map(([bp, size]) => `
              @media (min-width: ${currentTheme.breakpoints[bp as keyof Theme['breakpoints']]}) {
                font-size: ${currentTheme.typography.fontSize[size as keyof Theme['typography']['fontSize']]};
              }
            `)
            .join('\n')
      },
      animation: {
        transition: (properties: string[], options?: {
          duration?: keyof Theme['animations']['durations']
          easing?: keyof Theme['animations']['easings']
        }) => {
          const duration = options?.duration || 'normal'
          const easing = options?.easing || 'easeInOut'
          return properties
            .map(prop => `${prop} ${currentTheme.animations.durations[duration]} ${currentTheme.animations.easings[easing]}`)
            .join(', ')
        },
        keyframes: (frames: Record<string | number, string>) => {
          const keyframeRules = Object.entries(frames)
            .map(([key, value]) => `${key} { ${value} }`)
            .join('\n')
          return `@keyframes animation { ${keyframeRules} }`
        }
      }
    },
    responsive: {
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
      isXxl: false
    },
    state: {
      isDark: currentTheme.isDark,
      isRTL: false,
      isMobile: typeof window !== 'undefined' && window.innerWidth <= 768,
      isTouch: typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
  }), [currentTheme])

  // Context value
  const contextValue = useMemo(() => ({
    theme: currentTheme,
    themeMode,
    setThemeMode,
    toggleTheme,
    isDark: currentTheme.isDark,
    isDarkMode: currentTheme.isDark,
    systemTheme,
    isSystemTheme,
    setIsSystemTheme: handleSetIsSystemTheme,
    resetTheme,
    applyTheme,
    isLoading
  }), [
    currentTheme,
    themeMode,
    setThemeMode,
    toggleTheme,
    systemTheme,
    isSystemTheme,
    handleSetIsSystemTheme,
    resetTheme,
    applyTheme,
    isLoading
  ])

  // Initialize theme
  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={extendedTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

/**
 * Custom hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * HOC to wrap components with theme context
 */
export function withTheme<T extends object>(Component: React.ComponentType<T>) {
  return function WithThemeComponent(props: T) {
    return (
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    )
  }
}

// Custom hooks for specific theme features
export function useThemeMode() {
  const { themeMode, setThemeMode, toggleTheme } = useTheme()
  return { themeMode, setThemeMode, toggleTheme }
}

export function useSystemTheme() {
  const { systemTheme, isSystemTheme, setIsSystemTheme } = useTheme()
  return { systemTheme, isSystemTheme, setIsSystemTheme }
}

export function useIsDark() {
  const { isDark } = useTheme()
  return isDark
}

// Types exports
export type { ThemeContextValue, ThemeProviderProps }
export default ThemeContext
