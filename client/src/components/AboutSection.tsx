import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Rocket, Bot, Briefcase, TrendingUp, Download, Users, Star, FileText } from "lucide-react";
import type { Stat } from "@shared/schema";

interface AboutSectionProps {
  stats: Stat[];
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const iconMap: Record<string, any> = {
  stars: Star, followers: Users, repos: FileText, activity: TrendingUp,
};

const positions = [
  {
    icon: Rocket,
    badge: "Сейчас",
    badgeColor: "text-primary border-primary/30 bg-primary/5",
    title: "CTO GigaChain",
    org: "GigaChat / Сбер",
    items: [
      "gigachat — top 1.5% всех библиотек мира по скачиваниям на PyPI (48K+/мес)",
      "Выбрал агентную архитектуру для всего Сбера — GigaChain (543 stars, 76 forks)",
      "77K+ суммарных загрузок/мес на PyPI, определяю SDK-стратегию GigaChat",
    ],
    borderColor: "border-primary/20 hover:border-primary/40",
  },
  {
    icon: Bot,
    badge: "2012–2017",
    badgeColor: "text-secondary border-secondary/30 bg-secondary/5",
    title: "Co-founder & Head of AI",
    org: "Cubic Robotics",
    items: [
      "Первый AI-голосовой спикер с V.O.I.S. — продажи в 40 странах",
      "$180K+ на Indiegogo (top 2% кампаний) + $500K инвестиций",
      "Публикация в РБК, разработка voice OS с нуля",
    ],
    borderColor: "border-secondary/20 hover:border-secondary/40",
  },
  {
    icon: Briefcase,
    badge: "2019–2021",
    badgeColor: "text-accent border-accent/30 bg-accent/5",
    title: "Head of AI",
    org: "The Coach",
    items: [
      "AI-система для персонализированного коучинга",
      "ML-пайплайны для анализа поведения пользователей",
      "Перевёл R&D отдел из эксперимента в продакшен",
    ],
    borderColor: "border-accent/20 hover:border-accent/40",
  },
];

export function AboutSection({ stats }: AboutSectionProps) {
  return (
    <>
      <div className="mb-16">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/60 to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Impact</span>
        </motion.div>
        <motion.h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <span className="text-gradient">Что я построил</span>
        </motion.h2>
        <motion.p className="text-muted-foreground text-base md:text-lg max-w-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Библиотека из top 1.5% мира на PyPI. Агентная архитектура, выбранная Сбером. Продукт, который привлёк $680K+ инвестиций.
        </motion.p>
      </div>

      <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || TrendingUp;
          return (
            <motion.div key={stat.id} className="card-premium p-5 group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.5 }}>
              <Icon className="w-5 h-5 text-primary/50 mb-3 group-hover:text-primary transition-colors" />
              <div className="text-2xl md:text-3xl font-bold font-mono text-foreground mb-1">
                {stat.displayValue || <AnimatedCounter end={stat.value} />}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mb-10">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-secondary/60 to-transparent" />
          <span className="text-xs font-mono text-secondary uppercase tracking-[0.3em]">Track Record</span>
        </motion.div>
        <motion.h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          От стартапа до enterprise-платформы
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {positions.map((pos, i) => {
          const Icon = pos.icon;
          return (
            <motion.div key={i} className={`group card-premium p-7 ${pos.borderColor} transition-all duration-500`}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground/70" />
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${pos.badgeColor}`}>{pos.badge}</span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-1">{pos.title}</h4>
              <p className="text-sm text-muted-foreground/60 font-mono mb-4">{pos.org}</p>
              <ul className="space-y-2.5">
                {pos.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
