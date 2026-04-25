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
  hero_subtitle: { ru: "Помогаю компаниям строить AI-агентов, SDK и R&D-системы, которые доходят до продакшена.", en: "I help companies build AI agents, SDKs, and R&D systems that reach production." },
  hero_highlight: { ru: "Эксперт экстра-класса для сложных AI-задач", en: "Senior expert for hard AI problems" },
  hero_role: { ru: "CTO GigaChain @ Сбер. Автор top 1.5% PyPI SDK, исследователь LLM и практик enterprise AI.", en: "CTO GigaChain @ Sber. Author of a top 1.5% PyPI SDK, LLM researcher, and enterprise AI builder." },
  hero_desc1: { ru: "Консультации, менторство инженерных команд, аудит архитектуры, прототипы и доведение агентных систем до рабочего результата.", en: "Consulting, engineering mentorship, architecture audits, prototypes, and production-grade agent systems." },
  hero_desc2: { ru: "Без AI-театра: стратегия, код, метрики, запуск.", en: "No AI theater: strategy, code, metrics, launch." },
  hero_cta: { ru: "Обсудить задачу компании", en: "Discuss a company problem" },
  hero_metric_downloads: { ru: "downloads / мес", en: "downloads / mo" },
  hero_metric_raised: { ru: "инвестиций", en: "raised" },

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
  cta_button: { ru: "Запросить консультацию", en: "Request consultation" },

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
