import { useEffect, useState } from 'react'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Reveal } from './components/Reveal'
import { MagneticButton } from './components/MagneticButton'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { motion } from 'framer-motion'

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

interface GitHubUser {
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  html_url: string
}

interface GitHubStats {
  totalCommits: number
  totalPRs: number
  totalIssues: number
  contributedRepos: number
}

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  url: string
  publishedAt: string
}

interface TelegramPost {
  id: number
  text: string
  date: string
  views: number
}

type Language = 'ru' | 'en'

const translations = {
  ru: {
    nav: {
      about: 'Обо мне',
      projects: 'Проекты',
      blog: 'Блог',
      contact: 'Контакты'
    },
    hero: {
      systemInit: '> SYSTEM.INIT()',
      position: 'CTO GIGACHAIN (GigaChat Agents and Dev tools)',
      description: 'Руковожу разработкой GigaChain — набора инструментов для работы с GigaChat. Создаю будущее интеллектуальных систем.',
      experience: 'Ex-Head of AI в The Coach | Head of AI и основатель Cubic.ai. Специализируюсь на AI агентах, LLM приложениях и робототехнике.',
      github: 'GitHub',
      telegram: 'Telegram канал',
      youtube: 'YouTube'
    },
    about: {
      title: 'ОБО МНЕ',
      cto: {
        title: 'CTO GIGACHAIN',
        description: 'Руковожу разработкой GigaChain в GigaChat - набора инструментов для работы с GigaChat. Создаю передовые LLM-приложения и интеллектуальные системы.'
      },
      founder: {
        title: 'СО-ОСНОВАТЕЛЬ & HEAD OF AI',
        description: 'Head of AI и сооснователь Cubic.ai - первого в мире AI-голосового спикера. Пионер в робототехнике, нейротехнологиях и будущем AI.'
      },
      exHead: {
        title: 'EX-HEAD OF AI',
        description: 'Бывший Head of AI в The Coach. Руководил AI-инициативами и разрабатывал интеллектуальные решения для коучинга.'
      },
      stats: {
        repositories: 'Репозитории',
        followers: 'Подписчики GitHub',
        tgSubscribers: 'Подписчики TG',
        ytSubscribers: 'Подписчики YT',
        commits: 'Коммиты GitHub',
        prs: 'Pull Requests',
        issues: 'Issues',
        contributedRepos: 'Репозитории с вкладом'
      }
    },
    projects: {
      title: 'ИЗБРАННЫЕ ПРОЕКТЫ',
      loading: 'ЗАГРУЗКА_ПРОЕКТОВ...',
      noDescription: 'Описание отсутствует',
      pypiRank: '🏆 Топ 2% всех Python пакетов в мире',
      oldProject: '⚠️ Старый проект'
    },
    youtube: {
      title: 'YOUTUBE КАНАЛ',
      subscribers: 'подписчиков'
    },
    blog: {
      title: 'БЛОГ ROBOFUTURE',
      channelName: 'ROBOFUTURE',
      subscribers: 'подписчиков',
      description: 'Авторский канал о последних достижениях в мире AI, ML, робототехники и нейротехнологий. Прогнозы и комментарии от разработчика в этой области, никаких репостов новостей и...',
      subscribe: 'Подписаться',
      latestPosts: 'ПОСЛЕДНИЕ ПОСТЫ',
      views: 'просмотров'
    },
    contact: {
      title: 'СВЯЗАТЬСЯ СО МНОЙ',
      email: 'Email',
      telegram: 'Telegram',
      github: 'GitHub',
      linkedin: 'LinkedIn'
    },
    habr: {
      title: 'СТАТЬИ НА HABR',
      profile: 'Профиль на Habr',
      articles: 'статей'
    },
    footer: {
      rights: 'Агентарии всех стран соединяйся!',
      built: 'Создано с React + TypeScript + Tailwind CSS'
    }
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      contact: 'Contact'
    },
    hero: {
      systemInit: '> SYSTEM.INIT()',
      position: 'CTO GIGACHAIN (GigaChat Agents and Dev tools)',
      description: 'Leading the development of GigaChain — a toolkit for working with GigaChat. Building the future of intelligent systems.',
      experience: 'Ex-Head of AI at The Coach | Head of AI and founder at Cubic.ai. Specializing in AI Agents, LLM Applications, and Robotics.',
      github: 'GitHub',
      telegram: 'Telegram Channel',
      youtube: 'YouTube'
    },
    about: {
      title: 'ABOUT ME',
      cto: {
        title: 'CTO GIGACHAIN',
        description: 'Leading the development of GigaChain at GigaChat - a toolkit for working with GigaChat. Building cutting-edge LLM-powered applications and intelligent systems.'
      },
      founder: {
        title: 'CO-FOUNDER & HEAD OF AI',
        description: 'Head of AI and co-founder at Cubic.ai - the world\'s first AI-powered voice speaker. Pioneering robotics, neurotechnology, and the future of AI.'
      },
      exHead: {
        title: 'EX-HEAD OF AI',
        description: 'Former Head of AI at The Coach. Led AI initiatives and developed intelligent coaching solutions.'
      },
      stats: {
        repositories: 'Repositories',
        followers: 'GitHub Followers',
        tgSubscribers: 'TG Subscribers',
        ytSubscribers: 'YT Subscribers',
        commits: 'GitHub Commits',
        prs: 'Pull Requests',
        issues: 'Issues',
        contributedRepos: 'Contributed Repos'
      }
    },
    projects: {
      title: 'FEATURED PROJECTS',
      loading: 'LOADING_PROJECTS...',
      noDescription: 'No description available',
      pypiRank: '🏆 Top 2% of all Python packages worldwide',
      oldProject: '⚠️ Old Project'
    },
    youtube: {
      title: 'YOUTUBE CHANNEL',
      subscribers: 'subscribers'
    },
    blog: {
      title: 'ROBOFUTURE BLOG',
      channelName: 'ROBOFUTURE',
      subscribers: 'subscribers',
      description: 'Author\'s channel about the latest achievements in AI, ML, robotics and neurotechnology. Forecasts and comments from a developer in this field, no news reposts and...',
      subscribe: 'Subscribe',
      latestPosts: 'LATEST POSTS',
      views: 'views'
    },
    contact: {
      title: 'GET IN TOUCH',
      email: 'Email',
      telegram: 'Telegram',
      github: 'GitHub',
      linkedin: 'LinkedIn'
    },
    habr: {
      title: 'ARTICLES ON HABR',
      profile: 'Habr Profile',
      articles: 'articles'
    },
    footer: {
      rights: 'Агентарии всех стран соединяйся!',
      built: 'Built with React + TypeScript + Tailwind CSS'
    }
  }
}

function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [telegramPosts, setTelegramPosts] = useState<TelegramPost[]>([])
  const [telegramSubscribers] = useState<number>(1157)
  const [youtubeSubscribers] = useState<number>(1000)
  const [language, setLanguage] = useState<Language>('ru')
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    contributedRepos: 0
  })
  
  const t = translations[language]
  
  const youtubeVideos: YouTubeVideo[] = [
    {
      id: 's3Ynz436Swc',
      title: '🤖Универсальный агент = ReAct + REPL',
      thumbnail: 'https://i.ytimg.com/vi/s3Ynz436Swc/mqdefault.jpg',
      url: 'https://youtu.be/s3Ynz436Swc',
      publishedAt: '2025-09-13T00:00:00Z'
    },
    {
      id: 'kwpBP2-ZtAc',
      title: 'MCP и Think-Tool: добавляем мышление и инструменты любому AI-агенту',
      thumbnail: 'https://i.ytimg.com/vi/kwpBP2-ZtAc/mqdefault.jpg',
      url: 'https://youtu.be/kwpBP2-ZtAc',
      publishedAt: '2025-07-02T00:00:00Z'
    },
    {
      id: '9QXRAC8G89I',
      title: 'AI агенты - что это и как их делать (GigaConf)',
      thumbnail: 'https://i.ytimg.com/vi/9QXRAC8G89I/mqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=9QXRAC8G89I',
      publishedAt: '2024-12-28T00:00:00Z'
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/Rai220')
        const userData = await userResponse.json()
        setUser(userData)

        const repoNames = ['gigachat', 'gigachain', 'langchain-gigachat', 'giga_agent']
        const repoPromises = repoNames.map(name => 
          fetch(`https://api.github.com/repos/ai-forever/${name}`).then(r => r.json())
        )
        const telepotoPromise = fetch('https://api.github.com/repos/Rai220/Telephoto').then(r => r.json())
        const reposData = await Promise.all([...repoPromises, telepotoPromise])
        
        try {
          const pypiResponse = await fetch('https://pypistats.org/api/packages/gigachat/recent')
          const pypiData = await pypiResponse.json()
          const gigachatIndex = reposData.findIndex(r => r.name === 'gigachat')
          if (gigachatIndex !== -1 && pypiData.data) {
            reposData[gigachatIndex].pypi_downloads = pypiData.data.last_month || 0
            reposData[gigachatIndex].pypi_rank = 'Top 2%'
          }
        } catch (error) {
          console.error('Error fetching PyPI stats:', error)
        }
        
        setRepos(reposData)
        setProjectsLoading(false)

        const telegramChannel = 'robofuture'
        const getTelegramPosts = async () => {
          const urls = [
            `https://corsproxy.io/?${encodeURIComponent(`https://t.me/s/${telegramChannel}`)}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`https://t.me/s/${telegramChannel}`)}`,
            `https://t.me/s/${telegramChannel}`
          ]
          
          for (const url of urls) {
            try {
              const response = await fetch(url)
              const html = await response.text()
              
              const parser = new DOMParser()
              const doc = parser.parseFromString(html, 'text/html')
              const messages = Array.from(doc.querySelectorAll('.tgme_widget_message'))
              
              const parsed = messages.map((msg, index) => {
                const textEl = msg.querySelector('.tgme_widget_message_text, .tgme_widget_message_description, .tgme_widget_message_bubble')
                const dateEl = msg.querySelector('.tgme_widget_message_date time') || msg.querySelector('time')
                const viewsEl = msg.querySelector('.tgme_widget_message_views')
                
                const text = (textEl?.textContent || '').trim()
                const dateIso = dateEl?.getAttribute('datetime') || ''
                const sortKey = dateIso ? Date.parse(dateIso) : 0
                const views = parseInt((viewsEl?.textContent || '').replace(/\D/g, '') || '0', 10)
                
                return { id: index, text: text.slice(0, 200), date: dateIso, views, sortKey }
              }).filter(p => p.text.length > 0)
              
              parsed.sort((a, b) => b.sortKey - a.sortKey)
              
              if (parsed.length > 0) {
                return parsed.slice(0, 5)
              }
            } catch (error) {
              console.error('Telegram fetch error:', url, error)
            }
          }
          return []
        }
        
        try {
          const posts = await getTelegramPosts()
          setTelegramPosts(posts)
        } catch (error) {
          console.error('Error fetching Telegram data:', error)
        }

        try {
          const eventsResponse = await fetch('https://api.github.com/users/Rai220/events/public?per_page=100')
          const eventsData = await eventsResponse.json()
          
          let totalCommits = 0
          let totalPRs = 0
          const contributedReposSet = new Set<string>()
          
          eventsData.forEach((event: any) => {
            if (event.type === 'PushEvent') {
              totalCommits += event.payload.commits?.length || 0
              contributedReposSet.add(event.repo.name)
            } else if (event.type === 'PullRequestEvent') {
              totalPRs += 1
              contributedReposSet.add(event.repo.name)
            }
          })
          
          setGithubStats({
            totalCommits,
            totalPRs,
            totalIssues: 0,
            contributedRepos: contributedReposSet.size
          })
        } catch (error) {
          console.error('Error fetching GitHub stats:', error)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-cyber-dark relative">
      <CustomCursor />
      <ScrollProgress />
      
      <nav className="fixed top-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50 border-b border-cyber-blue shadow-lg shadow-cyber-blue/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-bold text-cyber-blue tracking-wider font-mono"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="text-cyber-pink">&lt;</span>
              <span className="hover:text-cyber-pink transition-colors">KK</span>
              <span className="text-cyber-pink">/&gt;</span>
            </motion.div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#about" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                <span className="relative z-10">{t.nav.about}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a href="#projects" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                <span className="relative z-10">{t.nav.projects}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a href="#blog" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                <span className="relative z-10">{t.nav.blog}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a href="#contact" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                <span className="relative z-10">{t.nav.contact}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <motion.button
                onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                className="text-cyber-pink hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(255,0,110,0.8)] px-3 py-1 border border-cyber-pink rounded hover:bg-cyber-pink/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'ru' ? 'EN' : 'RU'}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <Hero user={user} t={t} />
      <About 
        user={user} 
        telegramSubscribers={telegramSubscribers}
        youtubeSubscribers={youtubeSubscribers}
        githubStats={githubStats}
        t={t}
      />
      <Projects repos={repos} projectsLoading={projectsLoading} t={t} />

      {youtubeVideos.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-blue/30">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
                <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.youtube.title}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center mb-8">
                <a
                  href="https://www.youtube.com/c/Rai220/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-cyber-pink hover:text-white transition-colors"
                >
                  <span className="text-2xl">📺</span>
                  <span className="text-xl font-mono">{youtubeSubscribers.toLocaleString()} {t.youtube.subscribers}</span>
                </a>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youtubeVideos.map((video, index) => (
                <Reveal key={video.id} delay={index * 0.1}>
                  <motion.a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-br from-cyber-pink/5 to-black rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all shadow-lg shadow-cyber-pink/20 hover:shadow-cyber-blue/50 overflow-hidden"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-5xl">▶️</span>
                      </motion.div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-cyber-pink group-hover:text-cyber-blue mb-2 font-mono transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-pink/30">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-blue">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">{t.blog.title}</span>
            </h2>
          </Reveal>
          <div className="max-w-3xl mx-auto space-y-6">
            <Reveal delay={0.2}>
              <motion.div 
                className="bg-gradient-to-br from-cyber-pink/10 to-black p-8 rounded border border-cyber-pink shadow-lg shadow-cyber-pink/40"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 0, 110, 0.6)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-pink rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg shadow-cyber-pink/60 animate-pulse">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.blog.channelName}</h3>
                    <p className="text-cyber-blue font-mono text-sm">{telegramSubscribers.toLocaleString()} {t.blog.subscribers}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t.blog.description}
                </p>
                <MagneticButton
                  href="https://t.me/robofuture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block bg-gradient-to-r from-cyber-pink to-fuchsia-500 hover:from-fuchsia-400 hover:to-cyber-pink text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-pink/50 hover:shadow-cyber-pink/80 hover:scale-105 uppercase tracking-wider font-mono"
                >
                  <span className="relative z-10">{t.blog.subscribe}</span>
                  <div className="absolute inset-0 bg-cyber-pink opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </MagneticButton>
              </motion.div>
            </Reveal>
            
            {telegramPosts.length > 0 && (
              <div className="space-y-4">
                <Reveal delay={0.3}>
                  <h3 className="text-2xl font-bold text-cyber-blue font-mono text-center drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">{t.blog.latestPosts}</h3>
                </Reveal>
                {telegramPosts.map((post, index) => (
                  <Reveal key={post.id} delay={0.4 + index * 0.1}>
                    <motion.div
                      className="bg-gradient-to-br from-cyber-blue/5 to-black p-6 rounded border border-cyber-blue/50 hover:border-cyber-pink transition-all shadow-lg shadow-cyber-blue/20"
                      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)' }}
                    >
                      <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                        {post.text}
                        {post.text.length >= 200 && '...'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>👁️ {post.views.toLocaleString()} {t.blog.views}</span>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-blue/30">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.habr.title}</span>
            </h2>
          </Reveal>
          <div className="max-w-3xl mx-auto space-y-6">
            <Reveal delay={0.2}>
              <motion.div 
                className="bg-gradient-to-br from-cyber-blue/10 to-black p-8 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/40"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyber-pink to-fuchsia-500 rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg shadow-cyber-pink/60">
                    📝
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">Habr</h3>
                    <p className="text-cyber-pink font-mono text-sm">5 {t.habr.articles}</p>
                  </div>
                </div>
                <MagneticButton
                  href="https://habr.com/ru/users/Rai220/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-black px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-blue/50 hover:shadow-cyber-blue/80 hover:scale-105 uppercase tracking-wider font-mono"
                >
                  <span className="relative z-10">{t.habr.profile}</span>
                  <div className="absolute inset-0 bg-cyber-blue opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </MagneticButton>
              </motion.div>
            </Reveal>
            
            <div className="space-y-3">
              <Reveal delay={0.3}>
                <h3 className="text-2xl font-bold text-cyber-pink font-mono text-center drop-shadow-[0_0_10px_rgba(255,0,110,0.5)] mb-4">{t.habr.articles}</h3>
              </Reveal>
              
              {[
                { url: 'https://habr.com/ru/companies/sberbank/articles/941340/', title: 'Гайд: AI-агент на GigaChat и LangGraph (от архитектуры до валидации) на примере Lean Canvas', date: '4 сен 2024' },
                { url: 'https://habr.com/ru/companies/sberdevices/articles/794773/', title: 'Какой плащ был у Понтия Пилата? Отвечает GigaChat', date: '13 фев 2024' },
                { url: 'https://habr.com/ru/articles/724012/', title: 'Приделываем руки к ChatGPT: бот, который исполняет код в рантайме', date: '22 мар 2023', likes: 61, comments: 146 },
                { url: 'https://habr.com/ru/articles/712534/', title: 'Переносим свою картину мира в чат-бота на базе GPT-3', date: '24 янв 2023', likes: 45, comments: 38 },
                { url: 'https://habr.com/ru/articles/453314/', title: 'Черное Зеркало своими руками — обучаем бота на базе своей истории чатов', date: '19 июл 2019' },
              ].map((article, index) => (
                <Reveal key={article.url} delay={0.4 + index * 0.1}>
                  <motion.a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-cyber-pink/5 to-black p-4 rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all shadow-lg shadow-cyber-pink/20"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}
                  >
                    <h4 className="text-base font-bold text-cyber-pink mb-2 font-mono">{article.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                      {article.likes && <span>👍 {article.likes}</span>}
                      {article.comments && <span>💬 {article.comments}</span>}
                      <span>📅 {article.date}</span>
                    </div>
                  </motion.a>
                </Reveal>
              ))}

              <Reveal delay={0.9}>
                <div className="text-center pt-2">
                  <a
                    href="https://habr.com/ru/users/Rai220/articles/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-cyber-blue hover:text-cyber-pink transition font-mono text-sm"
                  >
                    Посмотреть все статьи на Habr →
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.contact.title}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.div 
              className="max-w-2xl mx-auto bg-gradient-to-br from-cyber-blue/10 to-black p-8 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/40"
              whileHover={{ boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' }}
            >
              <div className="space-y-6">
                {[
                  { icon: '📧', label: t.contact.email, value: 'k.krestnikov@gmail.com', href: 'mailto:k.krestnikov@gmail.com', color: 'cyber-pink' },
                  { icon: '✈️', label: t.contact.telegram, value: '@Krestnikov', href: 'https://t.me/Krestnikov', color: 'cyber-blue' },
                  { icon: '💻', label: t.contact.github, value: '@Rai220', href: 'https://github.com/Rai220', color: 'cyber-pink' },
                  { icon: '💼', label: 'LinkedIn', value: 'Konstantin Krestnikov', href: 'https://ru.linkedin.com/in/rai220', color: 'cyber-blue' },
                  { icon: '📝', label: 'Habr', value: '@Rai220', href: 'https://habr.com/ru/users/Rai220/', color: 'cyber-pink' },
                ].map((contact, index) => (
                  <Reveal key={contact.label} delay={0.3 + index * 0.1}>
                    <motion.div 
                      className="flex items-center group"
                      whileHover={{ x: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.div 
                        className={`w-14 h-14 bg-gradient-to-br from-${contact.color} to-fuchsia-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-${contact.color}/50`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <span className="text-2xl">{contact.icon}</span>
                      </motion.div>
                      <div>
                        <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">{contact.label}</div>
                        <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white text-lg hover:text-cyber-blue transition font-mono drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                          {contact.value}
                        </a>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black border-t border-cyber-blue shadow-lg shadow-cyber-blue/30">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="font-mono text-cyber-blue drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">{t.footer.rights}</p>
          <p className="mt-2 text-sm text-cyber-pink font-mono">{t.footer.built}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
