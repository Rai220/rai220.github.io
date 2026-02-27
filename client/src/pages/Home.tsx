import { useQuery } from "@tanstack/react-query";
import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContentSection } from "@/components/ContentSection";
import { ContactSection } from "@/components/ContactSection";
import { GitHubActivitySection } from "@/components/GitHubActivitySection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { CTABanner } from "@/components/CTABanner";
import type { Project, Stat, Skill, Video, Post, Article, GitHubActivity } from "@shared/schema";

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 md:py-32 px-4 md:px-8 relative ${className}`}>
      <div className="container mx-auto max-w-7xl relative z-10">{children}</div>
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
  const { data: stats = [], isLoading: statsLoading } = useQuery<Stat[]>({ queryKey: ["/api/stats"] });
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: skills = [], isLoading: skillsLoading } = useQuery<Skill[]>({ queryKey: ["/api/skills"] });
  const { data: videos = [], isLoading: videosLoading } = useQuery<Video[]>({ queryKey: ["/api/videos"] });
  const { data: posts = [], isLoading: postsLoading } = useQuery<Post[]>({ queryKey: ["/api/posts"] });
  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const { data: githubActivity, isLoading: githubActivityLoading } = useQuery<GitHubActivity>({ queryKey: ["/api/github-activity"] });

  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <NavigationBar />

      <HeroSection />

      <SectionDivider />

      <Section id="impact">
        {statsLoading ? <LoadingSkeleton /> : <AboutSection stats={stats} />}
      </Section>

      <SectionDivider />

      <Section id="vision">
        {skillsLoading ? <LoadingSkeleton /> : <SkillsSection skills={skills} />}
      </Section>

      <CTABanner />

      <SectionDivider />

      <Section id="projects">
        {projectsLoading ? <LoadingSkeleton /> : <ProjectsSection projects={projects} />}
      </Section>

      <SectionDivider />

      <Section id="github">
        {githubActivityLoading || !githubActivity ? <LoadingSkeleton /> : <GitHubActivitySection activity={githubActivity} />}
      </Section>

      <SectionDivider />

      <Section id="media">
        {videosLoading || postsLoading ? <LoadingSkeleton /> : <ContentSection videos={videos} posts={posts} />}
      </Section>

      <SectionDivider />

      <Section id="publications">
        {articlesLoading ? <LoadingSkeleton /> : <PublicationsSection articles={articles} />}
      </Section>

      <SectionDivider />

      <ContactSection />

      <footer className="py-10 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-primary font-mono text-[10px] font-bold">KK</span>
              </div>
              <span className="text-sm text-muted-foreground/50 font-mono">Kirill Krestnikov</span>
            </div>
            <p className="text-xs text-muted-foreground/30 font-mono">
              &copy; {new Date().getFullYear()} &middot; Built with AI &middot; e/acc
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
