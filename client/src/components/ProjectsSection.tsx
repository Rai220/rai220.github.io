import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          data-testid="heading-projects"
        >
          <span className="text-foreground">&gt;_</span> ИЗБРАННЫЕ ПРОЕКТЫ
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <Card
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover-elevate h-full flex flex-col"
              data-testid={`card-project-${project.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-6 relative z-10 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors font-mono" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h3>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs font-mono border-primary/30" data-testid={`badge-project-tag-${project.id}-${tag}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1" data-testid={`text-project-desc-${project.id}`}>
                  {project.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground" data-testid={`container-project-stars-${project.id}`}>
                    <Star className="w-4 h-4 text-primary" data-testid={`icon-project-star-${project.id}`} />
                    <span className="font-mono" data-testid={`text-project-stars-${project.id}`}>{project.stars}</span>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs" data-testid={`badge-project-language-${project.id}`}>
                    {project.language}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-secondary/30" data-testid={`badge-project-tech-${project.id}-${tech.toLowerCase().replace(/\s+/g, '-')}`}>
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 3 && (
                    <Badge variant="outline" className="text-xs" data-testid={`badge-project-tech-more-${project.id}`}>
                      +{project.tech.length - 3}
                    </Badge>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30 hover:border-primary group/btn"
                  asChild
                  data-testid={`button-project-view-${project.id}`}
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                    Посмотреть проект
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
