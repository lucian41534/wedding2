# 손그림 로고 05 Carry 의 두 얼굴 부분을 크롭해 파비콘 세트 생성 → assets/favicon/
# 버밀리언 타일 + 흰 선 (B안 톤). 작은 크기에서는 선을 굵게.
import pathlib
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

root = pathlib.Path(__file__).resolve().parent.parent
src = Image.open(root / 'assets' / 'logo-ai' / 'doodle-carry.png').convert('RGB')
CROP = (352, 228, 712, 588)          # 신랑·신부 얼굴 + 보타이 (원본 1024px 기준, 정사각)
TILE, LINE = (236, 74, 38, 255), (255, 255, 255)
out = root / 'assets' / 'favicon'
out.mkdir(parents=True, exist_ok=True)

g = np.asarray(src.crop(CROP)).astype(float).min(axis=2)
alpha = Image.fromarray(np.clip((245 - g) / 185 * 255, 0, 255).astype(np.uint8), 'L')

def tile(size, fill=0.86, thick=0, radius=0.0):
    a = alpha.filter(ImageFilter.MaxFilter(thick)) if thick else alpha
    big = 1024
    canvas = Image.new('RGBA', (big, big), TILE)
    s = int(big * fill)
    a2 = a.resize((s, s), Image.LANCZOS)
    mark = Image.new('RGBA', a2.size, LINE + (255,)); mark.putalpha(a2)
    canvas.alpha_composite(mark, ((big - s) // 2, (big - s) // 2))
    if radius:
        m = Image.new('L', (big, big), 0)
        ImageDraw.Draw(m).rounded_rectangle((0, 0, big - 1, big - 1), int(big * radius), fill=255)
        canvas.putalpha(m)
    return canvas.resize((size, size), Image.LANCZOS)

tile(512, 0.86, 3, 0.22).save(out / 'icon-512.png', optimize=True)
tile(192, 0.88, 5, 0.22).save(out / 'icon-192.png', optimize=True)
tile(180, 0.84, 5).save(out / 'apple-touch-icon.png', optimize=True)
tile(32, 1.12, 7, 0.18).save(out / 'favicon-32.png', optimize=True)
ico = [tile(s, 1.12, 9, 0.18) for s in (16, 32, 48)]
ico[2].save(out / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[:2])
print('ok')
