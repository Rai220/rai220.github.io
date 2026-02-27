import { motion } from "framer-motion";
import { Brain, Target, Wrench, Zap, ArrowRight } from "lucide-react";
import type { Skill } from "@shared/schema";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const tags = skills.filter(s => s.category === "tags");
  const thesisItems = skills.filter(s => s.category === "thesis");
  const valueItems = skills.filter(s => s.category === "value");
  const techItems = skills.filter(s => s.category === "tech");

  return (
    <>
      <div className="mb-16">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/60 to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Vision</span>
        </motion.div>
        <motion.h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <span className="text-gradient">Почему AI-агенты — это всё</span>
        </motion.h2>
        <motion.p className="text-base md:text-lg text-muted-foreground max-w-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Мы стоим на пороге AGI-революции. Вопрос не «будет ли», а «кто окажется готов».
        </motion.p>
      </div>

      <motion.div className="flex flex-wrap gap-2 mb-14" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        {tags.map((tag, i) => (
          <motion.span key={tag.id}
            className="px-4 py-2 rounded-xl text-sm font-mono glass border border-primary/20 text-foreground/80 hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05 }}>
            {tag.name}
          </motion.span>
        ))}
      </motion.div>

      <div className="card-premium p-8 md:p-10 mb-14">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-6 h-6 text-primary" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Мой тезис</h3>
        </div>
        <div className="space-y-6">
          {thesisItems.map((item, i) => (
            <motion.div key={item.id} className="flex items-start gap-4"
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }}>
              <div className="mt-1 w-8 h-8 rounded-lg bg-primary/5 border border-primary/15 flex items-center justify-center flex-shrink-0">
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
          <h3 className="text-xl font-bold text-foreground">Что я даю компании</h3>
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
          <h3 className="text-xl font-bold text-foreground">Стек</h3>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <div className="flex animate-marquee">
            {[...techItems, ...techItems].map((tech, i) => (
              <span key={`${tech.id}-${i}`}
                className="flex-shrink-0 mx-2 px-5 py-2.5 rounded-xl glass border border-white/[0.06] text-sm font-mono text-foreground/70 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default whitespace-nowrap">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
