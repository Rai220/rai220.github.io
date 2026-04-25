import { motion } from "framer-motion";
import { Github, Send, Youtube, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Rai220", color: "hover:border-primary/60 hover:text-primary" },
  { icon: Send, label: "Telegram", href: "https://t.me/robofuture", color: "hover:border-secondary/60 hover:text-secondary" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@Rai220", color: "hover:border-red-400/60 hover:text-red-400" },
  { icon: FileText, label: "Habr", href: "https://habr.com/ru/users/Rai220/", color: "hover:border-accent/60 hover:text-accent" },
];

export function HeroSection() {
  const { t } = useLanguage();

  const metrics = [
    { value: "top 1.5%", label: "PyPI" },
    { value: "77K+", label: t("hero_metric_downloads") },
    { value: "arXiv 2026", label: "LLM research" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden border-b border-border/70" id="hero">
      <div className="absolute inset-0 console-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-primary/40" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/30 bg-primary/5 text-xs font-mono text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t("hero_badge")}
            </div>

            <p className="font-mono text-sm text-muted-foreground mb-4">&gt; whoami</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
              Konstantin Krestnikov
              <span className="block text-primary">AI systems architect</span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold text-foreground mb-4 max-w-3xl">
              {t("hero_highlight")}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
              {t("hero_subtitle")}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-2xl mb-8">
              {t("hero_role")} {t("hero_desc1")} {t("hero_desc2")}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                {t("hero_cta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-5 py-3 rounded-md border border-border/80 bg-card/70 text-sm font-semibold text-foreground hover:border-primary/50 transition-colors"
              >
                {t("nav_services")}
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5 items-center">
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`group flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 bg-card/60 text-muted-foreground text-sm transition-colors ${color}`}>
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="terminal-panel p-5 md:p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-4 font-mono text-xs text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              <span className="ml-2">harness://expert-profile</span>
            </div>
            <div className="space-y-4 font-mono">
              <div className="text-sm text-muted-foreground">&gt; load proof</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {metrics.map(m => (
                  <div key={m.label} className="rounded-md border border-border/70 bg-background/70 p-4">
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                {[
                  "agentic AI architecture",
                  "LLM SDK / platform engineering",
                  "consulting & team mentorship",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
