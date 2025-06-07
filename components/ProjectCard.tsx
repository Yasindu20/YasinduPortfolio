'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, ImageIcon, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  features: string[]
  githubUrl: string
  onOpenGallery: (id: number) => void
}

export default function ProjectCard({
  id,
  title,
  description,
  tech,
  image,
  features,
  githubUrl,
  onOpenGallery
}: ProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left // x position within the element
    const y = e.clientY - rect.top // y position within the element
    
    // Calculate percentages for the tilting effect
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const percentX = (x - centerX) / centerX * 15 // max tilt of 15 degrees
    const percentY = (centerY - y) / centerY * 10 // max tilt of 10 degrees
    
    setMousePosition({ x: percentX, y: percentY })
  }
  
  const handleMouseLeave = () => {
    // Reset tilt effect
    setMousePosition({ x: 0, y: 0 })
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative glass rounded-xl overflow-hidden h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <motion.div
        animate={{
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Project Image */}
        <div 
          className="relative h-52 overflow-hidden cursor-pointer" 
          onClick={() => onOpenGallery(id)}
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          
          {/* View Gallery Overlay Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md"
            >
              <ImageIcon size={18} />
              <span>View Gallery</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6" style={{ transform: 'translateZ(10px)' }}>
          <h3 className="text-2xl font-bold mb-2 gradient-text">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 text-sm glass rounded-full"
              >
                {item}
              </motion.span>
            ))}
          </div>

          {/* Features */}
          <ul className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-1">
            {features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-purple-400 mr-2">▸</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex justify-between gap-2 mt-auto">
            <motion.button
              onClick={() => onOpenGallery(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm transition-colors"
            >
              <ImageIcon size={16} /> Gallery
            </motion.button>
            
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors neon-glow"
            >
              <Github size={16} /> Source
            </motion.a>
          </div>
        </div>
        
        {/* Floating light effect */}
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"
          style={{ 
            transform: `translate3d(${mousePosition.x * -2}px, ${mousePosition.y * -2}px, 0px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
      </motion.div>
    </motion.div>
  )
}