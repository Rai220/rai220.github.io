import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "ru" | "en";

const translations: Record<string, Record<Language, string>> = {
  // Nav
  nav_vision: { ru: "Видение", en: "Vision" },
  nav_products: { ru: "Продукты", en: "Products" },
  nav_media: { ru: "Медиа", en: "Media" },
  nav_contacts: { ru: "Контакты", en: "Contact" },

  // Hero
  hero_badge: { ru: "Открыт к предложениям: R&D Lead / AI Visionary", en: "Open to opportunities: R&D Lead / AI Visionary" },
  hero_subtitle: { ru: "Под моим руководством создана библиотека gigachat —", en: "Under my leadership, the gigachat library was created —" },
  hero_highlight: { ru: "top 1.5% библиотек мира на PyPI", en: "top 1.5% of libraries worldwide on PyPI" },
  hero_role: { ru: "CTO GigaChain @ Сбер \u00b7 Выбрал стратегию Сбера по внедрению AI-агентов через OpenSource \u00b7 e/acc", en: "CTO GigaChain @ Sber \u00b7 Defined Sber's AI agent strategy through OpenSource \u00b7 e/acc" },
  hero_desc1: { ru: "Визионер AGI-эры, который видит куда идёт AI — и умеет это строить руками.", en: "An AGI-era visionary who sees where AI is heading — and knows how to build it." },
  hero_desc2: { ru: "От прототипа до enterprise-платформы с десятками тысяч пользователей.", en: "From prototype to enterprise platform with tens of thousands of users." },
  hero_cta: { ru: "Обсудить сотрудничество", en: "Discuss collaboration" },
  hero_metric_downloads: { ru: "downloads / мес", en: "downloads / mo" },
  hero_metric_raised: { ru: "привлечено", en: "raised" },

  // About / Impact
  about_title: { ru: "Что я построил", en: "What I've built" },
  about_subtitle: { ru: "Библиотека из top 1.5% мира на PyPI. Агентная архитектура, выбранная Сбером. Продукт, который привлёк $680K+ инвестиций.", en: "A top 1.5% library on PyPI worldwide. Agent architecture chosen by Sber. A product that raised $680K+ in investment." },
  about_track_title: { ru: "От стартапа до enterprise-платформы", en: "From startup to enterprise platform" },
  about_now: { ru: "Сейчас", en: "Current" },
  about_org1: { ru: "GigaChat / Сбер", en: "GigaChat / Sber" },
  about_item1_1: { ru: "Под моим руководством создана библиотека gigachat — top 1.5% всех библиотек мира по скачиваниям на PyPI (48K+/мес)", en: "Under my leadership, the gigachat library was created — top 1.5% of all libraries on PyPI by downloads (48K+/mo)" },
  about_item1_2: { ru: "Выбрана стратегия Сбера по внедрению AI-агентов через взаимодействие с OpenSource", en: "Defined Sber's strategy for AI agent adoption through OpenSource collaboration" },
  about_item1_3: { ru: "77K+ суммарных загрузок/мес на PyPI, определяю SDK-стратегию GigaChat", en: "77K+ total downloads/mo on PyPI, defining GigaChat SDK strategy" },
  about_item2_1: { ru: "Первый AI-голосовой спикер с V.O.I.S. — продажи в 40 странах", en: "First AI voice speaker with V.O.I.S. — sales in 40 countries" },
  about_item2_2: { ru: "$180K+ на Indiegogo (top 2% кампаний) + $500K инвестиций", en: "$180K+ on Indiegogo (top 2% campaigns) + $500K investment" },
  about_item2_3: { ru: "Публикация в РБК, разработка voice OS с нуля", en: "Featured in RBC, built voice OS from scratch" },
  about_item3_1: { ru: "AI-система для персонализированного коучинга", en: "AI system for personalized coaching" },
  about_item3_2: { ru: "ML-пайплайны для анализа поведения пользователей", en: "ML pipelines for user behavior analysis" },
  about_item3_3: { ru: "Перевёл R&D отдел из эксперимента в продакшен", en: "Transitioned R&D department from experiment to production" },

  // Skills / Vision
  skills_title: { ru: "Почему AI-агенты — это всё", en: "Why AI agents are everything" },
  skills_subtitle: { ru: "Мы стоим на пороге AGI-революции. Вопрос не «будет ли», а «кто окажется готов».", en: "We're on the verge of the AGI revolution. The question isn't \"if\" but \"who will be ready\"." },
  skills_thesis: { ru: "Мой тезис", en: "My thesis" },
  skills_value: { ru: "Что я даю компании", en: "What I bring to a company" },
  skills_stack: { ru: "Стек", en: "Stack" },

  // Projects
  projects_title: { ru: "Избранные проекты", en: "Featured projects" },
  projects_subtitle: { ru: "Open-source инструменты и платформы для разработки AI-агентов", en: "Open-source tools and platforms for AI agent development" },

  // Content & Media
  content_title: { ru: "Контент и медиа", en: "Content & media" },
  content_subscribers: { ru: "1K+ подписчиков", en: "1K+ subscribers" },
  content_blog: { ru: "Блог RoboFuture", en: "RoboFuture Blog" },
  content_channel: { ru: "Telegram канал", en: "Telegram channel" },
  content_reactions: { ru: "реакций", en: "reactions" },

  // Publications
  publications_title: { ru: "Публикации", en: "Publications" },

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
  cta_title1: { ru: "Ищете R&D лида,", en: "Looking for an R&D lead" },
  cta_title2: { ru: "который понимает будущее AI?", en: "who understands the future of AI?" },
  cta_desc1: { ru: "Автор библиотеки из top 1.5% PyPI. Определил агентную архитектуру Сбера.", en: "Author of a top 1.5% PyPI library. Defined Sber's agent architecture." },
  cta_desc2: { ru: "Готов сделать то же для вашей компании.", en: "Ready to do the same for your company." },
  cta_button: { ru: "Давайте поговорим", en: "Let's talk" },

  // Contact
  contact_title: { ru: "Давайте поговорим", en: "Let's talk" },
  contact_subtitle: { ru: "Консультации по AI-стратегии", en: "AI Strategy Consulting" },
  contact_init: { ru: "Инициализация...", en: "Initializing..." },
  contact_loaded: { ru: "Контакты загружены", en: "Contacts loaded" },
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
