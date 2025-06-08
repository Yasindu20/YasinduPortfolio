'use client'

import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { skills } from '@/lib/data'
import { Compass, Server, Database, Wrench, Cpu, Zap, Star } from 'lucide-react'

// Define skill proficiency levels (out of 100)
const skillProficiency: Record<string, number> = {
  // Frontend
  "React": 95,
  "React Native": 90,
  "JavaScript": 95,
  "TypeScript": 85,
  "Next.js": 90,
  "Tailwind CSS": 92,
  "HTML5": 98,
  "CSS3": 95,
  
  // Backend
  "Node.js": 88,
  "Express.js": 86,
  "PHP": 75,
  "Java": 70,
  "RESTful APIs": 92,
  
  // Database
  "Firebase": 88,
  "MongoDB": 85,
  "MySQL": 80,
  
  // Tools
  "Git": 90,
  "GitHub": 92,
  "VS Code": 95,
  "Postman": 85,
  "Android Studio": 75,
  
  // Other
  "Machine Learning": 65,
  "TensorFlow.js": 70,
  "Agile": 85,
  "CI/CD": 75,
}

// Memoize category icons to prevent recreation
const categoryIcons = {
  "Frontend": Compass,
  "Backend": Server,
  "Database": Database,
  "Tools": Wrench,
  "Other": Cpu
}

interface SkillCategoryProps {
  name: string;
  skills: string[];
  color: string;
  isActive: boolean;
  onClick: () => void;
}

// Memoized skill card component
const SkillCard = memo(function SkillCard({ 
  skill, 
  index, 
  isVisible, 
  category 
}: { 
  skill: string; 
  index: number; 
  isVisible: boolean; 
  category: string 
}) {
  const [hover, setHover] = useState(false)
  const proficiency = skillProficiency[skill] || 70
  
  // Progress animation control
  const controls = useAnimation()
  
  useEffect(() => {
    if (isVisible) {
      controls.start({
        width: `${proficiency}%`,
        transition: { 
          duration: 1.5,
          delay: 0.2 + (index * 0.1),
          ease: [0.33, 1, 0.68, 1]  // Custom easing for a spring-like effect
        }
      })
    }
  }, [isVisible, index, proficiency, controls])
  
  // Get color based on category - memoized
  const getGradient = useMemo(() => {
    switch(category) {
      case 'Frontend': return 'from-blue-400 to-purple-600'
      case 'Backend': return 'from-green-400 to-blue-600'
      case 'Database': return 'from-yellow-400 to-orange-600'
      case 'Tools': return 'from-pink-400 to-red-600'
      case 'Other': return 'from-purple-400 to-indigo-600'
      default: return 'from-blue-400 to-purple-600'
    }
  }, [category])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.05, z: 20 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="relative glass rounded-lg p-4 w-full h-[110px] overflow-hidden transition-all will-change-transform"
    >
      {/* Background glow */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${getGradient} opacity-0 transition-opacity`}
        animate={{ opacity: hover ? 0.15 : 0 }}
      />
      
      {/* Skill name and icon */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-lg">{skill}</h4>
        <motion.div
          animate={{ rotate: hover ? 360 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Zap size={16} className="text-purple-500" />
        </motion.div>
      </div>
      
      {/* Proficiency bar */}
      <div className="h-3 w-full bg-gray-700/30 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full rounded-full bg-gradient-to-r ${getGradient}`}
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
      
      {/* Proficiency percentage */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>Proficiency</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5 + (index * 0.1) }}
          className="font-mono"
        >
          {proficiency}%
        </motion.span>
      </div>
      
      {/* Decorative element */}
      <motion.div
        className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br opacity-30"
        style={{ 
          backgroundImage: `radial-gradient(circle, ${hover ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.1)'} 0%, transparent 70%)`,
        }}
        animate={{ 
          scale: hover ? [1, 1.2, 1] : 1
        }}
        transition={{ 
          duration: 2, 
          repeat: hover ? Infinity : 0,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  )
})

// Memoized category tab component
const CategoryTab = memo(function CategoryTab({ 
  name, 
  skills, 
  color, 
  isActive, 
  onClick 
}: SkillCategoryProps) {
  const Icon = categoryIcons[name as keyof typeof categoryIcons]
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`cursor-pointer rounded-xl py-3 px-5 flex items-center gap-2 transition-all ${
        isActive 
          ? `bg-gradient-to-r ${color} text-white shadow-lg neon-glow` 
          : 'glass hover:bg-white/20'
      }`}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: isActive ? [0, 360] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={18} />
      </motion.div>
      <span className="font-medium">{name}</span>
      <motion.span 
        className="ml-1 text-xs py-0.5 px-2 rounded-full bg-white/20"
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {skills.length}
      </motion.span>
    </motion.div>
  )
})

// Optimized floating animation component
const FloatingParticle = memo(function FloatingParticle({ delay = 0 }: { delay?: number }) {
  const [position, setPosition] = useState<number>(0)
  
  // Only run on client-side after initial render
  useEffect(() => {
    // Use a deterministic position instead of random for better SSR compatibility
    setPosition(30 + (delay * 40) % 70)
  }, [delay])
  
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [0, -100, -200], 
        opacity: [0, 1, 0],
        scale: [0, 1, 0.5]
      }}
      transition={{ 
        duration: 8,
        delay: delay,
        repeat: Infinity,
        repeatType: "loop"
      }}
      className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-transparent blur-sm will-change-transform"
      style={{ left: position ? `${position}%` : "50%" }}
    />
  )
})

// Memoized skill radar chart
const SkillRadarChart = memo(function SkillRadarChart() {
  // Get average proficiency for each category - memoized
  const getAverage = useCallback((skills: string[]) => {
    return Math.round(skills.reduce((acc, skill) => acc + (skillProficiency[skill] || 0), 0) / skills.length)
  }, [])
  
  // Memoize categories to prevent recalculation
  const categories = useMemo(() => [
    { name: "Frontend", value: getAverage(skills.frontend) },
    { name: "Backend", value: getAverage(skills.backend) },
    { name: "Database", value: getAverage(skills.database) },
    { name: "Tools", value: getAverage(skills.tools) },
    { name: "Other", value: getAverage(skills.other) }
  ], [getAverage])
  
  // Calculate polygon points - memoized
  const calculatePoints = useMemo(() => {
    const points = []
    const centerX = 150
    const centerY = 150
    const radius = 120
    
    for (let i = 0; i < categories.length; i++) {
      const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
      const value = categories[i].value / 100
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)
      points.push(`${x},${y}`)
    }
    
    return points.join(' ')
  }, [categories])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Background circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <motion.circle
            key={i}
            cx="150"
            cy="150"
            r={120 * scale}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          />
        ))}
        
        {/* Category lines */}
        {categories.map((category, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
          const lineX = 150 + 140 * Math.cos(angle)
          const lineY = 150 + 140 * Math.sin(angle)
          return (
            <motion.line
              key={i}
              x1="150"
              y1="150"
              x2={lineX}
              y2={lineY}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          )
        })}
        
        {/* Skill plot */}
        <motion.polygon
          points={calculatePoints}
          fill="rgba(124, 58, 237, 0.2)"
          stroke="rgba(124, 58, 237, 0.8)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        
        {/* Data points */}
        {categories.map((category, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
          const value = category.value / 100
          const x = 150 + 120 * value * Math.cos(angle)
          const y = 150 + 120 * value * Math.sin(angle)
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="#8B5CF6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 1.2 + (i * 0.1) }}
              className="neon-glow"
            />
          )
        })}
        
        {/* Category labels */}
        {categories.map((category, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2
          const labelRadius = 145
          const x = 150 + labelRadius * Math.cos(angle)
          const y = 150 + labelRadius * Math.sin(angle)
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + (i * 0.1) }}
            >
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                className="select-none"
              >
                {category.name}
              </text>
              <text
                x={x}
                y={y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#A78BFA"
                fontSize="10"
                className="select-none"
              >
                {category.value}%
              </text>
            </motion.g>
          )
        })}
      </svg>
    </motion.div>
  )
})

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("Frontend")
  const skillsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(skillsRef, { once: false, amount: 0.2 })
  const controls = useAnimation()
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Memoize skill categories to prevent recreation on each render
  const skillCategories = useMemo(() => [
    { name: 'Frontend', skills: skills.frontend, color: 'from-blue-400 to-purple-600' },
    { name: 'Backend', skills: skills.backend, color: 'from-green-400 to-blue-600' },
    { name: 'Database', skills: skills.database, color: 'from-yellow-400 to-orange-600' },
    { name: 'Tools', skills: skills.tools, color: 'from-pink-400 to-red-600' },
    { name: 'Other', skills: skills.other, color: 'from-purple-400 to-indigo-600' },
  ], [])
  
  // Memoize active skills
  const activeSkills = useMemo(() => 
    skillCategories.find(cat => cat.name === activeCategory)?.skills || [],
  [skillCategories, activeCategory])

  // Create category click handler with useCallback
  const handleCategoryClick = useCallback((categoryName: string) => {
    setActiveCategory(categoryName)
  }, [])
  
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Animated background elements - reduced number for better performance */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Reduced number of particles */}
          {[...Array(5)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 2} />
          ))}
          
          {/* Gradient orb */}
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl will-change-transform"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl will-change-transform"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [180, 90, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Technologies I use to bring ideas to life
          </motion.p>
        </motion.div>

        <div className="flex flex-col space-y-12" ref={skillsRef}>
          {/* Category tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate={controls}
          >
            {skillCategories.map((category) => (
              <CategoryTab
                key={category.name}
                name={category.name}
                skills={category.skills}
                color={category.color}
                isActive={activeCategory === category.name}
                onClick={() => handleCategoryClick(category.name)}
              />
            ))}
          </motion.div>

          {/* Main content section */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Skills grid with 3D effects */}
            <div>
              <h3 className="text-2xl font-bold mb-6 ml-2">
                <motion.span
                  className={`bg-gradient-to-r ${skillCategories.find(c => c.name === activeCategory)?.color} bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {activeCategory} Skills
                </motion.span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeSkills.map((skill, index) => (
                  <SkillCard
                    key={skill}
                    skill={skill}
                    index={index}
                    isVisible={isInView}
                    category={activeCategory}
                  />
                ))}
              </div>
            </div>
            
            {/* Skill radar chart visualization */}
            <motion.div 
              className="glass rounded-xl p-4 overflow-hidden h-[400px] relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <div className="absolute top-4 left-4">
                <h3 className="text-xl font-bold">Skill Overview</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Proficiency comparison</p>
              </div>
              
              {/* Decorative elements - reduced for better performance */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl will-change-transform"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              
              <SkillRadarChart />
              
              {/* Reduced number of animated stars for better performance */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ 
                    top: `${20 + (i * 20)}%`, 
                    right: `${10 + (i * 6)}%`,
                    zIndex: 5
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  <Star size={i % 2 === 0 ? 16 : 12} className="text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* "More coming soon" section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex glass px-6 py-3 rounded-full items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>More skills coming soon</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <Zap size={18} className="text-yellow-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}