import { useQuery } from "@tanstack/react-query";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContentSection } from "@/components/ContentSection";
import { ContactSection } from "@/components/ContactSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import type { Project, Stat, Skill, Video, Post } from "@shared/schema";

function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-6 bg-card/50 backdrop-blur-sm" data-testid={`skeleton-stat-${i}`}>
          <Skeleton className="h-8 w-8 mb-4" />
          <Skeleton className="h-12 w-20 mb-2" />
          <Skeleton className="h-4 w-32" />
        </Card>
      ))}
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 bg-card/50 backdrop-blur-sm" data-testid={`skeleton-project-${i}`}>
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </Card>
      ))}
    </div>
  );
}

function SkillsLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[1, 2].map((i) => (
        <Card key={i} className="p-8 bg-card/50 backdrop-blur-sm" data-testid={`skeleton-skills-${i}`}>
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="space-y-6">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ContentLoading() {
  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden bg-card/50 backdrop-blur-sm" data-testid={`skeleton-video-${i}`}>
            <Skeleton className="aspect-video w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { data: stats = [], isLoading: statsLoading } = useQuery<Stat[]>({
    queryKey: ["/api/stats"],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const { data: videos = [], isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <HeroSection />
      
      <section className="py-24 px-4 relative overflow-hidden" data-testid="section-about-wrapper">
        <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card opacity-50" />
        <div className="container mx-auto max-w-7xl relative z-10">
          {statsLoading ? <StatsLoading /> : <AboutSection stats={stats} />}
        </div>
      </section>
      
      <section className="py-24 px-4 relative" data-testid="section-projects-wrapper">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="container mx-auto max-w-7xl relative z-10">
          {projectsLoading ? <ProjectsLoading /> : <ProjectsSection projects={projects} />}
        </div>
      </section>
      
      <section className="py-24 px-4 relative overflow-hidden" data-testid="section-skills-wrapper">
        <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card opacity-50" />
        <div className="container mx-auto max-w-7xl relative z-10">
          {skillsLoading ? <SkillsLoading /> : <SkillsSection skills={skills} />}
        </div>
      </section>
      
      <section className="py-24 px-4 relative" data-testid="section-content-wrapper">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="container mx-auto max-w-7xl relative z-10">
          {videosLoading || postsLoading ? <ContentLoading /> : <ContentSection videos={videos} posts={posts} />}
        </div>
      </section>
      
      <ContactSection />
      
      <footer className="py-8 px-4 border-t border-border/50 bg-card/30" data-testid="footer">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-mono" data-testid="text-footer">
              <span className="text-primary">&gt;</span> Создано с использованием AI и киберпанк-эстетики
              <span className="text-secondary ml-2">|</span>
              <span className="ml-2">2025</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
