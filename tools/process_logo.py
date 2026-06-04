#!/usr/bin/env python3
"""Trim the MIRA logo's black background to transparency and produce
a cream (original tan) version for dark backgrounds, an ink (dark taupe)
version for light backgrounds, plus a favicon."""
from PIL import Image
import os

SRC = "/mnt/user-data/uploads/ChatGPT_Image_28_may_2026__20_44_31.png"
OUT = "/home/claude/mira-estetica/assets/img"
os.makedirs(OUT, exist_ok=True)

img = Image.open(SRC).convert("RGBA")
px = img.load()
w, h = img.size

# 1. Make near-black pixels transparent. Keep the tan glyphs.
THRESH = 40  # luminance below this -> transparent
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if lum < THRESH:
            px[x, y] = (r, g, b, 0)
        else:
            # soften edge alpha based on luminance for a clean cutout
            alpha = min(255, int((lum - THRESH) * 2.2)) if lum < THRESH + 60 else 255
            px[x, y] = (r, g, b, alpha)

# 2. Autocrop to the content bounding box (with small padding)
bbox = img.getbbox()
if bbox:
    pad = 24
    l, t, r2, b2 = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r2 = min(w, r2 + pad); b2 = min(h, b2 + pad)
    img = img.crop((l, t, r2, b2))

# Cream version = original tan glyphs, transparent bg (for DARK sections)
img.save(os.path.join(OUT, "logo-cream.webp"), "WEBP", quality=95, method=6)
img.save(os.path.join(OUT, "logo-cream.png"))

# 3. Ink version: recolor every visible pixel to a deep warm taupe
ink = img.copy()
ipx = ink.load()
iw, ih = ink.size
INK_RGB = (58, 49, 42)  # #3A312A deep warm taupe
for y in range(ih):
    for x in range(iw):
        r, g, b, a = ipx[x, y]
        if a > 0:
            ipx[x, y] = (INK_RGB[0], INK_RGB[1], INK_RGB[2], a)
ink.save(os.path.join(OUT, "logo-ink.webp"), "WEBP", quality=95, method=6)
ink.save(os.path.join(OUT, "logo-ink.png"))

# 4. Champagne mono version (single warm gold) for accents
gold = img.copy()
gpx = gold.load()
GOLD = (193, 162, 109)  # #C1A26D
for y in range(gold.size[1]):
    for x in range(gold.size[0]):
        r, g, b, a = gpx[x, y]
        if a > 0:
            gpx[x, y] = (GOLD[0], GOLD[1], GOLD[2], a)
gold.save(os.path.join(OUT, "logo-gold.webp"), "WEBP", quality=95, method=6)

# 5. Favicon: square crop of the "M" area, on a deep ink rounded tile
fav = Image.new("RGBA", (256, 256), (34, 30, 26, 255))  # #221E1A tile
# scale the cream logo to fit
logo_small = img.copy()
ratio = min(190 / logo_small.size[0], 150 / logo_small.size[1])
ns = (max(1, int(logo_small.size[0] * ratio)), max(1, int(logo_small.size[1] * ratio)))
logo_small = logo_small.resize(ns, Image.LANCZOS)
ox = (256 - ns[0]) // 2
oy = (256 - ns[1]) // 2
fav.alpha_composite(logo_small, (ox, oy))
fav.save(os.path.join(OUT, "favicon.png"))
# also a 32px ico-ish
fav.resize((32, 32), Image.LANCZOS).save("/home/claude/mira-estetica/assets/favicon.ico")

print("done")
print(os.listdir(OUT))
print("logo size:", img.size)
