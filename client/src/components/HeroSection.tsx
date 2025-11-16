import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Send, Youtube, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "./ParticleBackground";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = ">_ KONSTANTIN KRESTNIKOV";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-card" data-testid="section-hero">
      <ParticleBackground />
      
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 157, 0.03) 2px, rgba(0, 255, 157, 0.03) 4px)',
        }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            className="mb-8 flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Avatar className="w-48 h-48 border-4 border-primary/50 ring-4 ring-primary/20 animate-glow" data-testid="img-avatar">
              <AvatarImage src="https://avatars.githubusercontent.com/u/1329774?v=4" alt="Profile" />
              <AvatarFallback className="bg-card text-4xl font-mono">KK</AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <pre className="text-xs text-muted-foreground font-mono mb-4" data-testid="text-system-init">
              SYSTEM.INIT()
            </pre>
            <h1 className="text-[clamp(1.125rem,6.8vw,2rem)] sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono mb-4 text-primary tracking-tight sm:tracking-normal whitespace-nowrap" data-testid="text-hero-title">
              {typedText}
              <span className={`inline-block w-[0.5ch] sm:w-1 h-[1em] bg-primary ml-1 sm:ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
            </h1>
          </motion.div>

          <motion.div 
            className="space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground" data-testid="text-subtitle">
              CTO GIGACHAIN <span className="text-secondary">(GigaChat Agents and Dev tools)</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-description">
              Руковожу разработкой GigaChain — набора инструментов для работы с GigaChat. 
              Создаю будущее интеллектуальных систем.
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto" data-testid="text-bio">
              Ex-Head of AI в The Coach | Head of AI и основатель Cubic.ai. 
              Специализируюсь на AI агентах, LLM приложениях и робототехнике.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            data-testid="container-social-links"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all group"
              asChild
              data-testid="button-github"
            >
              <a href="https://github.com/Rai220" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                GitHub
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondary/50 hover:border-secondary hover:bg-secondary/10 transition-all group"
              asChild
              data-testid="button-telegram"
            >
              <a href="https://t.me/robofuture" target="_blank" rel="noopener noreferrer">
                <Send className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Telegram
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent/50 hover:border-accent hover:bg-accent/10 transition-all group"
              asChild
              data-testid="button-youtube"
            >
              <a href="https://www.youtube.com/@Rai220" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                YouTube
              </a>
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all group"
              asChild
              data-testid="button-habr"
            >
              <a href="https://habr.com/ru/users/Rai220/" target="_blank" rel="noopener noreferrer">
                <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Habr
              </a>
            </Button>
          </motion.div>

          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="w-6 h-12 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 animate-bounce" data-testid="indicator-scroll">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
