import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

// Dynamic imports for components below the fold
// This enables code-splitting for better initial load performance
const About = dynamic(() => import('@/components/About'), { ssr: true })
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true })
const Skills = dynamic(() => import('@/components/Skills'), { ssr: true })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true })

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      
      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>© 2024 Yasindu De Mel. Built with Next.js & Framer Motion</p>
      </footer>
    </main>
  )
}