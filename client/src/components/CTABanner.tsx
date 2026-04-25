import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="py-12 px-4 relative overflow-hidden border-y border-border/70 bg-card/30">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="terminal-panel p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="font-mono text-xs text-primary mb-3">&gt; engage --format consulting|mentorship|architecture</div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              <span className="text-foreground">{t("cta_title1")}</span>{" "}
              <span className="text-primary">{t("cta_title2")}</span>
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              {t("cta_desc1")} {t("cta_desc2")}
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            {t("cta_button")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
