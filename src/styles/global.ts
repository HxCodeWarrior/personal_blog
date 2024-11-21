'use client'

import { createGlobalStyle, css, DefaultTheme } from 'styled-components'
import { Theme } from './themes/types'

// 基础变量类型
type ThemeProps = { theme: DefaultTheme }

// 基础变量
const BASE_FONT_SIZE = '16px'
const BASE_LINE_HEIGHT = 1.5
const BASE_FONT_FAMILY = ({ theme }: ThemeProps) => theme.typography.fontFamily.primary

// 动画变量
const TRANSITION_BASE = ({ theme }: ThemeProps) => theme.utils.animation.transition(
  ['all'],
  { duration: 'normal', easing: 'easeInOut' }
)

// 基础重置样式
const resetStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: ${BASE_FONT_SIZE};
    line-height: ${BASE_LINE_HEIGHT};
    text-size-adjust: 100%;
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
    height: 100%;
  }

  body {
    font-family: ${BASE_FONT_FAMILY};
    background: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
    transition: ${TRANSITION_BASE};
    min-height: 100%;
    position: relative;
    overflow-x: hidden;
  }

  // 优化默认标签样式
  main {
    display: block;
    position: relative;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: ${({ theme }) => theme.utils.animation.transition(['color'])};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.radius.sm};
    }
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: ${BASE_LINE_HEIGHT};
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
  }

  button {
    cursor: pointer;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }
`

// 主题相关样式
const themeStyles = css`
  ::selection {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
  }

  // 滚动条样式
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.subtle};
    border-radius: ${({ theme }) => theme.radius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.main};
    border-radius: ${({ theme }) => theme.radius.full};
    border: 2px solid ${({ theme }) => theme.colors.background.subtle};
    transition: ${TRANSITION_BASE};

    &:hover {
      background: ${({ theme }) => theme.colors.border.dark};
    }
  }

  // 响应式排版
  ${({ theme }) => css`
    @media ${theme.utils.mediaQuery.down('sm')} {
      html { font-size: 14px; }
    }
    @media ${theme.utils.mediaQuery.down('xs')} {
      html { font-size: 12px; }
    }
  `}

  // 暗色模式适配
  @media (prefers-color-scheme: dark) {
    html[data-theme="system"] {
      color-scheme: dark;
    }
  }
`

// 可访问性样式
const a11yStyles = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radius.md};
    z-index: ${({ theme }) => theme.zIndex.skipLink};
    transition: ${TRANSITION_BASE};

    &:focus {
      top: ${({ theme }) => theme.spacing.sm};
    }
  }
`

// 工具类
const utilityStyles = css`
  .container {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.md};
    
    ${({ theme }) => Object.entries(theme.grid.container).map(([breakpoint, width]) => css`
      @media ${theme.utils.mediaQuery.up(breakpoint as keyof typeof theme.breakpoints)} {
        max-width: ${width};
      }
    `)}
  }

  .text-truncate {
    ${({ theme }) => theme.utils.typography.truncate.single};
  }

  .text-truncate-multi {
    ${({ theme }) => theme.utils.typography.truncate.multi(2)};
  }

  .text-break {
    word-break: break-word;
    hyphens: auto;
  }

  .glass-effect {
    ${({ theme }) => theme.effects.glassMorphism};
  }

  .text-glow {
    ${({ theme }) => theme.effects.textGlow};
  }

  .box-glow {
    ${({ theme }) => theme.effects.boxGlow};
  }
`

// 打印样式
const printStyles = css`
  @media print {
    body {
      background: none;
      color: #000;
    }

    a {
      text-decoration: underline;
    }

    @page {
      margin: 2cm;
    }

    .no-print {
      display: none !important;
    }
  }
`

// 创建全局样式
export const GlobalStyles = createGlobalStyle`
  ${resetStyles}
  ${themeStyles}
  ${a11yStyles}
  ${utilityStyles}
  ${printStyles}
`

export default GlobalStyles 