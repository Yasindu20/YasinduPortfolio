'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Rocket, 
  Users, 
  Award, 
  Zap, 
  Sparkles, 
  Star, 
  ArrowRight, 
  Brain,
  Globe,
  GraduationCap,
  BookOpen,
  Building2,
  School,
  CheckCircle2,
  FileCheck,
  Heart
} from 'lucide-react'

const highlights = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "Expertise in modern web technologies and cross-platform app development",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Rocket,
    title: "AI Integration",
    description: "Experience with machine learning in mobile applications",
    color: "from-purple-500 to-pink-400"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Agile methodology practitioner with strong communication skills",
    color: "from-amber-500 to-orange-400"
  },
  {
    icon: Award,
    title: "Continuous Learning",
    description: "Recent Software Engineering graduate with multiple certifications",
    color: "from-emerald-500 to-green-400"
  }
]

// Added interests section to fill space
const interests = [
  "UI/UX Design", "Mobile App Development", 
  "Web Development", "AI & Machine Learning",
  "Full Stack Engineering", "Game Development", "SAAS Devlopment", "DevOps Engineering"
]

// Certifications data
const certifications = [
  {
    title: "Diploma in HTML5, CSS3, JavaScript",
    issuer: "Alison",
    date: "June 2024"
  },
  {
    title: "Full Stack React E-Commerce Project",
    issuer: "GreatStack",
    date: "May 2025"
  },
  {
    title: "Postman Essential Training",
    issuer: "LinkedIn Learning",
    date: "May 2025"
  },
  {
    title: "React JavaScript - Fundamental to Coding & New Beginning",
    issuer: "Alison",
    date: "November 2023"
  }
]

interface ParticleProps {
  size: number;
  color: string;
  x: number;
  y: number;
  delay: number;
}

const Particle = ({ size, color, x, y, delay }: ParticleProps) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      filter: `blur(${size / 4}px)`,
      x, 
      y
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0.5],
      x: [x, x + (Math.random() * 100 - 50)],
      y: [y, y - (50 + Math.random() * 50)]
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }}
  />
)

// Animated text with underline
const AnimatedText = ({ text, color }: { text: string, color: string }) => {
  return (
    <motion.span 
      className={`font-semibold relative mx-1 ${color === 'purple' ? 'text-purple-300' : 'text-blue-300'}`}
      whileHover={{ scale: 1.05 }}
    >
      {text}
      <motion.span 
        className={`absolute bottom-0 left-0 w-0 h-0.5 ${color === 'purple' ? 'bg-purple-400' : 'bg-blue-400'}`}
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </motion.span>
  )
}

const TimelineItem = ({ 
  year, 
  title, 
  subtitle,
  description, 
  index, 
  isLast = false,
  icon: Icon = GraduationCap
}: { 
  year: string, 
  title: string, 
  subtitle?: string,
  description: string, 
  index: number, 
  isLast?: boolean,
  icon?: React.ComponentType<any>
}) => {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, margin: "-100px" })
  
  return (
    <motion.div 
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-start gap-4"
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.2, delay: index * 0.2 + 0.1 }}
          className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 z-10
                    flex items-center justify-center"
        >
          <Icon size={16} className="text-white" />
          
          {/* Glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-purple-500"
            animate={{ opacity: [0.7, 0.2, 0.7], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: "blur(5px)" }}
          />
        </motion.div>
        
        {!isLast && (
          <motion.div 
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            className="w-0.5 bg-gradient-to-b from-purple-500 to-transparent h-full mt-1"
          />
        )}
      </div>
      
      {/* Content */}
      <div className="pb-10">
        <div className="flex flex-col mb-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
            className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono w-fit"
          >
            {year}
          </motion.div>
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
            className="font-bold text-lg mt-1"
          >
            {title}
          </motion.h4>
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.25 }}
              className="text-sm text-blue-300 mb-1"
            >
              {subtitle}
            </motion.div>
          )}
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className="text-gray-400 text-sm"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}

// New component for interest item with animation
const InterestItem = ({ text, index }: { text: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                 px-3 py-2 rounded-full text-sm backdrop-blur-sm border border-white/10 shadow-lg"
    >
      <CheckCircle2 size={14} className="text-purple-400" />
      <span>{text}</span>
    </motion.div>
  )
}

// Certification item component
const CertificationItem = ({ title, issuer, date, index }: { 
  title: string, 
  issuer: string, 
  date: string, 
  index: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 5 }}
      className="glass rounded-lg p-4 hover:bg-white/5 transition-colors"
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          className="mt-1 text-cyan-400"
        >
          <FileCheck size={18} />
        </motion.div>
        <div>
          <h4 className="font-medium text-gray-200">{title}</h4>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-blue-300">{issuer}</span>
            <span className="text-xs text-gray-400 font-mono">{date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number, y: number, delay: number }>>([])
  const aboutRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const isEducationInView = useInView(educationRef, { once: true, margin: "-100px" })
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Track mouse movement for interactive effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!aboutRef.current) return
    
    const rect = aboutRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }
  
  // Generate particle positions on component mount
  useEffect(() => {
    const positions = Array.from({ length: 15 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      delay: Math.random() * 5
    }))
    setParticlePositions(positions)
  }, [])
  
  // Education data
  const education = [
    {
      year: "May 2024 - April 2025",
      title: "Bachelor of Science (Hons) in Software Engineering",
      subtitle: "SLIIT City Uni / University of Bedfordshire",
      description: "Currently pursuing my degree with a focus on advanced software development and system architecture.",
      icon: GraduationCap
    },
    {
      year: "January 2021 - March 2024",
      title: "Higher Diploma in Information Technology (HND)",
      subtitle: "SLIIT City Uni",
      description: "Specialized in software development and database management systems.",
      icon: BookOpen
    },
    {
      year: "January 2020 - December 2020",
      title: "Foundation Certificate in Information Technology (FCIT)",
      subtitle: "SLIIT City Uni",
      description: "Completed fundamental courses in programming, web development, and computer systems.",
      icon: Building2
    },
    {
      year: "January 2005 - January 2019",
      title: "G.C.E. Advanced Level / G.C.E. Ordinary Level",
      subtitle: "St. John College",
      description: "Completed secondary education with a focus on mathematics and science subjects.",
      icon: School
    }
  ]
  
  return (
    <section 
      id="about" 
      className="py-20 relative overflow-hidden"
      ref={aboutRef}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ 
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(30,27,75,0) 70%)",
            filter: "blur(40px)",
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ 
            background: "radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(30,27,75,0) 70%)",
            filter: "blur(40px)",
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Code symbol elements */}
        <div className="absolute inset-0 overflow-hidden">
          {["</>", "{}", "[]", "=>", "//"].map((symbol, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="absolute text-xs md:text-sm font-mono opacity-10"
              style={{ 
                top: `${15 + i * 20}%`, 
                left: `${5 + i * 18}%`,
                color: i % 2 === 0 ? "#8b5cf6" : "#3b82f6"
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 5, 0, -5, 0]
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
        </div>
        
        {/* Particles that move towards mouse */}
        {particlePositions.map((pos, i) => (
          <Particle
            key={`particle-${i}`}
            size={3 + Math.random() * 4}
            color={i % 2 === 0 ? "rgba(139, 92, 246, 0.6)" : "rgba(59, 130, 246, 0.6)"}
            x={pos.x}
            y={pos.y}
            delay={pos.delay}
          />
        ))}
        
        {/* Interactive glow that follows mouse */}
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(30,27,75,0) 70%)",
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            filter: "blur(30px)",
          }}
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
            About <span className="gradient-text relative">
              Me
              {/* Decorative elements around "Me" text */}
              <motion.div
                className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-purple-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 -left-1 w-1.5 h-1.5 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left content - Bio with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Animated highlight marks */}
            <motion.div
              className="absolute -left-5 top-0 w-2 h-full bg-gradient-to-b from-purple-500 to-transparent rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            
            <motion.div
              className="text-lg text-gray-600 dark:text-gray-400 mb-6 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I'm a recently graduated Software Engineer with a passion for creating innovative digital solutions. 
              My journey in tech has been driven by curiosity and a desire to build applications that make a real difference.
              
              {/* Highlight effect on keywords */}
              <motion.span
                className="absolute -inset-1 bg-purple-500/10 rounded-lg -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </motion.div>
            
            <motion.div
              className="text-lg text-gray-600 dark:text-gray-400 mb-6 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Specializing in full-stack development, I bring ideas to life using modern technologies. 
              My recent projects include an {" "}
              <AnimatedText text="AI-powered fitness app" color="purple" /> {" "}
              achieving 95% accuracy in activity tracking and a comprehensive {" "}
              <AnimatedText text="movie discovery platform" color="blue" /> {" "}
              with personalized recommendations.
            </motion.div>
            
            <motion.div
              className="text-lg text-gray-600 dark:text-gray-400 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
              or developing interactive games that combine education with entertainment.
            </motion.div>
            
            {/* Education timeline */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              ref={educationRef}
            >
              <div className="flex items-center gap-2 mb-6">
                <motion.div 
                  className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <GraduationCap size={16} className="text-purple-400" />
                </motion.div>
                <h3 className="font-bold text-xl">Education</h3>
              </div>
              
              <div className="ml-3">
                {education.map((item, index) => (
                  <TimelineItem 
                    key={index}
                    year={item.year}
                    title={item.title}
                    subtitle={item.subtitle}
                    description={item.description}
                    index={index}
                    icon={item.icon}
                    isLast={index === education.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Enhanced with better space utilization */}
          <div className="space-y-8">
            {/* Skill cards with increased size */}
            <div className="grid grid-cols-2 gap-6">
              <AnimatePresence>
                {highlights.map((item, index) => (
                  <Enhanced3DCard 
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    index={index}
                    color={item.color}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {/* Added interest tags section to better fill the space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl p-6 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={16} className="text-purple-400" />
                </motion.div>
                <h3 className="font-bold text-xl">Areas of Interest</h3>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                {interests.map((interest, index) => (
                  <InterestItem key={interest} text={interest} index={index} />
                ))}
              </div>
            </motion.div>
            
            {/* Certifications section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-xl p-6 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FileCheck size={16} className="text-purple-400" />
                </motion.div>
                <h3 className="font-bold text-xl">Certifications</h3>
              </div>
              
              <div className="space-y-3 mt-4">
                {certifications.map((cert, index) => (
                  <CertificationItem
                    key={cert.title}
                    title={cert.title}
                    issuer={cert.issuer}
                    date={cert.date}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Additional visual flair - rotating skill orbit */}
        <motion.div
          className="mt-16 relative h-40 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Center glow */}
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ filter: "blur(8px)" }}
          />
          
          <motion.div 
            className="absolute w-8 h-8 rounded-full bg-white z-20 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Brain size={20} className="text-purple-600" />
          </motion.div>
          
          {/* Orbiting elements */}
          {[
            { icon: Globe, color: "text-blue-400", delay: 0, distance: 60 },
            { icon: Code, color: "text-purple-400", delay: 2, distance: 80 },
            { icon: Rocket, color: "text-pink-400", delay: 4, distance: 100 },
            { icon: Star, color: "text-amber-400", delay: 6, distance: 120 },
            { icon: Zap, color: "text-green-400", delay: 8, distance: 140 }
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full glass ${item.color} flex items-center justify-center`}
              style={{ width: 30, height: 30 }}
              animate={{
                x: Array.from({ length: 72 }, (_, i) => 
                  Math.cos(i * 5 * (Math.PI / 180)) * item.distance
                ),
                y: Array.from({ length: 72 }, (_, i) => 
                  Math.sin(i * 5 * (Math.PI / 180)) * item.distance
                ),
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                times: Array.from({ length: 72 }, (_, i) => i / 71),
                delay: item.delay
              }}
            >
              <item.icon size={16} />
            </motion.div>
          ))}
          
          {/* Orbital rings */}
          {[60, 80, 100, 120, 140].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-dashed border-purple-500/20"
              style={{ width: size * 2, height: size * 2 }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced 3D card with depth effects and interactive animations
function Enhanced3DCard({ icon: Icon, title, description, index, color }: {
  icon: any,
  title: string,
  description: string,
  index: number,
  color: string
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / 15
    const y = (e.clientY - centerY) / 15
    
    setMousePosition({ x: -y, y: x }) // Invert for correct tilt direction
  }
  
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.05, z: 10 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`
      }}
      className="glass rounded-xl p-6 text-center h-full transition-all duration-200 relative overflow-hidden"
    >
      {/* Background glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0`}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content with 3D effect - items closer to viewer */}
      <motion.div
        animate={{ 
          z: isHovered ? 30 : 0,
          rotateX: mousePosition.x * 0.5,
          rotateY: mousePosition.y * 0.5
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        <motion.div
          className={`inline-flex p-3 rounded-full bg-gradient-to-r ${color} mb-4 relative`}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={24} className="text-white" />
          
          {/* Inner glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ 
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
              filter: "blur(2px)",
            }}
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.h3 
          className="font-semibold mb-2"
          style={{ transform: "translateZ(15px)" }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-sm text-gray-600 dark:text-gray-400"
          style={{ transform: "translateZ(10px)" }}
        >
          {description}
        </motion.p>
      </motion.div>
      
      {/* Floating particles that appear on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  filter: "blur(1px)",
                }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  animate={{ 
                    y: [-20, -40],
                    x: [0, (Math.random() - 0.5) * 20],
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 1 + Math.random() }}
                  className="w-full h-full"
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Corner highlight */}
      <motion.div
        className="absolute top-0 right-0 w-12 h-12 bg-white/10"
        style={{ 
          borderRadius: "0 0 0 100%",
          transform: "translateZ(5px)",
        }}
        animate={{ 
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Moving shine effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-xl"
        style={{ transform: "translateZ(2px)" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-20 h-full bg-white/10 -skew-x-12"
          animate={{ 
            x: isHovered ? ["0%", "100%"] : "-100%",
            opacity: isHovered ? [0, 0.3, 0] : 0
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}