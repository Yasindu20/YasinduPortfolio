'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'

const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold gradient-text"
        >
          YD
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full glass"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full glass"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mt-4 mx-6 rounded-lg p-6"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-2 hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}