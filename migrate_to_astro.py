import os
import re
import glob

# Paths
SITE_DIR = "/home/blaise/workspace/Numérologie/site"
SRC_PAGES_DIR = "/home/blaise/workspace/Numérologie/site/src/pages"

os.makedirs(SRC_PAGES_DIR, exist_ok=True)

# Find all HTML files
html_files = glob.glob(os.path.join(SITE_DIR, "**/*.html"), recursive=True)

print(f"Found {len(html_files)} HTML files in {SITE_DIR}.")

for filepath in html_files:
    # Skip build directories or package dirs
    if "node_modules" in filepath or "dist" in filepath or "public" in filepath:
        continue
    
    # Get relative path from SITE_DIR
    rel_path = os.path.relpath(filepath, SITE_DIR)
    
    # Skip index-old.html
    if rel_path in ["index-old.html"]:
        continue
        
    print(f"Migrating {rel_path}...")
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Extract title
    title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else "Plateforme des Mystères"
    
    # Extract description
    desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', content, re.IGNORECASE)
    if not desc_match:
        desc_match = re.search(r'<meta\s+property="og:description"\s+content="(.*?)"', content, re.IGNORECASE)
    description = desc_match.group(1).strip() if desc_match else ""
    
    # Extract keywords
    keywords_match = re.search(r'<meta\s+name="keywords"\s+content="(.*?)"', content, re.IGNORECASE)
    keywords = keywords_match.group(1).strip() if keywords_match else ""
    
    # Canonical path
    canonical_path = rel_path.replace(os.sep, '/')
    
    # Extract JSON-LD script if present
    json_ld_match = re.search(r'<script\s+type="application/ld\+json">(.*?)</script>', content, re.IGNORECASE | re.DOTALL)
    json_ld_str = json_ld_match.group(1).strip() if json_ld_match else None
    
    # Extract main content
    main_match = re.search(r'<main\s+id="content">(.*?)</main>', content, re.IGNORECASE | re.DOTALL)
    if not main_match:
        main_match = re.search(r'<body>(.*?)</body>', content, re.IGNORECASE | re.DOTALL)
        
    main_content = main_match.group(1).strip() if main_match else ""
    
    # Extract inline style in head
    style_match = re.search(r'<style>(.*?)</style>', content, re.IGNORECASE | re.DOTALL)
    style_content = style_match.group(1).strip() if style_match else None
    
    # Extract scripts loaded at the bottom, e.g. <script src="assets/js/calculateur.js"></script>
    scripts = []
    script_matches = re.findall(r'<script\s+src="([^"]+)"', content, re.IGNORECASE)
    for src in script_matches:
        if "main.js" not in src and "plausible" not in src:
            normalized_src = src
            if "assets/" in src:
                normalized_src = "/assets/" + src.split("assets/")[2] if len(src.split("assets/")) > 2 else "/assets/" + src.split("assets/")[1]
            scripts.append(normalized_src)
            
    # Extract sources in footer
    sources_match = re.search(r'<p>\s*Sources\s*:\s*(.*?)\s*</p>', content, re.IGNORECASE)
    sources = sources_match.group(1).strip() if sources_match else None
    
    # Check if this page is in the blog directory to set useBlogStyles
    use_blog_styles = "blog/" in canonical_path
    
    # Build astro contents
    astro_lines = []
    astro_lines.append("---")
    
    depth = rel_path.count(os.sep)
    layout_rel_path = "../" * (depth + 1) + "layouts/Layout.astro"
    astro_lines.append(f"import Layout from '{layout_rel_path}';")
    
    if json_ld_str:
        astro_lines.append(f"\nconst jsonLd = {json_ld_str};")
        
    astro_lines.append("---")
    astro_lines.append("")
    
    # Layout open tag
    layout_tag = f'<Layout\n  title="{title}"\n  description="{description}"'
    if keywords:
        keywords_escaped = keywords.replace('"', '&quot;')
        layout_tag += f'\n  keywords="{keywords_escaped}"'
    layout_tag += f'\n  canonicalPath="{canonical_path}"'
    if json_ld_str:
        layout_tag += '\n  jsonLd={jsonLd}'
    if use_blog_styles:
        layout_tag += '\n  useBlogStyles={true}'
    if scripts:
        scripts_val = "[" + ", ".join([f'"{s}"' for s in scripts]) + "]"
        layout_tag += f'\n  scripts={{{scripts_val}}}'
    layout_tag += '\n>'
    
    astro_lines.append(layout_tag)
    astro_lines.append("")
    
    # Rewrite paths helper
    def rewrite_paths(html_content):
        # Rewrite assets paths to absolute
        html_content = re.sub(r'(src|href)="[^"]*assets/([^"]+)"', r'\1="/assets/\2"', html_content)
        return html_content
    
    main_content_rewritten = rewrite_paths(main_content)
    
    astro_lines.append(main_content_rewritten)
    astro_lines.append("")
    
    # Sources slot if present
    if sources:
        sources_rewritten = rewrite_paths(sources)
        astro_lines.append(f'  <p slot="sources" style="color:#64748b;font-size:0.75rem;margin-bottom:0.8rem;">')
        astro_lines.append(f'    Sources : {sources_rewritten}')
        astro_lines.append('  </p>')
        astro_lines.append("")
        
    astro_lines.append('</Layout>')
    astro_lines.append("")
    
    # Style block if present
    if style_content:
        style_content_rewritten = rewrite_paths(style_content)
        astro_lines.append('<style is:global>')
        astro_lines.append(style_content_rewritten)
        astro_lines.append('</style>')
        astro_lines.append("")
        
    # Output file path
    astro_rel_path = rel_path.rsplit(".", 1)[0] + ".astro"
    astro_filepath = os.path.join(SRC_PAGES_DIR, astro_rel_path)
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(astro_filepath), exist_ok=True)
    
    # Write astro file
    with open(astro_filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(astro_lines))
        
    print(f"Created {astro_filepath}")

print("Migration completed successfully!")
