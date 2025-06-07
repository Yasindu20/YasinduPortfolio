'use client'

import { motion } from 'framer-motion'
import { skills } from '@/lib/data'

const skillCategories = [
  { name: 'Frontend', skills: skills.frontend, color: 'from-blue-400 to-purple-600' },
  { name: 'Backend', skills: skills.backend, color: 'from-green-400 to-blue-600' },
  { name: 'Database', skills: skills.database, color: 'from-yellow-400 to-orange-600' },
  { name: 'Tools', skills: skills.tools, color: 'from-pink-400 to-red-600' },
  { name: 'Other', skills: skills.other, color: 'from-purple-400 to-indigo-600' }, // Added this line
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className={`glass rounded-xl p-6 ${
                category.name === 'Other' ? 'md:col-span-2 max-w-md mx-auto' : ''
              }`}
            >
              <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 glass rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}