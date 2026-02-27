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
      { id: "1", label: "Top PyPI worldwide", value: 15, icon: "stars", displayValue: "1.5%" },
      { id: "2", label: "PyPI Downloads / мес", value: 77000, icon: "activity", displayValue: "77K+" },
      { id: "3", label: "Stars GigaChain", value: 543, icon: "stars", displayValue: "543" },
      { id: "4", label: "TG Подписчики", value: 1563, icon: "activity" },
      { id: "5", label: "GitHub Followers", value: 119, icon: "followers" },
      { id: "6", label: "Стран — Cubic", value: 40, icon: "activity" },
    ];

    this.projects = [
      {
        id: "1",
        title: "gigachat",
        description: "Официальная Python-библиотека GigaChat API — top 1.5% всех пакетов мира по загрузкам на PyPI (48K+/мес). Стандарт интеграции для тысяч разработчиков. Ключевой SDK экосистемы GigaChat.",
        tech: ["Python", "SDK", "API", "PyPI Top 1.5%"],
        stars: 136,
        language: "Python",
        url: "https://github.com/ai-forever/gigachat",
        tags: ["sdk", "api", "gigachat", "top-pypi"],
      },
      {
        id: "2",
        title: "GigaChain",
        description: "Платформа для разработки LLM-приложений и AI-агентов. Выбранная агентная архитектура для всего Сбера. 543 stars, индустриальный стандарт GigaChat-экосистемы.",
        tech: ["Python", "LangChain", "LLM", "Agents"],
        stars: 543,
        language: "Python",
        url: "https://github.com/ai-forever/gigachain",
        tags: ["platform", "llm", "agents"],
      },
      {
        id: "3",
        title: "langchain-gigachat",
        description: "Интеграция GigaChat с LangChain. 29K+ загрузок/мес на PyPI. Позволяет использовать российскую LLM в глобальной экосистеме AI-агентов.",
        tech: ["Python", "LangChain", "Integration"],
        stars: 40,
        language: "Python",
        url: "https://github.com/ai-forever/langchain-gigachat",
        tags: ["langchain", "integration"],
      },
      {
        id: "4",
        title: "gigachain_telegram_bot",
        description: "Production-ready Telegram-бот техподдержки на GigaChain. Мультиагентная система с GigaGraph, шаблон для enterprise-ботов.",
        tech: ["Python", "Telegram", "Agents"],
        stars: 30,
        language: "Python",
        url: "https://github.com/Rai220/gigachain_telegram_bot",
        tags: ["telegram", "support", "agents"],
      },
      {
        id: "5",
        title: "agents_debates",
        description: "Мультиагентная система дебатов — AI-агенты ведут аргументированную дискуссию на заданную тему. Эксперимент в коллективном AI-мышлении.",
        tech: ["Python", "Multi-Agent", "LLM"],
        stars: 11,
        language: "Python",
        url: "https://github.com/Rai220/agents_debates",
        tags: ["multi-agent", "research"],
      },
      {
        id: "6",
        title: "GigaDev",
        description: "AI-разработчик на базе агентов и GigaChat — автоматически пишет, тестирует и деплоит код. Прототип autonomous developer.",
        tech: ["Python", "AI Agents", "Automation"],
        stars: 5,
        language: "Python",
        url: "https://github.com/Rai220/GigaDev",
        tags: ["autonomous", "developer", "agents"],
      },
      {
        id: "7",
        title: "gpt2giga",
        description: "Прокси-конвертер: любой инструмент, работающий с OpenAI API, мгновенно получает поддержку GigaChat. Мост между глобальной и российской AI-экосистемами.",
        tech: ["Python", "Proxy", "API"],
        stars: 15,
        language: "Python",
        url: "https://github.com/ai-forever/gpt2giga",
        tags: ["proxy", "openai", "gigachat"],
      },
      {
        id: "8",
        title: "giga_books_summarization",
        description: "Консольный суммаризатор книг на GigaChat — анализирует и создаёт структурированные конспекты. Пример практического применения LLM.",
        tech: ["Python", "LLM", "NLP"],
        stars: 3,
        language: "Python",
        url: "https://github.com/Rai220/giga_books_summarization",
        tags: ["summarization", "books"],
      },
    ];

    this.skills = [
      { id: "tag-1", name: "AI Agents Architecture", proficiency: 0, category: "tags" },
      { id: "tag-2", name: "LLM Platforms", proficiency: 0, category: "tags" },
      { id: "tag-3", name: "R&D Leadership", proficiency: 0, category: "tags" },
      { id: "tag-4", name: "0\u21921 Products", proficiency: 0, category: "tags" },
      { id: "tag-5", name: "AGI Strategy", proficiency: 0, category: "tags" },
      { id: "tag-6", name: "e/acc", proficiency: 0, category: "tags" },

      { id: "thesis-1", name: "AI-агенты — это новый интерфейс между бизнесом и технологиями. Через 2\u20133 года каждый enterprise-процесс будет управляться агентом.", proficiency: 0, category: "thesis" },
      { id: "thesis-2", name: "Побеждают не те, кто \"внедряет AI\", а те, кто перестраивает архитектуру бизнеса вокруг автономных агентных систем.", proficiency: 0, category: "thesis" },
      { id: "thesis-3", name: "MCP-серверы, thinking tools и оркестрация агентов — это инфраструктурный слой, который определит победителей AGI-эры.", proficiency: 0, category: "thesis" },

      { id: "value-1", name: "Стратегическое видение: какие AI-продукты строить, а какие — убьют конкурентов через год.", proficiency: 0, category: "value" },
      { id: "value-2", name: "Архитектура агентных платформ: от идеи до enterprise-grade системы, работающей в продакшене.", proficiency: 0, category: "value" },
      { id: "value-3", name: "Руки + голова: сам проектирую, пишу код и вывожу в прод — без месяцев \"исследований\" и презентаций.", proficiency: 0, category: "value" },
      { id: "value-4", name: "Доказанный track record: платформы с 77K+ загрузок/мес, $680K+ привлечённых инвестиций, enterprise-внедрения.", proficiency: 0, category: "value" },

      { id: "tech-1", name: "Python", proficiency: 0, category: "tech" },
      { id: "tech-2", name: "LangChain / LangGraph", proficiency: 0, category: "tech" },
      { id: "tech-3", name: "MCP Servers", proficiency: 0, category: "tech" },
      { id: "tech-4", name: "LLM Orchestration", proficiency: 0, category: "tech" },
      { id: "tech-5", name: "RAG / Vector Stores", proficiency: 0, category: "tech" },
      { id: "tech-6", name: "Multi-Agent Systems", proficiency: 0, category: "tech" },
      { id: "tech-7", name: "API Design", proficiency: 0, category: "tech" },
      { id: "tech-8", name: "Robotics / IoT", proficiency: 0, category: "tech" },
      { id: "tech-9", name: "Product Strategy", proficiency: 0, category: "tech" },
    ];

    this.videos = [
      {
        id: "1",
        title: "Универсальный AI-агент = ReAct + REPL. Архитектура, которая работает",
        thumbnail: "https://i.ytimg.com/vi/s3Ynz436Swc/mqdefault.jpg",
        url: "https://youtu.be/s3Ynz436Swc",
        date: "12.09.2025",
        views: 1200,
      },
      {
        id: "2",
        title: "MCP и Think-Tool: добавляем мышление и инструменты любому AI-агенту",
        thumbnail: "https://i.ytimg.com/vi/kwpBP2-ZtAc/mqdefault.jpg",
        url: "https://youtu.be/kwpBP2-ZtAc",
        date: "01.07.2025",
        views: 2500,
      },
      {
        id: "3",
        title: "AI-агенты — что это, зачем и как их строить (GigaConf 2024)",
        thumbnail: "https://i.ytimg.com/vi/9QXRAC8G89I/mqdefault.jpg",
        url: "https://www.youtube.com/watch?v=9QXRAC8G89I",
        date: "27.12.2024",
        views: 3800,
      },
    ];

    this.posts = [
      {
        id: "1",
        title: "Главные боли AI-агентов на конец 2025 — разбор интервью Карпатого",
        excerpt: "Андрей аккуратно, но жёстко сбивает хайп. Что реально работает в агентах, а что — маркетинговый шум. Must-watch для тех, кто строит агентные системы.",
        date: "31.10.2025",
        views: 101,
        url: "https://t.me/robofuture",
      },
      {
        id: "2",
        title: "nanochat — обучаем чатовую GPT-модель с нуля за $100",
        excerpt: "Новый пример от Karpathy. Показывает, что обучение LLM стало доступным каждому разработчику. Разбираю архитектуру и выводы для индустрии.",
        date: "16.10.2025",
        views: 51,
        url: "https://t.me/robofuture",
      },
      {
        id: "3",
        title: "Agent Breaker — тестируем AI-агентов как хакеры",
        excerpt: "Игра от Lakera: взломайте 10 AI-приложений. Идеальный тест на robustness ваших агентных систем. Нашёл уязвимости, о которых не пишут в документации.",
        date: "19.09.2025",
        views: 22,
        url: "https://t.me/robofuture",
      },
    ];

    this.articles = [
      {
        id: "1",
        title: "AI-агент на GigaChat и LangGraph: от архитектуры до валидации — полный гайд на примере Lean Canvas",
        url: "https://habr.com/ru/companies/sberbank/articles/941340/",
        date: "2025",
        platform: "Habr",
      },
      {
        id: "2",
        title: "Разработка и применение мультиагентных систем в корпоративной среде",
        url: "https://sberlabs.com/publications?publication=4605",
        date: "2025",
        platform: "Sber Labs",
      },
      {
        id: "3",
        title: "Какой плащ был у Понтия Пилата? Отвечает GigaChat — тестируем возможности LLM",
        url: "https://habr.com/ru/companies/sberdevices/articles/794773/",
        date: "2024",
        platform: "Habr",
      },
      {
        id: "4",
        title: "Приделываем руки к ChatGPT: бот, который исполняет код в рантайме",
        url: "https://habr.com/ru/articles/724012/",
        date: "2023",
        platform: "Habr",
        badge: "\uD83C\uDFC6 Победитель Сезона ML на Habr",
      },
      {
        id: "5",
        title: "Переносим свою картину мира в чат-бота на базе GPT-3",
        url: "https://habr.com/ru/articles/712534/",
        date: "01.2023",
        platform: "Habr",
      },
      {
        id: "6",
        title: "Черное Зеркало своими руками — обучаем бота на базе истории чатов",
        url: "https://habr.com/ru/articles/453314/",
        date: "05.2019",
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
        if (rand < 0.7) count = Math.floor(Math.random() * 8) + 1;
      } else {
        if (rand < 0.3) count = Math.floor(Math.random() * 4) + 1;
      }

      graph.push({ date: dateStr, count });
    }

    return graph;
  }

  async getStats(): Promise<Stat[]> { return this.stats; }
  async getProjects(): Promise<Project[]> { return this.projects; }
  async getSkills(): Promise<Skill[]> { return this.skills; }
  async getVideos(): Promise<Video[]> { return this.videos; }
  async getPosts(): Promise<Post[]> { return this.posts; }
  async getArticles(): Promise<Article[]> { return this.articles; }
  async getGitHubActivity(): Promise<GitHubActivity> { return this.githubActivity; }
}

export const storage = new MemStorage();
