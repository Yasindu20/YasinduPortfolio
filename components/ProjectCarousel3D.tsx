'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectCarousel3DProps {
  images: string[]
  title: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function ProjectCarousel3D({ 
  images, 
  title, 
  autoPlay = true, 
  autoPlayInterval = 3000 
}: ProjectCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  
  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || paused || images.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoPlayInterval)
    
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images.length, paused])
  
  const handleNext = () => {
    setPaused(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }
  
  const handlePrev = () => {
    setPaused(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
      
      {/* Left and right positions */}
      <div className="absolute inset-0 flex justify-between items-center z-20">
        {/* Previous images (left side) */}
        <div className="relative w-1/5 h-full flex items-center justify-center overflow-hidden perspective-effect">
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 45 }}
              animate={{ opacity: 0.5, x: 0, rotateY: 45 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full h-3/4 filter blur-[1px]"
            >
              <Image
                src={images[(currentIndex - 1 + images.length) % images.length]}
                alt={`Previous ${title}`}
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          )}
        </div>
        
        {/* Next images (right side) */}
        <div className="relative w-1/5 h-full flex items-center justify-center overflow-hidden perspective-effect">
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -45 }}
              animate={{ opacity: 0.5, x: 0, rotateY: -45 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full h-3/4 filter blur-[1px]"
            >
              <Image
                src={images[(currentIndex + 1) % images.length]}
                alt={`Next ${title}`}
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Main center image */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="p-2 glass rounded-full hover:bg-white/20"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="p-2 glass rounded-full hover:bg-white/20"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
      
      {/* Progress indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-30">
        {images.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setPaused(true)
              setCurrentIndex(idx)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex 
                ? 'bg-purple-500 w-6 neon-glow' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}