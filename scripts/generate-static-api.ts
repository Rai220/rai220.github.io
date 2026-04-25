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
    { name: "stats", method: "getStats", localized: true },
    { name: "projects", method: "getProjects", localized: true },
    { name: "skills", method: "getSkills", localized: true },
    { name: "videos", method: "getVideos", localized: true },
    { name: "posts", method: "getPosts", localized: true },
    { name: "articles", method: "getArticles", localized: true },
    { name: "github-activity", method: "getGitHubActivity", localized: false },
  ];

  for (const endpoint of endpoints) {
    if (endpoint.localized) {
      for (const lang of ["ru", "en"]) {
        const data = await (storage as any)[endpoint.method](lang);
        const suffix = lang === "en" ? ".en" : "";
        const filePath = resolve(outDir, `${endpoint.name}${suffix}.json`);
        await writeFile(filePath, JSON.stringify(data, null, 2));
        console.log(`✓ Generated ${endpoint.name}${suffix}.json`);
      }
    } else {
      const data = await (storage as any)[endpoint.method]();
      const filePath = resolve(outDir, `${endpoint.name}.json`);
      await writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(`✓ Generated ${endpoint.name}.json`);
    }
  }

  console.log("Static API generation complete!");
}

generateStaticAPI().catch((error) => {
  console.error("Failed to generate static API:", error);
  process.exit(1);
});
