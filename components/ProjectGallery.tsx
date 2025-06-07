'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useAnimation, useMotionValue } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ExternalLink, Download, Maximize2 } from 'lucide-react'
import ProjectCarousel3D from './ProjectCarousel3D'

interface ProjectGalleryProps {
  images: string[]
  title: string
  isOpen: boolean
  onClose: () => void
}

export default function ProjectGallery({ images, title, isOpen, onClose }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [viewMode, setViewMode] = useState<'standard' | '3d'>('standard')
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)
  const controls = useAnimation()
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])
  
  // Reset zoom state when changing images
  useEffect(() => {
    setIsZoomed(false)
  }, [currentIndex])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleZoom = () => {
    setIsZoomed(!isZoomed)
  }
  
  // Handle swipe gestures
  const handleDragEnd = (e: any, { offset }: any) => {
    if (offset.x < -100) {
      handleNext()
    } else if (offset.x > 100) {
      handlePrev()
    } else {
      controls.start({ x: 0 })
    }
  }

  // Variants for the slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    })
  }

  // Overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  // Gallery container animation
  const galleryVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 400, 
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.3 }
    }
  }

  // Thumbnails bar animations
  const thumbnailsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        staggerChildren: 0.05,
      }
    }
  }

  const thumbnailVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400, 
        damping: 30
      }
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Gallery container */}
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            variants={galleryVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-6xl max-h-[90vh] glass rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 glass backdrop-blur-md">
                <h3 className="text-xl font-bold gradient-text">{title}</h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 glass rounded-full hover:bg-white/20 ${viewMode === '3d' ? 'bg-purple-500/30' : ''}`}
                    onClick={() => setViewMode(viewMode === 'standard' ? '3d' : 'standard')}
                  >
                    <Maximize2 size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 glass rounded-full hover:bg-white/20"
                    onClick={handleZoom}
                  >
                    <ZoomIn size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 glass rounded-full hover:bg-white/20"
                    onClick={onClose}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Main image display */}
              <div 
                className="w-full h-[70vh] relative overflow-hidden" 
                ref={constraintsRef}
              >
                {viewMode === 'standard' ? (
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag={isZoomed ? "x" : false}
                      dragConstraints={constraintsRef}
                      dragElastic={0.1}
                      onDragEnd={handleDragEnd}
                      className={`absolute inset-0 flex items-center justify-center ${isZoomed ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    >
                      <div className={`relative ${isZoomed ? 'w-[150%] h-[150%]' : 'w-full h-full'}`}>
                        <Image
                          src={images[currentIndex]}
                          alt={`${title} - Image ${currentIndex + 1}`}
                          fill
                          className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                          quality={90}
                          priority
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <ProjectCarousel3D 
                    images={images}
                    title={title}
                    autoPlay={false}
                  />
                )}

                {/* Navigation arrows - only show in standard view */}
                {viewMode === 'standard' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-white/20 z-20"
                      onClick={handlePrev}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-white/20 z-20"
                      onClick={handleNext}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <motion.div 
                className="p-4 flex justify-center gap-2 overflow-x-auto"
                variants={thumbnailsVariants}
                initial="hidden"
                animate="visible"
              >
                {images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    variants={thumbnailVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer
                              ${idx === currentIndex ? 'border-purple-500 neon-glow' : 'border-transparent'}`}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Image counter */}
              <div className="absolute bottom-20 right-4 px-3 py-1 glass rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}