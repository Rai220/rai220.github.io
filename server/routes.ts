import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/stats", async (req, res) => {
    try {
      const lang = (req.query.lang as string) || "ru";
      const stats = await storage.getStats(lang);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const lang = (req.query.lang as string) || "ru";
      const projects = await storage.getProjects(lang);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/skills", async (req, res) => {
    try {
      const lang = (req.query.lang as string) || "ru";
      const skills = await storage.getSkills(lang);
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.get("/api/videos", async (req, res) => {
    try {
      const lang = (req.query.lang as string) || "ru";
      const videos = await storage.getVideos(lang);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const lang = (req.query.lang as string) || "ru";
      const posts = await storage.getPosts(lang);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const lang = (req.query.lang as string) || "ru";
      const articles = await storage.getArticles(lang);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/github-activity", async (_req, res) => {
    try {
      const activity = await storage.getGitHubActivity();
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch GitHub activity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
