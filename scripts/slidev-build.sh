#!/bin/bash
# Build all Slidev decks into .vitepress/dist/slides/:slug/
# Usage: ./scripts/slidev-build.sh [--dev] [slug]
#   --dev  : Build for dev (no base path for local testing)
#   slug   : Build specific deck only (default: all)

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SLIDES_DIR="$PROJECT_DIR/docs/slides"
OUTPUT_DIR="$PROJECT_DIR/docs/.vitepress/dist/slides"
BASE_PATH="/LucasHsu.dev/slides"

generate_thumbnail() {
  local slug="$1"
  local output_dir="$OUTPUT_DIR/$slug"
  local thumb_file="$output_dir/thumbnail.png"
  local temp_thumb_dir="$PROJECT_DIR/docs/.vitepress/dist/slides/temp_$slug"
  
  if [ ! -f "$thumb_file" ]; then
    echo "Generating thumbnail for: $slug"
    cd "$PROJECT_DIR"
    # Export all slides to a temp dir
    npx slidev export "$SLIDES_DIR/$slug/slides.md" \
      --format png \
      --output "$temp_thumb_dir" 2>/dev/null || true
    
    # If it's a directory, move the first slide to thumbnail.png
    if [ -d "$temp_thumb_dir" ]; then
      if [ -f "$temp_thumb_dir/1.png" ]; then
        mv "$temp_thumb_dir/1.png" "$thumb_file"
      fi
      rm -rf "$temp_thumb_dir"
    elif [ -f "$temp_thumb_dir" ]; then
      mv "$temp_thumb_dir" "$thumb_file"
    fi
  fi
}

build_deck() {
  local slug="$1"
  local base_flag=""
  if [ "$2" != "--dev" ]; then
    base_flag="--base $BASE_PATH/$slug/"
  fi
  echo "Building slide deck: $slug"
  cd "$PROJECT_DIR"
  npx slidev build "$SLIDES_DIR/$slug/slides.md" --out "$OUTPUT_DIR/$slug" $base_flag
  generate_thumbnail "$slug"
}

if [ -n "$2" ] && [ "$1" != "--dev" ]; then
  build_deck "$1"
elif [ "$1" = "--dev" ] && [ -n "$2" ]; then
  build_deck "$2" "--dev"
elif [ "$1" = "--dev" ]; then
  for deck in "$SLIDES_DIR"/*/; do
    slug=$(basename "$deck")
    build_deck "$slug" "--dev"
  done
else
  for deck in "$SLIDES_DIR"/*/; do
    slug=$(basename "$deck")
    build_deck "$slug"
  done
fi
