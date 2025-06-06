'use client'

import { motion } from 'framer-motion'
import { Code, Rocket, Users, Award } from 'lucide-react'

const highlights = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "Expertise in React, React Native, Node.js, and modern web technologies"
  },
  {
    icon: Rocket,
    title: "AI Integration",
    description: "Experience with TensorFlow.js and machine learning in mobile apps"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Agile methodology practitioner with strong communication skills"
  },
  {
    icon: Award,
    title: "Continuous Learning",
    description: "Recent Software Engineering graduate with multiple certifications"
  }
]

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              I'm a recently graduated Software Engineer with a passion for creating innovative digital solutions. 
              My journey in tech has been driven by curiosity and a desire to build applications that make a real difference.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Specializing in full-stack development, I bring ideas to life using modern technologies like React, 
              React Native, and Node.js. My recent projects include an AI-powered fitness app achieving 95% accuracy 
              in activity tracking and a comprehensive movie discovery platform with personalized recommendations.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
              or developing interactive games that combine education with entertainment.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-6 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-3 rounded-full bg-purple-500/20 text-purple-400 mb-4"
                >
                  <item.icon size={24} />
                </motion.div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}