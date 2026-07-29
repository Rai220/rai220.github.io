import { motion } from "framer-motion";
import { Rocket, Bot, Briefcase, TrendingUp, Star, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Stat } from "@shared/schema";

interface AboutSectionProps {
  stats: Stat[];
}

const iconMap: Record<string, typeof Star> = {
  stars: Star, repos: FileText, activity: TrendingUp,
};

export function AboutSection({ stats }: AboutSectionProps) {
  const { t } = useLanguage();

  const positions = [
    {
      icon: Rocket,
      badge: t("about_now"),
      badgeColor: "text-primary border-primary/30 bg-primary/5",
      title: "GigaChat / Sber",
      org: t("about_org1"),
      items: [t("about_item1_1"), t("about_item1_2"), t("about_item1_3")],
      borderColor: "border-primary/25",
    },
    {
      icon: Bot,
      badge: "consulting",
      badgeColor: "text-secondary border-secondary/30 bg-secondary/5",
      title: "External AI/R&D architect",
      org: "Companies & engineering teams",
      items: [t("about_item2_1"), t("about_item2_2"), t("about_item2_3")],
      borderColor: "border-secondary/25",
    },
    {
      icon: Briefcase,
      badge: "research",
      badgeColor: "text-accent border-accent/30 bg-accent/5",
      title: "LLM research",
      org: "arXiv 2603.11749",
      items: [t("about_item3_1"), t("about_item3_2"), t("about_item3_3")],
      borderColor: "border-accent/25",
    },
  ];

  return (
    <>
      <div className="mb-10">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/60 to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">About</span>
        </motion.div>
        <motion.h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <span className="text-gradient">{t("about_title")}</span>
        </motion.h2>
        <motion.p className="text-muted-foreground text-base md:text-lg max-w-3xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {t("about_subtitle")}
        </motion.p>
      </div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || TrendingUp;
          return (
            <motion.div key={stat.id} className="card-premium p-5" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i, duration: 0.4 }}>
              <Icon className="w-5 h-5 text-primary/60 mb-3" />
              <div className="text-2xl md:text-3xl font-bold font-mono text-foreground mb-1">
                {stat.displayValue}
              </div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider leading-tight">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mb-6">
        <motion.h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {t("about_track_title")}
        </motion.h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {positions.map((pos, i) => {
          const Icon = pos.icon;
          return (
            <motion.div key={i} className={`group card-premium p-6 ${pos.borderColor}`}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 * i, duration: 0.45 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground/70" />
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-md border ${pos.badgeColor}`}>{pos.badge}</span>
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
