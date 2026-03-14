import type { Project, Stat, Skill, Video, Post, Article, GitHubActivity } from "@shared/schema";

export interface IStorage {
  getStats(lang?: string): Promise<Stat[]>;
  getProjects(lang?: string): Promise<Project[]>;
  getSkills(lang?: string): Promise<Skill[]>;
  getVideos(lang?: string): Promise<Video[]>;
  getPosts(lang?: string): Promise<Post[]>;
  getArticles(lang?: string): Promise<Article[]>;
  getGitHubActivity(): Promise<GitHubActivity>;
}

export class MemStorage implements IStorage {
  private statsRu: Stat[];
  private statsEn: Stat[];
  private projectsRu: Project[];
  private projectsEn: Project[];
  private skillsRu: Skill[];
  private skillsEn: Skill[];
  private videosRu: Video[];
  private videosEn: Video[];
  private postsRu: Post[];
  private postsEn: Post[];
  private articlesRu: Article[];
  private articlesEn: Article[];
  private githubActivity: GitHubActivity;

  constructor() {
    this.statsRu = [
      { id: "1", label: "Top PyPI worldwide", value: 15, icon: "stars", displayValue: "1.5%" },
      { id: "2", label: "PyPI Downloads / мес", value: 77000, icon: "activity", displayValue: "77K+" },
      { id: "3", label: "Stars GigaChain", value: 543, icon: "stars", displayValue: "543" },
      { id: "4", label: "TG Подписчики", value: 1563, icon: "activity" },
      { id: "5", label: "GitHub Followers", value: 119, icon: "followers" },
      { id: "6", label: "Стран — Cubic", value: 40, icon: "activity" },
    ];

    this.statsEn = [
      { id: "1", label: "Top PyPI worldwide", value: 15, icon: "stars", displayValue: "1.5%" },
      { id: "2", label: "PyPI Downloads / mo", value: 77000, icon: "activity", displayValue: "77K+" },
      { id: "3", label: "Stars GigaChain", value: 543, icon: "stars", displayValue: "543" },
      { id: "4", label: "TG Subscribers", value: 1563, icon: "activity" },
      { id: "5", label: "GitHub Followers", value: 119, icon: "followers" },
      { id: "6", label: "Countries — Cubic", value: 40, icon: "activity" },
    ];

    this.projectsRu = [
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

    this.projectsEn = [
      {
        id: "1",
        title: "gigachat",
        description: "Official GigaChat API Python library — top 1.5% of all PyPI packages by downloads (48K+/mo). Integration standard for thousands of developers. Key SDK of the GigaChat ecosystem.",
        tech: ["Python", "SDK", "API", "PyPI Top 1.5%"],
        stars: 136,
        language: "Python",
        url: "https://github.com/ai-forever/gigachat",
        tags: ["sdk", "api", "gigachat", "top-pypi"],
      },
      {
        id: "2",
        title: "GigaChain",
        description: "Platform for building LLM applications and AI agents. The agent architecture chosen by Sber. 543 stars, an industry standard of the GigaChat ecosystem.",
        tech: ["Python", "LangChain", "LLM", "Agents"],
        stars: 543,
        language: "Python",
        url: "https://github.com/ai-forever/gigachain",
        tags: ["platform", "llm", "agents"],
      },
      {
        id: "3",
        title: "langchain-gigachat",
        description: "GigaChat integration with LangChain. 29K+ downloads/mo on PyPI. Enables using a Russian LLM within the global AI agent ecosystem.",
        tech: ["Python", "LangChain", "Integration"],
        stars: 40,
        language: "Python",
        url: "https://github.com/ai-forever/langchain-gigachat",
        tags: ["langchain", "integration"],
      },
      {
        id: "4",
        title: "gigachain_telegram_bot",
        description: "Production-ready support Telegram bot built on GigaChain. Multi-agent system with GigaGraph, a template for enterprise bots.",
        tech: ["Python", "Telegram", "Agents"],
        stars: 30,
        language: "Python",
        url: "https://github.com/Rai220/gigachain_telegram_bot",
        tags: ["telegram", "support", "agents"],
      },
      {
        id: "5",
        title: "agents_debates",
        description: "Multi-agent debate system — AI agents engage in reasoned discussion on a given topic. An experiment in collective AI thinking.",
        tech: ["Python", "Multi-Agent", "LLM"],
        stars: 11,
        language: "Python",
        url: "https://github.com/Rai220/agents_debates",
        tags: ["multi-agent", "research"],
      },
      {
        id: "6",
        title: "GigaDev",
        description: "AI developer powered by agents and GigaChat — automatically writes, tests, and deploys code. An autonomous developer prototype.",
        tech: ["Python", "AI Agents", "Automation"],
        stars: 5,
        language: "Python",
        url: "https://github.com/Rai220/GigaDev",
        tags: ["autonomous", "developer", "agents"],
      },
      {
        id: "7",
        title: "gpt2giga",
        description: "Proxy converter: any tool using the OpenAI API instantly gains GigaChat support. A bridge between global and Russian AI ecosystems.",
        tech: ["Python", "Proxy", "API"],
        stars: 15,
        language: "Python",
        url: "https://github.com/ai-forever/gpt2giga",
        tags: ["proxy", "openai", "gigachat"],
      },
      {
        id: "8",
        title: "giga_books_summarization",
        description: "Console book summarizer powered by GigaChat — analyzes and creates structured summaries. A practical LLM application example.",
        tech: ["Python", "LLM", "NLP"],
        stars: 3,
        language: "Python",
        url: "https://github.com/Rai220/giga_books_summarization",
        tags: ["summarization", "books"],
      },
    ];

    this.skillsRu = [
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

    this.skillsEn = [
      { id: "tag-1", name: "AI Agents Architecture", proficiency: 0, category: "tags" },
      { id: "tag-2", name: "LLM Platforms", proficiency: 0, category: "tags" },
      { id: "tag-3", name: "R&D Leadership", proficiency: 0, category: "tags" },
      { id: "tag-4", name: "0\u21921 Products", proficiency: 0, category: "tags" },
      { id: "tag-5", name: "AGI Strategy", proficiency: 0, category: "tags" },
      { id: "tag-6", name: "e/acc", proficiency: 0, category: "tags" },
      { id: "thesis-1", name: "AI agents are the new interface between business and technology. In 2\u20133 years, every enterprise process will be managed by an agent.", proficiency: 0, category: "thesis" },
      { id: "thesis-2", name: "Winners aren't those who \"adopt AI\" — they're the ones who rebuild their business architecture around autonomous agent systems.", proficiency: 0, category: "thesis" },
      { id: "thesis-3", name: "MCP servers, thinking tools, and agent orchestration are the infrastructure layer that will determine the winners of the AGI era.", proficiency: 0, category: "thesis" },
      { id: "value-1", name: "Strategic vision: which AI products to build, and which ones will kill competitors within a year.", proficiency: 0, category: "value" },
      { id: "value-2", name: "Agent platform architecture: from idea to enterprise-grade production system.", proficiency: 0, category: "value" },
      { id: "value-3", name: "Hands-on leader: I design, code, and ship to production — no months of \"research\" and presentations.", proficiency: 0, category: "value" },
      { id: "value-4", name: "Proven track record: platforms with 77K+ downloads/mo, $680K+ raised, enterprise deployments.", proficiency: 0, category: "value" },
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

    this.videosRu = [
      { id: "1", title: "Универсальный AI-агент = ReAct + REPL. Архитектура, которая работает", thumbnail: "https://i.ytimg.com/vi/s3Ynz436Swc/mqdefault.jpg", url: "https://youtu.be/s3Ynz436Swc", date: "12.09.2025", views: 1200 },
      { id: "2", title: "MCP и Think-Tool: добавляем мышление и инструменты любому AI-агенту", thumbnail: "https://i.ytimg.com/vi/kwpBP2-ZtAc/mqdefault.jpg", url: "https://youtu.be/kwpBP2-ZtAc", date: "01.07.2025", views: 2500 },
      { id: "3", title: "AI-агенты — что это, зачем и как их строить (GigaConf 2024)", thumbnail: "https://i.ytimg.com/vi/9QXRAC8G89I/mqdefault.jpg", url: "https://www.youtube.com/watch?v=9QXRAC8G89I", date: "27.12.2024", views: 3800 },
    ];

    this.videosEn = [
      { id: "1", title: "Universal AI Agent = ReAct + REPL. An architecture that works", thumbnail: "https://i.ytimg.com/vi/s3Ynz436Swc/mqdefault.jpg", url: "https://youtu.be/s3Ynz436Swc", date: "12.09.2025", views: 1200 },
      { id: "2", title: "MCP & Think-Tool: adding reasoning and tools to any AI agent", thumbnail: "https://i.ytimg.com/vi/kwpBP2-ZtAc/mqdefault.jpg", url: "https://youtu.be/kwpBP2-ZtAc", date: "01.07.2025", views: 2500 },
      { id: "3", title: "AI Agents — what, why, and how to build them (GigaConf 2024)", thumbnail: "https://i.ytimg.com/vi/9QXRAC8G89I/mqdefault.jpg", url: "https://www.youtube.com/watch?v=9QXRAC8G89I", date: "27.12.2024", views: 3800 },
    ];

    this.postsRu = [
      { id: "1", title: "Главные боли AI-агентов на конец 2025 — разбор интервью Карпатого", excerpt: "Андрей аккуратно, но жёстко сбивает хайп. Что реально работает в агентах, а что — маркетинговый шум. Must-watch для тех, кто строит агентные системы.", date: "31.10.2025", views: 101, url: "https://t.me/robofuture" },
      { id: "2", title: "nanochat — обучаем чатовую GPT-модель с нуля за $100", excerpt: "Новый пример от Karpathy. Показывает, что обучение LLM стало доступным каждому разработчику. Разбираю архитектуру и выводы для индустрии.", date: "16.10.2025", views: 51, url: "https://t.me/robofuture" },
      { id: "3", title: "Agent Breaker — тестируем AI-агентов как хакеры", excerpt: "Игра от Lakera: взломайте 10 AI-приложений. Идеальный тест на robustness ваших агентных систем. Нашёл уязвимости, о которых не пишут в документации.", date: "19.09.2025", views: 22, url: "https://t.me/robofuture" },
    ];

    this.postsEn = [
      { id: "1", title: "Top AI agent pain points in late 2025 — Karpathy interview breakdown", excerpt: "Andrej carefully but firmly deflates the hype. What actually works in agents vs. marketing noise. Must-watch for anyone building agent systems.", date: "31.10.2025", views: 101, url: "https://t.me/robofuture" },
      { id: "2", title: "nanochat — training a chat GPT model from scratch for $100", excerpt: "New example from Karpathy. Shows that LLM training is now accessible to every developer. Breaking down the architecture and industry takeaways.", date: "16.10.2025", views: 51, url: "https://t.me/robofuture" },
      { id: "3", title: "Agent Breaker — testing AI agents like hackers", excerpt: "A game by Lakera: hack 10 AI applications. The perfect robustness test for your agent systems. Found vulnerabilities not covered in the docs.", date: "19.09.2025", views: 22, url: "https://t.me/robofuture" },
    ];

    this.articlesRu = [
      { id: "1", title: "AI-агент на GigaChat и LangGraph: от архитектуры до валидации — полный гайд на примере Lean Canvas", url: "https://habr.com/ru/companies/sberbank/articles/941340/", date: "2025", platform: "Habr" },
      { id: "2", title: "Разработка и применение мультиагентных систем в корпоративной среде", url: "https://sberlabs.com/publications?publication=4605", date: "2025", platform: "Sber Labs" },
      { id: "3", title: "Какой плащ был у Понтия Пилата? Отвечает GigaChat — тестируем возможности LLM", url: "https://habr.com/ru/companies/sberdevices/articles/794773/", date: "2024", platform: "Habr" },
      { id: "4", title: "Приделываем руки к ChatGPT: бот, который исполняет код в рантайме", url: "https://habr.com/ru/articles/724012/", date: "2023", platform: "Habr", badge: "\uD83C\uDFC6 Победитель Сезона ML на Habr" },
      { id: "5", title: "Переносим свою картину мира в чат-бота на базе GPT-3", url: "https://habr.com/ru/articles/712534/", date: "01.2023", platform: "Habr" },
      { id: "6", title: "Черное Зеркало своими руками — обучаем бота на базе истории чатов", url: "https://habr.com/ru/articles/453314/", date: "05.2019", platform: "Habr" },
      { id: "7", title: "Compression Favors Consistency, Not Truth: When and Why Language Models Prefer Correct Information", url: "https://arxiv.org/abs/2603.11749", date: "2026", platform: "arXiv" },
    ];

    this.articlesEn = [
      { id: "1", title: "AI Agent on GigaChat & LangGraph: from architecture to validation — full guide using Lean Canvas", url: "https://habr.com/ru/companies/sberbank/articles/941340/", date: "2025", platform: "Habr" },
      { id: "2", title: "Development and application of multi-agent systems in enterprise", url: "https://sberlabs.com/publications?publication=4605", date: "2025", platform: "Sber Labs" },
      { id: "3", title: "What cloak did Pontius Pilate wear? GigaChat answers — testing LLM capabilities", url: "https://habr.com/ru/companies/sberdevices/articles/794773/", date: "2024", platform: "Habr" },
      { id: "4", title: "Giving ChatGPT hands: a bot that executes code at runtime", url: "https://habr.com/ru/articles/724012/", date: "2023", platform: "Habr", badge: "\uD83C\uDFC6 ML Season Winner on Habr" },
      { id: "5", title: "Transferring your worldview into a GPT-3 chatbot", url: "https://habr.com/ru/articles/712534/", date: "01.2023", platform: "Habr" },
      { id: "6", title: "Black Mirror DIY — training a bot on your chat history", url: "https://habr.com/ru/articles/453314/", date: "05.2019", platform: "Habr" },
      { id: "7", title: "Compression Favors Consistency, Not Truth: When and Why Language Models Prefer Correct Information", url: "https://arxiv.org/abs/2603.11749", date: "2026", platform: "arXiv" },
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

  async getStats(lang = "ru"): Promise<Stat[]> { return lang === "en" ? this.statsEn : this.statsRu; }
  async getProjects(lang = "ru"): Promise<Project[]> { return lang === "en" ? this.projectsEn : this.projectsRu; }
  async getSkills(lang = "ru"): Promise<Skill[]> { return lang === "en" ? this.skillsEn : this.skillsRu; }
  async getVideos(lang = "ru"): Promise<Video[]> { return lang === "en" ? this.videosEn : this.videosRu; }
  async getPosts(lang = "ru"): Promise<Post[]> { return lang === "en" ? this.postsEn : this.postsRu; }
  async getArticles(lang = "ru"): Promise<Article[]> { return lang === "en" ? this.articlesEn : this.articlesRu; }
  async getGitHubActivity(): Promise<GitHubActivity> { return this.githubActivity; }
}

export const storage = new MemStorage();
