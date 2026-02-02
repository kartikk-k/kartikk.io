'use client'

import Link from 'next/link';
import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function page() {
  const works = [
    {
      title: "Supermemory",
      description: "#1 Product of the Day · 9k+ Github stars",
      role: "Team member",
      link: "https://www.producthunt.com/products/supermemory"
    },
    {
      title: "Aura Checker",
      description: "Mentioned and used by team at Groq.com",
      role: "UI Design & Frontend",
      link: "https://x.com/GroqInc/status/1890086837903151607"
    },
    {
      title: "Stitionai / Devika",
      description: "Backed by Y Combinator · 19.1k+ Github stars",
      role: "Contributor - UI Design & Frontend",
      link: "https://github.com/stitionai/devika"
    },
    {
      title: "Repochat",
      description: "Code context for LLMs directly from GitHub repositories",
      role: "Open Source Project",
      link: "https://peerlist.io/kartikk/project/repochat"
    },
    {
      title: "VisionOS Cricket",
      description: "Concept - experiencing cricket/sports on Apple VisionOS",
      role: "Project",
      link: "https://github.com/kartikk-k/visionOS-cricket"
    }
  ];

  return (
    <div className='min-h-screen w-full bg-[#FAF9F6] text-[#0F0F0F]'>
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md'
      >
        <div className='max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between'>
          <Link href='/' className='text-lg font-medium tracking-tight'>
            kartikk
          </Link>
          <div className='flex items-center gap-8'>
            <Link href='/designs' className='text-sm hover:opacity-60 transition-opacity'>
              Work
            </Link>
            <Link href='https://github.com/kartikk-k' target='_blank' className='text-sm hover:opacity-60 transition-opacity'>
              Github
            </Link>
            <Link
              href='https://cal.com/kartik-khorwal-bjlmzq/30min'
              target='_blank'
              className='text-sm px-4 py-2 bg-[#0F0F0F] text-[#FAF9F6] hover:bg-[#2A2A2A] transition-colors'
            >
              Get in touch
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className='min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24'>
        <div className='max-w-7xl mx-auto w-full'>
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className='max-w-4xl'
          >
            <motion.p
              variants={fadeInUp}
              className='text-sm md:text-base text-[#6B6B6B] mb-6'
            >
              Design Engineer
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className='text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-8'
            >
              Building exceptional products that blend creativity with strong engineering
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className='text-lg md:text-xl text-[#6B6B6B] max-w-2xl mb-12'
            >
              I design, craft user experiences, build things very quickly and ship often.
              Currently working at Legix as a Founding Design Engineer.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className='flex items-center gap-4'
            >
              <Link
                href='https://cal.com/kartik-khorwal-bjlmzq/30min'
                target='_blank'
                className='inline-flex items-center gap-2 px-6 py-3 bg-[#0F0F0F] text-[#FAF9F6] text-sm hover:bg-[#2A2A2A] transition-colors'
              >
                Schedule a call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href='https://x.com/kartik_builds'
                target='_blank'
                className='inline-flex items-center gap-2 px-6 py-3 border border-[#0F0F0F]/20 text-sm hover:border-[#0F0F0F]/40 transition-colors'
              >
                Twitter/X
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className='absolute bottom-12 left-1/2 -translate-x-1/2'
        >
          <div className='flex flex-col items-center gap-2 text-[#6B6B6B]'>
            <span className='text-xs tracking-wider uppercase'>Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className='w-px h-8 bg-[#0F0F0F]/30'
            />
          </div>
        </motion.div>
      </section>

      {/* Selected Work */}
      <section className='py-32 px-6 md:px-12'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className='text-sm text-[#6B6B6B] mb-4'>Selected Work</p>
            <h2 className='text-3xl md:text-4xl font-medium tracking-tight mb-16'>
              Highlighted projects
            </h2>
          </motion.div>

          <div className='space-y-0'>
            {works.map((work, index) => (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={work.link}
                  target='_blank'
                  className='group block py-8 border-t border-[#0F0F0F]/10 hover:bg-[#0F0F0F]/[0.02] transition-colors -mx-6 px-6 md:-mx-8 md:px-8'
                >
                  <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-4 mb-2'>
                        <h3 className='text-xl md:text-2xl font-medium group-hover:opacity-70 transition-opacity'>
                          {work.title}
                        </h3>
                        <span className='text-xs text-[#6B6B6B] px-2 py-1 bg-[#0F0F0F]/5 rounded-full'>
                          {work.role}
                        </span>
                      </div>
                      <p className='text-[#6B6B6B]'>
                        {work.description}
                      </p>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-[#6B6B6B] group-hover:text-[#0F0F0F] transition-colors'>
                      <span>View project</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className='group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'
                      >
                        <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mt-16'
          >
            <Link
              href='/designs'
              className='inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity'
            >
              View all work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className='py-32 px-6 md:px-12 bg-[#0F0F0F] text-[#FAF9F6]'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className='grid md:grid-cols-2 gap-16 md:gap-24'
          >
            <div>
              <p className='text-sm text-[#FAF9F6]/60 mb-4'>About</p>
              <h2 className='text-3xl md:text-4xl font-medium tracking-tight'>
                Passionately designing web app experiences
              </h2>
            </div>
            <div className='space-y-6 text-[#FAF9F6]/80'>
              <p className='text-lg'>
                I specialize in creating digital experiences that are both beautiful and functional.
                My approach combines thoughtful design with robust engineering to build products that users love.
              </p>
              <p>
                With a focus on rapid iteration and shipping, I help teams move from concept to
                production quickly without compromising on quality.
              </p>
              <div className='pt-8'>
                <Link
                  href='https://github.com/kartikk-k'
                  target='_blank'
                  className='inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity'
                >
                  Check out my Github
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='py-32 px-6 md:px-12'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className='text-center max-w-3xl mx-auto'
          >
            <p className='text-sm text-[#6B6B6B] mb-4'>Get in touch</p>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8'>
              Let&apos;s work together
            </h2>
            <p className='text-lg text-[#6B6B6B] mb-12'>
              Have a project in mind? I&apos;d love to hear about it. Schedule a call or drop me a message.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link
                href='https://cal.com/kartik-khorwal-bjlmzq/30min'
                target='_blank'
                className='inline-flex items-center gap-2 px-8 py-4 bg-[#0F0F0F] text-[#FAF9F6] hover:bg-[#2A2A2A] transition-colors'
              >
                Schedule a call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href='mailto:hello@kartikk.io'
                className='inline-flex items-center gap-2 px-8 py-4 border border-[#0F0F0F]/20 hover:border-[#0F0F0F]/40 transition-colors'
              >
                Send an email
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-12 px-6 md:px-12 border-t border-[#0F0F0F]/10'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-sm text-[#6B6B6B]'>
            © 2025 kartikk. All rights reserved.
          </p>
          <div className='flex items-center gap-8'>
            <Link href='https://x.com/kartik_builds' target='_blank' className='text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors'>
              Twitter
            </Link>
            <Link href='https://github.com/kartikk-k' target='_blank' className='text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors'>
              Github
            </Link>
            <Link href='https://www.linkedin.com/in/kartik-khorwal' target='_blank' className='text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors'>
              LinkedIn
            </Link>
            <Link href='https://layers.to/kartikk' target='_blank' className='text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors'>
              Layers
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page
