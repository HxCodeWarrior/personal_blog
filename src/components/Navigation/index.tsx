'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationRoutes } from '../../routes/NavigationRoutes'
import { FaUser, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '@/contexts/ThemeContext'

// Styled Components
const NavContainer = styled.nav<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  background: ${({ $isScrolled, theme }) => 
    $isScrolled ? theme.colors.background.paper : 'transparent'};
  transition: ${({ theme }) => theme.utils.animation.transition(
    ['background-color', 'box-shadow', 'backdrop-filter'],
    { duration: 'normal', easing: 'easeInOut' }
  )};
  backdrop-filter: ${({ $isScrolled }) => 
    $isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ $isScrolled, theme }) => 
    $isScrolled ? theme.shadows.sm : 'none'};
`

const NavInner = styled.div`
  max-width: ${({ theme }) => theme.grid.container.xl};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`

const Logo = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  transition: ${({ theme }) => theme.utils.animation.transition(['transform'])};

  &:hover {
    transform: scale(1.05);
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media ${({ theme }) => theme.utils.mediaQuery.down('md')} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary.main : theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: ${({ theme }) => theme.utils.animation.transition(
    ['color', 'transform', 'background-color']
  )};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary.main};
    transition: ${({ theme }) => theme.utils.animation.transition(['width'])};
    transform: translateX(-50%);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    
    &:after {
      width: 100%;
    }
  }

  @media ${({ theme }) => theme.utils.mediaQuery.down('sm')} {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  transition: ${({ theme }) => theme.utils.animation.transition(
    ['background-color', 'transform', 'color']
  )};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.background.subtle};
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }

  @media ${({ theme }) => theme.utils.mediaQuery.down('sm')} {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`

const ThemeToggle = styled(IconButton)`
  // 继承 IconButton 的样式
`

const UserIcon = styled(IconButton)`
  // 继承 IconButton 的样式
`

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { isDark, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20)
      }

      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    console.log('Theme changed:', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked, current theme:', isDark ? 'dark' : 'light')
    toggleTheme()
  }

  const handleUserClick = () => {
    console.log('User icon clicked')
  }

  const handleNavClick = (path: string) => {
    console.log('Navigating to:', path)
  }

  if (!mounted) {
    return null
  }

  return (
    <NavContainer $isScrolled={isScrolled}>
      <NavInner>
        <Logo href="/">LineWurm</Logo>
        <NavLinks>
          {navigationRoutes.map((route) => (
            <NavLink 
              key={route.path} 
              href={route.path}
              $isActive={pathname === route.path || 
                (pathname?.startsWith(route.path) && route.path !== '/')}
              onClick={() => handleNavClick(route.path)}
              passHref
            >
              {route.icon} {route.label}
            </NavLink>
          ))}
          <ThemeToggle 
            onClick={handleThemeToggle}
            aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </ThemeToggle>
          <UserIcon 
            onClick={handleUserClick}
            aria-label="用户菜单"
          >
            <FaUser size={20} />
          </UserIcon>
        </NavLinks>
      </NavInner>
    </NavContainer>
  )
}

export default Navigation 