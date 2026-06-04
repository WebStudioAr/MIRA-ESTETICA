from PIL import Image, ImageOps
import os

OUT = "/home/claude/mira-estetica/assets/img"
os.makedirs(OUT, exist_ok=True)

jobs = [
    ("/mnt/user-data/uploads/ChatGPT_Image_28_may_2026__21_03_27.png", "sala-masajes.webp"),
    ("/mnt/user-data/uploads/ChatGPT_Image_28_may_2026__21_06_09.png", "sala-mira.webp"),
]

MAXW = 1500
for src, name in jobs:
    im = Image.open(src)
    im = ImageOps.exif_transpose(im).convert("RGB")
    if im.width > MAXW:
        r = MAXW / im.width
        im = im.resize((MAXW, int(im.height * r)), Image.LANCZOS)
    im.save(os.path.join(OUT, name), "WEBP", quality=80, method=6)
    kb = os.path.getsize(os.path.join(OUT, name)) // 1024
    print(name, im.size, f"{kb}KB")

# also keep a copy of originals in photos/source
src_dir = "/home/claude/mira-estetica/assets/photos/source"
os.makedirs(src_dir, exist_ok=True)
for src, _ in jobs:
    Image.open(src).convert("RGB").save(os.path.join(src_dir, os.path.basename(src).replace(".png", ".jpg")), quality=88)
print("done")
