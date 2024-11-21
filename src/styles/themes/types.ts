export interface Theme {
  colors: {
    primary: {
      main: string
      light: string
      dark: string
      contrast: string
    }
    secondary: {
      main: string
      light: string
      dark: string
      contrast: string
    }
    background: {
      default: string
      paper: string
      subtle: string
      inverse: string
      input: string
      inputHover: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
      inverse: string
      light: string
    }
    status: {
      success: string
      warning: string
      error: string
      info: string
    }
    border: {
      light: string
      main: string
      dark: string
    }
    error: {
      main: string
      light: string
      dark: string
      contrast: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  typography: {
    fontFamily: {
      primary: string
      secondary: string
      mono: string
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    fontWeight: {
      light: number
      regular: number
      medium: number
      bold: number
    }
    lineHeight: {
      tight: number
      normal: number
      relaxed: number
    }
    truncate: {
      single: string
      multi: (lines: number) => {
        display: string;
        overflow: string;
        textOverflow: string;
        WebkitLineClamp: number;
        WebkitBoxOrient: string;
      }
    }
  }
  radius: {
    sm: string
    md: string
    lg: string
    full: string
  }
  isDark: boolean
  gradients: {
    primary: string
    secondary: string
    success: string
    warning: string
    error: string
    surface: string
  }
  animations: {
    durations: {
      fast: string
      normal: string
      slow: string
    }
    easings: {
      easeInOut: string
      easeOut: string
      easeIn: string
      sharp: string
    }
    transitions: {
      default: string
      fade: string
      scale: string
      slide: string
    }
  }
  effects: {
    glassMorphism: string
    textGlow: string
    boxGlow: string
    innerGlow: string
  }
  zIndex: {
    drawer: number
    modal: number
    popover: number
    tooltip: number
    snackbar: number
    skipLink: number
  }
  grid: {
    columns: number
    gap: string
    container: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
} 