'use client'

import { Navigation } from '@/components/Navigation'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const Main = styled.main`
  min-height: 100vh;
  padding-top: 64px; // Height of the Navigation bar
`

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Navigation />
      <Main>{children}</Main>
    </>
  )
} 