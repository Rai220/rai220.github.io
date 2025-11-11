import { useEffect, useState } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics: string[]
  created_at: string
  updated_at: string
}

interface GitHubUser {
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  html_url: string
}

function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/Rai220')
        const userData = await userResponse.json()
        setUser(userData)

        const reposResponse = await fetch('https://api.github.com/users/Rai220/repos?sort=updated&per_page=50')
        const reposData = await reposResponse.json()
        
        const fiveYearsAgo = new Date()
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5)
        
        const recentRepos = reposData.filter((repo: GitHubRepo) => {
          const updatedDate = new Date(repo.updated_at)
          return updatedDate > fiveYearsAgo
        }).slice(0, 6)
        
        setRepos(recentRepos)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-950 via-black to-fuchsia-950 opacity-70"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10">
        <nav className="fixed top-0 w-full bg-black bg-opacity-60 backdrop-blur-md z-50 border-b border-cyan-500 shadow-lg shadow-cyan-500/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-bold text-cyan-400 tracking-wider glitch-text">
                <span className="text-fuchsia-500">&lt;</span>KK<span className="text-fuchsia-500">/&gt;</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#about" className="text-cyan-300 hover:text-cyan-400 transition font-mono uppercase text-sm tracking-wider hover:drop-shadow-glow">About</a>
                <a href="#projects" className="text-cyan-300 hover:text-cyan-400 transition font-mono uppercase text-sm tracking-wider hover:drop-shadow-glow">Projects</a>
                <a href="#blog" className="text-cyan-300 hover:text-cyan-400 transition font-mono uppercase text-sm tracking-wider hover:drop-shadow-glow">Blog</a>
                <a href="#contact" className="text-cyan-300 hover:text-cyan-400 transition font-mono uppercase text-sm tracking-wider hover:drop-shadow-glow">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">&gt; SYSTEM.INIT()</div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 animate-pulse">
                    Konstantin Krestnikov
                  </span>
                </h1>
                <p className="text-2xl text-fuchsia-400 mb-4 font-mono tracking-wide">
                  AI Expert & CTO
                </p>
                <p className="text-xl text-cyan-100 mb-4 leading-relaxed">
                  Co-founder of <span className="text-fuchsia-400 font-bold">cubic.ai</span> — the world's first AI-powered voice speaker. 
                  Pioneering the future of intelligent systems.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  Specializing in AI Agents, LLM Applications, and Robotics. Building tomorrow's technology today.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Rai220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black px-6 py-3 rounded font-bold transition shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 uppercase tracking-wider"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://t.me/robofuture"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-fuchsia-400 text-white px-6 py-3 rounded font-bold transition shadow-lg shadow-fuchsia-500/50 hover:shadow-fuchsia-400/70 uppercase tracking-wider"
                  >
                    Channel
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                {user && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <img
                      src={user.avatar_url}
                      alt="Konstantin Krestnikov"
                      className="relative rounded-full w-48 h-48 md:w-56 md:h-56 border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-40 backdrop-blur-sm border-y border-cyan-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="text-cyan-400 font-mono">&gt;_</span> About Me
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-cyan-950 to-black p-6 rounded border border-cyan-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">AI AGENTS DEVELOPER</h3>
                <p className="text-gray-300">
                  Expert in developing intelligent AI agents and LLM-powered applications. Specializing in GigaChat and LangChain integrations.
                </p>
              </div>
              <div className="bg-gradient-to-br from-fuchsia-950 to-black p-6 rounded border border-fuchsia-500 shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-400/50 transition">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-fuchsia-400 mb-2 font-mono">TECHNICAL DIRECTOR</h3>
                <p className="text-gray-300">
                  Leading technical teams in building cutting-edge AI solutions. Experienced in architecture design and implementation.
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-950 to-black p-6 rounded border border-cyan-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">INNOVATION PIONEER</h3>
                <p className="text-gray-300">
                  Co-founder of cubic.ai, the world's first AI voice speaker. Passionate about robotics, neurotechnology, and the future of AI.
                </p>
              </div>
            </div>
            {user && (
              <div className="text-center">
                <div className="inline-flex space-x-12 text-gray-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-30"></div>
                    <div className="relative">
                      <div className="text-4xl font-bold text-cyan-400 font-mono">{user.public_repos}</div>
                      <div className="text-cyan-300 uppercase text-sm tracking-wider">Repositories</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-fuchsia-500 blur-xl opacity-30"></div>
                    <div className="relative">
                      <div className="text-4xl font-bold text-fuchsia-400 font-mono">{user.followers}</div>
                      <div className="text-fuchsia-300 uppercase text-sm tracking-wider">Followers</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-30"></div>
                    <div className="relative">
                      <div className="text-4xl font-bold text-cyan-400 font-mono">1,157</div>
                      <div className="text-cyan-300 uppercase text-sm tracking-wider">Subscribers</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="text-fuchsia-400 font-mono">&gt;_</span> Featured Projects
            </h2>
            {loading ? (
              <div className="text-center text-cyan-400 font-mono animate-pulse">LOADING_PROJECTS...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-cyan-950 to-black p-6 rounded border border-cyan-500 hover:border-fuchsia-500 transition transform hover:scale-105 shadow-lg shadow-cyan-500/20 hover:shadow-fuchsia-500/40"
                  >
                    <h3 className="text-xl font-bold text-cyan-400 mb-2 font-mono">{repo.name}</h3>
                    <p className="text-gray-300 mb-4 min-h-12 text-sm">
                      {repo.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      {repo.language && (
                        <span className="text-sm text-fuchsia-400 font-mono">{repo.language}</span>
                      )}
                      <div className="flex items-center text-cyan-400">
                        <span className="mr-1">⭐</span>
                        <span className="font-mono">{repo.stargazers_count}</span>
                      </div>
                    </div>
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="text-xs bg-fuchsia-900 bg-opacity-50 text-fuchsia-300 px-2 py-1 rounded border border-fuchsia-500 font-mono"
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

        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-40 backdrop-blur-sm border-y border-fuchsia-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="text-cyan-400 font-mono">&gt;_</span> RoboFuture Blog
            </h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-fuchsia-950 to-black p-8 rounded border border-fuchsia-500 shadow-lg shadow-fuchsia-500/30">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-fuchsia-600 rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg shadow-fuchsia-500/50">
                  🤖
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-fuchsia-400 font-mono">ROBOFUTURE</h3>
                  <p className="text-cyan-400 font-mono text-sm">1,157 subscribers</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Авторский канал о последних достижениях в мире AI, ML, робототехники и нейротехнологий. 
                Прогнозы и комментарии от разработчика в этой области, никаких репостов новостей и...
              </p>
              <a
                href="https://t.me/robofuture"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-fuchsia-400 text-white px-6 py-3 rounded font-bold transition shadow-lg shadow-fuchsia-500/50 hover:shadow-fuchsia-400/70 uppercase tracking-wider"
              >
                Subscribe
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="text-fuchsia-400 font-mono">&gt;_</span> Get In Touch
            </h2>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-cyan-950 to-black p-8 rounded border border-cyan-500 shadow-lg shadow-cyan-500/30">
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-fuchsia-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-fuchsia-500/50 group-hover:shadow-fuchsia-400/70 transition">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className="text-cyan-400 text-sm font-mono uppercase tracking-wider">Email</div>
                    <a href="mailto:k.krestnikov@gmail.com" className="text-white text-lg hover:text-cyan-400 transition font-mono">
                      k.krestnikov@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <div>
                    <div className="text-cyan-400 text-sm font-mono uppercase tracking-wider">Telegram</div>
                    <a href="https://t.me/Krestnikov" className="text-white text-lg hover:text-cyan-400 transition font-mono">
                      @Krestnikov
                    </a>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-fuchsia-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-fuchsia-500/50 group-hover:shadow-fuchsia-400/70 transition">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <div className="text-cyan-400 text-sm font-mono uppercase tracking-wider">GitHub</div>
                    <a href="https://github.com/Rai220" className="text-white text-lg hover:text-cyan-400 transition font-mono">
                      @Rai220
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black border-t border-cyan-500 shadow-lg shadow-cyan-500/20">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p className="font-mono">&copy; 2025 Konstantin Krestnikov. All rights reserved.</p>
            <p className="mt-2 text-sm text-cyan-400 font-mono">Built with React + TypeScript + Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
