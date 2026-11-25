"""사진 웹용 변환: assets/photos/web/ (원본·보정본, 직접 관리) → assets/photos/site/<번호>.jpg
   - 긴 변 1800px, JPEG 84% (모바일 로딩용). 색은 그대로 두고 흑백은 config.js 의 photos.mono 로 CSS 처리
   - 실행: python tools/make-web-photos.py  →  node tools/gen.js"""
import os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'photos', 'web')
OUT = os.path.join(ROOT, 'assets', 'photos', 'site')
EXT = ('.jpg', '.jpeg', '.png', '.webp')

os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT):
    os.remove(os.path.join(OUT, f))
total = 0
# 같은 번호가 여러 개면 png(보정본) 우선
pick = {}
for name in sorted(os.listdir(SRC)):
    if not name.lower().endswith(EXT):
        continue
    b = os.path.splitext(name)[0]
    if b not in pick or name.lower().endswith('.png'):
        pick[b] = name
for name in sorted(pick.values()):
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, name)))
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, 'white'); bg.paste(im, mask=im.split()[3]); im = bg
    im = im.convert('RGB')
    im.thumbnail((1800, 1800), Image.LANCZOS)
    out = os.path.join(OUT, os.path.splitext(name)[0] + '.jpg')
    im.save(out, quality=84, optimize=True, progressive=True)
    total += os.path.getsize(out)
    print(f'{name:>10} -> {os.path.basename(out)}  {im.size[0]}x{im.size[1]}')
print(f'ok  {total // 1024} KB')
