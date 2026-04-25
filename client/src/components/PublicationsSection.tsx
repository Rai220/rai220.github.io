import { motion } from "framer-motion";
import { FileText, ExternalLink, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Article } from "@shared/schema";

interface PublicationsSectionProps {
  articles: Article[];
}

export function PublicationsSection({ articles }: PublicationsSectionProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="mb-12">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1 max-w-[60px] bg-primary/60" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.25em]">research</span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t("publications_title")}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, i) => (
          <motion.a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group terminal-panel p-5 flex flex-col cursor-pointer ${
              article.badge ? "border-primary/40" : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i, duration: 0.5 }}
          >
            {article.badge && (
              <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-md bg-primary/5 border border-primary/20 w-fit">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-mono text-primary">{article.badge}</span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-background border border-border/70 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-foreground/50" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground/60 uppercase">{article.platform}</span>
                  <span className="text-[10px] font-mono text-muted-foreground/40 ml-2">{article.date}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1" />
            </div>

            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-relaxed flex-1">
              {article.title}
            </h3>
          </motion.a>
        ))}
      </div>
    </>
  );
}
