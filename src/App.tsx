import { useEffect, useState } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics: string[]
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

        const reposResponse = await fetch('https://api.github.com/users/Rai220/repos?sort=updated&per_page=6')
        const reposData = await reposResponse.json()
        setRepos(reposData)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 w-full bg-slate-900 bg-opacity-90 backdrop-blur-sm z-50 border-b border-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-white">KK</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition">Projects</a>
              <a href="#blog" className="text-gray-300 hover:text-white transition">Blog</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Konstantin Krestnikov
              </h1>
              <p className="text-2xl text-purple-300 mb-4">
                AI Expert & Technical Director
              </p>
              <p className="text-xl text-gray-300 mb-8">
                Specializing in AI Agents, LLM Applications, and Robotics. Building the future of intelligent systems.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Rai220"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  GitHub
                </a>
                <a
                  href="https://t.me/robofuture"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Telegram Channel
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              {user && (
                <img
                  src={user.avatar_url}
                  alt="Konstantin Krestnikov"
                  className="rounded-full w-64 h-64 md:w-80 md:h-80 border-4 border-purple-500 shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-lg border border-purple-500">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Agents Developer</h3>
              <p className="text-gray-300">
                Expert in developing intelligent AI agents and LLM-powered applications. Specializing in GigaChat and LangChain integrations.
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-purple-500">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-white mb-2">Technical Director</h3>
              <p className="text-gray-300">
                Leading technical teams in building cutting-edge AI solutions. Experienced in architecture design and implementation.
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-purple-500">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation Leader</h3>
              <p className="text-gray-300">
                Passionate about robotics, neurotechnology, and the future of AI. Sharing insights through RoboFuture channel.
              </p>
            </div>
          </div>
          {user && (
            <div className="mt-12 text-center">
              <div className="inline-flex space-x-8 text-gray-300">
                <div>
                  <div className="text-3xl font-bold text-purple-400">{user.public_repos}</div>
                  <div>Public Repos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">{user.followers}</div>
                  <div>Followers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">1,157</div>
                  <div>Telegram Subscribers</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          {loading ? (
            <div className="text-center text-gray-300">Loading projects...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 p-6 rounded-lg border border-purple-500 hover:border-purple-400 transition transform hover:scale-105"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{repo.name}</h3>
                  <p className="text-gray-300 mb-4 min-h-12">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    {repo.language && (
                      <span className="text-sm text-purple-400">{repo.language}</span>
                    )}
                    <div className="flex items-center text-gray-400">
                      <span className="mr-1">⭐</span>
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded"
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

      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">RoboFuture Blog</h2>
          <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-lg border border-purple-500">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mr-4">
                🤖
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">RoboFuture</h3>
                <p className="text-gray-400">1,157 subscribers</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Авторский канал о последних достижениях в мире AI, ML, робототехники и нейротехнологий. 
              Прогнозы и комментарии от разработчика в этой области, никаких репостов новостей и...
            </p>
            <a
              href="https://t.me/robofuture"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Subscribe on Telegram
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Get In Touch</h2>
          <div className="max-w-2xl mx-auto bg-slate-900 p-8 rounded-lg border border-purple-500">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <a href="mailto:k.krestnikov@gmail.com" className="text-white text-lg hover:text-purple-400 transition">
                    k.krestnikov@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">✈️</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Telegram</div>
                  <a href="https://t.me/k_krestnikov" className="text-white text-lg hover:text-blue-400 transition">
                    @k_krestnikov
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">GitHub</div>
                  <a href="https://github.com/Rai220" className="text-white text-lg hover:text-purple-400 transition">
                    @Rai220
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-purple-500">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Konstantin Krestnikov. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default App
