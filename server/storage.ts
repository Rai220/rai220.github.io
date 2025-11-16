import type { Project, Stat, Skill, Video, Post, Article, GitHubActivity } from "@shared/schema";

export interface IStorage {
  getStats(): Promise<Stat[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getVideos(): Promise<Video[]>;
  getPosts(): Promise<Post[]>;
  getArticles(): Promise<Article[]>;
  getGitHubActivity(): Promise<GitHubActivity>;
}

export class MemStorage implements IStorage {
  private stats: Stat[];
  private projects: Project[];
  private skills: Skill[];
  private videos: Video[];
  private posts: Post[];
  private articles: Article[];
  private githubActivity: GitHubActivity;

  constructor() {
    this.stats = [
      { id: "1", label: "Репозитории", value: 85, icon: "repos" },
      { id: "2", label: "GitHub Followers", value: 108, icon: "followers" },
      { id: "3", label: "TG Подписчики", value: 1157, icon: "activity" },
      { id: "4", label: "YT Подписчики", value: 1000, icon: "stars", displayValue: "1000+" },
      { id: "5", label: "gigachat Downloads", value: 50000, icon: "activity" },
      { id: "6", label: "langchain_gigachat Downloads", value: 15000, icon: "activity" },
    ];

    this.projects = [
      {
        id: "1",
        title: "gigachat",
        description: "Библиотека для доступа к GigaChat - мощному российскому языковому AI-ассистенту. Официальная Python библиотека для работы с API.",
        tech: ["Python", "AI", "API"],
        stars: 136,
        language: "Python",
        url: "https://github.com/ai-forever/gigachat",
        tags: ["ai", "gigachat"],
      },
      {
        id: "2",
        title: "gigachain",
        description: "⚡ Набор решений для разработки LLM-приложений на русском языке с поддержкой GigaChat. Полноценная платформа для создания AI-агентов.",
        tech: ["Jupyter Notebook", "LangChain", "AI"],
        stars: 504,
        language: "Jupyter Notebook",
        url: "https://github.com/ai-forever/gigachain",
        tags: ["ai", "llm", "agents"],
      },
      {
        id: "3",
        title: "langchain-gigachat",
        description: "Интеграция GigaChat с LangChain - позволяет использовать российскую LLM в экосистеме LangChain для создания AI-агентов.",
        tech: ["Python", "LangChain", "Integration"],
        stars: 34,
        language: "Python",
        url: "https://github.com/ai-forever/langchain-gigachat",
        tags: ["langchain", "integration"],
      },
      {
        id: "4",
        title: "giga_agent",
        description: "Фреймворк для создания интеллектуальных AI-агентов на базе GigaChat с поддержкой инструментов и памяти.",
        tech: ["Python", "AI Agents", "Tools"],
        stars: 92,
        language: "Python",
        url: "https://github.com/ai-forever/giga_agent",
        tags: ["agents", "ai"],
      },
      {
        id: "5",
        title: "gpt2giga",
        description: "Инструменты для конвертации моделей GPT-2 в формат GigaChat. Позволяет адаптировать существующие модели для работы с российской LLM.",
        tech: ["Python", "Model Conversion", "AI"],
        stars: 15,
        language: "Python",
        url: "https://github.com/ai-forever/gpt2giga",
        tags: ["model-conversion", "gpt2"],
      },
      {
        id: "6",
        title: "Telephoto",
        description: "⚠️ DEPRECATED - Android CCTV через Telegram - превратите ваш старый Android в систему видеонаблюдения с уведомлениями.",
        tech: ["Java", "Android", "Telegram Bot"],
        stars: 28,
        language: "Java",
        url: "https://github.com/Rai220/Telephoto",
        tags: ["android", "bot", "alarm", "deprecated"],
      },
    ];

    this.skills = [
      { id: "1", name: "Python", proficiency: 95, category: "Languages" },
      { id: "2", name: "TypeScript/JavaScript", proficiency: 88, category: "Languages" },
      { id: "3", name: "Java", proficiency: 75, category: "Languages" },
      { id: "4", name: "Go", proficiency: 70, category: "Languages" },
      
      { id: "5", name: "LangChain", proficiency: 95, category: "AI/ML Frameworks" },
      { id: "6", name: "LangGraph", proficiency: 90, category: "AI/ML Frameworks" },
      { id: "7", name: "TensorFlow", proficiency: 82, category: "AI/ML Frameworks" },
      { id: "8", name: "PyTorch", proficiency: 80, category: "AI/ML Frameworks" },
      
      { id: "9", name: "FastAPI", proficiency: 92, category: "Backend Frameworks" },
      { id: "10", name: "Django", proficiency: 85, category: "Backend Frameworks" },
      { id: "11", name: "Node.js", proficiency: 83, category: "Backend Frameworks" },
      { id: "12", name: "Express", proficiency: 80, category: "Backend Frameworks" },
      
      { id: "13", name: "React", proficiency: 87, category: "Frontend" },
      { id: "14", name: "Next.js", proficiency: 85, category: "Frontend" },
      { id: "15", name: "Tailwind CSS", proficiency: 90, category: "Frontend" },
      { id: "16", name: "Vue.js", proficiency: 75, category: "Frontend" },
      
      { id: "17", name: "Docker", proficiency: 90, category: "DevOps & Tools" },
      { id: "18", name: "Kubernetes", proficiency: 78, category: "DevOps & Tools" },
      { id: "19", name: "PostgreSQL", proficiency: 88, category: "DevOps & Tools" },
      { id: "20", name: "Redis", proficiency: 82, category: "DevOps & Tools" },
    ];

    this.videos = [
      {
        id: "1",
        title: "🤖Универсальный агент = ReAct + REPL",
        thumbnail: "https://i.ytimg.com/vi/s3Ynz436Swc/mqdefault.jpg",
        url: "https://youtu.be/s3Ynz436Swc",
        date: "9/12/2025",
        views: 1200,
      },
      {
        id: "2",
        title: "MCP и Think-Tool: добавляем мышление и инструменты любому AI-агенту",
        thumbnail: "https://i.ytimg.com/vi/kwpBP2-ZtAc/mqdefault.jpg",
        url: "https://youtu.be/kwpBP2-ZtAc",
        date: "7/1/2025",
        views: 2500,
      },
      {
        id: "3",
        title: "AI агенты - что это и как их делать (GigaConf)",
        thumbnail: "https://i.ytimg.com/vi/9QXRAC8G89I/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=9QXRAC8G89I",
        date: "12/27/2024",
        views: 3800,
      },
    ];

    this.posts = [
      {
        id: "1",
        title: "Главные боли AI-агентов на конец 2025 — после интервью Карпатого",
        excerpt: "Посмотрел свежее интервью Андрея — и это прям must-watch для всех, кто строит агентов. Карпаты аккуратно, но жёстко сбивает...",
        date: "10/31/2025",
        views: 101,
        url: "https://t.me/robofuture",
      },
      {
        id: "2",
        title: "nanochat - обучаем чатовую GPT модель с нуля за $100",
        excerpt: "На днях вышел новый пример от Andrej Karpathy - nanochat. В нем он показывает, как можно обучить собственную чатовую GPT модель с нуля...",
        date: "10/16/2025",
        views: 51,
        url: "https://t.me/robofuture",
      },
      {
        id: "3",
        title: "Agent Breaker - классная игра для тестирования AI-агентов",
        excerpt: "Коллега посоветовал классную и очень полезную «игру» - Agent Breaker от команды Lakera. Смысл игры — в роли хакера взломать одно из 10 AI-приложений...",
        date: "9/19/2025",
        views: 22,
        url: "https://t.me/robofuture",
      },
    ];

    this.articles = [
      {
        id: "1",
        title: "Как мы сделали GigaChain — набор инструментов для работы с GigaChat",
        url: "https://habr.com/ru/companies/sberbank/articles/941340/",
        date: "2024",
        platform: "Habr",
      },
      {
        id: "2",
        title: "Как мы делали GigaChat: от идеи до продакшена",
        url: "https://habr.com/ru/companies/sberdevices/articles/794773/",
        date: "2024",
        platform: "Habr",
      },
      {
        id: "3",
        title: "Обучение нейросети для генерации текста на основе GPT-2",
        url: "https://habr.com/ru/articles/724012/",
        date: "2024",
        platform: "Habr",
        badge: "🏆 Победитель Сезона Machine Learning",
      },
      {
        id: "4",
        title: "Создание чат-бота на основе GPT-2 для Telegram",
        url: "https://habr.com/ru/articles/712534/",
        date: "2023",
        platform: "Habr",
      },
    ];

    this.githubActivity = {
      totalCommits: 296,
      totalPRs: 68,
      totalIssues: 4,
      contributionGraph: this.generateContributionGraph(),
    };
  }

  private generateContributionGraph() {
    const graph = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let count = 0;
      const rand = Math.random();
      
      if (!isWeekend) {
        if (rand < 0.7) {
          count = Math.floor(Math.random() * 8) + 1;
        }
      } else {
        if (rand < 0.3) {
          count = Math.floor(Math.random() * 4) + 1;
        }
      }
      
      graph.push({ date: dateStr, count });
    }
    
    return graph;
  }

  async getStats(): Promise<Stat[]> {
    return this.stats;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getVideos(): Promise<Video[]> {
    return this.videos;
  }

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async getArticles(): Promise<Article[]> {
    return this.articles;
  }

  async getGitHubActivity(): Promise<GitHubActivity> {
    return this.githubActivity;
  }
}

export const storage = new MemStorage();
