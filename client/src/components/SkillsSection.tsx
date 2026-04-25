import { motion } from "framer-motion";
import { Brain, Target, Zap, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Skill } from "@shared/schema";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();
  const tags = skills.filter(s => s.category === "tags");
  const thesisItems = skills.filter(s => s.category === "thesis");
  const valueItems = skills.filter(s => s.category === "value");
  const techItems = skills.filter(s => s.category === "tech");

  return (
    <>
      <div className="mb-12">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="h-px flex-1 max-w-[60px] bg-primary/50" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.24em]">Services</span>
        </motion.div>
        <motion.h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-foreground" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          {t("skills_title")}
        </motion.h2>
        <motion.p className="text-base md:text-lg text-muted-foreground max-w-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {t("skills_subtitle")}
        </motion.p>
      </div>

      <motion.div className="flex flex-wrap gap-2 mb-14" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        {tags.map((tag, i) => (
          <motion.span key={tag.id}
            className="px-4 py-2 rounded-md text-sm font-mono border border-primary/20 bg-primary/5 text-foreground/80 cursor-default"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05 }}>
            {tag.name}
          </motion.span>
        ))}
      </motion.div>

      <div className="terminal-panel p-6 md:p-8 mb-10">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-6 h-6 text-primary" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">{t("skills_thesis")}</h3>
        </div>
        <div className="space-y-6">
          {thesisItems.map((item, i) => (
            <motion.div key={item.id} className="flex items-start gap-4"
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }}>
              <div className="mt-1 w-8 h-8 rounded-md bg-primary/5 border border-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-mono text-sm font-bold">{i + 1}</span>
              </div>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-14">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-5 h-5 text-secondary" />
          <h3 className="text-xl font-bold text-foreground">{t("skills_value")}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {valueItems.map((item, i) => (
            <motion.div key={item.id} className="card-premium p-6 group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-primary/50 mt-1 flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                <p className="text-sm text-muted-foreground leading-relaxed">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">{t("skills_stack")}</h3>
        </div>
        <div className="relative overflow-hidden rounded-md">
          <div className="flex flex-wrap gap-2">
            {techItems.map((tech) => (
              <span key={tech.id}
                className="px-4 py-2 rounded-md border border-border/70 bg-card text-sm font-mono text-foreground/70 cursor-default">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
