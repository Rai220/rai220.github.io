import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'

gsap.registerPlugin(ScrollTrigger)

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics: string[]
  created_at: string
  updated_at: string
  pypi_downloads?: number
  pypi_rank?: string
}

interface ProjectsProps {
  repos: GitHubRepo[]
  projectsLoading: boolean
  t: {
    projects: {
      title: string
      loading: string
      noDescription: string
      pypiRank: string
      oldProject: string
    }
  }
}

export function Projects({ repos, projectsLoading, t }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    
    if (prefersReducedMotion || isMobile || !containerRef.current || !scrollRef.current || repos.length === 0) {
      return
    }

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth
      const containerWidth = containerRef.current!.offsetWidth

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - containerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth - containerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [repos])

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center font-mono">
            <span className="text-cyber-pink">&gt;_</span>{' '}
            <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.projects.title}</span>
          </h2>
        </Reveal>
      </div>

      {projectsLoading ? (
        <div className="text-center text-cyber-blue font-mono text-xl animate-pulse drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">
          {t.projects.loading}
        </div>
      ) : (
        <div ref={containerRef} className="relative">
          <div ref={scrollRef} className="flex gap-8 md:gap-12 pb-8">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[320px] md:w-[400px] group bg-gradient-to-br from-cyber-blue/5 to-black p-6 rounded border border-cyber-blue/50 hover:border-cyber-pink transition-all shadow-lg shadow-cyber-blue/20 hover:shadow-cyber-pink/50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-xl font-bold text-cyber-blue group-hover:text-cyber-pink mb-2 font-mono transition-colors drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_0_8px_rgba(255,0,110,0.4)]">
                  {repo.name}
                </h3>
                <p className="text-gray-300 mb-4 min-h-12 text-sm">
                  {repo.description || t.projects.noDescription}
                </p>
                {repo.name === 'gigachat' && repo.pypi_downloads && (
                  <div className="mb-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <img src="https://img.shields.io/pypi/dm/gigachat" alt="PyPI Downloads" className="h-5" />
                    </div>
                    <div className="text-xs text-cyber-pink font-mono bg-cyber-pink/10 px-2 py-1 rounded border border-cyber-pink/30 inline-block">
                      {t.projects.pypiRank}
                    </div>
                  </div>
                )}
                {repo.name === 'Telephoto' && (
                  <div className="mb-3">
                    <div className="text-xs text-yellow-500 font-mono bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/30 inline-block">
                      {t.projects.oldProject}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  {repo.language && (
                    <span className="text-sm text-cyber-pink font-mono">{repo.language}</span>
                  )}
                  <div className="flex items-center text-cyber-blue group-hover:text-cyber-pink transition-colors">
                    <span className="mr-1">⭐</span>
                    <span className="font-mono">{repo.stargazers_count}</span>
                  </div>
                </div>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-xs bg-cyber-pink/20 text-cyber-pink px-2 py-1 rounded border border-cyber-pink/50 font-mono hover:bg-cyber-pink/30 transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </motion.a>
            ))}
          </div>
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
      )}
    </section>
  )
}
