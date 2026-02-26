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
      { id: "4", label: "YT Подписчики", value: 1000, icon: "stars", displayValue: "1K+" },
      { id: "5", label: "gigachat Downloads", value: 50000, icon: "activity", displayValue: "50K+" },
      { id: "6", label: "langchain_gigachat", value: 15000, icon: "activity", displayValue: "15K+" },
    ];

    this.projects = [
      {
        id: "1",
        title: "gigachat",
        description: "Официальная Python-библиотека для работы с GigaChat API. Доступ к мощному российскому AI-ассистенту для разработчиков.",
        tech: ["Python", "AI", "API"],
        stars: 136,
        language: "Python",
        url: "https://github.com/ai-forever/gigachat",
        tags: ["ai", "gigachat"],
      },
      {
        id: "2",
        title: "gigachain",
        description: "Платформа для разработки LLM-приложений на русском языке. Полноценный фреймворк для создания AI-агентов с поддержкой GigaChat.",
        tech: ["Jupyter Notebook", "LangChain", "AI"],
        stars: 504,
        language: "Jupyter Notebook",
        url: "https://github.com/ai-forever/gigachain",
        tags: ["ai", "llm", "agents"],
      },
      {
        id: "3",
        title: "langchain-gigachat",
        description: "Интеграция GigaChat с экосистемой LangChain. Используйте российскую LLM для создания production-ready AI-агентов.",
        tech: ["Python", "LangChain", "Integration"],
        stars: 34,
        language: "Python",
        url: "https://github.com/ai-forever/langchain-gigachat",
        tags: ["langchain", "integration"],
      },
      {
        id: "4",
        title: "giga_agent",
        description: "Фреймворк для создания интеллектуальных AI-агентов на базе GigaChat с поддержкой инструментов, памяти и планирования.",
        tech: ["Python", "AI Agents", "Tools"],
        stars: 92,
        language: "Python",
        url: "https://github.com/ai-forever/giga_agent",
        tags: ["agents", "ai"],
      },
      {
        id: "5",
        title: "gpt2giga",
        description: "Инструменты конвертации моделей OpenAI в формат GigaChat. Адаптация существующих GPT-моделей для российской LLM-экосистемы.",
        tech: ["Python", "Model Conversion", "AI"],
        stars: 15,
        language: "Python",
        url: "https://github.com/ai-forever/gpt2giga",
        tags: ["model-conversion", "gpt2"],
      },
      {
        id: "6",
        title: "Telephoto",
        description: "Android CCTV через Telegram — превращает Android-устройство в систему видеонаблюдения с push-уведомлениями.",
        tech: ["Java", "Android", "Telegram Bot"],
        stars: 28,
        language: "Java",
        url: "https://github.com/Rai220/Telephoto",
        tags: ["android", "bot", "alarm"],
      },
    ];

    this.skills = [
      { id: "tag-1", name: "AI Agents", proficiency: 0, category: "tags" },
      { id: "tag-2", name: "LLM Applications", proficiency: 0, category: "tags" },
      { id: "tag-3", name: "Robotics", proficiency: 0, category: "tags" },
      { id: "tag-4", name: "0\u21921 MVP Builder", proficiency: 0, category: "tags" },
      { id: "tag-5", name: "Individual Contributor", proficiency: 0, category: "tags" },

      { id: "vision-1", name: "Формирую видение продукта в областях AI-агентов, LLM-приложений и робототехники.", proficiency: 0, category: "vision" },
      { id: "vision-2", name: "Нахожу реальные use case'ы и собираю быстрые MVP для проверки гипотез.", proficiency: 0, category: "vision" },
      { id: "vision-3", name: "Отличаю «AI ради хайпа» от решений, которые реально меняют процессы.", proficiency: 0, category: "vision" },

      { id: "arch-1", name: "Проектирую архитектуры AI-агентов: планирование, инструменты, оркестрация, работа с данными и API.", proficiency: 0, category: "architecture" },
      { id: "arch-2", name: "Использую LangChain / LangGraph и собственные решения для сложных цепочек рассуждений.", proficiency: 0, category: "architecture" },
      { id: "arch-3", name: "Развиваю MCP-серверы и «thinking tools» для структурированного мышления моделей.", proficiency: 0, category: "architecture" },

      { id: "eng-1", name: "Python-стек для backend и AI-логики: от прототипа до продакшена.", proficiency: 0, category: "engineering" },
      { id: "eng-2", name: "Агентные пайплайны на LangChain / LangGraph и интеграция с инфраструктурой.", proficiency: 0, category: "engineering" },
      { id: "eng-3", name: "Full-stack: интерфейс, API, интеграции и деплой — без передачи работы «на команду».", proficiency: 0, category: "engineering" },

      { id: "tech-1", name: "Python", proficiency: 0, category: "tech" },
      { id: "tech-2", name: "LangChain", proficiency: 0, category: "tech" },
      { id: "tech-3", name: "LangGraph", proficiency: 0, category: "tech" },
      { id: "tech-4", name: "MCP servers", proficiency: 0, category: "tech" },
      { id: "tech-5", name: "LLM orchestration", proficiency: 0, category: "tech" },
      { id: "tech-6", name: "Vector stores", proficiency: 0, category: "tech" },
      { id: "tech-7", name: "RAG", proficiency: 0, category: "tech" },
      { id: "tech-8", name: "API & integrations", proficiency: 0, category: "tech" },
      { id: "tech-9", name: "Robotics prototypes", proficiency: 0, category: "tech" },
    ];

    this.videos = [
      {
        id: "1",
        title: "Универсальный агент = ReAct + REPL",
        thumbnail: "https://i.ytimg.com/vi/s3Ynz436Swc/mqdefault.jpg",
        url: "https://youtu.be/s3Ynz436Swc",
        date: "12.09.2025",
        views: 1200,
      },
      {
        id: "2",
        title: "MCP и Think-Tool: мышление и инструменты для AI-агента",
        thumbnail: "https://i.ytimg.com/vi/kwpBP2-ZtAc/mqdefault.jpg",
        url: "https://youtu.be/kwpBP2-ZtAc",
        date: "01.07.2025",
        views: 2500,
      },
      {
        id: "3",
        title: "AI агенты — что это и как их делать (GigaConf)",
        thumbnail: "https://i.ytimg.com/vi/9QXRAC8G89I/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=9QXRAC8G89I",
        date: "27.12.2024",
        views: 3800,
      },
    ];

    this.posts = [
      {
        id: "1",
        title: "Главные боли AI-агентов на конец 2025 — после интервью Карпатого",
        excerpt: "Посмотрел свежее интервью Андрея — must-watch для всех, кто строит агентов. Карпаты аккуратно, но жёстко сбивает хайп...",
        date: "31.10.2025",
        views: 101,
        url: "https://t.me/robofuture",
      },
      {
        id: "2",
        title: "nanochat — обучаем чатовую GPT модель с нуля за $100",
        excerpt: "Новый пример от Andrej Karpathy — nanochat. Показывает, как обучить собственную чатовую GPT модель с нуля...",
        date: "16.10.2025",
        views: 51,
        url: "https://t.me/robofuture",
      },
      {
        id: "3",
        title: "Agent Breaker — игра для тестирования AI-агентов",
        excerpt: "Классная «игра» от Lakera. Смысл — в роли хакера взломать одно из 10 AI-приложений...",
        date: "19.09.2025",
        views: 22,
        url: "https://t.me/robofuture",
      },
    ];

    this.articles = [
      {
        id: "1",
        title: "Гайд: AI-агент на GigaChat и LangGraph — от архитектуры до валидации на примере Lean Canvas",
        url: "https://habr.com/ru/companies/sberbank/articles/941340/",
        date: "2025",
        platform: "Habr",
      },
      {
        id: "2",
        title: "Какой плащ был у Понтия Пилата? Отвечает GigaChat",
        url: "https://habr.com/ru/companies/sberdevices/articles/794773/",
        date: "2024",
        platform: "Habr",
      },
      {
        id: "3",
        title: "Приделываем руки к ChatGPT: бот, который исполняет код в рантайме",
        url: "https://habr.com/ru/articles/724012/",
        date: "2023",
        platform: "Habr",
        badge: "\uD83C\uDFC6 Победитель Сезона Machine Learning",
      },
      {
        id: "4",
        title: "Переносим свою картину мира в чат-бота на базе GPT-3",
        url: "https://habr.com/ru/articles/712534/",
        date: "01.2023",
        platform: "Habr",
      },
      {
        id: "5",
        title: "Черное Зеркало своими руками — обучаем бота на базе своей истории чатов",
        url: "https://habr.com/ru/articles/453314/",
        date: "05.2019",
        platform: "Habr",
      },
      {
        id: "6",
        title: "Разработка и применение мультиагентных систем в корпоративной среде",
        url: "https://sberlabs.com/publications?publication=4605",
        date: "2025",
        platform: "Sber Labs",
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
