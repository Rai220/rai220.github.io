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
      { id: "1", label: "PyPI worldwide", value: 15, icon: "stars", displayValue: "top 1.5%" },
      { id: "2", label: "SDK downloads / мес", value: 110000, icon: "activity", displayValue: "110K+" },
      { id: "3", label: "arXiv 2026", value: 2026, icon: "repos", displayValue: "Truth as a Compression Artifact" },
    ];

    this.statsEn = [
      { id: "1", label: "PyPI worldwide", value: 15, icon: "stars", displayValue: "top 1.5%" },
      { id: "2", label: "SDK downloads / mo", value: 110000, icon: "activity", displayValue: "110K+" },
      { id: "3", label: "arXiv 2026", value: 2026, icon: "repos", displayValue: "Truth as a Compression Artifact" },
    ];

    this.projectsRu = [
      {
        id: "1",
        title: "gigachat",
        description: "Официальный Python SDK для GigaChat API. Понятный API, документация, стабильность и 110K+ загрузок в месяц.",
        tech: ["Python", "SDK", "API", "PyPI Top 1.5%"],
        stars: 164,
        language: "Python",
        url: "https://github.com/ai-forever/gigachat",
        tags: ["sdk", "api", "gigachat", "top-pypi"],
      },
      {
        id: "2",
        title: "GigaChain",
        description: "Платформа для LLM-приложений и AI-агентов: инструменты, память, оркестрация, интеграции.",
        tech: ["Python", "LangChain", "LLM", "Agents"],
        stars: 577,
        language: "Python",
        url: "https://github.com/ai-forever/gigachain",
        tags: ["platform", "llm", "agents"],
      },
      {
        id: "3",
        title: "gpt2giga",
        description: "Прокси: любой инструмент с OpenAI API получает поддержку GigaChat.",
        tech: ["Python", "Proxy", "API"],
        stars: 115,
        language: "Python",
        url: "https://github.com/ai-forever/gpt2giga",
        tags: ["proxy", "openai", "gigachat"],
      },
      {
        id: "4",
        title: "langchain-gigachat",
        description: "Интеграция GigaChat с LangChain для агентных пайплайнов.",
        tech: ["Python", "LangChain", "Integration"],
        stars: 49,
        language: "Python",
        url: "https://github.com/ai-forever/langchain-gigachat",
        tags: ["langchain", "integration"],
      },
      {
        id: "5",
        title: "gigachain_telegram_bot",
        description: "Telegram-бот техподдержки на GigaChain. Мультиагентный шаблон с GigaGraph.",
        tech: ["Python", "Telegram", "Agents"],
        stars: 35,
        language: "Python",
        url: "https://github.com/Rai220/gigachain_telegram_bot",
        tags: ["telegram", "support", "agents"],
      },
      {
        id: "6",
        title: "agents_debates",
        description: "Мультиагентная система дебатов — AI-агенты ведут аргументированную дискуссию.",
        tech: ["Python", "Multi-Agent", "LLM"],
        stars: 14,
        language: "Python",
        url: "https://github.com/Rai220/agents_debates",
        tags: ["multi-agent", "research"],
      },
    ];

    this.projectsEn = [
      {
        id: "1",
        title: "gigachat",
        description: "Official Python SDK for the GigaChat API. Clear API, docs, stability, and 110K+ monthly downloads.",
        tech: ["Python", "SDK", "API", "PyPI Top 1.5%"],
        stars: 164,
        language: "Python",
        url: "https://github.com/ai-forever/gigachat",
        tags: ["sdk", "api", "gigachat", "top-pypi"],
      },
      {
        id: "2",
        title: "GigaChain",
        description: "Platform for LLM apps and AI agents: tools, memory, orchestration, integrations.",
        tech: ["Python", "LangChain", "LLM", "Agents"],
        stars: 577,
        language: "Python",
        url: "https://github.com/ai-forever/gigachain",
        tags: ["platform", "llm", "agents"],
      },
      {
        id: "3",
        title: "gpt2giga",
        description: "Proxy that adds GigaChat support to any tool using the OpenAI API.",
        tech: ["Python", "Proxy", "API"],
        stars: 115,
        language: "Python",
        url: "https://github.com/ai-forever/gpt2giga",
        tags: ["proxy", "openai", "gigachat"],
      },
      {
        id: "4",
        title: "langchain-gigachat",
        description: "GigaChat integration with LangChain for agent pipelines.",
        tech: ["Python", "LangChain", "Integration"],
        stars: 49,
        language: "Python",
        url: "https://github.com/ai-forever/langchain-gigachat",
        tags: ["langchain", "integration"],
      },
      {
        id: "5",
        title: "gigachain_telegram_bot",
        description: "Support Telegram bot on GigaChain. Multi-agent template with GigaGraph.",
        tech: ["Python", "Telegram", "Agents"],
        stars: 35,
        language: "Python",
        url: "https://github.com/Rai220/gigachain_telegram_bot",
        tags: ["telegram", "support", "agents"],
      },
      {
        id: "6",
        title: "agents_debates",
        description: "Multi-agent debate system — AI agents argue a given topic.",
        tech: ["Python", "Multi-Agent", "LLM"],
        stars: 14,
        language: "Python",
        url: "https://github.com/Rai220/agents_debates",
        tags: ["multi-agent", "research"],
      },
    ];

    this.skillsRu = [
      { id: "tech-1", name: "Python", proficiency: 0, category: "tech" },
      { id: "tech-2", name: "LangChain / LangGraph", proficiency: 0, category: "tech" },
      { id: "tech-3", name: "MCP / tools", proficiency: 0, category: "tech" },
      { id: "tech-4", name: "LLM orchestration", proficiency: 0, category: "tech" },
      { id: "tech-5", name: "RAG / evals", proficiency: 0, category: "tech" },
      { id: "tech-6", name: "multi-agent systems", proficiency: 0, category: "tech" },
      { id: "tech-7", name: "SDK/API design", proficiency: 0, category: "tech" },
      { id: "tech-8", name: "observability", proficiency: 0, category: "tech" },
    ];

    this.skillsEn = [
      { id: "tech-1", name: "Python", proficiency: 0, category: "tech" },
      { id: "tech-2", name: "LangChain / LangGraph", proficiency: 0, category: "tech" },
      { id: "tech-3", name: "MCP / tools", proficiency: 0, category: "tech" },
      { id: "tech-4", name: "LLM orchestration", proficiency: 0, category: "tech" },
      { id: "tech-5", name: "RAG / evals", proficiency: 0, category: "tech" },
      { id: "tech-6", name: "multi-agent systems", proficiency: 0, category: "tech" },
      { id: "tech-7", name: "SDK/API design", proficiency: 0, category: "tech" },
      { id: "tech-8", name: "observability", proficiency: 0, category: "tech" },
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
      { id: "0", title: "Truth as a Compression Artifact in Language Model Training", url: "https://arxiv.org/abs/2603.11749", date: "2026", platform: "arXiv", badge: "new research" },
      { id: "1", title: "AI-агент на GigaChat и LangGraph: от архитектуры до валидации — полный гайд на примере Lean Canvas", url: "https://habr.com/ru/companies/sberbank/articles/941340/", date: "2025", platform: "Habr" },
      { id: "2", title: "Разработка и применение мультиагентных систем в корпоративной среде", url: "https://sberlabs.com/publications?publication=4605", date: "2025", platform: "Sber Labs" },
      { id: "3", title: "Какой плащ был у Понтия Пилата? Отвечает GigaChat — тестируем возможности LLM", url: "https://habr.com/ru/companies/sberdevices/articles/794773/", date: "2024", platform: "Habr" },
      { id: "4", title: "Приделываем руки к ChatGPT: бот, который исполняет код в рантайме", url: "https://habr.com/ru/articles/724012/", date: "2023", platform: "Habr", badge: "\uD83C\uDFC6 Победитель Сезона ML на Habr" },
      { id: "5", title: "Переносим свою картину мира в чат-бота на базе GPT-3", url: "https://habr.com/ru/articles/712534/", date: "01.2023", platform: "Habr" },
      { id: "6", title: "Черное Зеркало своими руками — обучаем бота на базе истории чатов", url: "https://habr.com/ru/articles/453314/", date: "05.2019", platform: "Habr" },
    ];

    this.articlesEn = [
      { id: "0", title: "Truth as a Compression Artifact in Language Model Training", url: "https://arxiv.org/abs/2603.11749", date: "2026", platform: "arXiv", badge: "new research" },
      { id: "1", title: "AI Agent on GigaChat & LangGraph: from architecture to validation — full guide using Lean Canvas", url: "https://habr.com/ru/companies/sberbank/articles/941340/", date: "2025", platform: "Habr" },
      { id: "2", title: "Development and application of multi-agent systems in enterprise", url: "https://sberlabs.com/publications?publication=4605", date: "2025", platform: "Sber Labs" },
      { id: "3", title: "What cloak did Pontius Pilate wear? GigaChat answers — testing LLM capabilities", url: "https://habr.com/ru/companies/sberdevices/articles/794773/", date: "2024", platform: "Habr" },
      { id: "4", title: "Giving ChatGPT hands: a bot that executes code at runtime", url: "https://habr.com/ru/articles/724012/", date: "2023", platform: "Habr", badge: "\uD83C\uDFC6 ML Season Winner on Habr" },
      { id: "5", title: "Transferring your worldview into a GPT-3 chatbot", url: "https://habr.com/ru/articles/712534/", date: "01.2023", platform: "Habr" },
      { id: "6", title: "Black Mirror DIY — training a bot on your chat history", url: "https://habr.com/ru/articles/453314/", date: "05.2019", platform: "Habr" },
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
