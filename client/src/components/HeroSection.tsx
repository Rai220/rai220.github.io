import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Send, Youtube, FileText, ChevronDown, Sparkles } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Rai220", color: "hover:border-primary/60 hover:text-primary hover:shadow-[0_0_30px_hsl(157_100%_49%/0.15)]" },
  { icon: Send, label: "Telegram", href: "https://t.me/robofuture", color: "hover:border-secondary/60 hover:text-secondary hover:shadow-[0_0_30px_hsl(185_100%_50%/0.15)]" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@Rai220", color: "hover:border-red-400/60 hover:text-red-400 hover:shadow-[0_0_30px_rgba(248,113,113,0.15)]" },
  { icon: FileText, label: "Habr", href: "https://habr.com/ru/users/Rai220/", color: "hover:border-accent/60 hover:text-accent hover:shadow-[0_0_30px_hsl(270_80%_60%/0.15)]" },
];

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "KONSTANTIN KRESTNIKOV";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      if (idx <= fullText.length) {
        setTypedText(fullText.slice(0, idx));
        idx++;
      } else {
        clearInterval(timer);
      }
    }, 80);
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

      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,157,0.08) 2px, rgba(0,255,157,0.08) 4px)',
        }} />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring", damping: 15 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-2xl animate-pulse-slow" />
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-primary/30 ring-4 ring-primary/10">
                <img
                  src="https://avatars.githubusercontent.com/u/1329774?v=4"
                  alt="Konstantin Krestnikov"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to collaboration
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-mono tracking-tight mb-2">
              <span className="text-gradient">{typedText}</span>
              <span className={`inline-block w-[3px] h-[0.85em] bg-primary ml-1 rounded-sm align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
            </h1>
          </motion.div>

          <motion.div
            className="space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
              CTO GigaChain{" "}
              <span className="text-gradient-accent font-normal text-lg md:text-xl lg:text-2xl">
                AI Agents & Dev Tools
              </span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Строю будущее AI-агентов. Руковожу разработкой GigaChain —
              платформы инструментов для GigaChat. Создаю интеллектуальные системы,
              которые меняют индустрию.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {socialLinks.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/50 bg-white/[0.02] text-muted-foreground transition-all duration-500 ${color}`}
              >
                <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-medium">{label}</span>
              </a>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-primary/70 transition-colors"
            >
              <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
