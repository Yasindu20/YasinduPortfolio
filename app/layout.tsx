import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yasindu De Mel - Full Stack Developer',
  description: 'Portfolio of Yasindu Dasanga De Mel - Full Stack Developer specializing in React, React Native, and Node.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}