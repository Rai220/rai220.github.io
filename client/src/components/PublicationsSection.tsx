import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Award } from "lucide-react";
import type { Article } from "@shared/schema";

interface PublicationsSectionProps {
  articles: Article[];
}

export function PublicationsSection({ articles }: PublicationsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <div className="mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-mono mb-4 text-primary"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="heading-publications"
        >
          <span className="text-foreground">&gt;_</span> МОИ ПУБЛИКАЦИИ
        </motion.h2>
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {articles.map((article) => (
          <motion.div key={article.id} variants={itemVariants}>
            <Card
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover-elevate h-full flex flex-col"
              data-testid={`card-article-${article.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-6 relative z-10 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" data-testid={`icon-article-${article.id}`} />
                    <Badge variant="outline" className="font-mono text-xs border-primary/30" data-testid={`badge-article-platform-${article.id}`}>
                      {article.platform}
                    </Badge>
                    {article.badge && (
                      <Badge variant="default" className="font-mono text-xs bg-accent/20 border-accent/50 text-accent" data-testid={`badge-article-award-${article.id}`}>
                        <Award className="w-3 h-3 mr-1" />
                        Победитель
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono" data-testid={`text-article-date-${article.id}`}>
                    {article.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-4 text-foreground group-hover:text-primary transition-colors leading-relaxed flex-1" data-testid={`text-article-title-${article.id}`}>
                  {article.title}
                </h3>

                {article.badge && (
                  <div className="mb-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                    <p className="text-sm text-accent font-medium" data-testid={`text-article-badge-${article.id}`}>
                      {article.badge}
                    </p>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30 hover:border-primary group/btn"
                  asChild
                  data-testid={`button-article-read-${article.id}`}
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                    Читать на {article.platform}
                  </a>
                </Button>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
