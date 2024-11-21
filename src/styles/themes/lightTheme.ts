import { Theme } from './types'
import { createGradient } from './utils'

export const lightTheme: Theme = {
  colors: {
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1E40AF',
      contrast: '#FFFFFF'
    },
    secondary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrast: '#FFFFFF'
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8FAFC',
      subtle: '#F1F5F9',
      inverse: '#1E293B',
      input: '#F7F9FC',
      inputHover: '#EDF1F7'
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      disabled: '#94A3B8',
      inverse: '#FFFFFF',
      light: '#8F9BB3'
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#0EA5E9'
    },
    border: {
      light: '#E2E8F0',
      main: '#CBD5E1',
      dark: '#94A3B8'
    },
    error: {
      main: '#EF4444',
      light: '#FCA5A5',
      dark: '#B91C1C',
      contrast: '#FFFFFF'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: 'Georgia, "Times New Roman", serif',
      mono: 'Menlo, Monaco, Consolas, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem'
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    },
    truncate: {
      single: `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `,
      multi: `
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      `
    }
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  isDark: false,
  gradients: {
    primary: createGradient('#2563EB', '#60A5FA'),
    secondary: createGradient('#7C3AED', '#A78BFA'),
    success: createGradient('#059669', '#34D399'),
    warning: createGradient('#D97706', '#FBBF24'),
    error: createGradient('#DC2626', '#F87171'),
    surface: createGradient('#F8FAFC', '#F1F5F9')
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
      default: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      fade: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      scale: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slide: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
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
  },
  zIndex: {
    drawer: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
    snackbar: 1600,
    skipLink: 1700
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
  }
} 