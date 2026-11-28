"""assets/logo/*.png 웹 최적화: 긴 변 520px + 팔레트(투명도 유지) 압축. 실행: python tools/optimize-logos.py"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'assets', 'logo')
before = after = 0
for f in sorted(os.listdir(D)):
    if not f.lower().endswith('.png'):
        continue
    p = os.path.join(D, f)
    before += os.path.getsize(p)
    im = Image.open(p).convert('RGBA')
    im.thumbnail((520, 520), Image.LANCZOS)
    q = im.quantize(colors=128, method=Image.Quantize.FASTOCTREE)
    q.save(p, optimize=True)
    after += os.path.getsize(p)
    print(f'{f:24} {im.size[0]}x{im.size[1]}  {os.path.getsize(p) // 1024} KB')
print(f'ok  {before // 1024} KB -> {after // 1024} KB')
