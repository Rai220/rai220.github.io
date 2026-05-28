import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "ru" | "en";

const translations: Record<string, Record<Language, string>> = {
  // Nav
  nav_impact: { ru: "Доказательства", en: "Proof" },
  nav_services: { ru: "Для компаний", en: "For companies" },
  nav_products: { ru: "Системы", en: "Systems" },
  nav_research: { ru: "Research", en: "Research" },
  nav_contacts: { ru: "Контакты", en: "Contact" },

  // Hero
  hero_badge: { ru: "AI R&D Architect / Agentic Systems / Research", en: "AI R&D Architect / Agentic Systems / Research" },
  hero_whoami_command: { ru: "whoami", en: "whoami" },
  hero_subtitle: { ru: "Помогаю компаниям строить AI-агентов, SDK и R&D-системы, которые доходят до продакшена.", en: "I help companies build AI agents, SDKs, and R&D systems that reach production." },
  hero_highlight: { ru: "Ваше AI-демо не доходит до прода? Помогу довести: архитектура, код, метрики, запуск.", en: "AI demo stuck before production? I help ship it: architecture, code, metrics, launch." },
  hero_role: { ru: "CTO GigaChain @ Сбер. Автор top 1.5% PyPI SDK, исследователь LLM и практик enterprise AI.", en: "CTO GigaChain @ Sber. Author of a top 1.5% PyPI SDK, LLM researcher, and enterprise AI builder." },
  hero_desc1: { ru: "Консультации, менторство инженерных команд, аудит архитектуры, прототипы и доведение агентных систем до рабочего результата.", en: "Consulting, engineering mentorship, architecture audits, prototypes, and production-grade agent systems." },
  hero_desc2: { ru: "Без AI-театра: стратегия, код, метрики, запуск.", en: "No AI theater: strategy, code, metrics, launch." },
  hero_cta: { ru: "Связаться", en: "Get in touch" },
  hero_metric_downloads: { ru: "downloads / мес", en: "downloads / mo" },
  hero_metric_research: { ru: "LLM research", en: "LLM research" },
  hero_metric_raised: { ru: "инвестиций", en: "raised" },
  hero_proof_command: { ru: "загрузить доказательства", en: "load proof" },
  hero_profile_badge: { ru: "архитектор AI-систем", en: "AI systems architect" },
  hero_capability_1: { ru: "архитектура agentic AI", en: "agentic AI architecture" },
  hero_capability_2: { ru: "LLM SDK / platform engineering", en: "LLM SDK / platform engineering" },
  hero_capability_3: { ru: "консалтинг и менторство команд", en: "consulting & team mentorship" },

  // About / Impact
  about_title: { ru: "Доказательства, а не обещания", en: "Proof, not promises" },
  about_subtitle: { ru: "Я соединяю исследовательскую глубину, инженерную реализацию и бизнес-результат: от open-source SDK до enterprise-архитектуры и hardware-продуктов.", en: "I connect research depth, engineering execution, and business outcomes: from open-source SDKs to enterprise architecture and hardware products." },
  about_track_title: { ru: "Где я даю ценность", en: "Where I create value" },
  about_now: { ru: "Сейчас", en: "Current" },
  about_org1: { ru: "GigaChat / Сбер", en: "GigaChat / Sber" },
  about_item1_1: { ru: "Создал и развиваю SDK/агентную платформу для GigaChat: 77K+ загрузок в месяц и top 1.5% PyPI.", en: "Built and lead SDK/agent platform work for GigaChat: 77K+ downloads/mo and top 1.5% on PyPI." },
  about_item1_2: { ru: "Проектирую agentic architecture: инструменты, оркестрация, интеграции, developer experience.", en: "Design agentic architecture: tools, orchestration, integrations, and developer experience." },
  about_item1_3: { ru: "Помогаю командам переходить от AI-демо к системам, которые можно поддерживать и масштабировать.", en: "Help teams move from AI demos to maintainable and scalable systems." },
  about_item2_1: { ru: "Аудит AI-стратегии, выбор use cases, архитектурная карта и план внедрения.", en: "AI strategy audits, use-case selection, architecture map, and adoption plan." },
  about_item2_2: { ru: "Менторство CTO, R&D-лидов и инженерных команд по LLM, агентам, SDK и платформам.", en: "Mentorship for CTOs, R&D leads, and engineering teams on LLMs, agents, SDKs, and platforms." },
  about_item2_3: { ru: "Hands-on прототипы: код, benchmark, интеграции, критерии готовности к продакшену.", en: "Hands-on prototypes: code, benchmarks, integrations, production-readiness criteria." },
  about_item3_1: { ru: "Исследую поведение LLM и проверяю гипотезы экспериментами, а не только интуицией.", en: "Research LLM behavior and test hypotheses with experiments, not intuition alone." },
  about_item3_2: { ru: "Новая работа на arXiv: Truth as a Compression Artifact in Language Model Training.", en: "New arXiv paper: Truth as a Compression Artifact in Language Model Training." },
  about_item3_3: { ru: "Фокус: почему модели выбирают устойчивые паттерны и как это влияет на надёжность AI-систем.", en: "Focus: why models prefer consistent patterns and what it means for reliable AI systems." },

  // Skills / Vision
  skills_title: { ru: "Что я могу сделать для компании", en: "What I can do for a company" },
  skills_subtitle: { ru: "Форматы работы простые: консультация, менторство, архитектурный аудит или hands-on построение прототипа вместе с командой.", en: "Simple engagement formats: consulting, mentorship, architecture audit, or hands-on prototype delivery with your team." },
  skills_thesis: { ru: "Коротко о подходе", en: "Approach in short" },
  skills_value: { ru: "Форматы работы", en: "Engagement formats" },
  skills_stack: { ru: "Технологический контур", en: "Technology scope" },

  // Projects
  projects_title: { ru: "Системы, которые уже работают", en: "Systems already working" },
  projects_subtitle: { ru: "Не витрина pet-проектов, а инструменты, вокруг которых строятся разработка, интеграции и агентные сценарии.", en: "Not a shelf of pet projects, but tools used for development, integrations, and agent workflows." },

  // Content & Media
  content_title: { ru: "Контент и медиа", en: "Content & media" },
  content_subscribers: { ru: "1K+ подписчиков", en: "1K+ subscribers" },
  content_blog: { ru: "Блог RoboFuture", en: "RoboFuture Blog" },
  content_channel: { ru: "Telegram канал", en: "Telegram channel" },
  content_reactions: { ru: "реакций", en: "reactions" },

  // Publications
  publications_title: { ru: "Research и публичная экспертиза", en: "Research and public expertise" },

  // GitHub Activity
  github_title: { ru: "GitHub активность", en: "GitHub activity" },
  github_lastYear: { ru: "последний год", en: "last year" },
  github_commits: { ru: "Коммиты", en: "Commits" },
  github_noActivity: { ru: "Нет активности", en: "No activity" },
  github_low: { ru: "Низкая", en: "Low" },
  github_medium: { ru: "Средняя", en: "Medium" },
  github_high: { ru: "Высокая", en: "High" },
  github_veryHigh: { ru: "Очень высокая", en: "Very high" },

  // CTA
  cta_title1: { ru: "Нужна AI-система,", en: "Need an AI system" },
  cta_title2: { ru: "а не презентация?", en: "not a slide deck?" },
  cta_desc1: { ru: "Разберу задачу, предложу архитектуру и помогу команде довести решение до рабочего состояния.", en: "I can break down the problem, propose architecture, and help the team ship a working system." },
  cta_desc2: { ru: "Подходит для консультаций, менторства и временной роли external AI/R&D architect.", en: "Useful for consulting, mentorship, and external AI/R&D architect engagements." },
  cta_button: { ru: "Написать мне", en: "Contact me" },

  // Services
  services_title: { ru: "Услуги и форматы работы", en: "Services and engagement formats" },
  services_subtitle: { ru: "Выберите формат под текущий этап: от разовой стратегической сессии до роли external AI/R&D architect.", en: "Choose the format for your stage: from a focused strategy session to an external AI/R&D architect engagement." },
  services_eyebrow: { ru: "Форматы", en: "Formats" },
  services_package_prefix: { ru: "package", en: "package" },
  services_duration: { ru: "Длительность", en: "Duration" },
  services_includes: { ru: "Что входит", en: "Includes" },
  services_pkg1_name: { ru: "Стратегическая сессия", en: "Strategy session" },
  services_pkg1_dur: { ru: "1.5 часа", en: "1.5 hours" },
  services_pkg1_desc: { ru: "разбор задачи, рекомендации по архитектуре и стеку, письменный summary", en: "problem breakdown, architecture and stack recommendations, written summary" },
  services_pkg2_name: { ru: "Архитектурный аудит", en: "Architecture audit" },
  services_pkg2_dur: { ru: "1–2 недели", en: "1–2 weeks" },
  services_pkg2_desc: { ru: "глубокий разбор существующей agentic-системы, отчёт + roadmap", en: "deep review of the current agentic system, report + roadmap" },
  services_pkg3_name: { ru: "Прототип agentic-системы", en: "Agentic system prototype" },
  services_pkg3_dur: { ru: "2–4 недели", en: "2–4 weeks" },
  services_pkg3_desc: { ru: "работа с командой: код, бенчмарки, критерии готовности к проду", en: "work with the team: code, benchmarks, production-readiness criteria" },
  services_pkg4_name: { ru: "External AI/R&D architect", en: "External AI/R&D architect" },
  services_pkg4_dur: { ru: "2–6 месяцев", en: "2–6 months" },
  services_pkg4_desc: { ru: "регулярные сессии 1–2 раза в неделю, ревью архитектуры, on-demand консультации", en: "regular sessions 1–2 times per week, architecture reviews, on-demand consulting" },
  services_price_note: { ru: "Цена обсуждается после квалификационного звонка — формат подбирается под объём и срок.", en: "Pricing is discussed after a qualification call — the format depends on scope and timeline." },
  services_not_doing_title: { ru: "Чем я не занимаюсь", en: "What I do not do" },
  services_not_doing_1: { ru: "курсы и обучение junior/middle разработчиков;", en: "courses and training for junior/middle developers;" },
  services_not_doing_2: { ru: "маркетинговая генерация контента ИИ;", en: "AI content generation for marketing;" },
  services_not_doing_3: { ru: "замена внутренней команды на длинной дистанции (только sparring partner).", en: "long-term replacement for an internal team (sparring partner only)." },
  services_cta: { ru: "Связаться", en: "Get in touch" },

  // Contact
  contact_title: { ru: "Обсудим вашу AI-задачу", en: "Let's discuss your AI problem" },
  contact_subtitle: { ru: "консалтинг, менторство, архитектура agentic AI", en: "consulting, mentorship, agentic AI architecture" },
  contact_init: { ru: "Проверяю доступные каналы...", en: "Checking available channels..." },
  contact_loaded: { ru: "Готов к консультациям и проектной работе", en: "Available for consulting and project work" },
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ru",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("lang");
      return stored === "en" ? "en" : "ru";
    } catch {
      return "ru";
    }
  });

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const entry = translations[key];
    return entry ? entry[lang] : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
