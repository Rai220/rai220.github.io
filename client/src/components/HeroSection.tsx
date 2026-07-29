import { motion } from "framer-motion";
import { Github, Send, Youtube, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Rai220", color: "hover:border-primary/60 hover:text-primary" },
  { icon: Send, label: "Telegram", href: "https://t.me/robofuture", color: "hover:border-secondary/60 hover:text-secondary" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@robofuture", color: "hover:border-red-400/60 hover:text-red-400" },
  { icon: FileText, label: "Habr", href: "https://habr.com/ru/users/Rai220/", color: "hover:border-accent/60 hover:text-accent" },
];

export function HeroSection() {
  const { t } = useLanguage();

  const metrics = [
    { value: "top 1.5%", label: "PyPI" },
    { value: "110K+", label: t("hero_metric_downloads") },
    { value: "arXiv 2026", label: t("hero_metric_research") },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-border/70" id="hero">
      <div className="absolute inset-0 console-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-primary/40" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/30 bg-primary/5 text-xs font-mono text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t("hero_badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[0.98] mb-4">
              Konstantin Krestnikov
              <span className="block text-primary text-2xl sm:text-3xl md:text-4xl mt-3 font-semibold">
                {t("hero_profile_badge")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/90 mb-3 max-w-2xl">
              {t("hero_highlight")}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-8">
              {t("hero_role")}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); trackEvent("cta_hero_click"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
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
                  onClick={() => trackEvent("external_link_click", { label })}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 bg-card/60 text-muted-foreground text-sm transition-colors ${color}`}>
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="terminal-panel p-5 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-4 font-mono text-xs text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              <span className="ml-2">rai220://profile</span>
            </div>
            <div className="space-y-4 font-mono">
              <div className="text-sm text-muted-foreground">&gt; {t("hero_proof_command")}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {metrics.map(m => (
                  <div key={m.label} className="rounded-md border border-border/70 bg-background/70 p-4">
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                {[
                  t("hero_capability_1"),
                  t("hero_capability_2"),
                  t("hero_capability_3"),
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-primary">›</span>
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
