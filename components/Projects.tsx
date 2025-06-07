'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import ProjectGallery from './ProjectGallery'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  
  const openGallery = (projectId: number) => {
    setSelectedProject(projectId)
  }
  
  const closeGallery = () => {
    setSelectedProject(null)
  }
  
  const getProjectImages = (projectId: number) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return []
    
    // Use the images array from the project data
    return project.images || [project.image]
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
      
      {/* Project Gallery Modal */}
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