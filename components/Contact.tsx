'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Github, 
  Linkedin, 
  Sparkles,
  MessageSquare,
  User,
  Loader2,
  AtSign,
  Code,
  Braces,
  Hash,
  Star,
  Terminal,
  Zap
} from 'lucide-react'
import { personalInfo } from '@/lib/data'

// ClientOnly component to prevent hydration mismatch
interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return isClient ? children : fallback
}

// Define types for component props
interface FloatingParticleProps {
  size?: number;
  color?: string;
  delay?: number;
  left?: string;
  duration?: number;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  perspective?: number;
  speed?: number;
}

interface BinaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  isSuccess?: boolean;
}

interface ClockProps {
  size?: number;
  className?: string;
}

interface FloatingCodeSnippetProps {
  text: string;
  top: string;
  left: string;
  delay?: number;
  rotate?: number;
}

interface SocialLinkProps {
  Icon: React.ComponentType<any>;
  url: string;
  color: string;
  delay: number;
}

// Custom floating particle component
const FloatingParticle = ({ 
  size = 4, 
  color = 'rgba(139, 92, 246, 0.3)', 
  delay = 0, 
  left = '50%', 
  duration = 10 
}: FloatingParticleProps) => {
  // Static random values for server-client consistency
  const staticYOffset = -300;
  const staticXOffset = 0;
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left,
        bottom: -20,
        filter: `blur(${size / 3}px)`,
      }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{ 
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5],
        y: staticYOffset,
        x: staticXOffset
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 2
      }}
    />
  )
}

// Clock component - Client-side only rendering
const Clock = ({ size = 24, className = "" }: ClockProps) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // Calculate hand positions
  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12
  
  const secondsDegrees = ((seconds / 60) * 360) + 90
  const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90
  const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90

  return (
    <div className={className}>
      <div className="relative w-full h-full rounded-full border-2 border-purple-400 flex items-center justify-center">
        {/* Hour marks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-${size / 2 - 3}px)`
            }}
          />
        ))}
        
        {/* Hour hand */}
        <div
          className="absolute w-1 h-[25%] bg-white rounded-full origin-bottom"
          style={{ transform: `rotate(${hoursDegrees}deg)` }}
        />
        
        {/* Minute hand */}
        <div
          className="absolute w-0.5 h-[40%] bg-blue-400 rounded-full origin-bottom"
          style={{ transform: `rotate(${minutesDegrees}deg)` }}
        />
        
        {/* Second hand */}
        <div
          className="absolute w-0.5 h-[45%] bg-purple-400 rounded-full origin-bottom"
          style={{ transform: `rotate(${secondsDegrees}deg)` }}
        />
        
        {/* Center point */}
        <div className="absolute w-2 h-2 bg-white rounded-full" />
      </div>
    </div>
  )
}

// Floating code snippet component
const FloatingCodeSnippet = ({ text, top, left, delay = 0, rotate = 0 }: FloatingCodeSnippetProps) => {
  return (
    <motion.div
      className="absolute font-mono text-xs text-blue-300/20 pointer-events-none"
      style={{ top, left, rotate: `${rotate}deg` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 0.7,
        y: 0,
      }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      >
        {text}
      </motion.div>
    </motion.div>
  )
}

// 3D tilt card effect
const TiltCard = ({ children, className = "", scale = 1.05, perspective = 1000, speed = 500 }: TiltCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const x = (mouseY / height - 0.5) * -20
    const y = (mouseX / width - 0.5) * 20
    
    setTilt({ x, y })
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        transition: `transform ${speed}ms ease-out`,
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{ scale }}
    >
      {children}
      
      {/* Lighting effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-0 transition-opacity duration-300"
        style={{ 
          opacity: isHovered ? 0.1 : 0,
          transform: `translateZ(1px)`,
        }}
      />
    </motion.div>
  )
}

// Binary button effect
const BinaryButton = ({ children, onClick, isLoading = false, isSuccess = false }: BinaryButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [binary, setBinary] = useState<number[]>([]) 
  
  // Generate binary pattern when hovered
  useEffect(() => {
    if (isHovered) {
      const pattern: number[] = []
      // Use fixed seed for server rendering
      for (let i = 0; i < 50; i++) {
        pattern.push(i % 2) // Deterministic pattern instead of random
      }
      setBinary(pattern)
      
      // Update periodically
      const interval = setInterval(() => {
        const newPattern: number[] = []
        for (let i = 0; i < 50; i++) {
          // Still somewhat random but with a predictable element
          newPattern.push((i + Date.now()) % 2)
        }
        setBinary(newPattern)
      }, 200)
      
      return () => clearInterval(interval)
    }
  }, [isHovered])
  
  return (
    <motion.button
      type="button"
      disabled={isLoading}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-medium text-white overflow-hidden"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)"
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Binary pattern overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-30 flex flex-wrap justify-center items-center">
        {isHovered && binary.map((bit, index) => (
          <motion.span 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: bit ? 0.9 : 0.3 }}
            transition={{ duration: 0.2 }}
            className="text-[8px] mx-px"
          >
            {bit}
          </motion.span>
        ))}
      </div>
      
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ 
          backgroundPosition: isHovered ? '100% 50%' : '0% 50%'
        }}
        style={{ backgroundSize: '200% 200%' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      
      {/* Moving shine effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute h-full w-10 bg-white/20 blur-md transform -skew-x-12"
          initial={{ left: '-20%' }}
          animate={{ left: isHovered ? '120%' : '-20%' }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Sending...</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle size={20} />
            <span>Sent Successfully!</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            <motion.div
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Send size={20} />
            </motion.div>
          </>
        )}
      </div>
      
      {/* Success particles */}
      <AnimatePresence>
        {isSuccess && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (i * 20)], // Deterministic pattern
                  y: [0, (i % 3 === 0 ? -1 : 1) * (i * 20)]  // Deterministic pattern
                }}
                exit={{ scale: 0 }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-purple-300"
                style={{ filter: 'blur(1px)' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Animated data link effect - Client-side only
const DataLinkEffect = () => {
  // Predefined positions instead of random
  const lineHeights = [150, 200, 170, 190, 160];
  const linePositions = [
    { top: '20%', left: '10%' },
    { top: '35%', left: '30%' },
    { top: '50%', left: '50%' },
    { top: '30%', left: '70%' },
    { top: '15%', left: '90%' }
  ];
  
  const dotPositions = [
    { top: '20%', left: '5%' },
    { top: '50%', left: '20%' },
    { top: '55%', left: '35%' },
    { top: '40%', left: '50%' },
    { top: '45%', left: '65%' },
    { top: '40%', left: '80%' },
    { top: '55%', left: '95%' },
    { top: '60%', left: '110%' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {linePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 rounded-full bg-gradient-to-b from-purple-500/20 to-transparent"
          style={{
            height: lineHeights[i % lineHeights.length],
            left: pos.left,
            top: pos.top,
          }}
          animate={{
            height: [lineHeights[i % lineHeights.length], lineHeights[i % lineHeights.length] * 1.3, lineHeights[i % lineHeights.length]],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5
          }}
        />
      ))}
      
      {dotPositions.map((pos, i) => (
        <motion.div
          key={i + "dot"}
          className="absolute w-2 h-2 rounded-full bg-blue-500/50"
          style={{
            left: pos.left,
            top: pos.top,
          }}
          animate={{
            y: [0, 100, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.3
          }}
        />
      ))}
    </div>
  )
}

// Matrix rain effect - Already client-side only
const MatrixRain = () => {
  const [ready, setReady] = useState(false)
  
  useEffect(() => {
    // Only run client-side
    setReady(true)
  }, [])
  
  if (!ready) return null
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500 font-mono text-sm whitespace-pre"
          style={{ 
            left: `${i * 10}%`,
            top: -100,
            opacity: 0.7
          }}
          animate={{ 
            y: [0, 1000], // Use fixed value instead of window.innerHeight
            opacity: [0.7, 0] 
          }}
          transition={{ 
            y: { duration: 15 + (i % 5), repeat: Infinity, ease: "linear" },
            opacity: { duration: 15 + (i % 5), repeat: Infinity }
          }}
        >
          {[...Array(20)].map((_, j) => (
            <div key={j} className="text-xs leading-none my-1">
              {(i + j) % 2 === 0 ? '0' : '1'} {/* Deterministic pattern */}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const contactRef = useRef(null)
  const isInView = useInView(contactRef, { once: false, margin: "-100px" })
  
  const handleSubmit = () => {
    if (!name || !email || !message) return
    
    setIsSubmitting(true)
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset after showing success
      setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  // Define the interface for code snippets
  interface CodeSnippet {
    text: string;
    top: string;
    left: string;
    delay: number;
    rotate: number;
  }

  // Generate code snippet content
  const codeSnippets: CodeSnippet[] = [
    { 
      text: 'const connect = async () => {\n  await sendMessage({\n    email,\n    message\n  });\n};', 
      top: '10%', 
      left: '5%', 
      delay: 0.2, 
      rotate: -5 
    },
    { 
      text: 'function sendEmail(data) {\n  return fetch("/api/contact");\n}', 
      top: '30%', 
      left: '80%', 
      delay: 0.4, 
      rotate: 5 
    },
    { 
      text: '<Button onClick={submit} />', 
      top: '70%', 
      left: '10%', 
      delay: 0.6, 
      rotate: 3 
    },
    { 
      text: 'import { useState } from "react";\n\nconst [sent, setSent] = useState(false);', 
      top: '15%', 
      left: '70%', 
      delay: 0.8, 
      rotate: -3 
    },
  ]

  return (
    <section id="contact" ref={contactRef} className="py-20 bg-gradient-to-b from-gray-900/50 to-gray-800/50 relative overflow-hidden">
      {/* Dynamic background effects - Client-side only */}
      <ClientOnly>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Matrix code rain */}
          <MatrixRain />
          
          {/* Data link effect */}
          <DataLinkEffect />
          
          {/* Code snippets */}
          {codeSnippets.map((code, index) => (
            <FloatingCodeSnippet
              key={index}
              text={code.text}
              top={code.top}
              left={code.left}
              delay={code.delay}
              rotate={code.rotate}
            />
          ))}
          
          {/* Tech-themed symbols */}
          {['{}', '<>', '()', '=>', '[]', '&&', '||'].map((symbol, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="absolute text-blue-300/20 font-mono"
              style={{ 
                top: `${20 + i * 15}%`, 
                left: `${10 + i * 18}%`,
                fontSize: '12px',
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {symbol}
            </motion.div>
          ))}
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <FloatingParticle
              key={i}
              size={3 + (i * 0.25)} // Deterministic sizes
              color={i % 3 === 0 
                ? 'rgba(139, 92, 246, 0.5)' 
                : i % 3 === 1 
                  ? 'rgba(59, 130, 246, 0.5)' 
                  : 'rgba(236, 72, 153, 0.5)'
              }
              delay={i * 0.2}
              left={`${5 + (i * 6)}%`}
              duration={8 + (i * 0.5)} // Deterministic durations
            />
          ))}
          
          {/* Gradient orbs */}
          <motion.div 
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-30"
            style={{ 
              background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(30,27,75,0) 70%)",
              filter: "blur(60px)",
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
          />
          
          <motion.div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(30,27,75,0) 70%)",
              filter: "blur(70px)",
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
          />
        </div>
      </ClientOnly>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
              Let's <span className="gradient-text">Connect</span>
              
              {/* Decorative elements around text */}
              <motion.div
                className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-purple-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1 -left-2 w-2 h-2 rounded-full bg-blue-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I'm always open to discussing new opportunities and interesting projects
          </motion.p>
          
          {/* Animated terminal typing effect */}
          <motion.div
            className="max-w-md mx-auto mt-8 bg-gray-900/50 rounded-lg overflow-hidden glass backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-1 px-3 py-2 bg-gray-800/50 border-b border-gray-700/50">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
              <div className="mx-auto text-xs text-gray-400 font-mono">terminal</div>
            </div>
            <div className="p-4 font-mono text-sm text-green-400">
              <div className="flex">
                <span className="text-blue-400 mr-2">$</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, delay: 1 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  node send-message.js --to yasindudemel@gmail.com
                </motion.span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 3.5 }}
              >
                <span className="text-yellow-400">[INFO]</span> Establishing connection...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 4 }}
              >
                <span className="text-green-400">[SUCCESS]</span> Connection established! Ready to send message.
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main content */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated grid background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl overflow-hidden backdrop-blur-md border border-white/5 shadow-xl"
          >
            <div className="grid lg:grid-cols-2">
              {/* Left side - Contact details with enhanced 3D cards */}
              <div className="p-8 relative overflow-hidden">
                {/* Tech-themed background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      background: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), transparent)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  
                  <motion.div 
                    className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
                      filter: "blur(40px)"
                    }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 45, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                  />
                </div>
                
                {/* Section title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8 relative"
                >
                  <div className="flex items-center">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
                      animate={{ 
                        boxShadow: ["0 0 0px rgba(139, 92, 246, 0.3)", "0 0 20px rgba(139, 92, 246, 0.6)", "0 0 0px rgba(139, 92, 246, 0.3)"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles size={18} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold ml-3">Get in Touch</h3>
                  </div>
                  
                  <motion.div
                    className="absolute -left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent"
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    viewport={{ once: true }}
                  />
                </motion.div>
                
                {/* Enhanced contact info cards */}
                <div className="space-y-6">
                  <TiltCard className="glass rounded-xl overflow-hidden">
                    <motion.a
                      href={`mailto:${personalInfo.email}`}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-6 text-left hover:bg-white/10 transition-colors"
                    >
                      <motion.div
                        className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Mail className="text-white" size={24} />
                      </motion.div>
                      
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="font-semibold mt-1 text-lg">{personalInfo.email}</p>
                      </div>
                      
                      <ClientOnly>
                        {/* Moving particles on hover */}
                        <motion.div 
                          className="absolute inset-0 pointer-events-none"
                          whileHover={{ opacity: 1 }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 rounded-full bg-purple-400/30"
                              style={{ 
                                left: `${20 * (i + 1)}%`, 
                                top: `${15 * (i + 1)}%`,
                              }}
                              animate={{ 
                                x: [0, i % 2 === 0 ? 15 : -15],
                                y: [0, i % 2 === 0 ? -15 : 15],
                                opacity: [0, 0.5, 0]
                              }}
                              transition={{ 
                                duration: 1 + (i * 0.2),
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            />
                          ))}
                        </motion.div>
                      </ClientOnly>
                    </motion.a>
                  </TiltCard>

                  <TiltCard className="glass rounded-xl overflow-hidden">
                    <motion.a
                      href={`tel:${personalInfo.phone}`}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-4 p-6 text-left hover:bg-white/10 transition-colors"
                    >
                      <motion.div
                        className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Phone className="text-white" size={24} />
                      </motion.div>
                      
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="font-semibold mt-1 text-lg">{personalInfo.phone}</p>
                      </div>
                    </motion.a>
                  </TiltCard>

                  <TiltCard className="glass rounded-xl overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-4 p-6 text-left hover:bg-white/10 transition-colors"
                    >
                      <motion.div
                        className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <MapPin className="text-white" size={24} />
                      </motion.div>
                      
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="font-semibold mt-1 text-lg">{personalInfo.location}</p>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
                
                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-10"
                >
                  <h4 className="text-gray-400 text-sm mb-4">Connect with me on</h4>
                  <div className="flex gap-4">
                    {[
                      { Icon: Github, url: personalInfo.github, color: "from-gray-600 to-gray-800", delay: 0 },
                      { Icon: Linkedin, url: personalInfo.linkedin, color: "from-blue-500 to-blue-700", delay: 0.1 },
                      { Icon: Mail, url: `mailto:${personalInfo.email}`, color: "from-red-500 to-pink-600", delay: 0.2 },
                      { Icon: Terminal, url: "#", color: "from-green-500 to-teal-600", delay: 0.3 }
                    ].map((social: SocialLinkProps, index: number) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: 0.7 + social.delay,
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 10px 20px -5px rgba(124, 58, 237, 0.5)"
                        }}
                        className={`p-3 rounded-full flex items-center justify-center bg-gradient-to-br ${social.color} relative`}
                      >
                        <social.Icon size={20} className="text-white" />
                        
                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          initial={{ opacity: 0 }}
                          whileHover={{ 
                            opacity: 1,
                            boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)"
                          }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
                
                {/* Animated code symbols */}
                <div className="absolute bottom-5 right-5 opacity-30 font-mono text-xs">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  >
                    <Code size={20} />
                  </motion.div>
                </div>
              </div>
              
              {/* Right side - Contact inputs */}
              <motion.div 
                className="p-8 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {/* Section header */}
                <div className="mb-8 relative">
                  <div className="flex items-center mb-2">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center"
                      animate={{ 
                        boxShadow: ["0 0 0px rgba(59, 130, 246, 0.3)", "0 0 20px rgba(59, 130, 246, 0.6)", "0 0 0px rgba(59, 130, 246, 0.3)"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      <MessageSquare size={18} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold ml-3">Send a Message</h3>
                  </div>
                  <p className="text-gray-500 text-sm pl-12">I'll get back to you as soon as possible</p>
                </div>
                
                {/* Input fields */}
                <div className="space-y-6">
                  {/* Name input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <div className="relative">
                      <motion.div 
                        className="absolute left-4 top-4 text-gray-500"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <User size={20} />
                      </motion.div>
                      
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 glass rounded-xl bg-transparent outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      />
                      
                      {/* Animation for focus line */}
                      {name && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Email input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <div className="relative">
                      <motion.div 
                        className="absolute left-4 top-4 text-gray-500"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                      >
                        <AtSign size={20} />
                      </motion.div>
                      
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 glass rounded-xl bg-transparent outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      />
                      
                      {/* Animation for focus line */}
                      {email && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Message input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <div className="relative">
                      <motion.div 
                        className="absolute left-4 top-4 text-gray-500"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                      >
                        <MessageSquare size={20} />
                      </motion.div>
                      
                      <textarea
                        placeholder="Your Message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 glass rounded-xl bg-transparent outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                      />
                      
                      {/* Animation for focus line */}
                      {message && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Submit button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <BinaryButton 
                      onClick={handleSubmit}
                      isLoading={isSubmitting} 
                      isSuccess={isSubmitted}
                    >
                      Send Message
                    </BinaryButton>
                  </motion.div>
                </div>
                
                {/* Technology symbols */}
                <div className="absolute bottom-4 right-4 opacity-20">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                    <Braces size={28} />
                  </motion.div>
                </div>
                
                <div className="absolute top-4 right-4 opacity-20">
                  <motion.div
                    animate={{ 
                      rotate: -360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                    }}
                  >
                    <Hash size={24} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Floating tech elements */}
          {isInView && (
            <ClientOnly>
              <motion.div
                className="absolute -left-16 top-1/3 w-32 h-32 opacity-10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-4 border-dashed border-purple-500" />
              </motion.div>
              
              <motion.div
                className="absolute -right-16 top-2/3 w-24 h-24 opacity-10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1, rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-4 border-dashed border-blue-500" />
              </motion.div>
            </ClientOnly>
          )}
        </div>
        
        {/* Statistics and trust indicators */}
        <motion.div
          className="max-w-5xl mx-auto mt-16 glass rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Response Rate", value: "100%", icon: Zap },
              { label: "Avg. Response Time", value: "24h", icon: Clock },
              { label: "Projects Completed", value: "5+", icon: CheckCircle }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + (index * 0.1) }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(139, 92, 246, 0.2)", "0 0 20px rgba(139, 92, 246, 0.4)", "0 0 0px rgba(139, 92, 246, 0.2)"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.icon === Clock ? (
                    <ClientOnly>
                      <Clock className="text-purple-400" size={24} />
                    </ClientOnly>
                  ) : (
                    <stat.icon className="text-purple-400" size={24} />
                  )}
                </motion.div>
                <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Background code effect */}
          <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
            <div className="font-mono text-[10px] whitespace-pre text-purple-500 rotate-12 absolute -bottom-10 -right-10">
              {`const statistics = {
  responseRate: 0.99,
  avgResponseTime: 24,
  projectsCompleted: 5
};`}
            </div>
          </div>
        </motion.div>
        
        {/* Animated decorative elements */}
        <motion.div
          className="max-w-md mx-auto mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-center gap-4">
            {["Speed", "Quality", "Dedication"].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + (index * 0.1) }}
                className="flex items-center gap-1"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                </motion.div>
                <span className="text-sm text-gray-400">{value}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.p
            className="text-xs text-gray-500 mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Responses typically within 24-48 hours
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}