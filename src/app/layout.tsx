import { Metadata } from 'next'
import { Suspense } from 'react'
import StyledComponentsRegistry from '@/lib/registry'
import ClientLayout from './components/ClientLayout'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal Blog',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Suspense fallback={null}>
          <StyledComponentsRegistry>
            <ThemeProvider
              enableSystem
              enableTransitions
              disableTransitionsOnChange={false}
            >
              <ClientLayout>
                {children}
              </ClientLayout>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function generateStaticParams() {
  return []
}
