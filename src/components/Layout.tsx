import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center w-screen bg-blue-900 text-white min-h-screen">
      {children}
    </div>
  )
}
