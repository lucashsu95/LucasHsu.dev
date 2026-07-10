#!/bin/bash
# Build all Slidev decks into .vitepress/dist/slides/:slug/
# Usage: ./scripts/slidev-build.sh [--dev] [slug]
#   --dev  : Build for dev (no base path for local testing)
#   slug   : Build specific deck only (default: all)

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SLIDES_DIR="$PROJECT_DIR/docs/slides"
OUTPUT_DIR="$PROJECT_DIR/docs/public/slides"
BASE_PATH="/LucasHsu.dev/slides"

generate_thumbnail() {
  local slug="$1"
  local output_dir="$OUTPUT_DIR/$slug"
  local thumb_file="$output_dir/thumbnail.png"
  local temp_thumb_dir="$PROJECT_DIR/docs/.vitepress/dist/slides/temp_$slug"
  local slides_file="$SLIDES_DIR/$slug/slides.md"

  if [ ! -f "$thumb_file" ] || [ "$slides_file" -nt "$thumb_file" ]; then
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
  local base_args=()
  if [ "$2" != "--dev" ]; then
    base_args=(--base "$BASE_PATH/$slug/")
  fi
  echo "Building slide deck: $slug"
  cd "$PROJECT_DIR"
  rm -rf "$OUTPUT_DIR/$slug"
  npx slidev build "$SLIDES_DIR/$slug/slides.md" \
    --out "$OUTPUT_DIR/$slug" \
    "${base_args[@]}"
  generate_thumbnail "$slug"
}

if [ "$1" = "--dev" ]; then
  if [ -n "$2" ]; then
    build_deck "$2" "--dev"
  else
    for deck in "$SLIDES_DIR"/*/; do
      [ -f "$deck/slides.md" ] || continue
      slug=$(basename "$deck")
      build_deck "$slug" "--dev"
    done
  fi
elif [ -n "$1" ]; then
  build_deck "$1"
else
  for deck in "$SLIDES_DIR"/*/; do
    [ -f "$deck/slides.md" ] || continue
    slug=$(basename "$deck")
    build_deck "$slug"
  done
fi
