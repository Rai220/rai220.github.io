import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Skill } from "@shared/schema";

interface SkillsSectionProps {
  skills: Skill[];
}

function SkillBar({ skill }: { skill: Skill }) {
  const [progress, setProgress] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setProgress(skill.proficiency);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [inView, skill.proficiency]);

  return (
    <div ref={ref} className="space-y-2" data-testid={`skill-${skill.id}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono text-foreground" data-testid={`text-skill-name-${skill.id}`}>
          {skill.name}
        </span>
        <span className="text-xs font-mono text-primary" data-testid={`text-skill-proficiency-${skill.id}`}>
          {progress}%
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 bg-muted"
        data-testid={`progress-skill-${skill.id}`}
      />
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
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
          data-testid="heading-skills"
        >
          <span className="text-foreground">&gt;_</span> НАВЫКИ И ТЕХНОЛОГИИ
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
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((category) => {
          const categorySkills = skills.filter(s => s.category === category);
          return (
            <motion.div key={category} variants={itemVariants}>
              <Card
                className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300"
                data-testid={`card-skills-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold font-mono text-foreground" data-testid={`heading-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {category}
                  </h3>
                  <Badge variant="outline" className="font-mono text-xs border-primary/30" data-testid={`badge-category-count-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {categorySkills.length} навыков
                  </Badge>
                </div>

                <div className="space-y-6">
                  {categorySkills.map((skill) => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="inline-block px-8 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border-primary/30" data-testid="card-skills-footer">
          <p className="text-sm font-mono text-muted-foreground" data-testid="text-skills-footer">
            <span className="text-primary font-bold">{'>'}</span> Постоянно изучаю новые технологии и совершенствую навыки
          </p>
        </Card>
      </motion.div>
    </>
  );
}
