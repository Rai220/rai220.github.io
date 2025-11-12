import { useEffect, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '../components/MagneticButton'

const HeroCore3D = lazy(() => import('../components/HeroCore3D').then(m => ({ default: m.HeroCore3D })))

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  user: {
    avatar_url: string
    name: string
  } | null
  t: {
    hero: {
      systemInit: string
      position: string
      description: string
      experience: string
      github: string
      telegram: string
      youtube: string
    }
  }
}

export function Hero({ user, t }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current || !contentRef.current || !user) return

    const ctx = gsap.context(() => {
      const heroLines = sectionRef.current?.querySelectorAll('.hero-line')
      const heroAvatar = sectionRef.current?.querySelector('.hero-avatar')
      const hero3d = sectionRef.current?.querySelector('.hero-3d')
      const heroBgHue = sectionRef.current?.querySelector('.hero-bg-hue')

      if (!heroLines || heroLines.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      })

      tl.from(heroLines, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        ease: 'power2.out',
        immediateRender: false,
      })

      if (heroAvatar) {
        tl.from(heroAvatar, {
          scale: 0.95,
          ease: 'back.out(1.7)',
          immediateRender: false,
        }, 0.3)
      }

      if (hero3d) {
        tl.from(hero3d, {
          scale: 0.9,
          ease: 'power2.out',
          immediateRender: false,
        }, 0.5)
      }

      if (heroBgHue) {
        tl.to(heroBgHue, {
          filter: 'hue-rotate(90deg)',
          ease: 'none',
        }, 0)
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [user])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="hero-bg-hue fixed inset-0 bg-gradient-to-br from-[#0a0e27] via-black to-[#1a001f]"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMjQwLDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyber-blue rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyber-pink rounded-full opacity-10 blur-3xl"></div>

      <div ref={contentRef} className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div 
                className="hero-line text-cyber-blue font-mono text-sm mb-4 tracking-widest"
              >
                {t.hero.systemInit}
              </div>
              <h1 
                className="hero-line text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                  Konstantin Krestnikov
                </span>
              </h1>
              <p 
                className="hero-line text-2xl md:text-3xl text-cyber-pink mb-4 font-mono tracking-wide drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]"
              >
                {t.hero.position}
              </p>
              <p 
                className="hero-line text-xl text-gray-200 mb-4 leading-relaxed"
              >
                {t.hero.description}
              </p>
              <p 
                className="hero-line text-lg text-gray-400 mb-8"
              >
                {t.hero.experience}
              </p>
              <div 
                className="hero-line flex flex-wrap gap-4"
              >
                <MagneticButton
                  href="https://github.com/Rai220"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-black px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-blue/50 hover:shadow-cyber-blue/80 hover:scale-105 uppercase tracking-wider font-mono"
                >
                  <span className="relative z-10">{t.hero.github}</span>
                  <div className="absolute inset-0 bg-cyber-blue opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </MagneticButton>
                <MagneticButton
                  href="https://t.me/robofuture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-cyber-pink to-fuchsia-500 hover:from-fuchsia-400 hover:to-cyber-pink text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-pink/50 hover:shadow-cyber-pink/80 hover:scale-105 uppercase tracking-wider font-mono flex items-center gap-2"
                >
                  <span className="relative z-10 text-xl">✈️</span>
                  <span className="relative z-10">{t.hero.telegram}</span>
                  <div className="absolute inset-0 bg-cyber-pink opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </MagneticButton>
                <MagneticButton
                  href="https://www.youtube.com/@Rai220"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-red-500/50 hover:shadow-red-500/80 hover:scale-105 uppercase tracking-wider font-mono flex items-center gap-2"
                >
                  <span className="relative z-10 text-xl">📺</span>
                  <span className="relative z-10">{t.hero.youtube}</span>
                  <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </MagneticButton>
              </div>
            </div>
            <div className="flex flex-col items-center gap-8">
              {user && (
                <div 
                  className="hero-avatar relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-full blur-2xl opacity-60 animate-pulse"></div>
                  <div className="absolute inset-0 bg-cyber-blue rounded-full blur-xl opacity-40"></div>
                  <img
                    src={user.avatar_url}
                    alt="Konstantin Krestnikov"
                    className="relative rounded-full w-48 h-48 md:w-56 md:h-56 border-4 border-cyber-blue shadow-2xl shadow-cyber-blue/70 hover:border-cyber-pink hover:shadow-cyber-pink/70 transition-all duration-300"
                  />
                </div>
              )}
              <div className="hero-3d w-full">
                <Suspense fallback={<div className="h-[400px] md:h-[500px]" />}>
                  <HeroCore3D />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
