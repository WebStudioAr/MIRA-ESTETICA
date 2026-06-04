from PIL import Image, ImageOps
import os

OUT = "/home/claude/mira-estetica/assets/img"
SRC_DIR = "/home/claude/mira-estetica/assets/photos/source"
os.makedirs(OUT, exist_ok=True); os.makedirs(SRC_DIR, exist_ok=True)

jobs = [
    ("/mnt/user-data/uploads/ChatGPT_Image_28_may_2026__21_17_14.png", "hero-room.webp", 1600, 82),
    ("/mnt/user-data/uploads/ChatGPT_Image_28_may_2026__21_25_56.png", "parallax-room.webp", 1700, 82),
    ("/mnt/user-data/uploads/1780013712337_image.png", "trama.webp", 900, 84),
]

for src, name, maxw, q in jobs:
    im = Image.open(src)
    im = ImageOps.exif_transpose(im).convert("RGB")
    if im.width > maxw:
        r = maxw / im.width
        im = im.resize((maxw, int(im.height * r)), Image.LANCZOS)
    im.save(os.path.join(OUT, name), "WEBP", quality=q, method=6)
    kb = os.path.getsize(os.path.join(OUT, name)) // 1024
    print(name, im.size, f"{kb}KB")
    Image.open(src).convert("RGB").save(os.path.join(SRC_DIR, name.replace(".webp", ".jpg")), quality=88)
print("done")
