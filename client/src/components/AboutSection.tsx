import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitFork, Users, Star, Activity } from "lucide-react";
import type { Stat } from "@shared/schema";

interface AboutSectionProps {
  stats: Stat[];
}

function CountUpAnimation({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function AboutSection({ stats }: AboutSectionProps) {
  const iconMap: Record<string, any> = {
    repos: GitFork,
    followers: Users,
    stars: Star,
    activity: Activity,
  };

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
    hidden: { opacity: 0, y: 20 },
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
          data-testid="heading-about"
        >
          <span className="text-foreground">&gt;_</span> ОБО МНЕ
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon] || Activity;
          return (
            <motion.div key={stat.id} variants={itemVariants}>
              <Card 
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover-elevate"
                data-testid={`card-stat-${stat.id}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 text-primary group-hover:animate-pulse" data-testid={`icon-stat-${stat.id}`} />
                  <Badge variant="outline" className="font-mono text-xs border-primary/30" data-testid={`badge-stat-${stat.id}`}>
                    STATS
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold font-mono text-primary" data-testid={`text-stat-value-${stat.id}`}>
                    <CountUpAnimation end={stat.value} />
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide" data-testid={`text-stat-label-${stat.id}`}>
                    {stat.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-primary/30 hover-elevate" data-testid="card-position-1">
            <div className="flex items-start gap-4">
              <div className="text-4xl" aria-hidden="true">🚀</div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-3 border-primary/50 text-primary font-mono" data-testid="badge-position-1">
                  CURRENT
                </Badge>
                <h3 className="text-xl font-bold mb-2 text-foreground" data-testid="text-position-title-1">
                  CTO GIGACHAIN
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-position-desc-1">
                  Руковожу разработкой GigaChain в GigaChat - набора инструментов для работы с GigaChat. 
                  Создаю передовые LLM-приложения и интеллектуальные системы.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-secondary/30 hover-elevate" data-testid="card-position-2">
            <div className="flex items-start gap-4">
              <div className="text-4xl" aria-hidden="true">💼</div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-3 border-secondary/50 text-secondary font-mono" data-testid="badge-position-2">
                  PREVIOUS
                </Badge>
                <h3 className="text-xl font-bold mb-2 text-foreground" data-testid="text-position-title-2">
                  EX-HEAD OF AI
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-position-desc-2">
                  Бывший Head of AI в The Coach. Руководил AI-инициативами и разрабатывал 
                  интеллектуальные решения для коучинга.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-accent/30 hover-elevate" data-testid="card-position-3">
            <div className="flex items-start gap-4">
              <div className="text-4xl" aria-hidden="true">🤖</div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-3 border-accent/50 text-accent font-mono" data-testid="badge-position-3">
                  FOUNDER
                </Badge>
                <h3 className="text-xl font-bold mb-2 text-foreground" data-testid="text-position-title-3">
                  СО-ОСНОВАТЕЛЬ & HEAD OF AI
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-position-desc-3">
                  Head of AI и сооснователь Cubic.ai - первого в мире AI-голосового спикера. 
                  Пионер в робототехнике и нейротехнологиях.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
}
