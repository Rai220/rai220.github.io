import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

export function NavigationBar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { label: t("nav_impact"), href: "#impact" },
    { label: t("nav_services"), href: "#services" },
    { label: t("nav_products"), href: "#projects" },
    { label: t("nav_research"), href: "#research" },
    { label: t("nav_contacts"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lang]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => {
    const nextLang = lang === "ru" ? "en" : "ru";
    trackEvent("language_switch", { from: lang, to: nextLang });
    setLang(nextLang);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 border-b border-border/70 shadow-lg shadow-black/20 backdrop-blur"
            : "bg-background/70 border-b border-border/30 backdrop-blur"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/40 flex items-center justify-center transition-all">
                <span className="text-primary font-mono font-bold text-sm">KK</span>
              </div>
              <span className="font-mono text-sm font-semibold text-foreground hidden sm:block">
                Konstantin Krestnikov
              </span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <button
                onClick={toggleLang}
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/60 bg-card text-muted-foreground text-xs font-mono hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === "ru" ? "EN" : "RU"}
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLang}
                className="p-2 text-muted-foreground text-xs font-mono hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-mono font-medium text-foreground hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
