import 'styled-components'
import { Theme } from './themes/types'

// 扩展 styled-components 的默认主题
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    // 扩展主题工具方法
    utils: {
      // 媒体查询工具
      mediaQuery: {
        up: (breakpoint: keyof Theme['breakpoints']) => string
        down: (breakpoint: keyof Theme['breakpoints']) => string
        between: (start: keyof Theme['breakpoints'], end: keyof Theme['breakpoints']) => string
      }
      
      // 颜色工具
      color: {
        alpha: (color: string, opacity: number) => string
        lighten: (color: string, amount: number) => string
        darken: (color: string, amount: number) => string
        getContrastText: (background: string) => string
      }
      
      // 间距工具
      spacing: {
        multiply: (value: keyof Theme['spacing'], multiplier: number) => string
        add: (...values: Array<keyof Theme['spacing']>) => string
      }
      
      // 排版工具
      typography: {
        truncate: {
          single: string
          multi: (lines: number) => string
        }
        responsive: (
          sizes: Partial<Record<keyof Theme['breakpoints'], keyof Theme['typography']['fontSize']>>
        ) => string
      }
      
      // 动画工具
      animation: {
        transition: (properties: string[], options?: {
          duration?: keyof Theme['animations']['durations']
          easing?: keyof Theme['animations']['easings']
        }) => string
        keyframes: (frames: Record<string | number, string>) => string
      }
    }
    
    // 扩展响应式助手
    responsive: {
      isXs: boolean
      isSm: boolean
      isMd: boolean
      isLg: boolean
      isXl: boolean
      isXxl: boolean
    }
    
    // 扩展主题状态
    state: {
      isDark: boolean
      isRTL: boolean
      isMobile: boolean
      isTouch: boolean
    }
  }

  // 扩展样式属性类型
  export interface ThemeProps<T extends DefaultTheme> {
    theme: T
  }

  // 扩展 CSS 属性类型
  export interface CSSProp {
    theme?: DefaultTheme
  }
}

// 扩展全局类型
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: any
    }
  }
}

// 导出工具类型
export type ThemeColors = Theme['colors']
export type ThemeBreakpoints = Theme['breakpoints']
export type ThemeSpacing = Theme['spacing']
export type ThemeTypography = Theme['typography']
export type ThemeAnimations = Theme['animations']
export type ThemeEffects = Theme['effects']

// 导出辅助类型
export type ResponsiveValue<T> = T | Partial<Record<keyof Theme['breakpoints'], T>>
export type ColorValue = keyof ThemeColors | string
export type SpacingValue = keyof ThemeSpacing | number | string
export type BreakpointValue = keyof ThemeBreakpoints

// 导出工具类型
export type WithTheme<P = {}> = P & { theme: DefaultTheme }
export type StyledProps<P = {}> = P & ThemeProps<DefaultTheme> 