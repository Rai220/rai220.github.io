import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GitFork, Users, Star, Activity, Rocket, Bot, Briefcase } from "lucide-react";
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
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const iconMap: Record<string, any> = {
  repos: GitFork,
  followers: Users,
  stars: Star,
  activity: Activity,
};

const positions = [
  {
    icon: Rocket,
    badge: "Сейчас",
    badgeColor: "text-primary border-primary/30 bg-primary/5",
    title: "CTO GigaChain",
    org: "GigaChat / Сбер",
    desc: "Руковожу разработкой GigaChain — набора инструментов для создания AI-агентов на базе GigaChat. Строю платформу для LLM-приложений.",
    borderColor: "border-primary/20 hover:border-primary/40",
    glowColor: "group-hover:shadow-[0_0_60px_hsl(157_100%_49%/0.08)]",
  },
  {
    icon: Bot,
    badge: "2012–2017",
    badgeColor: "text-secondary border-secondary/30 bg-secondary/5",
    title: "Co-founder & Head of AI",
    org: "Cubic.ai",
    desc: "Сооснователь и Head of AI первого в мире AI-голосового спикера. Пионер в робототехнике и нейротехнологиях.",
    borderColor: "border-secondary/20 hover:border-secondary/40",
    glowColor: "group-hover:shadow-[0_0_60px_hsl(185_100%_50%/0.08)]",
  },
  {
    icon: Briefcase,
    badge: "2019–2021",
    badgeColor: "text-accent border-accent/30 bg-accent/5",
    title: "Head of AI",
    org: "The Coach",
    desc: "Руководил AI-инициативами. Разрабатывал интеллектуальные решения для персонализированного коучинга.",
    borderColor: "border-accent/20 hover:border-accent/40",
    glowColor: "group-hover:shadow-[0_0_60px_hsl(270_80%_60%/0.08)]",
  },
];

export function AboutSection({ stats }: AboutSectionProps) {
  return (
    <>
      <div className="mb-16">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/60 to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">About</span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-gradient">Обо мне</span>
        </motion.h2>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Activity;
          return (
            <motion.div
              key={stat.id}
              className="card-premium p-5 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Icon className="w-5 h-5 text-primary/60 mb-3 group-hover:text-primary transition-colors" />
              <div className="text-2xl md:text-3xl font-bold font-mono text-foreground mb-1">
                {stat.displayValue || <AnimatedCounter end={stat.value} />}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider leading-tight">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mb-16">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-secondary/60 to-transparent" />
          <span className="text-xs font-mono text-secondary uppercase tracking-[0.3em]">Career</span>
        </motion.div>
        <motion.h3
          className="text-2xl md:text-3xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Опыт работы
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {positions.map((pos, i) => {
          const Icon = pos.icon;
          return (
            <motion.div
              key={i}
              className={`group card-premium p-7 ${pos.borderColor} ${pos.glowColor} transition-all duration-500`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground/70" />
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${pos.badgeColor}`}>
                  {pos.badge}
                </span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-1">{pos.title}</h4>
              <p className="text-sm text-muted-foreground/70 font-mono mb-3">{pos.org}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{pos.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
