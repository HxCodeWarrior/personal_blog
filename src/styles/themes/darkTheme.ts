import { Theme } from './types'
import { lightTheme } from './lightTheme'

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#2563EB',
      contrast: '#000000'
    },
    secondary: {
      main: '#A78BFA',
      light: '#C4B5FD',
      dark: '#7C3AED',
      contrast: '#000000'
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
      subtle: '#334155',
      inverse: '#FFFFFF',
      input: '#2E3A59',
      inputHover: '#3D4B6E'
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      disabled: '#64748B',
      inverse: '#0F172A',
      light: '#A6B1C2'
    },
    status: {
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      info: '#38BDF8'
    },
    border: {
      light: '#334155',
      main: '#475569',
      dark: '#64748B'
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#B91C1C',
      contrast: '#FFFFFF'
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.5)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.6)'
  },
  isDark: true
} 