'use client'

import { useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import ProjectGallery from './ProjectGallery'
import ProjectCard from './ProjectCard'

// Projects component with performance optimizations
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  
  // Use useCallback for stable function references
  const openGallery = useCallback((projectId: number) => {
    setSelectedProject(projectId)
  }, [])
  
  const closeGallery = useCallback(() => {
    setSelectedProject(null)
  }, [])
  
  // Memoize this function since it's passed as prop
  const getProjectImages = useCallback((projectId: number) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return []
    
    // Use the images array from the project data
    return project.images || [project.image]
  }, [])

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }} // Added margin for earlier loading
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcasing my best work in web development, mobile apps, and game development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tech={project.tech}
              image={project.image}
              features={project.features}
              githubUrl={project.githubUrl}
              onOpenGallery={openGallery}
            />
          ))}
        </div>
      </div>
      
      {/* Project Gallery Modal - Only render when needed */}
      {selectedProject !== null && (
        <ProjectGallery
          isOpen={selectedProject !== null}
          onClose={closeGallery}
          images={getProjectImages(selectedProject)}
          title={projects.find(p => p.id === selectedProject)?.title || ''}
        />
      )}
    </section>
  )
}