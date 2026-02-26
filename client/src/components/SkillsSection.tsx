import { motion } from "framer-motion";
import { Eye, Cpu, Code, Zap } from "lucide-react";
import type { Skill } from "@shared/schema";

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryMeta: Record<string, { icon: any; title: string; color: string; borderColor: string }> = {
  vision: { icon: Eye, title: "Видение продукта", color: "text-primary", borderColor: "border-primary/20 hover:border-primary/40" },
  architecture: { icon: Cpu, title: "Архитектура систем", color: "text-secondary", borderColor: "border-secondary/20 hover:border-secondary/40" },
  engineering: { icon: Code, title: "Engineering (IC)", color: "text-accent", borderColor: "border-accent/20 hover:border-accent/40" },
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const tags = skills.filter(s => s.category === "tags");
  const techItems = skills.filter(s => s.category === "tech");
  const categories = ["vision", "architecture", "engineering"];

  return (
    <>
      <div className="mb-16">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/60 to-transparent" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Skills</span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-gradient">Как я работаю с AI</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Визионер и индивидуальный разработчик, который ведёт проекты от идеи до работающего AI-продукта
        </motion.p>
      </div>

      <motion.div
        className="flex flex-wrap gap-2 mb-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {tags.map((tag, i) => (
          <motion.span
            key={tag.id}
            className="px-4 py-2 rounded-xl text-sm font-mono glass border border-primary/20 text-foreground/80 hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-default"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            {tag.name}
          </motion.span>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {categories.map((cat, i) => {
          const meta = categoryMeta[cat];
          const items = skills.filter(s => s.category === cat);
          const Icon = meta.icon;
          return (
            <motion.div
              key={cat}
              className={`group card-premium p-7 ${meta.borderColor} transition-all duration-500`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${meta.color}`} />
                </div>
                <h3 className="text-base font-bold text-foreground">{meta.title}</h3>
              </div>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${meta.color} bg-current flex-shrink-0`} />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Технологический стек</h3>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <div className="flex animate-marquee">
            {[...techItems, ...techItems].map((tech, i) => (
              <span
                key={`${tech.id}-${i}`}
                className="flex-shrink-0 mx-2 px-5 py-2.5 rounded-xl glass border border-white/[0.06] text-sm font-mono text-foreground/70 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default whitespace-nowrap"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
