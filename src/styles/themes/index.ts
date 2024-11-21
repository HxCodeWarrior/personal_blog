import { createGradient } from './utils'

const baseTheme = {
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      secondary: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '1.875rem',
      xxxxl: '2.25rem'
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    },
    truncate: {
      single: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
      multi: (lines: number) => ({
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical'
      })
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem'
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px'
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  zIndex: {
    drawer: 1100,
    modal: 1400,
    popover: 1500,
    tooltip: 1800,
    snackbar: 1700,
    skipLink: 1600
  },
  grid: {
    columns: 12,
    gap: '24px',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  animations: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easings: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    transitions: {
      default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fade: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      scale: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      slide: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  effects: {
    glassMorphism: `
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    `,
    textGlow: `
      text-shadow: 0 0 10px rgba(37, 99, 235, 0.5),
                   0 0 20px rgba(37, 99, 235, 0.3);
    `,
    boxGlow: `
      box-shadow: 0 0 15px rgba(37, 99, 235, 0.3),
                  0 0 30px rgba(37, 99, 235, 0.2);
    `,
    innerGlow: `
      box-shadow: inset 0 0 15px rgba(37, 99, 235, 0.2);
    `
  }
}

export const lightTheme = {
  ...baseTheme,
  isDark: false,
  colors: {
    primary: {
      main: '#007AFF',
      light: '#4DA2FF',
      dark: '#0056B3',
      contrast: '#FFFFFF'
    },
    secondary: {
      main: '#00C6FF',
      light: '#4DD7FF',
      dark: '#0098CC',
      contrast: '#FFFFFF'
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      disabled: '#9E9E9E',
      inverse: '#FFFFFF',
      light: '#8F9BB3'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
      subtle: '#F8F9FA',
      inverse: '#1A1A1A',
      input: '#F7F9FC',
      inputHover: '#EDF1F7'
    },
    status: {
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#5856D6'
    },
    border: {
      light: '#E5E5EA',
      main: '#C7C7CC',
      dark: '#8E8E93'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    error: {
      main: '#FF3B30',
      light: '#FF6B64',
      dark: '#CC2F26',
      contrast: '#FFFFFF'
    }
  },
  gradients: {
    primary: createGradient('#007AFF', '#00C6FF'),
    secondary: createGradient('#7C3AED', '#A78BFA'),
    success: createGradient('#10B981', '#34D399'),
    warning: createGradient('#F59E0B', '#FBBF24'),
    error: createGradient('#EF4444', '#F87171'),
    surface: createGradient('#F8FAFC', '#F1F5F9')
  },
  effects: {
    ...baseTheme.effects,
    glassMorphism: `
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    `,
    textGlow: `
      text-shadow: 0 0 10px rgba(37, 99, 235, 0.5),
                   0 0 20px rgba(37, 99, 235, 0.3);
    `,
    boxGlow: `
      box-shadow: 0 0 15px rgba(37, 99, 235, 0.3),
                  0 0 30px rgba(37, 99, 235, 0.2);
    `,
    innerGlow: `
      box-shadow: inset 0 0 15px rgba(37, 99, 235, 0.2);
    `
  }
}

export const darkTheme = {
  ...baseTheme,
  isDark: true,
  colors: {
    primary: {
      main: '#0A84FF',
      light: '#4DA2FF',
      dark: '#0056B3',
      contrast: '#FFFFFF'
    },
    secondary: {
      main: '#00C6FF',
      light: '#4DD7FF',
      dark: '#0098CC',
      contrast: '#FFFFFF'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1A6',
      disabled: '#636366',
      inverse: '#1A1A1A',
      light: '#A6B1C2'
    },
    background: {
      default: '#000000',
      paper: '#1C1C1E',
      subtle: '#2C2C2E',
      inverse: '#FFFFFF',
      input: '#2E3A59',
      inputHover: '#3D4B6E'
    },
    status: {
      success: '#32D74B',
      warning: '#FF9F0A',
      error: '#FF453A',
      info: '#5E5CE6'
    },
    border: {
      light: '#38383A',
      main: '#48484A',
      dark: '#636366'
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    error: {
      main: '#FF453A',
      light: '#FF6B64',
      dark: '#CC2F26',
      contrast: '#FFFFFF'
    }
  },
  gradients: {
    primary: createGradient('#0A84FF', '#00C6FF'),
    secondary: createGradient('#7C3AED', '#A78BFA'),
    success: createGradient('#32D74B', '#34D399'),
    warning: createGradient('#FF9F0A', '#FBBF24'),
    error: createGradient('#FF453A', '#F87171'),
    surface: createGradient('#1C1C1E', '#2C2C2E')
  },
  effects: {
    ...baseTheme.effects,
    glassMorphism: `
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    `,
    textGlow: `
      text-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
                   0 0 20px rgba(59, 130, 246, 0.3);
    `,
    boxGlow: `
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.3),
                  0 0 30px rgba(59, 130, 246, 0.2);
    `,
    innerGlow: `
      box-shadow: inset 0 0 15px rgba(59, 130, 246, 0.2);
    `
  }
}

export type Theme = typeof lightTheme

export const getTheme = (isDark: boolean) => isDark ? darkTheme : lightTheme

// 导出默认主题和兼容性主题
export const defaultTheme = lightTheme
export const theme = lightTheme
