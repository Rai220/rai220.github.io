import { useQuery } from "@tanstack/react-query";
import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { CTABanner } from "@/components/CTABanner";
import { useLanguage } from "@/lib/i18n";
import type { Project, Stat, Skill, Article } from "@shared/schema";

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 md:px-8 relative ${className}`}>
      <div className="container mx-auto max-w-6xl relative z-10">{children}</div>
    </section>
  );
}

function SectionDivider() {
  return <div className="section-divider mx-auto max-w-5xl" />;
}

function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-3 text-muted-foreground/50 font-mono text-sm">
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const langParam = { lang };

  const { data: stats = [], isLoading: statsLoading } = useQuery<Stat[]>({ queryKey: ["/api/stats", langParam] });
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({ queryKey: ["/api/projects", langParam] });
  const { data: skills = [], isLoading: skillsLoading } = useQuery<Skill[]>({ queryKey: ["/api/skills", langParam] });
  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({ queryKey: ["/api/articles", langParam] });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationBar />

      <HeroSection />

      <SectionDivider />

      <Section id="impact">
        {statsLoading ? <LoadingSkeleton /> : <AboutSection stats={stats} />}
      </Section>

      <SectionDivider />

      <Section id="services">
        {skillsLoading ? <LoadingSkeleton /> : <SkillsSection skills={skills} />}
      </Section>

      <Section id="formats" className="pt-0">
        <ServicesSection />
      </Section>

      <CTABanner />

      <SectionDivider />

      <Section id="projects">
        {projectsLoading ? <LoadingSkeleton /> : <ProjectsSection projects={projects} />}
      </Section>

      <SectionDivider />

      <Section id="research">
        {articlesLoading ? <LoadingSkeleton /> : <PublicationsSection articles={articles} />}
      </Section>

      <SectionDivider />

      <ContactSection />

      <footer className="py-10 px-4 border-t border-border/60">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-primary font-mono text-[10px] font-bold">KK</span>
              </div>
              <span className="text-sm text-muted-foreground/70 font-mono">Konstantin Krestnikov</span>
            </div>
            <p className="text-xs text-muted-foreground/50 font-mono">
              &copy; {new Date().getFullYear()} &middot; AI architecture &middot; consulting & mentorship
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
