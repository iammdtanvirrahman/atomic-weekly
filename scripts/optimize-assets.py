#!/usr/bin/env python3
"""Generate responsive-friendly WebP derivatives without modifying source assets."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUTPUT = ASSETS / "optimized"
MAX_EDGE = 2000
QUALITY = 82
SUPPORTED = {".png", ".jpg", ".jpeg"}

def main():
    converted = 0
    skipped = 0
    for source in sorted(ASSETS.rglob("*")):
        if not source.is_file() or source.suffix.lower() not in SUPPORTED:
            continue
        relative = source.relative_to(ASSETS)
        if relative.parts[0] == "optimized":
            continue
        target = (OUTPUT / relative).with_suffix(".webp")
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with Image.open(source) as opened:
                image = ImageOps.exif_transpose(opened)
                if image.width > MAX_EDGE or image.height > MAX_EDGE:
                    image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
                has_alpha = image.mode in ("RGBA", "LA") or "transparency" in image.info
                image = image.convert("RGBA" if has_alpha else "RGB")
                image.save(target, "WEBP", quality=QUALITY, method=6)
            converted += 1
        except Exception as error:
            skipped += 1
            print(f"SKIP {relative}: {error}")
    print(f"WebP derivatives created: {converted}; skipped: {skipped}")

if __name__ == "__main__":
    main()
