'use client'

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowRight, Sparkles, Code, Zap } from 'lucide-react'
import { personalInfo } from '@/lib/data'

// Using type definitions for better performance and type safety
interface ParticleProps {
  delay?: number
  size?: number
  color?: string
  speed?: number
}

interface FloatingCardProps {
  children: React.ReactNode
  delay?: number
  intensity?: number
}

interface AnimatedTextCharacterProps {
  text: string
  className?: string
  delay?: number
}

interface SparkleProps {
  size: number
  color: string
  style: React.CSSProperties
}

interface GradientButtonProps {
  children: React.ReactNode
  href: string
  download?: boolean
  primary?: boolean
}

interface AnimatedSocialIconProps {
  Icon: React.ComponentType<any>
  href: string
  delay?: number
}

// Optimized Particle component
const Particle = ({ delay = 0, size = 4, color = 'rgba(139, 92, 246, 0.5)', speed = 20 }: ParticleProps) => {
  // Use static initial values to avoid hydration mismatch
  const x = useMotionValue(50)
  const y = useMotionValue(50)
  
  const springConfig = { damping: 50, stiffness: 100 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  // Only update positions after component mounts
  useEffect(() => {
    // Set initial random position after mount
    x.set(Math.random() * 100)
    y.set(Math.random() * 100)
    
    const moveParticle = () => {
      x.set(Math.random() * 100)
      y.set(Math.random() * 100)
    }
    
    // Use longer interval for better performance
    const interval = setInterval(moveParticle, speed * 1000)
    return () => clearInterval(interval)
  }, [speed, x, y])
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${springY.get()}%`,
        left: `${springX.get()}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: color,
        filter: 'blur(1px)',
        x: springX,
        y: springY,
        willChange: 'transform', // Add will-change hint
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0.5], scale: [0, 1.5, 1], rotate: [0, 180, 360] }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
    />
  )
}

// 3D floating card with mouse tracking - optimized
const FloatingCard = memo(function FloatingCard({ children, delay = 0, intensity = 20 }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  
  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    const mouseX = e.clientX - cardCenterX
    const mouseY = e.clientY - cardCenterY
    
    // Calculate rotation based on mouse position - with optimization to avoid too frequent updates
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity
    const rotateXValue = -(mouseY / (rect.height / 2)) * intensity
    
    // Only update if change is significant (>0.5 degrees)
    if (Math.abs(rotateXValue - rotateX) > 0.5 || Math.abs(rotateYValue - rotateY) > 0.5) {
      setRotateX(rotateXValue)
      setRotateY(rotateYValue)
    }
  }, [intensity, rotateX, rotateY])
  
  const handleMouseLeave = useCallback(() => {
    setRotateX(0)
    setRotateY(0)
  }, [])
  
  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden will-change-transform"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
})

// Animated text reveal - optimized
const AnimatedTextCharacter = memo(function AnimatedTextCharacter({ text, className = "", delay = 0 }: AnimatedTextCharacterProps) {
  // Split text into array of characters
  const characters = useMemo(() => text.split(''), [text])

  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i }
    })
  }

  // Variants for each character
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-block" }}
    >
      {characters.map((character, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {character}
        </motion.span>
      ))}
    </motion.h1>
  )
})

// Glittery sparkle effect - optimized
const Sparkle = memo(function Sparkle({ size, color, style }: SparkleProps) {
  const sparkleVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
  }
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
        ...style,
        willChange: 'transform, opacity',
      }}
      variants={sparkleVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    />
  )
})

// Define sparkle object type
interface SparkleObject {
  id: number;
  size: number;
  color: string;
  style: {
    top: string;
    left: string;
  };
}

// Client Component version of GradientButton - optimized
const GradientButton = memo(function GradientButton({ children, href, download = false, primary = false }: GradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [sparkles, setSparkles] = useState<SparkleObject[]>([])
  const [isMounted, setIsMounted] = useState(false)
  
  // Only run client-side code after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const addSparkle = useCallback(() => {
    if (!isMounted) return
    
    const newSparkle: SparkleObject = {
      id: Math.random(),
      size: Math.random() * 4 + 2,
      color: primary ? 'rgba(255, 255, 255, 0.8)' : 'rgba(139, 92, 246, 0.8)',
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }
    }
    
    setSparkles(prev => [...prev, newSparkle])
    
    // Remove sparkle after animation
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id))
    }, 500)
  }, [isMounted, primary])
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    // Add multiple sparkles when hovering, but fewer for better performance
    if (isMounted) {
      for (let i = 0; i < 3; i++) { // Reduced from 5 to 3
        setTimeout(addSparkle, i * 100)
      }
    }
  }, [addSparkle, isMounted])
  
  return (
    <motion.a
      href={href}
      download={download}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={addSparkle}
      className={`relative overflow-hidden px-8 py-3 ${
        primary
          ? 'bg-purple-600 hover:bg-purple-700 text-white'
          : 'glass hover:bg-white/20'
      } rounded-full font-medium flex items-center gap-2 transition-all`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: primary 
          ? '0 0 20px rgba(124, 58, 237, 0.7), 0 0 40px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.2)' 
          : '0 0 15px rgba(255, 255, 255, 0.3)' 
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Only render sparkles when hovered for better performance */}
      {isHovered && sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          size={sparkle.size}
          color={sparkle.color}
          style={sparkle.style}
        />
      ))}
      
      <span className="relative z-10">{children}</span>
      
      {/* Gradient overlay */}
      <motion.div
        className={`absolute inset-0 ${
          primary
            ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600'
            : 'bg-gradient-to-r from-white/5 via-purple-500/10 to-white/5'
        }`}
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ 
          backgroundPosition: isHovered ? '100% 50%' : '0% 50%' 
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Moving shine effect - only when hovered */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className={`absolute h-full w-10 ${
              primary ? 'bg-white/20' : 'bg-purple-500/20'
            } blur-md transform -skew-x-12`}
            initial={{ left: '-20%' }}
            animate={{ left: '120%' }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}
    </motion.a>
  )
})

// Social icon with enhanced animation - optimized
const AnimatedSocialIcon = memo(function AnimatedSocialIcon({ Icon, href, delay = 0 }: AnimatedSocialIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasClicked, setHasClicked] = useState(false)
  
  // Handle click with useCallback
  const handleClick = useCallback(() => {
    setHasClicked(true)
    setTimeout(() => setHasClicked(false), 1000)
  }, [])
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 glass rounded-full overflow-hidden relative transition-colors ${
        isHovered ? 'text-purple-400' : ''
      }`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20, 
        delay: 0.8 + delay 
      }}
      whileHover={{ 
        scale: 1.2,
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Only render hover effects when needed */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-violet-500/20 to-fuchsia-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      <motion.div
        animate={{
          rotate: hasClicked ? [0, 360] : 0,
          scale: hasClicked ? [1, 1.5, 1] : 1
        }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={24} />
      </motion.div>
      
      {/* Only render click effect when needed */}
      {hasClicked && (
        <motion.div
          className="absolute inset-0 bg-purple-500/20 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 2 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.a>
  )
})

// Main Hero component
export default function Hero() {
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [hasScrolled, setHasScrolled] = useState(false)
  const [mouseInView, setMouseInView] = useState(false)
  const [isMounted, setIsMounted] = useState(false) 
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  // For scroll-based animations
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const translateY = useTransform(scrollY, [0, 300], [0, 100])
  
  // For interactive animations - throttled
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return
    
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    // Only update if position changed significantly
    setCursorPosition(prev => {
      if (Math.abs(prev.x - x) > 2 || Math.abs(prev.y - y) > 2) {
        return { x, y }
      }
      return prev
    })
  }, [])
  
  // Set the mounted state to true after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle scroll events - debounced
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setHasScrolled(window.scrollY > 100);
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  // Add CSS animations once on mount
  useEffect(() => {
    // Client-side only code for generating animation keyframes
    if (typeof document !== 'undefined') {
      // Check if style already exists
      if (!document.getElementById('hero-animations')) {
        const style = document.createElement('style')
        style.id = 'hero-animations'
        style.textContent = `
          @keyframes floatCode {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          
          @keyframes code-float-1 {
            0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
            50% { transform: translateY(-10px) rotate(var(--rotate, 0deg)); }
          }
          
          @keyframes code-float-2 {
            0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
            50% { transform: translateY(-15px) rotate(var(--rotate, 0deg)); }
          }
          
          @keyframes code-float-3 {
            0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
            50% { transform: translateY(-8px) rotate(var(--rotate, 0deg)); }
          }
          
          .code-float-1 {
            --rotate: 3deg;
            animation: code-float-1 8s ease-in-out infinite;
          }
          
          .code-float-2 {
            --rotate: -2deg;
            animation: code-float-2 10s ease-in-out infinite;
          }
          
          .code-float-3 {
            --rotate: 1deg;
            animation: code-float-3 12s ease-in-out infinite;
          }
          
          .grid-pattern {
            animation: grid-float 20s linear infinite;
          }
          
          @keyframes grid-float {
            0% { background-position: 0 0; }
            100% { background-position: 30px 30px; }
          }
        `
        document.head.appendChild(style)
      }
    }
  }, [])
  
  // Typing effect - optimized
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [displayedSubtitle, setDisplayedSubtitle] = useState("")
  const fullTitle = personalInfo.title
  const fullSubtitle = personalInfo.subtitle
  
  useEffect(() => {
    let titleIndex = 0
    const titleInterval = setInterval(() => {
      setDisplayedTitle(fullTitle.substring(0, titleIndex + 1))
      titleIndex++
      
      if (titleIndex >= fullTitle.length) {
        clearInterval(titleInterval)
        setIsTypingComplete(true)
      }
    }, 100)
    
    return () => clearInterval(titleInterval)
  }, [fullTitle])
  
  useEffect(() => {
    if (!isTypingComplete) return
    
    let subtitleIndex = 0
    const subtitleInterval = setInterval(() => {
      setDisplayedSubtitle(fullSubtitle.substring(0, subtitleIndex + 1))
      subtitleIndex++
      
      if (subtitleIndex >= fullSubtitle.length) {
        clearInterval(subtitleInterval)
      }
    }, 50)
    
    return () => clearInterval(subtitleInterval)
  }, [isTypingComplete, fullSubtitle])

  // Memoize static code snippets
  const codeSnippets = useMemo(() => {
    if (!isMounted) return null;
    
    return (
      <>
        <div className="absolute top-[10%] left-[5%] text-xs font-mono text-cyan-300/30 transform rotate-3 code-float-1">
          const developer = {`{`} <br />
          &nbsp;&nbsp;name: 'Yasindu', <br />
          &nbsp;&nbsp;skills: ['React', 'Node.js'] <br />
          {`}`};
        </div>
        <div className="absolute top-[30%] right-[10%] text-xs font-mono text-blue-300/30 transform -rotate-2 code-float-2">
          function buildApp() {`{`} <br />
          &nbsp;&nbsp;return innovation; <br />
          {`}`}
        </div>
        <div className="absolute bottom-[25%] left-[15%] text-xs font-mono text-indigo-300/30 transform rotate-1 code-float-3">
          import {`{`} creativity {`}`} from 'mind'; <br />
          export const solution = creativity();
        </div>
      </>
    )
  }, [isMounted])

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseInView(true)}
      onMouseLeave={() => setMouseInView(false)}
    >
      {/* Interactive background elements - reduced and optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Code-themed background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30" />
        
        {/* Code pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Performance-optimized code snippets with CSS animations */}
        <div className="absolute inset-0">
          {codeSnippets}
        </div>
        
        {/* Floating gradient orbs with tech theme - simplified for better performance */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-blue-500/10 to-transparent rounded-full"
          style={{
            filter: 'blur(70px)',
            willChange: 'transform, opacity',
          }}
        />
        
        {/* Interactive follow glow - only render when mouse is in view */}
        {mouseInView && (
          <div 
            className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/10 transition-all duration-300"
            style={{
              filter: 'blur(80px)',
              left: `calc(${cursorPosition.x}% - 100px)`,
              top: `calc(${cursorPosition.y}% - 100px)`,
              willChange: 'transform',
            }}
          />
        )}
        
        {/* Reduced particles for better performance */}
        {isMounted && Array.from({ length: 5 }).map((_, i) => {
          // Create deterministic values based on index
          const colorR = 100 + ((i * 17) % 50);
          const colorG = 150 + ((i * 23) % 50);
          const colorB = 200 + ((i * 19) % 50);
          const colorA = 0.1 + ((i % 3) * 0.1);
          const size = 2 + ((i % 4) * 1);
          const speed = 10 + ((i * 7) % 10);
          const delay = i * 0.2;
          
          return (
            <Particle 
              key={`particle-${i}`}
              delay={delay}
              size={size}
              color={`rgba(${colorR}, ${colorG}, ${colorB}, ${colorA})`}
              speed={speed}
            />
          );
        })}
        
        {/* Grid pattern - CSS-based instead of JS transform for better performance */}
        <div 
          className="absolute inset-0 opacity-10 grid-pattern"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(100, 200, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 200, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <motion.div 
          className="text-center"
          style={{ opacity, y: translateY }}
        >
          {/* Main animated heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Hidden element for proper spacing, but not visible */}
            <div className="invisible text-5xl md:text-7xl font-bold mb-4">
              Hi, I'm {personalInfo.name.split(' ')[0]}
            </div>
            
            {/* Main text with gradient effect - only visible version */}
            <motion.div
              className="text-5xl md:text-7xl font-bold mb-4 absolute top-0 left-0 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span>Hi, I'm </span>
              <motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  backgroundSize: '200% 200%',
                  backgroundImage: 'linear-gradient(90deg, #c026d3, #8b5cf6, #3b82f6, #8b5cf6, #c026d3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  willChange: 'background-position',
                }}
              >
                {personalInfo.name.split(' ')[0]}
              </motion.span>
            </motion.div>
            
            {/* Simplified sparkles - reduced number */}
            {isMounted && (
              <motion.div 
                className="absolute top-0 left-0 right-0 pointer-events-none"
                animate={{
                  filter: ['blur(2px)', 'blur(3px)', 'blur(2px)'],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {[...Array(3)].map((_, i) => { // Reduced from 5 to 3
                  // Create deterministic positions based on index
                  const topPos = ((i * 23) % 100);
                  const leftOffset = ((i * 17) % 20) - 10;
                  const leftPos = 50 + leftOffset;
                  const delay = i * 0.5;
                  
                  return (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute inline-block"
                      style={{ 
                        top: `${topPos}%`, 
                        left: `${leftPos}%`,
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'rgba(100, 200, 255, 0.8)',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px 2px rgba(100, 200, 255, 0.8)',
                        willChange: 'transform, opacity',
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: delay,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* Typewriter effect for title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative h-16"
          >
            <h2 
              className="text-2xl md:text-4xl mb-4 text-gray-600 dark:text-gray-300 inline-block relative"
              ref={titleRef}
            >
              {displayedTitle}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
                className={`inline-block w-0.5 h-8 bg-purple-400 ml-1 align-middle ${isTypingComplete ? 'opacity-0' : ''}`}
              />
            </h2>
            
            {/* Code brackets */}
            {displayedTitle && (
              <>
                <motion.span 
                  className="absolute text-2xl md:text-4xl text-purple-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ 
                    left: titleRef.current ? titleRef.current.offsetLeft - 30 : 'auto',
                    top: '0'
                  }}
                >
                  &lt;
                </motion.span>
                <motion.span 
                  className="absolute text-2xl md:text-4xl text-purple-400"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ 
                    left: titleRef.current ? 
                      titleRef.current.offsetLeft + (isTypingComplete ? titleRef.current.offsetWidth : 0) : 'auto',
                    top: '0'
                  }}
                >
                  /&gt;
                </motion.span>
              </>
            )}
          </motion.div>

          {/* Subtitle with typing effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-lg md:text-xl mb-8 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto h-16"
          >
            {displayedSubtitle}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
              className={`inline-block w-0.5 h-5 bg-gray-400 ml-1 align-middle ${
                displayedSubtitle === fullSubtitle ? 'opacity-0' : ''
              }`}
            />
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-wrap gap-6 justify-center mb-12"
          >
            <FloatingCard delay={0.2}>
              <GradientButton href="#projects" primary>
                <span>View My Work</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </GradientButton>
            </FloatingCard>
            
            <FloatingCard delay={0.4}>
              <GradientButton href="/resume.pdf" download>
                <span>Download CV</span>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Download size={20} />
                </motion.div>
              </GradientButton>
            </FloatingCard>
          </motion.div>

          {/* Social Links with enhanced animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex justify-center gap-6"
          >
            <AnimatedSocialIcon Icon={Github} href={personalInfo.github} delay={0} />
            <AnimatedSocialIcon Icon={Linkedin} href={personalInfo.linkedin} delay={0.1} />
            <AnimatedSocialIcon Icon={Mail} href={`mailto:${personalInfo.email}`} delay={0.2} />
          </motion.div>
          
          {/* Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { icon: Sparkles, text: "Creative Solutions", color: "from-purple-400 to-pink-600" },
              { icon: Code, text: "Clean Code", color: "from-blue-400 to-teal-500" },
              { icon: Zap, text: "Fast Performance", color: "from-amber-400 to-orange-600" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20, 
                  delay: 1.8 + (index * 0.1) 
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass py-2 px-4 rounded-full flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className={`p-1.5 rounded-full bg-gradient-to-r ${badge.color}`}
                >
                  <badge.icon size={14} className="text-white" />
                </motion.div>
                <span className="text-sm font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator - only show when not scrolled */}
        {!hasScrolled && (
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: 1,
              scale: 1,
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div 
              className="relative w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center overflow-hidden"
              whileHover={{ borderColor: '#3b82f6', scale: 1.1 }}
            >
              <motion.div 
                className="w-1 h-3 bg-blue-400 rounded-full"
                initial={{ y: -10 }}
                animate={{ y: 16 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "loop",
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            
            <motion.p
              className="text-xs text-gray-400 mt-2 text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              Scroll Down
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  )
}