import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Send, Github } from "lucide-react";

export function ContactSection() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-24 px-4 relative overflow-hidden" data-testid="section-contact">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background opacity-50" />
      
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-family='monospace' font-size='14' fill='%2300ff9d'%3E01%3C/text%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-16 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-mono mb-4 text-primary"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="heading-contact"
          >
            <span className="text-foreground">&gt;_</span> СВЯЗАТЬСЯ СО МНОЙ
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-lg shadow-primary/5">
            <div className="mb-8 font-mono text-sm">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground" data-testid="container-terminal-header">
                <span className="text-primary">root@portfolio</span>
                <span>~</span>
                <span className="text-secondary">$</span>
              </div>
              <div className="bg-background/50 p-4 rounded-md border border-border">
                <div className="text-primary mb-2" data-testid="text-terminal-command">
                  &gt; contact --list
                </div>
                <div className="text-muted-foreground space-y-1" data-testid="container-terminal-output">
                  <div data-testid="text-terminal-output-1">Инициализация модуля связи...</div>
                  <div className="text-secondary" data-testid="text-terminal-output-2">✓ Загружены контакты</div>
                </div>
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-background/50 border-border hover:border-primary/50 transition-all hover-elevate" data-testid="card-contact-email">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0" data-testid="icon-container-email">
                      <Mail className="w-6 h-6 text-primary" data-testid="icon-email" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground mb-2 font-mono" data-testid="heading-contact-email">Email</h3>
                      <p className="text-sm text-muted-foreground break-all" data-testid="text-email">
                        k.krestnikov@gmail.com
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-background/50 border-border hover:border-secondary/50 transition-all hover-elevate" data-testid="card-contact-telegram">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0" data-testid="icon-container-telegram">
                      <Send className="w-6 h-6 text-secondary" data-testid="icon-telegram" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground mb-2 font-mono" data-testid="heading-contact-telegram">Telegram</h3>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-secondary hover:text-secondary/80"
                        asChild
                        data-testid="link-telegram"
                      >
                        <a href="https://t.me/Krestnikov" target="_blank" rel="noopener noreferrer">
                          @Krestnikov
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-background/50 border-border hover:border-primary/50 transition-all hover-elevate" data-testid="card-contact-github">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0" data-testid="icon-container-github">
                      <Github className="w-6 h-6 text-primary" data-testid="icon-github" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground mb-2 font-mono" data-testid="heading-contact-github">GitHub</h3>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                        asChild
                        data-testid="link-github"
                      >
                        <a href="https://github.com/Rai220" target="_blank" rel="noopener noreferrer">
                          @Rai220
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            <div className="mt-8 p-4 bg-background/50 rounded-md border border-border font-mono text-sm" data-testid="container-terminal-status">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">&gt;</span>
                <span data-testid="text-terminal-status">status: ready_to_connect</span>
                <span className={`inline-block w-2 h-4 bg-primary ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`} data-testid="cursor-blink" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
