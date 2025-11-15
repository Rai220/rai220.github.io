import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  stars: z.number(),
  language: z.string(),
  url: z.string(),
  tags: z.array(z.string()).optional(),
});

export const statSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  icon: z.string(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  proficiency: z.number(),
  category: z.string(),
});

export const videoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  url: z.string(),
  date: z.string(),
  views: z.number(),
});

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  views: z.number(),
  url: z.string(),
});

export const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  date: z.string(),
  platform: z.string(),
  badge: z.string().optional(),
});

export const githubActivitySchema = z.object({
  totalCommits: z.number(),
  totalPRs: z.number(),
  totalIssues: z.number(),
  contributionGraph: z.array(z.object({
    date: z.string(),
    count: z.number(),
  })),
});

export type Project = z.infer<typeof projectSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Video = z.infer<typeof videoSchema>;
export type Post = z.infer<typeof postSchema>;
export type Article = z.infer<typeof articleSchema>;
export type GitHubActivity = z.infer<typeof githubActivitySchema>;
