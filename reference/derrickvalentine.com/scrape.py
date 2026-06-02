#!/usr/bin/env python3
"""
Archive derrickvalentine.com (WordPress + Divi) as a basis for the Next.js rebuild.

Outputs (relative to this file's directory):
  sitemaps.json   - every URL found via AIOSEO sitemaps, with source + lastmod
  api/*.json       - raw WP REST API payloads (pages, posts, portfolio, team, media, globals)
  raw/*.html       - full raw HTML of each public page (layout/design reference)
  content/*.md     - clean markdown extracted from each page's main content
  globals/*.md     - shared header / footer copy (Divi Theme Builder)
  assets.txt       - every image / background-image URL referenced, by page
  SUMMARY.md       - human-readable inventory of the whole site

Re-runnable / idempotent. Polite ~0.25s delay between requests. Owner-authorized
(derrick@digitaldog.io owns the site).
"""
import os, re, json, time, urllib.parse
import requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup, NavigableString, Tag

BASE = "https://derrickvalentine.com"
OUT = os.path.dirname(os.path.abspath(__file__))
UA = "Mozilla/5.0 (compatible; dv-site-archive/1.0; owner=derrick@digitaldog.io)"

S = requests.Session()
S.headers.update({"User-Agent": UA})
DELAY = 0.25

def d(*p):
    path = os.path.join(OUT, *p)
    os.makedirs(os.path.dirname(path) if os.path.splitext(path)[1] else path, exist_ok=True)
    return path

for sub in ("api", "raw", "content", "globals"):
    os.makedirs(os.path.join(OUT, sub), exist_ok=True)

def fetch(url, **kw):
    time.sleep(DELAY)
    r = S.get(url, timeout=40, **kw)
    # The site is UTF-8 but its HTTP headers omit a charset, so requests would
    # otherwise fall back to ISO-8859-1 and mangle smart quotes / dashes.
    r.encoding = "utf-8"
    return r

def slugify(url):
    p = urllib.parse.urlparse(url)
    path = p.path.strip("/")
    return re.sub(r"[^a-zA-Z0-9._-]", "_", path) if path else "index"

# ---------------------------------------------------------------- sitemaps
def localname(tag):
    return tag.rsplit("}", 1)[-1].lower()

def child(el, name):
    return next((c for c in el if localname(c.tag) == name), None)

def gather_sitemaps():
    pages, seen, queue = [], set(), [BASE + "/sitemap.xml"]
    while queue:
        sm = queue.pop(0)
        if sm in seen:
            continue
        seen.add(sm)
        try:
            r = fetch(sm)
            if r.status_code != 200:
                continue
            root = ET.fromstring(r.content)
        except Exception as e:
            print("  ! sitemap error", sm, e)
            continue
        # ElementTree.iter() does not honour the {*} namespace wildcard, so match
        # elements by their local tag name instead.
        if localname(root.tag) == "sitemapindex":
            for sm_el in root:
                if localname(sm_el.tag) != "sitemap":
                    continue
                loc = child(sm_el, "loc")
                if loc is not None and loc.text:
                    queue.append(loc.text.strip())
        else:  # urlset
            for url_el in root:
                if localname(url_el.tag) != "url":
                    continue
                loc = child(url_el, "loc")
                lm = child(url_el, "lastmod")
                if loc is not None and loc.text:
                    pages.append({
                        "loc": loc.text.strip(),
                        "lastmod": lm.text.strip() if lm is not None and lm.text else None,
                        "source": sm.rsplit("/", 1)[-1],
                    })
    return pages

# ---------------------------------------------------------------- REST API
def rest_collection(rest_base):
    items, page = [], 1
    while True:
        url = f"{BASE}/wp-json/wp/v2/{rest_base}?per_page=100&page={page}"
        try:
            r = fetch(url)
        except Exception as e:
            print("  ! rest error", rest_base, e)
            break
        if r.status_code != 200:
            break
        batch = r.json()
        if not isinstance(batch, list) or not batch:
            break
        items.extend(batch)
        total = int(r.headers.get("X-WP-TotalPages", 1) or 1)
        if page >= total:
            break
        page += 1
    return items

# ---------------------------------------------------------------- HTML -> MD
INLINE_SKIP = {"script", "style", "noscript", "svg", "form", "iframe", "button"}

def img_md(c):
    src = c.get("src") or c.get("data-src") or c.get("data-lazy-src") or ""
    return f"![{(c.get('alt') or '').strip()}]({src})"

def inline_md(el):
    if isinstance(el, NavigableString):
        return re.sub(r"\s+", " ", str(el))
    out = []
    for c in el.children:
        if isinstance(c, NavigableString):
            out.append(re.sub(r"\s+", " ", str(c)))
        elif isinstance(c, Tag):
            n = c.name.lower()
            if n in ("strong", "b"):
                out.append(f"**{inline_md(c).strip()}**")
            elif n in ("em", "i"):
                out.append(f"*{inline_md(c).strip()}*")
            elif n == "a":
                out.append(f"[{inline_md(c).strip()}]({c.get('href','')})")
            elif n == "br":
                out.append("\n")
            elif n == "img":
                out.append(img_md(c))
            elif n == "code":
                out.append(f"`{inline_md(c).strip()}`")
            elif n in INLINE_SKIP:
                continue
            else:
                out.append(inline_md(c))
    return "".join(out)

def block_md(el, out):
    for c in el.children:
        if isinstance(c, NavigableString):
            t = re.sub(r"\s+", " ", str(c)).strip()
            if t:
                out.append(t)
            continue
        if not isinstance(c, Tag):
            continue
        n = c.name.lower()
        if n in INLINE_SKIP or n in ("header", "footer", "nav"):
            continue
        if re.fullmatch(r"h[1-6]", n):
            out.append("#" * int(n[1]) + " " + inline_md(c).strip())
        elif n == "p":
            t = inline_md(c).strip()
            if t:
                out.append(t)
        elif n in ("ul", "ol"):
            for i, li in enumerate(c.find_all("li", recursive=False), 1):
                out.append(("- " if n == "ul" else f"{i}. ") + inline_md(li).strip())
        elif n == "img":
            out.append(img_md(c))
        elif n == "blockquote":
            out.append("> " + inline_md(c).strip().replace("\n", "\n> "))
        elif n == "hr":
            out.append("---")
        else:
            block_md(c, out)  # descend through Divi's nested div soup

def clean_blocks(blocks):
    res, prev = [], None
    for b in blocks:
        b = b.strip()
        if not b or b == prev:
            continue
        res.append(b)
        prev = b
    return "\n\n".join(res)

def extract_main(soup):
    for sel in ("#main-content", "main", "#et-main-area", "article", "body"):
        node = soup.select_one(sel)
        if node:
            return node
    return soup

def collect_assets(html_text):
    found = set()
    for tag in re.findall(r"<img[^>]+>", html_text, re.I):
        for attr in ("src", "data-src", "data-lazy-src"):
            m = re.search(attr + r'=["\']([^"\']+)', tag, re.I)
            if m:
                found.add(m.group(1))
        ss = re.search(r'srcset=["\']([^"\']+)', tag, re.I)
        if ss:
            for part in ss.group(1).split(","):
                u = part.strip().split(" ")[0]
                if u:
                    found.add(u)
    for m in re.finditer(r'background-image\s*:\s*url\((["\']?)(.*?)\1\)', html_text, re.I):
        found.add(m.group(2))
    return {u for u in found if u and not u.startswith("data:")}

# ---------------------------------------------------------------- run
def main():
    print("[1/5] sitemaps")
    pages = gather_sitemaps()
    json.dump(pages, open(d("sitemaps.json"), "w"), indent=2)
    print(f"      {len(pages)} URLs across sitemaps")

    print("[2/5] WP REST API")
    rest_meta = {}
    for label, base in [("pages", "pages"), ("posts", "posts"),
                        ("portfolio", "portfolio"), ("team", "team"),
                        ("footer", "footer"), ("header", "header"),
                        ("side_panel", "side_panel"), ("media", "media")]:
        cache = os.path.join(OUT, "api", f"{label}.json")
        if os.path.exists(cache) and os.path.getsize(cache) > 2:
            items = json.load(open(cache))
            note = "(cached)"
        else:
            items = rest_collection(base)
            json.dump(items, open(cache, "w"), indent=2)
            note = ""
        rest_meta[label] = items
        print(f"      {label:10} {len(items)} {note}")

    print("[3/5] page HTML + markdown")
    skip_sources = {"attachment-sitemap.xml"}
    asset_map = {}
    page_records = []
    # Skip attachment pages and Divi template-preview duplicates (?footer=, ?header=).
    html_pages = [p for p in pages if p["source"] not in skip_sources
                  and not urllib.parse.urlparse(p["loc"]).query]
    for i, p in enumerate(html_pages, 1):
        url = p["loc"]
        slug = slugify(url)
        try:
            r = fetch(url)
        except Exception as e:
            print(f"      ! {url} {e}")
            continue
        if r.status_code != 200:
            print(f"      ! {url} -> {r.status_code}")
            continue
        html_text = r.text
        open(d("raw", f"{slug}.html"), "w").write(html_text)
        soup = BeautifulSoup(html_text, "lxml")
        title = (soup.title.string or "").strip() if soup.title else ""
        desc_el = soup.find("meta", attrs={"name": "description"})
        desc = desc_el.get("content", "").strip() if desc_el else ""
        blocks = []
        block_md(extract_main(soup), blocks)
        body_md = clean_blocks(blocks)
        front = f"<!--\nurl: {url}\ntitle: {title}\ndescription: {desc}\nsource: {p['source']}\nlastmod: {p['lastmod']}\n-->\n\n"
        open(d("content", f"{slug}.md"), "w").write(front + body_md + "\n")
        assets = collect_assets(html_text)
        asset_map[url] = sorted(assets)
        page_records.append({"url": url, "slug": slug, "title": title,
                             "description": desc, "source": p["source"],
                             "words": len(body_md.split()), "images": len(assets)})
        if i % 5 == 0 or i == len(html_pages):
            print(f"      {i}/{len(html_pages)}")

    # globals: real nav menu + header/footer notes (WGL "Affirm" theme, not Divi).
    print("[4/5] globals (navigation/header/footer)")
    try:
        raw_home = os.path.join(OUT, "raw", "index.html")
        html = open(raw_home).read() if os.path.exists(raw_home) else fetch(BASE + "/").text
        home = BeautifulSoup(html, "lxml")
        nav = home.select_one("nav.primary-nav ul") or home.select_one("nav ul")
        lines = ["# Navigation (real site menu)\n",
                 "Extracted from the live homepage. This is the *actual* intended sitemap —",
                 "distinct from the many unused Divi/WGL demo pages.\n"]
        if nav:
            for li in nav.find_all("li", recursive=False):
                a = li.find("a")
                if not a:
                    continue
                lines.append(f"- **{a.get_text(strip=True)}** — {a.get('href','')}")
                sub = li.find("ul")
                if sub:
                    for s in sub.find_all("li", recursive=False):
                        sa = s.find("a")
                        if sa:
                            lines.append(f"  - {sa.get_text(strip=True)} — {sa.get('href','')}")
        open(d("globals", "navigation.md"), "w").write("\n".join(lines) + "\n")

        logo = home.select_one("header.wgl-theme-header img, header img")
        open(d("globals", "header.md"), "w").write(
            "# Header\n\n" + (f"Logo: `{logo.get('src')}`\n\n" if logo else "") +
            "Top navigation — see `navigation.md`.\n")
        open(d("globals", "footer.md"), "w").write(
            "# Footer\n\nThe live footer (`footer#footer`) is rendered client-side and is empty "
            "in the static HTML, so no copy was captured. Old-site footer/side-panel content "
            "(e.g. a New York address) is WGL theme placeholder, not real.\n")
    except Exception as e:
        print("      ! globals", e)

    print("[5/5] assets + SUMMARY")
    all_assets = sorted({a for lst in asset_map.values() for a in lst})
    with open(d("assets.txt"), "w") as f:
        f.write(f"# {len(all_assets)} unique asset URLs referenced across {len(asset_map)} pages\n\n")
        for u in all_assets:
            f.write(u + "\n")

    write_summary(pages, rest_meta, page_records, all_assets)
    print("\nDone. See reference/derrickvalentine.com/SUMMARY.md")

def write_summary(pages, rest_meta, page_records, all_assets):
    L = []
    L.append("# derrickvalentine.com — site archive\n")
    L.append("Snapshot of the existing WordPress + Divi site, captured as the basis for the Next.js rebuild.\n")
    L.append("Generated by `scrape.py`. The live site's tone/layout/sitemap will change — this is the starting reference.\n")

    L.append("\n## Inventory\n")
    by_src = {}
    for p in pages:
        by_src.setdefault(p["source"], 0)
        by_src[p["source"]] += 1
    L.append("| Sitemap | URLs |\n|---|---|")
    for k, v in sorted(by_src.items()):
        L.append(f"| {k} | {v} |")
    L.append("\n| REST collection | items |\n|---|---|")
    for k, v in rest_meta.items():
        L.append(f"| {k} | {len(v)} |")
    L.append(f"\nUnique image/background assets referenced: **{len(all_assets)}** (see `assets.txt`).\n")

    def section(title, recs):
        if not recs:
            return
        L.append(f"\n## {title}\n")
        L.append("| Page | URL | Words | Imgs | Meta description |\n|---|---|--:|--:|---|")
        for r in sorted(recs, key=lambda x: x["url"]):
            desc = (r["description"] or "").replace("|", "\\|")[:90]
            L.append(f"| {r['title'][:50]} | {r['url']} | {r['words']} | {r['images']} | {desc} |")

    pages_recs = [r for r in page_records if r["source"] == "page-sitemap.xml"]
    posts_recs = [r for r in page_records if r["source"] == "post-sitemap.xml"]
    port_recs = [r for r in page_records if r["source"] == "portfolio-sitemap.xml"]
    team_recs = [r for r in page_records if r["source"] == "team-sitemap.xml"]
    other = [r for r in page_records if r["source"] not in
             {"page-sitemap.xml", "post-sitemap.xml", "portfolio-sitemap.xml", "team-sitemap.xml"}]
    section("Pages", pages_recs)
    section("Portfolio", port_recs)
    section("Team", team_recs)
    section("Blog posts", posts_recs)
    section("Other", other)

    open(d("SUMMARY.md"), "w").write("\n".join(L) + "\n")

if __name__ == "__main__":
    main()
