import { motion } from "framer-motion";
import { Star, ExternalLink, GitFork } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectsSectionProps {
  projects: Project[];
}

const languageColors: Record<string, string> = {
  Python: "bg-blue-400",
  "Jupyter Notebook": "bg-orange-400",
  Java: "bg-red-400",
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
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
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Projects</span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-gradient">Избранные проекты</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground mt-4 max-w-xl text-base md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Open-source инструменты и платформы для разработки AI-агентов
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group card-premium p-6 flex flex-col cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                <GitFork className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <h3 className="text-lg font-bold font-mono text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-3">
              {project.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${languageColors[project.language] || "bg-gray-400"}`} />
                  <span className="text-xs">{project.language}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono">{project.stars}</span>
                </span>
              </div>
              <div className="flex gap-1.5">
                {project.tech.slice(0, 2).map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </>
  );
}
