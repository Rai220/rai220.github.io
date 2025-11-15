import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitCommit, GitPullRequest, AlertCircle } from "lucide-react";
import type { GitHubActivity } from "@shared/schema";

interface GitHubActivitySectionProps {
  activity: GitHubActivity;
}

export function GitHubActivitySection({ activity }: GitHubActivitySectionProps) {
  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-muted/30";
    if (count <= 2) return "bg-primary/30";
    if (count <= 4) return "bg-primary/50";
    if (count <= 6) return "bg-primary/70";
    return "bg-primary";
  };

  const getContributionLevel = (count: number) => {
    if (count === 0) return "Нет активности";
    if (count <= 2) return "Низкая активность";
    if (count <= 4) return "Средняя активность";
    if (count <= 6) return "Высокая активность";
    return "Очень высокая активность";
  };

  const groupByWeek = (contributions: Array<{ date: string; count: number }>) => {
    const weeks: Array<Array<{ date: string; count: number }>> = [];
    let currentWeek: Array<{ date: string; count: number }> = [];
    
    contributions.forEach((contrib, index) => {
      const date = new Date(contrib.date);
      const dayOfWeek = date.getDay();
      
      if (index === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: -1 });
        }
      }
      
      currentWeek.push(contrib);
      
      if (dayOfWeek === 6 || index === contributions.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const weeks = groupByWeek(activity.contributionGraph);
  const totalContributions = activity.contributionGraph.reduce((sum, day) => sum + day.count, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
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
          data-testid="heading-github-activity"
        >
          <span className="text-foreground">&gt;_</span> АКТИВНОСТЬ НА GITHUB
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300" data-testid="card-github-activity">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-mono text-foreground" data-testid="text-contributions-title">
                {totalContributions} contributions в последний год
              </h3>
              <Badge variant="outline" className="font-mono border-primary/50 text-primary" data-testid="badge-github">
                GitHub
              </Badge>
            </div>
          </div>

          <div className="mb-8 overflow-x-auto">
            <div className="inline-flex gap-1 min-w-full" data-testid="contribution-graph">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => {
                    if (day.count === -1) {
                      return <div key={dayIndex} className="w-3 h-3" />;
                    }
                    return (
                      <motion.div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)} hover:ring-2 hover:ring-primary transition-all cursor-pointer`}
                        title={`${day.date}: ${day.count} contributions - ${getContributionLevel(day.count)}`}
                        variants={itemVariants}
                        data-testid={`contribution-day-${day.date}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <span>Меньше</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted/30" />
                <div className="w-3 h-3 rounded-sm bg-primary/30" />
                <div className="w-3 h-3 rounded-sm bg-primary/50" />
                <div className="w-3 h-3 rounded-sm bg-primary/70" />
                <div className="w-3 h-3 rounded-sm bg-primary" />
              </div>
              <span>Больше</span>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30" data-testid="card-stat-commits">
                <div className="flex items-center gap-3 mb-2">
                  <GitCommit className="w-6 h-6 text-primary" data-testid="icon-commits" />
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">Коммиты</span>
                </div>
                <div className="text-3xl font-bold font-mono text-primary" data-testid="text-commits-value">
                  {activity.totalCommits}
                </div>
                <div className="text-xs text-muted-foreground mt-1">79% активности</div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30" data-testid="card-stat-prs">
                <div className="flex items-center gap-3 mb-2">
                  <GitPullRequest className="w-6 h-6 text-secondary" data-testid="icon-prs" />
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">Pull Requests</span>
                </div>
                <div className="text-3xl font-bold font-mono text-secondary" data-testid="text-prs-value">
                  {activity.totalPRs}
                </div>
                <div className="text-xs text-muted-foreground mt-1">18% активности</div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30" data-testid="card-stat-issues">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-6 h-6 text-accent" data-testid="icon-issues" />
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">Issues</span>
                </div>
                <div className="text-3xl font-bold font-mono text-accent" data-testid="text-issues-value">
                  {activity.totalIssues}
                </div>
                <div className="text-xs text-muted-foreground mt-1">1% активности</div>
              </Card>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </>
  );
}
