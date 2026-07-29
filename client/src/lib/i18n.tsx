import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "ru" | "en";

const translations: Record<string, Record<Language, string>> = {
  // Nav
  nav_impact: { ru: "Опыт", en: "About" },
  nav_services: { ru: "Услуги", en: "Services" },
  nav_products: { ru: "Проекты", en: "Projects" },
  nav_research: { ru: "Research", en: "Research" },
  nav_contacts: { ru: "Контакты", en: "Contact" },

  // Hero
  hero_badge: { ru: "AI Architect · Agents · Research", en: "AI Architect · Agents · Research" },
  hero_whoami_command: { ru: "whoami", en: "whoami" },
  hero_subtitle: { ru: "Строю AI-агентов, SDK и платформы — от идеи до рабочего продакшена.", en: "I build AI agents, SDKs, and platforms — from idea to production." },
  hero_highlight: { ru: "Архитектура agentic AI для компаний", en: "Agentic AI architecture for companies" },
  hero_role: { ru: "CTO GigaChain @ Сбер. Под моим руководством создан SDK GigaChat (top 1.5% PyPI). Исследую LLM и помогаю командам внедрять AI.", en: "CTO GigaChain @ Sber. Led the creation of the GigaChat SDK (top 1.5% PyPI). I research LLMs and help teams ship AI systems." },
  hero_cta: { ru: "Связаться", en: "Get in touch" },
  hero_metric_downloads: { ru: "downloads / мес", en: "downloads / mo" },
  hero_metric_research: { ru: "LLM research", en: "LLM research" },
  hero_proof_command: { ru: "stats", en: "stats" },
  hero_profile_badge: { ru: "архитектор AI-систем", en: "AI systems architect" },
  hero_capability_1: { ru: "архитектура agentic AI", en: "agentic AI architecture" },
  hero_capability_2: { ru: "LLM SDK и платформы", en: "LLM SDKs and platforms" },
  hero_capability_3: { ru: "консалтинг и менторство", en: "consulting and mentorship" },

  // About / Impact
  about_title: { ru: "Опыт и результаты", en: "Experience and results" },
  about_subtitle: { ru: "Open-source SDK, enterprise-архитектура и исследования LLM — с фокусом на системы, которые можно поддерживать.", en: "Open-source SDKs, enterprise architecture, and LLM research — focused on systems you can maintain." },
  about_track_title: { ru: "Чем занимаюсь", en: "What I do" },
  about_now: { ru: "Сейчас", en: "Current" },
  about_org1: { ru: "GigaChat / Сбер", en: "GigaChat / Sber" },
  about_org2: { ru: "Компании и инженерные команды", en: "Companies & engineering teams" },
  about_track1_title: { ru: "SDK и агентная платформа", en: "SDK & agent platform" },
  about_track2_title: { ru: "External AI/R&D architect", en: "External AI/R&D architect" },
  about_track3_title: { ru: "LLM research", en: "LLM research" },
  about_item1_1: { ru: "Руковожу SDK и агентной платформой для GigaChat: 110K+ загрузок в месяц, top 1.5% PyPI.", en: "Lead the SDK and agent platform for GigaChat: 110K+ downloads/mo, top 1.5% on PyPI." },
  about_item1_2: { ru: "Проектирую agentic architecture: инструменты, оркестрация, интеграции, DX.", en: "Design agentic architecture: tools, orchestration, integrations, DX." },
  about_item1_3: { ru: "Помогаю командам переходить от AI-демо к системам, которые можно масштабировать.", en: "Help teams move from AI demos to systems that can scale." },
  about_item2_1: { ru: "Аудит AI-стратегии, выбор use cases, архитектурная карта и план внедрения.", en: "AI strategy audits, use-case selection, architecture map, and adoption plan." },
  about_item2_2: { ru: "Менторство CTO, R&D-лидов и инженерных команд по LLM, агентам и SDK.", en: "Mentorship for CTOs, R&D leads, and engineering teams on LLMs, agents, and SDKs." },
  about_item2_3: { ru: "Hands-on прототипы: код, бенчмарки, интеграции, критерии готовности.", en: "Hands-on prototypes: code, benchmarks, integrations, readiness criteria." },
  about_item3_1: { ru: "Исследую поведение LLM экспериментами, а не только интуицией.", en: "Research LLM behavior with experiments, not intuition alone." },
  about_item3_2: { ru: "arXiv: Truth as a Compression Artifact in Language Model Training.", en: "arXiv: Truth as a Compression Artifact in Language Model Training." },
  about_item3_3: { ru: "Фокус: почему модели выбирают устойчивые паттерны и как это влияет на надёжность.", en: "Focus: why models prefer consistent patterns and what that means for reliability." },

  // Skills / Vision
  skills_title: { ru: "Подход и стек", en: "Approach and stack" },
  skills_subtitle: { ru: "Начинаю с бизнес-процесса и ограничений. AI должен давать измеримый результат.", en: "I start with the business process and constraints. AI should create measurable results." },
  skills_thesis: { ru: "Подход", en: "Approach" },
  skills_value: { ru: "Форматы", en: "Formats" },
  skills_stack: { ru: "Стек", en: "Stack" },

  // Projects
  projects_title: { ru: "Проекты", en: "Projects" },
  projects_subtitle: { ru: "Инструменты и системы, которыми пользуются разработчики и команды.", en: "Tools and systems used by developers and teams." },

  // Content & Media
  content_title: { ru: "Контент и медиа", en: "Content & media" },
  content_subscribers: { ru: "1K+ подписчиков", en: "1K+ subscribers" },
  content_blog: { ru: "Блог RoboFuture", en: "RoboFuture Blog" },
  content_channel: { ru: "Telegram канал", en: "Telegram channel" },
  content_reactions: { ru: "реакций", en: "reactions" },

  // Publications
  publications_title: { ru: "Публикации и research", en: "Publications and research" },

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
  cta_title1: { ru: "Есть AI-задача?", en: "Have an AI problem?" },
  cta_title2: { ru: "Давайте обсудим", en: "Let's talk" },
  cta_desc1: { ru: "Разберу задачу, предложу архитектуру и помогу довести решение до рабочего состояния.", en: "I'll break down the problem, propose architecture, and help ship a working system." },
  cta_desc2: { ru: "Консультации, менторство, роль external AI/R&D architect.", en: "Consulting, mentorship, or external AI/R&D architect role." },
  cta_button: { ru: "Написать", en: "Contact" },

  // Services
  services_title: { ru: "Форматы работы", en: "How we can work" },
  services_subtitle: { ru: "От разовой сессии до роли external AI/R&D architect рядом с вашей командой.", en: "From a focused session to an external AI/R&D architect role alongside your team." },
  services_eyebrow: { ru: "Услуги", en: "Services" },
  services_package_prefix: { ru: "format", en: "format" },
  services_duration: { ru: "Длительность", en: "Duration" },
  services_includes: { ru: "Что входит", en: "Includes" },
  services_pkg1_name: { ru: "Стратегическая сессия", en: "Strategy session" },
  services_pkg1_dur: { ru: "1.5 часа", en: "1.5 hours" },
  services_pkg1_desc: { ru: "Разбор задачи, рекомендации по архитектуре и стеку, письменный summary.", en: "Problem breakdown, architecture and stack recommendations, written summary." },
  services_pkg2_name: { ru: "Архитектурный аудит", en: "Architecture audit" },
  services_pkg2_dur: { ru: "1–2 недели", en: "1–2 weeks" },
  services_pkg2_desc: { ru: "Глубокий разбор agentic-системы, отчёт и roadmap.", en: "Deep review of the agentic system, report and roadmap." },
  services_pkg3_name: { ru: "Прототип agentic-системы", en: "Agentic system prototype" },
  services_pkg3_dur: { ru: "2–4 недели", en: "2–4 weeks" },
  services_pkg3_desc: { ru: "Работа с командой: код, бенчмарки, критерии готовности к проду.", en: "Work with the team: code, benchmarks, production-readiness criteria." },
  services_pkg4_name: { ru: "External AI/R&D architect", en: "External AI/R&D architect" },
  services_pkg4_dur: { ru: "2–6 месяцев", en: "2–6 months" },
  services_pkg4_desc: { ru: "Сессии 1–2 раза в неделю, ревью архитектуры, консультации по запросу.", en: "Sessions 1–2 times per week, architecture reviews, on-demand consulting." },
  services_price_note: { ru: "Цена обсуждается после короткого созвона — формат подбирается под задачу.", en: "Pricing is discussed after a short call — the format depends on the problem." },
  services_not_doing_title: { ru: "Чем не занимаюсь", en: "What I don't do" },
  services_not_doing_1: { ru: "курсы для junior/middle разработчиков;", en: "courses for junior/middle developers;" },
  services_not_doing_2: { ru: "маркетинговая генерация контента ИИ;", en: "AI content generation for marketing;" },
  services_not_doing_3: { ru: "долгая замена внутренней команды (только sparring partner).", en: "long-term replacement for an internal team (sparring partner only)." },
  services_cta: { ru: "Связаться", en: "Get in touch" },
  services_stack_title: { ru: "Стек", en: "Stack" },

  // Contact
  contact_title: { ru: "Связаться", en: "Contact" },
  contact_subtitle: { ru: "консалтинг, менторство, архитектура agentic AI", en: "consulting, mentorship, agentic AI architecture" },
  contact_init: { ru: "Доступные каналы", en: "Available channels" },
  contact_loaded: { ru: "Открыт к консультациям и проектной работе", en: "Open for consulting and project work" },
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
