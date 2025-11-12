import { Reveal } from '../components/Reveal'
import { motion } from 'framer-motion'

interface AboutProps {
  user: {
    public_repos: number
    followers: number
  } | null
  telegramSubscribers: number
  youtubeSubscribers: number
  githubStats: {
    totalCommits: number
    totalPRs: number
    totalIssues: number
    contributedRepos: number
  }
  t: {
    about: {
      title: string
      cto: { title: string; description: string }
      exHead: { title: string; description: string }
      founder: { title: string; description: string }
      stats: {
        repositories: string
        followers: string
        tgSubscribers: string
        ytSubscribers: string
        commits: string
        prs: string
        issues: string
        contributedRepos: string
      }
    }
  }
}

export function About({ user, telegramSubscribers, youtubeSubscribers, githubStats, t }: AboutProps) {
  const cards = [
    {
      emoji: '🚀',
      title: t.about.cto.title,
      description: t.about.cto.description,
      color: 'cyber-blue',
    },
    {
      emoji: '💼',
      title: t.about.exHead.title,
      description: t.about.exHead.description,
      color: 'cyber-pink',
    },
    {
      emoji: '🤖',
      title: t.about.founder.title,
      description: t.about.founder.description,
      color: 'cyber-blue',
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-blue/30">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
            <span className="text-cyber-blue">&gt;_</span>{' '}
            <span className="drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">{t.about.title}</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.15}>
              <motion.div
                className={`group bg-gradient-to-br from-${card.color}/10 to-black p-6 rounded border border-${card.color} shadow-lg shadow-${card.color}/30 hover:shadow-${card.color}/60 hover:border-${card.color}/80 transition-all`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {card.emoji}
                </motion.div>
                <h3 className={`text-xl font-bold text-${card.color} mb-2 font-mono drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]`}>
                  {card.title}
                </h3>
                <p className="text-gray-300">{card.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {user && (
          <Reveal delay={0.5}>
            <div className="text-center">
              <div className="inline-flex flex-wrap justify-center gap-8 md:gap-12 text-gray-300">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                      {user.public_repos}
                    </div>
                    <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">
                      {t.about.stats.repositories}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-cyber-pink blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">
                      {user.followers}
                    </div>
                    <div className="text-cyber-pink uppercase text-sm tracking-widest font-mono">
                      {t.about.stats.followers}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                      {telegramSubscribers.toLocaleString()}
                    </div>
                    <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">
                      {t.about.stats.tgSubscribers}
                    </div>
                  </div>
                </motion.div>

                {youtubeSubscribers > 0 && (
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-cyber-pink blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">
                        {youtubeSubscribers.toLocaleString()}
                      </div>
                      <div className="text-cyber-pink uppercase text-sm tracking-widest font-mono">
                        {t.about.stats.ytSubscribers}
                      </div>
                    </div>
                  </motion.div>
                )}

                {githubStats.totalCommits > 0 && (
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                        {githubStats.totalCommits.toLocaleString()}
                      </div>
                      <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">
                        {t.about.stats.commits}
                      </div>
                    </div>
                  </motion.div>
                )}

                {githubStats.totalPRs > 0 && (
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute inset-0 bg-cyber-pink blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">
                        {githubStats.totalPRs.toLocaleString()}
                      </div>
                      <div className="text-cyber-pink uppercase text-sm tracking-widest font-mono">
                        {t.about.stats.prs}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
