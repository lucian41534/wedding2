# AI 로고(흰 배경 PNG)를 '검은 잉크 + 투명 배경'으로 변환하고 여백을 다듬습니다.
# 사용법: python tools/logo-alpha.py   → assets/logo-ai/*.png 를 assets/logo/*.png 로
import sys, pathlib
from PIL import Image, ImageOps

root = pathlib.Path(__file__).resolve().parent.parent
src, dst = root / 'assets' / 'logo-ai', root / 'assets' / 'logo'
dst.mkdir(parents=True, exist_ok=True)
for f in sorted(src.glob('*.png')):
    g = ImageOps.grayscale(Image.open(f).convert('RGB'))
    # 밝을수록 투명: 배경(≈255)은 0, 잉크(어두움)는 불투명
    a = g.point(lambda v: 0 if v > 245 else min(255, int((245 - v) * 255 / 200)))
    box = a.getbbox()
    if not box:
        continue
    pad = int(max(box[2] - box[0], box[3] - box[1]) * 0.06)
    box = (max(0, box[0] - pad), max(0, box[1] - pad), min(a.width, box[2] + pad), min(a.height, box[3] + pad))
    out = Image.new('RGBA', a.size, (17, 17, 17, 0))
    out.putalpha(a)
    out = out.crop(box)
    out.thumbnail((640, 640), Image.LANCZOS)
    out.save(dst / f.name, optimize=True)
    print('ok', f.name, out.size)
