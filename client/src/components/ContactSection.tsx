import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

const contacts = [
  { icon: Mail, label: "Email", value: "k.krestnikov@gmail.com", href: "mailto:k.krestnikov@gmail.com", color: "text-primary", borderColor: "hover:border-primary/40", hoverBg: "hover:bg-primary/5" },
  { icon: Send, label: "Telegram", value: "@Krestnikov", href: "https://t.me/Krestnikov", color: "text-secondary", borderColor: "hover:border-secondary/40", hoverBg: "hover:bg-secondary/5" },
  { icon: Github, label: "GitHub", value: "@Rai220", href: "https://github.com/Rai220", color: "text-foreground", borderColor: "hover:border-primary/40", hoverBg: "hover:bg-primary/5" },
  { icon: Linkedin, label: "LinkedIn", value: "Konstantin Krestnikov", href: "https://ru.linkedin.com/in/rai220", color: "text-blue-400", borderColor: "hover:border-blue-400/40", hoverBg: "hover:bg-blue-400/5" },
];

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 console-grid opacity-20" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="h-px w-[60px] bg-gradient-to-r from-transparent to-primary/60" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Contact</span>
            <div className="h-px w-[60px] bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("contact_title")}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm md:text-base mt-3 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("contact_subtitle")}
          </motion.p>
        </div>

        <motion.div
          className="terminal-panel p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <div className="mb-6 font-mono text-sm text-muted-foreground">
            <span className="text-primary/80">&gt;</span> {t("contact_init")}
            <div className="text-primary/70 text-xs mt-1">✓ {t("contact_loaded")}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map(({ icon: Icon, label, value, href, color, borderColor, hoverBg }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("external_link_click", { label })}
                className={`group flex items-center gap-4 p-5 rounded-md border border-border/60 bg-background/60 ${borderColor} ${hoverBg} transition-colors cursor-pointer`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className="w-11 h-11 rounded-md bg-card border border-border/70 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground/50 font-mono uppercase tracking-wider mb-0.5">{label}</div>
                  <div className="text-sm text-foreground font-medium truncate">{value}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
