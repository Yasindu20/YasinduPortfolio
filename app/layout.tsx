import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Optimize font loading by adding display swap
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'Yasindu De Mel - Full Stack Developer',
  description: 'Portfolio of Yasindu Dasanga De Mel - Full Stack Developer specializing in React, React Native, and Node.js',
  viewport: 'width=device-width, initial-scale=1',
  // Add additional metadata for better SEO and performance
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  // Add caching headers
  other: {
    'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate=31536000'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to essential domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Add preload for critical resources */}
        <link 
          rel="preload" 
          href="/fitness-warrior.jpg" 
          as="image" 
          type="image/jpeg"
        />
      </head>
      <body 
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}