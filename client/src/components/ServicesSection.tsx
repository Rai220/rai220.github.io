import { motion } from "framer-motion";
import { ArrowRight, Clock, XCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

export function ServicesSection() {
  const { t } = useLanguage();

  const packages = [1, 2, 3, 4].map((index) => ({
    name: t(`services_pkg${index}_name`),
    duration: t(`services_pkg${index}_dur`),
    description: t(`services_pkg${index}_desc`),
  }));

  return (
    <>
      <div className="mb-12">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="h-px flex-1 max-w-[60px] bg-primary/50" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.24em]">{t("services_eyebrow")}</span>
        </motion.div>
        <motion.h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-foreground" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          {t("services_title")}
        </motion.h2>
        <motion.p className="text-base md:text-lg text-muted-foreground max-w-2xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {t("services_subtitle")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mb-6">
        {packages.map((item, index) => (
          <motion.div
            key={item.name}
            className="terminal-panel p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-primary">{t("services_package_prefix")}_{index + 1}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {item.duration}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{item.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground/70 font-mono mb-10">{t("services_price_note")}</p>

      <div className="terminal-panel p-6 mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4">{t("services_not_doing_title")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <XCircle className="w-4 h-4 text-muted-foreground/60 mt-0.5 flex-shrink-0" />
              <span>{t(`services_not_doing_${index}`)}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/intake"
        onClick={() => trackEvent("cta_services_click")}
        className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
      >
        {t("services_cta")}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </>
  );
}
