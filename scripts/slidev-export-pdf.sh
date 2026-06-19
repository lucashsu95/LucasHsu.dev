#!/bin/bash
# Export Slidev deck to PDF
# Usage: ./scripts/slidev-export-pdf.sh <slug>
# Example: ./scripts/slidev-export-pdf.sh acid

set -e
if [ -z "$1" ]; then
  echo "Usage: $0 <slug>"
  echo "Example: $0 acid"
  exit 1
fi

SLUG="$1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SLIDES_DIR="$PROJECT_DIR/docs/slides/$SLUG"
OUTPUT_DIR="$PROJECT_DIR/docs/public/slides"

if [ ! -f "$SLIDES_DIR/slides.md" ]; then
  echo "Error: No slides.md found for '$SLUG' at $SLIDES_DIR"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "Exporting $SLUG to PDF..."
cd "$PROJECT_DIR"
npx slidev export "$SLIDES_DIR/slides.md" \
  --format pdf \
  --output "$OUTPUT_DIR/$SLUG.pdf" \
  --with-clicks

echo "PDF exported: $OUTPUT_DIR/$SLUG.pdf"
