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
  hero_highlight: { ru: "Ваше AI-демо не доходит до прода? Помогу довести: архитектура, код, метрики, запуск.", en: "AI demo stuck before production? I help ship it: architecture, code, metrics, launch." },
  hero_role: { ru: "CTO GigaChain @ Сбер. Автор top 1.5% PyPI SDK, исследователь LLM и практик enterprise AI.", en: "CTO GigaChain @ Sber. Author of a top 1.5% PyPI SDK, LLM researcher, and enterprise AI builder." },
  hero_desc1: { ru: "Консультации, менторство инженерных команд, аудит архитектуры, прототипы и доведение агентных систем до рабочего результата.", en: "Consulting, engineering mentorship, architecture audits, prototypes, and production-grade agent systems." },
  hero_desc2: { ru: "Без AI-театра: стратегия, код, метрики, запуск.", en: "No AI theater: strategy, code, metrics, launch." },
  hero_cta: { ru: "Обсудить задачу компании", en: "Discuss a company problem" },
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
  cta_button: { ru: "Запросить консультацию", en: "Request consultation" },

  // Services
  services_title: { ru: "Услуги и форматы работы", en: "Services and engagement formats" },
  services_subtitle: { ru: "Выберите формат под текущий этап: от разовой стратегической сессии до роли external AI/R&D architect.", en: "Choose the format for your stage: from a focused strategy session to an external AI/R&D architect engagement." },
  services_eyebrow: { ru: "Форматы", en: "Formats" },
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
  services_cta: { ru: "Обсудить задачу", en: "Discuss the problem" },

  // Contact
  contact_title: { ru: "Обсудим вашу AI-задачу", en: "Let's discuss your AI problem" },
  contact_subtitle: { ru: "консалтинг, менторство, архитектура agentic AI", en: "consulting, mentorship, agentic AI architecture" },
  contact_init: { ru: "Проверяю доступные каналы...", en: "Checking available channels..." },
  contact_loaded: { ru: "Готов к консультациям и проектной работе", en: "Available for consulting and project work" },

  // Intake
  intake_title: { ru: "Квалификационная форма", en: "Qualification form" },
  intake_subtitle: { ru: "Коротко опишите задачу. Я отвечу, если вижу, что могу быть полезен как AI/R&D architect.", en: "Briefly describe the task. I will reply if I see a clear fit for AI/R&D architecture help." },
  intake_back: { ru: "На главную", en: "Back to home" },
  intake_bullet_1: { ru: "Форма нужна, чтобы быстро понять контекст, этап и ограничения.", en: "The form helps quickly understand context, stage, and constraints." },
  intake_bullet_2: { ru: "Если endpoint не настроен, откроется письмо на k.krestnikov@gmail.com.", en: "If the endpoint is not configured, an email to k.krestnikov@gmail.com opens." },
  intake_bullet_3: { ru: "Цены обсуждаются только после квалификационного звонка.", en: "Pricing is discussed only after a qualification call." },
  intake_identity_label: { ru: "Имя и компания", en: "Name and company" },
  intake_contact_label: { ru: "Контакт: TG handle / email", en: "Contact: TG handle / email" },
  intake_company_size_label: { ru: "Размер компании", en: "Company size" },
  intake_stage_label: { ru: "Этап", en: "Stage" },
  intake_request_label: { ru: "Запрос в 2–3 предложениях", en: "Request in 2–3 sentences" },
  intake_budget_label: { ru: "Бюджет", en: "Budget" },
  intake_stack_label: { ru: "Стек", en: "Stack" },
  intake_optional: { ru: "опционально", en: "optional" },
  intake_select_placeholder: { ru: "Выберите вариант", en: "Select an option" },
  intake_optional_placeholder: { ru: "Можно пропустить", en: "Optional" },
  intake_submitting: { ru: "Отправляю...", en: "Submitting..." },
  intake_submit: { ru: "Отправить запрос", en: "Submit request" },
  intake_required: { ru: "Заполните обязательные поля.", en: "Please fill in the required fields." },
  intake_request_hint: { ru: "50–1000 символов", en: "50–1000 characters" },
  intake_stack_hint: { ru: "до 300 символов", en: "up to 300 characters" },
  intake_email_subject: { ru: "AI-консультация", en: "AI consulting" },
  intake_mailto_fallback: { ru: "Открою письмо в почтовом клиенте, потому что endpoint формы не настроен.", en: "Opening your email client because the form endpoint is not configured." },
  intake_error_request_short: { ru: "Опишите запрос минимум в 50 символов.", en: "Please describe the request in at least 50 characters." },
  intake_error_submit: { ru: "Не удалось отправить форму. Попробуйте ещё раз или напишите на email.", en: "Could not submit the form. Try again or send an email." },
  intake_thanks_title: { ru: "Принял.", en: "Received." },
  intake_thanks_body: { ru: "Отвечу в течение 48 часов в ваш {contact}.", en: "I will reply within 48 hours to {contact}." },
  intake_thanks_contact_fallback: { ru: "контакт", en: "contact" },
  intake_back_home: { ru: "Вернуться на главную", en: "Back to home" },
  intake_company_size_1: { ru: "до 50", en: "up to 50" },
  intake_company_size_2: { ru: "50–500", en: "50–500" },
  intake_company_size_3: { ru: "500–5000", en: "500–5000" },
  intake_company_size_4: { ru: "5000+", en: "5000+" },
  intake_stage_idea: { ru: "идея", en: "idea" },
  intake_stage_poc: { ru: "POC/демо", en: "POC/demo" },
  intake_stage_pilot: { ru: "pilot в проде", en: "pilot in production" },
  intake_stage_scaling: { ru: "масштабируемся", en: "scaling" },
  intake_budget_1: { ru: "до 100K", en: "up to 100K" },
  intake_budget_2: { ru: "100–500K", en: "100–500K" },
  intake_budget_3: { ru: "500K–2M", en: "500K–2M" },
  intake_budget_4: { ru: "2M+", en: "2M+" },
  intake_budget_unknown: { ru: "не знаю", en: "not sure" },
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
