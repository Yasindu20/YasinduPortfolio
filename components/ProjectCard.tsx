'use client'

import React, { useState, useRef, useCallback, memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, ImageIcon } from 'lucide-react'

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

// Using memo to prevent unnecessary re-renders
const ProjectCard = memo(function ProjectCard({
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
  
  // Using useCallback to memoize event handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const percentX = (x - centerX) / centerX * 15
    const percentY = (centerY - y) / centerY * 10
    
    // Only update state if there's a significant change to reduce renders
    setMousePosition(prev => {
      if (Math.abs(prev.x - percentX) > 0.5 || Math.abs(prev.y - percentY) > 0.5) {
        return { x: percentX, y: percentY }
      }
      return prev
    })
  }, [])
  
  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 })
  }, [])
  
  // Using useCallback for the gallery click handler
  const handleGalleryClick = useCallback(() => {
    onOpenGallery(id)
  }, [id, onOpenGallery])
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Add margin for earlier loading
      className="relative glass rounded-xl overflow-hidden h-full will-change-transform" // Added will-change hint
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
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30,
          restDelta: 0.001 // Improve animation performance
        }}
        className="h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Project Image - optimized */}
        <div 
          className="relative h-52 overflow-hidden cursor-pointer" 
          onClick={handleGalleryClick}
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Responsive sizes
            loading="lazy" // Lazy load images
            quality={80} // Slightly reduced quality for better performance
            className="object-cover transition-transform duration-500 hover:scale-110"
            placeholder="blur" // Add blur placeholder
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzEzMTMxIi8+PC9zdmc+" // Simple gray placeholder
          />
          
          {/* View Gallery Overlay Button - conditionally rendered to improve performance */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }} // Faster transition
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }} // Faster transition
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

          {/* Tech Stack - optimized rendering */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item) => (
              <motion.span
                key={item}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }} // Faster transition
                className="px-3 py-1 text-sm glass rounded-full"
              >
                {item}
              </motion.span>
            ))}
          </div>

          {/* Features - only render first 2 for performance */}
          <ul className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-1">
            {features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-purple-400 mr-2">▸</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Action Buttons - optimized with faster transitions */}
          <div className="flex justify-between gap-2 mt-auto">
            <motion.button
              onClick={handleGalleryClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }} // Faster transition
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
              transition={{ duration: 0.2 }} // Faster transition
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors neon-glow"
            >
              <Github size={16} /> Source
            </motion.a>
          </div>
        </div>
        
        {/* Floating light effect - optimized with CSS variables for better performance */}
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"
          style={{ 
            transform: `translate3d(${mousePosition.x * -2}px, ${mousePosition.y * -2}px, 0px)`,
            transition: 'transform 0.2s ease-out',
            willChange: 'transform' // Add will-change hint for this animated element
          }}
        />
      </motion.div>
    </motion.div>
  )
})

// Add display name for debugging purposes
ProjectCard.displayName = 'ProjectCard'

export default ProjectCard