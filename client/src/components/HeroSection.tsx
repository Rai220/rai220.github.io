import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Send, Youtube, FileText, ChevronDown, ArrowRight } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Rai220", color: "hover:border-primary/60 hover:text-primary" },
  { icon: Send, label: "Telegram", href: "https://t.me/robofuture", color: "hover:border-secondary/60 hover:text-secondary" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@Rai220", color: "hover:border-red-400/60 hover:text-red-400" },
  { icon: FileText, label: "Habr", href: "https://habr.com/ru/users/Rai220/", color: "hover:border-accent/60 hover:text-accent" },
];

const metrics = [
  { value: "Top 1.5%", label: "PyPI worldwide" },
  { value: "77K+", label: "downloads / мес" },
  { value: "$680K+", label: "привлечено" },
];

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "KONSTANTIN KRESTNIKOV";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      if (idx <= fullText.length) { setTypedText(fullText.slice(0, idx)); idx++; }
      else clearInterval(timer);
    }, 70);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0 animated-gradient-bg" />
      <ParticleBackground />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,157,0.08) 2px, rgba(0,255,157,0.08) 4px)',
        }} />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="mb-5 flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", damping: 15 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 rounded-full blur-2xl animate-pulse-slow" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30 ring-4 ring-primary/10">
                <img src="https://avatars.githubusercontent.com/u/1329774?v=4" alt="Konstantin Krestnikov" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono text-primary mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Открыт к предложениям: R&D Lead / AI Visionary
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-mono tracking-tight">
              <span className="text-gradient">{typedText}</span>
              <span className={`inline-block w-[3px] h-[0.8em] bg-primary ml-1 rounded-sm align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
            </h1>
          </motion.div>

          <motion.div
            className="space-y-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
              Под моим руководством создана библиотека gigachat —{" "}
              <span className="text-gradient-accent">top 1.5% библиотек мира на PyPI</span>
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              CTO GigaChain @ Сбер &middot; Выбрал стратегию Сбера по внедрению AI-агентов через OpenSource &middot; e/acc
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto">
              Визионер AGI-эры, который видит куда идёт AI — и умеет это строить руками.
              От прототипа до enterprise-платформы с десятками тысяч пользователей.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {metrics.map(m => (
              <div key={m.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-mono text-gradient">{m.value}</div>
                <div className="text-[11px] text-muted-foreground/60 uppercase tracking-wider mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 justify-center items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              Обсудить сотрудничество
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2.5 justify-center items-center mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            {socialLinks.map(({ icon: Icon, label, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`group flex items-center gap-2 px-4 py-2 rounded-xl border border-border/40 bg-white/[0.02] text-muted-foreground text-sm transition-all duration-500 ${color}`}>
                <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </motion.div>

          <motion.div className="flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <button onClick={() => document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-primary/60 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
