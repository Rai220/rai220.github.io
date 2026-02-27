import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, ArrowUpRight, Terminal } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "k.krestnikov@gmail.com", href: "mailto:k.krestnikov@gmail.com", color: "text-primary", borderColor: "hover:border-primary/40", hoverBg: "hover:bg-primary/5" },
  { icon: Send, label: "Telegram", value: "@Krestnikov", href: "https://t.me/Krestnikov", color: "text-secondary", borderColor: "hover:border-secondary/40", hoverBg: "hover:bg-secondary/5" },
  { icon: Github, label: "GitHub", value: "@Rai220", href: "https://github.com/Rai220", color: "text-foreground", borderColor: "hover:border-primary/40", hoverBg: "hover:bg-primary/5" },
  { icon: Linkedin, label: "LinkedIn", value: "Konstantin Krestnikov", href: "https://ru.linkedin.com/in/rai220", color: "text-blue-400", borderColor: "hover:border-blue-400/40", hoverBg: "hover:bg-blue-400/5" },
];

export function ContactSection() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-4 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-card/50" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-16 text-center">
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
            <span className="text-gradient">Давайте поговорим</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm md:text-base mt-3 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            R&D Lead &middot; AI Visionary &middot; CTO &middot; Консультации по AI-стратегии
          </motion.p>
        </div>

        <motion.div
          className="card-premium p-6 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground/60 mb-3">
              <Terminal className="w-4 h-4" />
              <span className="text-primary/70">guest@krestnikov</span>
              <span>~</span>
              <span className="text-secondary/70">$</span>
            </div>
            <div className="glass rounded-lg p-4">
              <div className="text-primary/80 text-sm font-mono mb-1">&gt; contact --list</div>
              <div className="text-muted-foreground/50 text-xs font-mono space-y-0.5">
                <div>Инициализация...</div>
                <div className="text-primary/60">&#10003; Контакты загружены</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map(({ icon: Icon, label, value, href, color, borderColor, hoverBg }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-white/[0.01] ${borderColor} ${hoverBg} transition-all duration-500 cursor-pointer`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/20 transition-colors">
                  <Icon className={`w-5 h-5 ${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground/50 font-mono uppercase tracking-wider mb-0.5">{label}</div>
                  <div className="text-sm text-foreground font-medium truncate">{value}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
              </motion.a>
            ))}
          </div>

          <div className="mt-8 glass rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center gap-2 text-muted-foreground/40">
              <span className="text-primary/50">&gt;</span>
              <span>status: <span className="text-primary/70">ready_to_connect</span></span>
              <span className={`inline-block w-[7px] h-4 bg-primary/60 ml-1 rounded-sm ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
