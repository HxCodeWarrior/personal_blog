'use client'

import React, { useState, type PropsWithChildren, useEffect, useMemo } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider, css, DefaultTheme } from 'styled-components'
import { defaultTheme, themeUtils, type Theme } from '@/styles/theme'

// Types
interface RegistryProps extends PropsWithChildren {
  theme?: Theme
}

// 扩展主题以匹配 DefaultTheme
const extendTheme = (theme: Theme): DefaultTheme => ({
  ...theme,
  utils: {
    mediaQuery: {
      up: (breakpoint: keyof Theme['breakpoints']) => 
        `@media (min-width: ${theme.breakpoints[breakpoint]})`,
      down: (breakpoint: keyof Theme['breakpoints']) => {
        const value = parseInt(theme.breakpoints[breakpoint])
        return `@media (max-width: ${value - 0.02}px)`
      },
      between: (start: keyof Theme['breakpoints'], end: keyof Theme['breakpoints']) => {
        const minWidth = theme.breakpoints[start]
        const maxWidth = parseInt(theme.breakpoints[end]) - 0.02
        return `@media (min-width: ${minWidth}) and (max-width: ${maxWidth}px)`
      }
    },
    color: {
      alpha: (color: string, opacity: number) => 
        `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
      lighten: (color: string, amount: number) => color, // TODO: 实现颜色变亮逻辑
      darken: (color: string, amount: number) => color, // TODO: 实现颜色变暗逻辑
      getContrastText: themeUtils.getContrastText
    },
    spacing: {
      multiply: (value: keyof Theme['spacing'], multiplier: number) => 
        `${parseFloat(theme.spacing[value]) * multiplier}px`,
      add: (...values: Array<keyof Theme['spacing']>) => 
        values.map(v => theme.spacing[v]).join(' ')
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
            @media (min-width: ${theme.breakpoints[bp as keyof Theme['breakpoints']]}) {
              font-size: ${theme.typography.fontSize[size as keyof Theme['typography']['fontSize']]};
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
          .map(prop => `${prop} ${theme.animations.durations[duration]} ${theme.animations.easings[easing]}`)
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
    isDark: theme.isDark,
    isRTL: false,
    isMobile: false,
    isTouch: false
  }
})

// Global styles
const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily.primary};
    line-height: ${props => props.theme.typography.lineHeight.normal};
    color: ${props => props.theme.colors.text.primary};
    background-color: ${props => props.theme.colors.background.default};
    transition: ${props => props.theme.utils.animation.transition(
      ['color', 'background-color'],
      { duration: 'normal', easing: 'easeInOut' }
    )};
  }
`

/**
 * StyledComponentsRegistry
 */
export default function StyledComponentsRegistry({ 
  children, 
  theme = defaultTheme 
}: RegistryProps) {
  const [sheet] = useState(() => new ServerStyleSheet())
  const [mounted, setMounted] = useState(false)
  const extendedTheme = useMemo(() => extendTheme(theme), [theme])

  // Handle mounting state
  useEffect(() => {
    setMounted(true)
    return () => {
      try {
        sheet.seal()
      } catch (err) {
        console.warn('StyleSheet sealing failed:', err)
      }
    }
  }, [sheet])

  // Handle server-side styles
  useServerInsertedHTML(() => {
    try {
      const styles = sheet.getStyleElement()
      sheet.instance.clearTag()
      return <>{styles}</>
    } catch (error) {
      console.error('Failed to get style element:', error)
      return null
    }
  })

  // Prevent hydration mismatch
  if (!mounted) return null

  // Client-side rendering
  if (typeof window !== 'undefined') {
    return (
      <ThemeProvider theme={extendedTheme}>
        {children}
      </ThemeProvider>
    )
  }

  // Server-side rendering
  return (
    <StyleSheetManager sheet={sheet.instance} enableVendorPrefixes>
      <ThemeProvider theme={extendedTheme}>
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}

// Context and hooks
export const RegistryContext = React.createContext<{
  sheet: ServerStyleSheet | null
  flush: () => string
}>({
  sheet: null,
  flush: () => ''
})

export function useStyledRegistry() {
  const [sheet] = useState(() => new ServerStyleSheet())
  
  const flush = React.useCallback(() => {
    try {
      const styles = sheet.getStyleTags()
      sheet.seal()
      return styles
    } catch (error) {
      console.error('Failed to flush styles:', error)
      return ''
    }
  }, [sheet])

  useEffect(() => {
    return () => {
      try {
        sheet.seal()
      } catch (error) {
        console.error('Failed to seal sheet:', error)
      }
    }
  }, [sheet])

  return { sheet, flush }
}

// HOC
export function withStyledRegistry<T extends object>(
  Component: React.ComponentType<T>,
  options?: { theme?: Theme }
) {
  return function WithStyledRegistry(props: T) {
    const { sheet, flush } = useStyledRegistry()

    useEffect(() => {
      const cleanup = () => {
        flush()
      }
      return cleanup
    }, [flush])

    return (
      <RegistryContext.Provider value={{ sheet, flush }}>
        <StyledComponentsRegistry theme={options?.theme}>
          <Component {...props} />
        </StyledComponentsRegistry>
      </RegistryContext.Provider>
    )
  }
}

// Utility functions
export const flushServerStyles = (sheet: ServerStyleSheet): React.ReactElement[] | null => {
  try {
    const styles = sheet.getStyleElement()
    sheet.seal()
    return styles
  } catch (error) {
    console.error('Failed to flush server styles:', error)
    return null
  }
}

// Types exports
export type { RegistryProps }
export type StyledRegistryContextType = React.ContextType<typeof RegistryContext>