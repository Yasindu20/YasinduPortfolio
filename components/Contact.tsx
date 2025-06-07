'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { personalInfo } from '@/lib/data'

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-4 glass rounded-lg hover:bg-white/20 transition-all"
            >
              <Mail className="text-purple-400" size={24} />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600 dark:text-gray-400">{personalInfo.email}</p>
              </div>
            </motion.a>

            <motion.a
              href={`tel:${personalInfo.phone}`}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-4 glass rounded-lg hover:bg-white/20 transition-all"
            >
              <Phone className="text-purple-400" size={24} />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600 dark:text-gray-400">{personalInfo.phone}</p>
              </div>
            </motion.a>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-4 glass rounded-lg"
            >
              <MapPin className="text-purple-400" size={24} />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-600 dark:text-gray-400">{personalInfo.location}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              // Handle form submission
              alert('Thanks for reaching out! I\'ll get back to you soon.')
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 glass rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 glass rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-purple-400"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="w-full px-4 py-3 glass rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium flex items-center justify-center gap-2 neon-glow transition-all"
            >
              Send Message <Send size={20} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}