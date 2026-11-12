#!/usr/bin/env python3
"""Validate local HTML references and duplicate IDs for the static magazine."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicates = []
        self.references = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicates.append(element_id)
            self.ids.add(element_id)
        for name in ("src", "href", "poster"):
            value = attrs.get(name)
            if value:
                self.references.append((tag, name, value))

def main():
    if not HTML.is_file():
        raise SystemExit("index.html is missing")
    parser = SiteParser()
    parser.feed(HTML.read_text(encoding="utf-8"))
    failures = []
    for tag, attr, value in parser.references:
        value = value.strip()
        if not value or value.startswith(("#", "//", "data:", "mailto:", "tel:")):
            continue
        parsed = urlsplit(value)
        if parsed.scheme or parsed.netloc:
            continue
        path = parsed.path
        if not path:
            continue
        if path.startswith("/"):
            # Absolute paths are not expected for this GitHub Pages project.
            failures.append(f"{tag}[{attr}] uses root-absolute path: {value}")
            continue
        target = (ROOT / path.removeprefix("./")).resolve()
        if not target.is_relative_to(ROOT.resolve()) or not target.is_file():
            failures.append(f"{tag}[{attr}] target does not exist: {value}")
    for duplicate in parser.duplicates:
        failures.append(f"Duplicate HTML id: {duplicate}")
    if failures:
        print("\n".join(failures))
        raise SystemExit(1)
    print(f"HTML references OK; {len(parser.references)} local/external references checked; {len(parser.ids)} unique IDs.")

if __name__ == "__main__":
    main()
