import { writeFile, mkdir } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { MemStorage } from "../server/storage.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateStaticAPI() {
  const storage = new MemStorage();
  const outDir = resolve(__dirname, "../dist/public/api");

  console.log("Generating static API files...");
  await mkdir(outDir, { recursive: true });

  const endpoints = [
    { name: "stats", method: "getStats" },
    { name: "projects", method: "getProjects" },
    { name: "skills", method: "getSkills" },
    { name: "videos", method: "getVideos" },
    { name: "posts", method: "getPosts" },
    { name: "articles", method: "getArticles" },
    { name: "github-activity", method: "getGitHubActivity" },
  ];

  for (const endpoint of endpoints) {
    const data = await (storage as any)[endpoint.method]();
    const filePath = resolve(outDir, `${endpoint.name}.json`);
    await writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`✓ Generated ${endpoint.name}.json`);
  }

  console.log("Static API generation complete!");
}

generateStaticAPI().catch((error) => {
  console.error("Failed to generate static API:", error);
  process.exit(1);
});
