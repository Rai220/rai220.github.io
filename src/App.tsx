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
              <div className="hidden md:flex space-x-8">
                <a href="#about" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                  <span className="relative z-10">About</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#projects" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                  <span className="relative z-10">Projects</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#blog" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                  <span className="relative z-10">Blog</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a href="#contact" className="text-cyber-blue hover:text-white transition-all font-mono uppercase text-sm tracking-widest hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] relative group">
                  <span className="relative z-10">Contact</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-cyber-blue font-mono text-sm mb-4 tracking-widest animate-pulse">&gt; SYSTEM.INIT()</div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-blue animate-pulse drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                    Konstantin Krestnikov
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl text-cyber-pink mb-4 font-mono tracking-wide drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">
                  AI EXPERT & CTO
                </p>
                <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                  Co-founder of <span className="text-cyber-pink font-bold drop-shadow-[0_0_8px_rgba(255,0,110,0.6)]">cubic.ai</span> — the world's first AI-powered voice speaker. 
                  Pioneering the future of intelligent systems.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  Specializing in AI Agents, LLM Applications, and Robotics. Building tomorrow's technology today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/Rai220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-r from-cyber-blue to-cyan-500 hover:from-cyan-400 hover:to-cyber-blue text-black px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-blue/50 hover:shadow-cyber-blue/80 hover:scale-105 uppercase tracking-wider font-mono"
                  >
                    <span className="relative z-10">GitHub</span>
                    <div className="absolute inset-0 bg-cyber-blue opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                  </a>
                  <a
                    href="https://t.me/robofuture"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-r from-cyber-pink to-fuchsia-500 hover:from-fuchsia-400 hover:to-cyber-pink text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-pink/50 hover:shadow-cyber-pink/80 hover:scale-105 uppercase tracking-wider font-mono"
                  >
                    <span className="relative z-10">Channel</span>
                    <div className="absolute inset-0 bg-cyber-pink opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
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
              <span className="text-cyber-blue">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">ABOUT ME</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="group bg-gradient-to-br from-cyber-blue/10 to-black p-6 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/30 hover:shadow-cyber-blue/60 hover:border-cyber-blue/80 transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
                <h3 className="text-xl font-bold text-cyber-blue mb-2 font-mono drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">AI AGENTS DEVELOPER</h3>
                <p className="text-gray-300">
                  Expert in developing intelligent AI agents and LLM-powered applications. Specializing in GigaChat and LangChain integrations.
                </p>
              </div>
              <div className="group bg-gradient-to-br from-cyber-pink/10 to-black p-6 rounded border border-cyber-pink shadow-lg shadow-cyber-pink/30 hover:shadow-cyber-pink/60 hover:border-cyber-pink/80 transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💼</div>
                <h3 className="text-xl font-bold text-cyber-pink mb-2 font-mono drop-shadow-[0_0_8px_rgba(255,0,110,0.4)]">TECHNICAL DIRECTOR</h3>
                <p className="text-gray-300">
                  Leading technical teams in building cutting-edge AI solutions. Experienced in architecture design and implementation.
                </p>
              </div>
              <div className="group bg-gradient-to-br from-cyber-blue/10 to-black p-6 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/30 hover:shadow-cyber-blue/60 hover:border-cyber-blue/80 transition-all hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
                <h3 className="text-xl font-bold text-cyber-blue mb-2 font-mono drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">INNOVATION PIONEER</h3>
                <p className="text-gray-300">
                  Co-founder of cubic.ai, the world's first AI voice speaker. Passionate about robotics, neurotechnology, and the future of AI.
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
                      <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">Repositories</div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-cyber-pink blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_15px_rgba(255,0,110,0.6)]">{user.followers}</div>
                      <div className="text-cyber-pink uppercase text-sm tracking-widest font-mono">Followers</div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative">
                      <div className="text-5xl font-bold text-cyber-blue font-mono drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">1,157</div>
                      <div className="text-cyber-blue uppercase text-sm tracking-widest font-mono">Subscribers</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">FEATURED PROJECTS</span>
            </h2>
            {loading ? (
              <div className="text-center text-cyber-blue font-mono text-xl animate-pulse drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">LOADING_PROJECTS...</div>
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
                      {repo.description || 'No description available'}
                    </p>
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

        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50 backdrop-blur-sm border-y border-cyber-pink/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-blue">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">ROBOFUTURE BLOG</span>
            </h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyber-pink/10 to-black p-8 rounded border border-cyber-pink shadow-lg shadow-cyber-pink/40 hover:shadow-cyber-pink/60 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-pink rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg shadow-cyber-pink/60 animate-pulse">
                  🤖
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cyber-pink font-mono drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">ROBOFUTURE</h3>
                  <p className="text-cyber-blue font-mono text-sm">1,157 subscribers</p>
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
                className="group relative inline-block bg-gradient-to-r from-cyber-pink to-fuchsia-500 hover:from-fuchsia-400 hover:to-cyber-pink text-white px-8 py-3 rounded font-bold transition-all shadow-lg shadow-cyber-pink/50 hover:shadow-cyber-pink/80 hover:scale-105 uppercase tracking-wider font-mono"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-cyber-pink opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-mono">
              <span className="text-cyber-pink">&gt;_</span> <span className="drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">GET IN TOUCH</span>
            </h2>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-cyber-blue/10 to-black p-8 rounded border border-cyber-blue shadow-lg shadow-cyber-blue/40 hover:shadow-cyber-blue/60 transition-all">
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyber-pink to-fuchsia-500 rounded flex items-center justify-center mr-4 shadow-lg shadow-cyber-pink/50 group-hover:shadow-cyber-pink/80 group-hover:scale-110 transition-all">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">Email</div>
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
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">Telegram</div>
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
                    <div className="text-cyber-blue text-sm font-mono uppercase tracking-widest">GitHub</div>
                    <a href="https://github.com/Rai220" className="text-white text-lg hover:text-cyber-blue transition font-mono drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
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
            <p className="font-mono text-cyber-blue drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">&copy; 2025 Konstantin Krestnikov. All rights reserved.</p>
            <p className="mt-2 text-sm text-cyber-pink font-mono">Built with React + TypeScript + Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
