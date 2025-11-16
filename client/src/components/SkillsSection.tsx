import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@shared/schema";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const tags = skills.filter(s => s.category === "tags");
  const visionItems = skills.filter(s => s.category === "vision");
  const architectureItems = skills.filter(s => s.category === "architecture");
  const engineeringItems = skills.filter(s => s.category === "engineering");
  const techItems = skills.filter(s => s.category === "tech");

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <div className="mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-mono mb-4 text-primary"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="heading-skills"
        >
          <span className="text-foreground">&gt;_</span> Как я работаю с AI и агентами
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-muted-foreground font-mono mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          data-testid="text-skills-subtitle"
        >
          Я визионер и индивидуальный разработчик (IC), который ведёт проекты от идеи до работающего AI/agent-продукта.
        </motion.p>
        <motion.div 
          className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      <motion.div
        className="flex flex-wrap gap-3 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        data-testid="tags-container"
      >
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="outline"
            className="px-4 py-2 text-sm font-mono border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors"
            data-testid={`tag-${tag.id}`}
          >
            {tag.name}
          </Badge>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants}>
          <Card
            className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 h-full"
            data-testid="card-vision"
          >
            <h3 className="text-xl font-bold font-mono text-foreground mb-6" data-testid="heading-vision">
              Вижу, куда движется AI, и превращаю это в продукты
            </h3>
            <ul className="space-y-4">
              {visionItems.map((item) => (
                <li key={item.id} className="flex items-start" data-testid={`vision-item-${item.id}`}>
                  <span className="text-primary mr-3 mt-1 flex-shrink-0">▸</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 h-full"
            data-testid="card-architecture"
          >
            <h3 className="text-xl font-bold font-mono text-foreground mb-6" data-testid="heading-architecture">
              Проектирую агентные системы и когнитивные воркфлоу
            </h3>
            <ul className="space-y-4">
              {architectureItems.map((item) => (
                <li key={item.id} className="flex items-start" data-testid={`architecture-item-${item.id}`}>
                  <span className="text-primary mr-3 mt-1 flex-shrink-0">▸</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 h-full"
            data-testid="card-engineering"
          >
            <h3 className="text-xl font-bold font-mono text-foreground mb-6" data-testid="heading-engineering">
              Сам пишу и довожу до продакшена (IC)
            </h3>
            <ul className="space-y-4">
              {engineeringItems.map((item) => (
                <li key={item.id} className="flex items-start" data-testid={`engineering-item-${item.id}`}>
                  <span className="text-primary mr-3 mt-1 flex-shrink-0">▸</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold font-mono text-foreground mb-6" data-testid="heading-tech-focus">
          Технологический фокус
        </h3>
        <div className="flex flex-wrap gap-3" data-testid="tech-container">
          {techItems.map((tech) => (
            <Badge
              key={tech.id}
              variant="outline"
              className="px-4 py-2 text-sm font-mono border-secondary/40 bg-secondary/5 hover:bg-secondary/10 transition-colors"
              data-testid={`tech-${tech.id}`}
            >
              {tech.name}
            </Badge>
          ))}
        </div>
      </motion.div>
    </>
  );
}
