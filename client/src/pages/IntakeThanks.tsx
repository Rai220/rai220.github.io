import { Link, useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { useLanguage } from "@/lib/i18n";

export default function IntakeThanks() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const contact = params.get("contact") || t("intake_thanks_contact_fallback");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationBar />
      <main className="relative overflow-hidden px-4 pt-28 pb-20">
        <div className="absolute inset-0 console-grid opacity-20" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="terminal-panel p-6 md:p-10 text-center">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-6" />
            <p className="font-mono text-sm text-primary mb-3">&gt; intake status: received</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {t("intake_thanks_title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              {t("intake_thanks_body").replace("{contact}", contact)}
            </p>
            <Link
              href="/"
              onClick={(event) => {
                event.preventDefault();
                setLocation("/");
              }}
              className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-border/70 bg-card text-sm font-semibold text-foreground hover:border-primary/50 transition-colors"
            >
              {t("intake_back_home")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
