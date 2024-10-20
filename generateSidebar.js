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
      markdownFiles.push({
        text: file.replace(".md", ""),
        link: `${relativePath.replace(/\\/g, "/").replace(".md", "")}`,
        lastUpdated: stat.mtimeMs,
      });
    }
  });

  return markdownFiles;
}

const sidebarData = getMarkdownFiles(docsDir);
fs.writeFileSync(outputFilePath, JSON.stringify(sidebarData, null, 2));

console.log("Sidebar data generated successfully.");
