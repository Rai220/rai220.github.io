import { useEffect, useState } from 'react'

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
      position: 'CTO GIGACHAIN В GIGACHAT',
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
      exHead: {
        title: 'EX-HEAD OF AI',
        description: 'Бывший Head of AI в The Coach. Руководил AI-инициативами и разрабатывал интеллектуальные решения для коучинга.'
      },
      founder: {
        title: 'ОСНОВАТЕЛЬ & HEAD OF AI',
        description: 'Head of AI и основатель Cubic.ai - первого в мире AI-голосового спикера. Пионер в робототехнике, нейротехнологиях и будущем AI.'
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
      position: 'CTO GIGACHAIN AT GIGACHAT',
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
      exHead: {
        title: 'EX-HEAD OF AI',
        description: 'Former Head of AI at The Coach. Led AI initiatives and developed intelligent coaching solutions.'
      },
      founder: {
        title: 'FOUNDER & HEAD OF AI',
        description: 'Head of AI and founder at Cubic.ai - the world\'s first AI-powered voice speaker. Pioneering robotics, neurotechnology, and the future of AI.'
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
              console.log('Telegram fetch:', url, response.status, html.length)
              
              const parser = new DOMParser()
              const doc = parser.parseFromString(html, 'text/html')
              const messages = Array.from(doc.querySelectorAll('.tgme_widget_message'))
              console.log('Telegram messages found:', messages.length)
              
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
                console.log('Telegram posts parsed:', parsed.length)
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
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      {/* Animated background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0e27] via-black to-[#1a001f]"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMjQwLDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Glowing orbs for atmosphere */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyber-blue rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyber-pink rounded-full opacity-10 blur-3xl"></div>
      
      <div className="relative z-10">
        <nav className="fixed top-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50 border-b border-cyber-blue shadow-lg shadow-cyber-blue/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-bold text-cyber-blue tracking-wider font-mono">
                <span className="text-cyber-pink">&lt;</span>
                <span className="hover:text-cyber-pink transition-colors">KK</span>
                <span className="text-cyber-pink">/&gt;</span>
              </div>
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
                <button
                  onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                  className="text-cyber-pink hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(255,0,110,0.8)] px-3 py-1 border border-cyber-pink rounded hover:bg-cyber-pink/10"
                >
                  {language === 'ru' ? 'EN' : 'RU'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-cyber-blue font-mono text-sm mb-4 tracking-widest animate-pulse">{t.hero.systemInit}</div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-blue animate-pulse drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                    Konstantin Krestnikov
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl text-cyber-pink mb-4 font-mono tracking-wide drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">
                  {t.hero.position}
                </p>
                <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                  {t.hero.description}
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  {t.hero.experience}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/Rai220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-black px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-blue/50 hover:shadow-cyber-blue/80 hover:scale-105 uppercase tracking-wider font-mono"
                  >
                    <span className="relative z-10">{t.hero.github}</span>
                    <div className="absolute inset-0 bg-cyber-blue opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                  </a>
                  <a
                    href="https://t.me/robofuture"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-r from-cyber-pink to-fuchsia-500 hover:from-fuchsia-400 hover:to-cyber-pink text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-pink/50 hover:shadow-cyber-pink/80 hover:scale-105 uppercase tracking-wider font-mono flex items-center gap-2"
                  >
                    <span className="relative z-10 text-xl">✈️</span>
                    <span className="relative z-10">{t.hero.telegram}</span>
                    <div className="absolute inset-0 bg-cyber-pink opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                  </a>
                  <a
                    href="https://www.youtube.com/@Rai220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-red-500/50 hover:shadow-red-500/80 hover:scale-105 uppercase tracking-wider font-mono flex items-center gap-2"
                  >
                    <span className="relative z-10 text-xl">📺</span>
                    <span className="relative z-10">{t.hero.youtube}</span>
                    <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                {user && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-pink rounded-full blur-2xl opacity-60 animate-pulse"></div>
                    <div className="absolute inset-0 bg-cyber-blue rounded-full blur-xl opacity-40"></div>
                    <img
                      src={user.avatar_url}
                      alt="Konstantin Krestnikov"
                      className="relative rounded-full w-48 h-48 md:w-56 md:h-56 border-4 border-cyber-blue shadow-2xl shadow-cyber-blue/70 hover:border-cyber-pink hover:shadow-cyber-pink/70 transition-all duration-300"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-blue/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-blue">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">{t.about.title}</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="group bg-gradient-to-br from-cyber-blue/10 to-black p-6 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/30 hover:shadow-cyber-blue/60 hover:border-cyber-blue/80 transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
                <h3 className="text-xl font-bold text-cyber-blue mb-2 font-mono drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">{t.about.cto.title}</h3>
                <p className="text-gray-300">
                  {t.about.cto.description}
                </p>
              </div>
              <div className="group bg-gradient-to-br from-cyber-pink/10 to-black p-6 rounded border border-cyber-pink shadow-lg shadow-cyber-pink/30 hover:shadow-cyber-pink/60 hover:border-cyber-pink/80 transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💼</div>
                <h3 className="text-xl font-bold text-cyber-pink mb-2 font-mono drop-shadow-[0_0_8px_rgba(255,0,110,0.4)]">{t.about.exHead.title}</h3>
                <p className="text-gray-300">
                  {t.about.exHead.description}
                </p>
              </div>
              <div className="group bg-gradient-to-br from-cyber-blue/10 to-black p-6 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/30 hover:shadow-cyber-blue/60 hover:border-cyber-blue/80 transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
                <h3 className="text-xl font-bold text-cyber-blue mb-2 font-mono drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">{t.about.founder.title}</h3>
                <p className="text-gray-300">
                  {t.about.founder.description}
                </p>
              </div>
            </div>
            {user && (
              <div className="text-center">
                <div className="inline-flex flex-wrap justify-center gap-8 md:gap-12 text-gray-300">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">{user.public_repos}</div>
                      <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">{t.about.stats.repositories}</div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-cyber-pink blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">{user.followers}</div>
                      <div className="text-cyber-pink uppercase text-sm tracking-widest font-mono">{t.about.stats.followers}</div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">{telegramSubscribers.toLocaleString()}</div>
                      <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">{t.about.stats.tgSubscribers}</div>
                    </div>
                  </div>
                  {youtubeSubscribers > 0 && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-cyber-pink blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                      <div className="relative">
                        <div className="text-5xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">{youtubeSubscribers.toLocaleString()}</div>
                        <div className="text-cyber-pink uppercase text-sm tracking-widest font-mono">{t.about.stats.ytSubscribers}</div>
                      </div>
                    </div>
                  )}
                  {githubStats.totalCommits > 0 && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                      <div className="relative">
                        <div className="text-5xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">{githubStats.totalCommits.toLocaleString()}</div>
                        <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">{t.about.stats.commits}</div>
                      </div>
                    </div>
                  )}
                  {githubStats.totalPRs > 0 && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-cyber-pink blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                      <div className="relative">
                        <div className="text-5xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">{githubStats.totalPRs.toLocaleString()}</div>
                        <div className="text-cyber-pink uppercase text-sm tracking-widest font-mono">{t.about.stats.prs}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.projects.title}</span>
            </h2>
            {projectsLoading ? (
              <div className="text-center text-cyber-blue font-mono text-xl animate-pulse drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">{t.projects.loading}</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-br from-cyber-blue/5 to-black p-6 rounded border border-cyber-blue/50 hover:border-cyber-pink transition-all transform hover:scale-105 shadow-lg shadow-cyber-blue/20 hover:shadow-cyber-pink/50"
                  >
                    <h3 className="text-xl font-bold text-cyber-blue group-hover:text-cyber-pink mb-2 font-mono transition-colors drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_0_8px_rgba(255,0,110,0.4)]">{repo.name}</h3>
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
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {youtubeVideos.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-blue/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
                <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.youtube.title}</span>
              </h2>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {youtubeVideos.map((video) => (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-br from-cyber-pink/5 to-black rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all transform hover:scale-105 shadow-lg shadow-cyber-pink/20 hover:shadow-cyber-blue/50 overflow-hidden"
                  >
                    <div className="relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-5xl">▶️</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-cyber-pink group-hover:text-cyber-blue mb-2 font-mono transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono">
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-pink/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-blue">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">{t.blog.title}</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-cyber-pink/10 to-black p-8 rounded border border-cyber-pink shadow-lg shadow-cyber-pink/40 hover:shadow-cyber-pink/60 transition-all">
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
                <a
                  href="https://t.me/robofuture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block bg-gradient-to-r from-cyber-pink to-fuchsia-500 hover:from-fuchsia-400 hover:to-cyber-pink text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-pink/50 hover:shadow-cyber-pink/80 hover:scale-105 uppercase tracking-wider font-mono"
                >
                  <span className="relative z-10">{t.blog.subscribe}</span>
                  <div className="absolute inset-0 bg-cyber-pink opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </a>
              </div>
              
              {telegramPosts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-cyber-blue font-mono text-center drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">{t.blog.latestPosts}</h3>
                  {telegramPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-gradient-to-br from-cyber-blue/5 to-black p-6 rounded border border-cyber-blue/50 hover:border-cyber-pink transition-all shadow-lg shadow-cyber-blue/20 hover:shadow-cyber-pink/30"
                    >
                      <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                        {post.text}
                        {post.text.length >= 200 && '...'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>👁️ {post.views.toLocaleString()} {t.blog.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-blue/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.habr.title}</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-cyber-blue/10 to-black p-8 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/40 hover:shadow-cyber-blue/60 transition-all">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyber-pink to-fuchsia-500 rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg shadow-cyber-pink/60">
                    📝
                  </div>
                  <div>
                        <h3 className="text-2xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">Habr</h3>
                        <p className="text-cyber-pink font-mono text-sm">5 {t.habr.articles}</p>
                  </div>
                </div>
                <a
                  href="https://habr.com/ru/users/Rai220/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-black px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-blue/50 hover:shadow-cyber-blue/80 hover:scale-105 uppercase tracking-wider font-mono"
                >
                  <span className="relative z-10">{t.habr.profile}</span>
                  <div className="absolute inset-0 bg-cyber-blue opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                </a>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-cyber-pink font-mono text-center drop-shadow-[0_0_10px_rgba(255,0,110,0.5)] mb-4">{t.habr.articles}</h3>
                
                <a
                  href="https://habr.com/ru/companies/sberbank/articles/941340/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-cyber-pink/5 to-black p-4 rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all shadow-lg shadow-cyber-pink/20 hover:shadow-cyber-blue/30"
                >
                  <h4 className="text-base font-bold text-cyber-pink mb-2 font-mono">Гайд: AI-агент на GigaChat и LangGraph (от архитектуры до валидации) на примере Lean Canvas</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                    <span>📅 4 сен 2024</span>
                  </div>
                </a>

                <a
                  href="https://habr.com/ru/companies/sberdevices/articles/794773/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-cyber-pink/5 to-black p-4 rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all shadow-lg shadow-cyber-pink/20 hover:shadow-cyber-blue/30"
                >
                  <h4 className="text-base font-bold text-cyber-pink mb-2 font-mono">Какой плащ был у Понтия Пилата? Отвечает GigaChat</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                    <span>📅 13 фев 2024</span>
                  </div>
                </a>

                <a
                  href="https://habr.com/ru/articles/724012/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-cyber-pink/5 to-black p-4 rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all shadow-lg shadow-cyber-pink/20 hover:shadow-cyber-blue/30"
                >
                  <h4 className="text-base font-bold text-cyber-pink mb-2 font-mono">Приделываем руки к ChatGPT: бот, который исполняет код в рантайме</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                    <span>👍 61</span>
                    <span>💬 146</span>
                    <span>📅 22 мар 2023</span>
                  </div>
                </a>

                <a
                  href="https://habr.com/ru/articles/712534/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-cyber-pink/5 to-black p-4 rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all shadow-lg shadow-cyber-pink/20 hover:shadow-cyber-blue/30"
                >
                  <h4 className="text-base font-bold text-cyber-pink mb-2 font-mono">Переносим свою картину мира в чат-бота на базе GPT-3</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                    <span>👍 45</span>
                    <span>💬 38</span>
                    <span>📅 24 янв 2023</span>
                  </div>
                </a>

                <a
                  href="https://habr.com/ru/articles/453314/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-cyber-pink/5 to-black p-4 rounded border border-cyber-pink/50 hover:border-cyber-blue transition-all shadow-lg shadow-cyber-pink/20 hover:shadow-cyber-blue/30"
                >
                  <h4 className="text-base font-bold text-cyber-pink mb-2 font-mono">Черное Зеркало своими руками — обучаем бота на базе своей истории чатов</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                    <span>📅 19 июл 2019</span>
                  </div>
                </a>

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
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">{t.contact.title}</span>
            </h2>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-cyber-blue/10 to-black p-8 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/40 hover:shadow-cyber-blue/60 transition-all">
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyber-pink to-fuchsia-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-cyber-pink/50 group-hover:shadow-cyber-pink/80 group-hover:scale-110 transition-all">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">{t.contact.email}</div>
                    <a href="mailto:k.krestnikov@gmail.com" className="text-white text-lg hover:text-cyber-blue transition font-mono drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                      k.krestnikov@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyber-blue to-cyan-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-cyber-blue/50 group-hover:shadow-cyber-blue/80 group-hover:scale-110 transition-all">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <div>
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">{t.contact.telegram}</div>
                    <a href="https://t.me/Krestnikov" className="text-white text-lg hover:text-cyber-blue transition font-mono drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                      @Krestnikov
                    </a>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyber-pink to-fuchsia-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-cyber-pink/50 group-hover:shadow-cyber-pink/80 group-hover:scale-110 transition-all">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">{t.contact.github}</div>
                    <a href="https://github.com/Rai220" className="text-white text-lg hover:text-cyber-blue transition font-mono drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                      @Rai220
                    </a>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyber-blue to-cyan-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-cyber-blue/50 group-hover:shadow-cyber-blue/80 group-hover:scale-110 transition-all">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">{t.contact.linkedin}</div>
                    <a href="https://ru.linkedin.com/in/rai220" target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:text-cyber-blue transition font-mono drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                      Konstantin Krestnikov
                    </a>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyber-pink to-fuchsia-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-cyber-pink/50 group-hover:shadow-cyber-pink/80 group-hover:scale-110 transition-all">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">Habr</div>
                    <a href="https://habr.com/ru/users/Rai220/" target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:text-cyber-blue transition font-mono drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                      @Rai220
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black border-t border-cyber-blue shadow-lg shadow-cyber-blue/30">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p className="font-mono text-cyber-blue drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">{t.footer.rights}</p>
            <p className="mt-2 text-sm text-cyber-pink font-mono">{t.footer.built}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
