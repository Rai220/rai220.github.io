import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-secondary/[0.02] to-accent/[0.03]" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-foreground">Ищете R&D лида,</span>{" "}
            <span className="text-gradient">который понимает будущее AI?</span>
          </h3>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto">
            Я строю платформы, которые используют тысячи разработчиков.
            Готов сделать то же для вашей компании.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
          >
            Давайте поговорим
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
