import './globals.css'
import type { ReactNode } from 'react'
import NavBar from '@/app/components/navBar'
import AuthProvider from '@/app/components/authProvider'

export default function RootLayout ({
  children
}: {
    children: ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <AuthProvider>
          {/* @ts-ignore */}
          <NavBar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
