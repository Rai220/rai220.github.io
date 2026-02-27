import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, Bug, Github } from "lucide-react";
import type { GitHubActivity } from "@shared/schema";

interface GitHubActivitySectionProps {
  activity: GitHubActivity;
}

export function GitHubActivitySection({ activity }: GitHubActivitySectionProps) {
  const getColor = (count: number) => {
    if (count === 0) return "bg-white/[0.03]";
    if (count <= 2) return "bg-primary/25";
    if (count <= 4) return "bg-primary/45";
    if (count <= 6) return "bg-primary/65";
    return "bg-primary/90";
  };

  const getLevel = (count: number) => {
    if (count === 0) return "Нет активности";
    if (count <= 2) return "Низкая";
    if (count <= 4) return "Средняя";
    if (count <= 6) return "Высокая";
    return "Очень высокая";
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
  const total = activity.contributionGraph.reduce((s, d) => s + d.count, 0);

  const statCards = [
    { icon: GitCommit, label: "Коммиты", value: activity.totalCommits, color: "text-primary", bg: "bg-primary/5 border-primary/10" },
    { icon: GitPullRequest, label: "Pull Requests", value: activity.totalPRs, color: "text-secondary", bg: "bg-secondary/5 border-secondary/10" },
    { icon: Bug, label: "Issues", value: activity.totalIssues, color: "text-accent", bg: "bg-accent/5 border-accent/10" },
  ];

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
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Activity</span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-gradient">GitHub активность</span>
        </motion.h2>
      </div>

      <motion.div
        className="card-premium p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Github className="w-5 h-5 text-foreground/60" />
            <span className="text-lg font-bold font-mono text-foreground">
              {total.toLocaleString()} <span className="text-muted-foreground font-normal text-sm">contributions</span>
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground/60">последний год</span>
        </div>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="inline-flex gap-[3px] min-w-full">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => {
                  if (day.count === -1) return <div key={di} className="w-[11px] h-[11px]" />;
                  return (
                    <div
                      key={di}
                      className={`w-[11px] h-[11px] rounded-[2px] ${getColor(day.count)} hover:ring-1 hover:ring-primary/50 transition-all cursor-pointer`}
                      title={`${day.date}: ${day.count} — ${getLevel(day.count)}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-[10px] text-muted-foreground/50 font-mono">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-[11px] h-[11px] rounded-[2px] bg-white/[0.03]" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-primary/25" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-primary/45" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-primary/65" />
              <div className="w-[11px] h-[11px] rounded-[2px] bg-primary/90" />
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map(({ icon: Icon, label, value, color, bg }, i) => (
            <motion.div
              key={label}
              className={`flex items-center gap-4 p-4 rounded-xl border ${bg} transition-all`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Icon className={`w-5 h-5 ${color}`} />
              <div>
                <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
