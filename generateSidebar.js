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

const { execSync } = require('child_process');

function getGitLastModifiedTime(filePath) {
    try {
        const result = execSync(`git log -1 --format=%ct ${filePath}`).toString().trim();
        const timestamp = parseInt(result, 10) * 1000; // Convert to milliseconds
        return new Date(timestamp);
    } catch (error) {
        console.error(`Error getting last modified time for ${filePath}:`, error);
        return null;
    }
}

function getMarkdownFiles(dir, baseDir = "") {
  const files = fs.readdirSync(dir);
  let markdownFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const relativePath = path.join(baseDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      markdownFiles = markdownFiles.concat(
        getMarkdownFiles(filePath, relativePath)
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

const sidebarData = getMarkdownFiles(docsDir);
fs.writeFileSync(outputFilePath, JSON.stringify(sidebarData, null, 2));

console.log("Sidebar data generated successfully.");
