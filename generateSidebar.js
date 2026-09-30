const fs = require("fs");
const path = require("path");

const docsDir = path.resolve(__dirname, "docs");
const outputFilePath = path.resolve(
  __dirname,
  "docs",
  ".vitepress",
  "theme",
  "sidebarData.json"
);

const { spawnSync } = require("child_process");

// VitePress `base` (docs/.vitepress/config.mjs). Slidev builds emit standalone
// apps under docs/public/slides/<slug>/, so their TOC links need this prefix.
const BASE_PATH = "/LucasHsu.dev/";

// `public/` is copied verbatim by VitePress and never routed as a page, so its
// .md files (e.g. docs/public/awards/README.md) must not enter the sidebar.
// `.vitepress/` is VitePress's own config/theme dir and is likewise never routed,
// so docs/.vitepress/theme/DESIGN.md would otherwise become a dead TOC link.
const EXCLUDED_DIRS = new Set(["public", "slides", ".vitepress"]);

function getGitLastModifiedTime(filePath) {
  try {
    const result = spawnSync("git", ["log", "-1", "--format=%ct", "--", filePath], {
      encoding: "utf8",
      cwd: process.cwd(),
    });

    if (result.status !== 0) {
      throw new Error(result.stderr || `git log failed for ${filePath}`);
    }

    const timestamp = parseInt(result.stdout.trim(), 10) * 1000;
    return new Date(timestamp);
  } catch (error) {
    console.error(`Error getting last modified time for ${filePath}:`, error);
    return null;
  }
}

function readFrontmatterField(content, field) {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) return null;
  const match = frontmatter[1].match(new RegExp(`^${field}:\\s*(.+)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : null;
}

function getSlideDecks() {
  const slidesRoot = path.join(docsDir, "slides");
  if (!fs.existsSync(slidesRoot)) return [];

  return fs
    .readdirSync(slidesRoot)
    .filter((slug) => fs.existsSync(path.join(slidesRoot, slug, "slides.md")))
    .map((slug) => {
      const slidesFile = path.join(slidesRoot, slug, "slides.md");
      const content = fs.readFileSync(slidesFile, "utf-8");
      return {
        text: readFrontmatterField(content, "title") || slug,
        link: `${BASE_PATH}slides/${slug}/`,
        isSlide: true,
        lastUpdated: getGitLastModifiedTime(slidesFile),
      };
    });
}

function getMarkdownFiles(dir, baseDir = "", rootDir = dir) {
  const files = fs.readdirSync(dir);
  let markdownFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const relativePath = path.join(baseDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (path.resolve(dir) === path.resolve(rootDir) && EXCLUDED_DIRS.has(file)) {
        return;
      }
      markdownFiles = markdownFiles.concat(
        getMarkdownFiles(filePath, relativePath, rootDir)
      );
    } else if (
      file.endsWith(".md") &&
      !["README.md", "index.md", "toc.md"].includes(file)
    ) {
      // 讀取 Markdown 檔案的第一行 title
      const content = fs.readFileSync(filePath, "utf-8");
      // 先嘗試從 meta 標籤取得 og:title
      let title;
      const metaMatch = content.match(/-+\s*meta[\s\S]*?-+\s*/);
      if (metaMatch) {
        const ogTitleMatch = metaMatch[0].match(/name:\s*og:title[\s\S]*?content:\s*(.+)/);
        if (ogTitleMatch) {
          title = ogTitleMatch[1].replace(/["']/g, '').trim();
        }
      }
      // 如果沒有 meta og:title，則用第一個 # 標題
      if (!title) {
        const titleMatch = content.match(/^#\s+(.*)/m);
        title = titleMatch ? titleMatch[1].trim() : file.replace(".md", "");
      }

      markdownFiles.push({
        text: title,
        link: `${relativePath.replace(/\\/g, "/").replace(".md", "")}`,
        lastUpdated: getGitLastModifiedTime(filePath),
      });
    }
  });

  return markdownFiles;
}

const slideDecks = getSlideDecks();
const sidebarData = [...getMarkdownFiles(docsDir), ...slideDecks];
fs.writeFileSync(outputFilePath, JSON.stringify(sidebarData, null, 2));

console.log(
  `Sidebar data generated successfully (${sidebarData.length} entries, ${slideDecks.length} slide decks).`
);
