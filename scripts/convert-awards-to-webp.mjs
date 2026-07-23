import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const AWARDS_DIR = path.join(ROOT, "docs/public/awards");

/** Extensions that will be converted to WebP. */
const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png"]);

/** cwebp quality (0=small..100=big). 80 is a good balance. */
const QUALITY = 80;

/**
 * Convert a single image to WebP using cwebp.
 * @param {string} srcPath  Absolute path to source image
 * @param {string} dstPath  Absolute path for output .webp
 * @returns {boolean} true on success
 */
function convertOne(srcPath, dstPath) {
  const result = spawnSync(
    "cwebp",
    ["-q", String(QUALITY), srcPath, "-o", dstPath],
    { stdio: ["ignore", "pipe", "pipe"], encoding: "utf-8" }
  );

  if (result.status !== 0) {
    console.error(`  ✗ ${path.basename(srcPath)}: failed`);
    console.error(`    ${result.stderr?.trim()}`);
    return false;
  }

  return true;
}

/**
 * Convert all source images in a slug directory to .webp and remove originals.
 * @param {string} slug  Directory name under AWARDS_DIR
 * @param {boolean} dryRun  If true, only print what would be done
 * @returns {{ ok: number, fail: number }}
 */
function convertSlug(slug, dryRun) {
  const dir = path.join(AWARDS_DIR, slug);
  const files = fs.readdirSync(dir);

  const sources = files
    .filter((name) => SOURCE_EXTS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (sources.length === 0) return { ok: 0, fail: 0 };

  let ok = 0;
  let fail = 0;

  for (const name of sources) {
    const srcPath = path.join(dir, name);
    const webpName = path.basename(name, path.extname(name)) + ".webp";
    const dstPath = path.join(dir, webpName);

    // Skip if .webp already exists (idempotent)
    if (fs.existsSync(dstPath)) {
      console.log(`  ∼ ${name} → ${webpName} (already exists, skipping)`);
      continue;
    }

    if (dryRun) {
      console.log(`  · ${name} → ${webpName}`);
      ok++;
      continue;
    }

    console.log(`  → ${name} → ${webpName} ...`);
    if (convertOne(srcPath, dstPath)) {
      fs.unlinkSync(srcPath);
      console.log(`    ✓ done, removed original`);
      ok++;
    } else {
      // Remove partial output if any
      if (fs.existsSync(dstPath)) {
        try {
          fs.unlinkSync(dstPath);
        } catch { /* ignore */ }
      }
      fail++;
    }
  }

  return { ok, fail };
}

function main() {
  const dryRun = process.argv.includes("--dry");

  if (!fs.existsSync(AWARDS_DIR)) {
    console.log(`[convert-awards] Awards directory not found: ${AWARDS_DIR}`);
    process.exit(0);
  }

  const entries = fs
    .readdirSync(AWARDS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."));

  if (entries.length === 0) {
    console.log("[convert-awards] No award directories found.");
    process.exit(0);
  }

  const cwebpCheck = spawnSync("which", ["cwebp"], { stdio: "pipe", encoding: "utf-8" });
  if (!dryRun && cwebpCheck.status !== 0) {
    console.error("[convert-awards] Error: cwebp not found. Install it with:");
    console.error("  sudo apt install webp   # Debian/Ubuntu");
    console.error("  brew install webp       # macOS");
    process.exit(1);
  }

  if (dryRun) {
    console.log(`[convert-awards] DRY RUN — no files will be changed\n`);
  } else {
    console.log(`[convert-awards] Converting to WebP (quality=${QUALITY}) ...\n`);
  }

  let totalOk = 0;
  let totalFail = 0;

  for (const entry of entries) {
    const slug = entry.name;
    const dirFiles = fs.readdirSync(path.join(AWARDS_DIR, slug));
    const hasSources = dirFiles.some((f) => SOURCE_EXTS.has(path.extname(f).toLowerCase()));

    if (!hasSources) continue;

    console.log(`  ${slug}/`);
    const { ok, fail } = convertSlug(slug, dryRun);
    if (ok > 0 || fail > 0) {
      totalOk += ok;
      totalFail += fail;
    }
  }

  console.log("");
  if (dryRun) {
    console.log(`[convert-awards] Dry run complete. ${totalOk} file(s) would be converted.`);
  } else {
    console.log(`[convert-awards] Done. ${totalOk} converted, ${totalFail} failed.`);
    if (totalOk > 0) {
      console.log(`\nNext step: run \`node scripts/awards-scan.mjs\` to regenerate the photo manifest.`);
    }
  }
}

// CLI: node scripts/convert-awards-to-webp.mjs [--dry]
const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isDirectRun) {
  main();
}
