import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { IntakeForm } from "@/components/IntakeForm";
import { useLanguage } from "@/lib/i18n";

export default function Intake() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationBar />
      <main className="relative overflow-hidden px-4 md:px-8 pt-28 pb-20">
        <div className="absolute inset-0 console-grid opacity-20" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            {t("intake_back")}
          </Link>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-mono text-xs text-primary mb-4">&gt; intake --qualify</div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
                {t("intake_title")}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                {t("intake_subtitle")}
              </p>
              <div className="terminal-panel p-5 space-y-3">
                {["intake_bullet_1", "intake_bullet_2", "intake_bullet_3"].map((key) => (
                  <div key={key} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{t(key)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="terminal-panel p-5 md:p-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <IntakeForm />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
