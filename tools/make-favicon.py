# 확정 로고(assets/logo/rings.png)로 파비콘 세트 생성 → assets/favicon/
# 작은 크기에서도 보이도록 선을 굵게(팽창) 한 뒤 어두운 타일 위에 밝게 배치
import pathlib, sys
from PIL import Image, ImageFilter

root = pathlib.Path(__file__).resolve().parent.parent
logo = sys.argv[1] if len(sys.argv) > 1 else 'rings'
src = Image.open(root / 'assets' / 'logo' / f'{logo}.png').convert('RGBA')
out = root / 'assets' / 'favicon'
out.mkdir(parents=True, exist_ok=True)
INK, PAPER = (17, 17, 17, 255), (242, 241, 238)

def tile(size, fill=0.72, thick=0, radius=0.0):
    a = src.getchannel('A')
    if thick:
        a = a.filter(ImageFilter.MaxFilter(thick))
    big = 1024
    canvas = Image.new('RGBA', (big, big), INK)
    s = int(big * fill)
    k = s / max(a.size); a2 = a.resize((max(1, int(a.width * k)), max(1, int(a.height * k))), Image.LANCZOS)
    mark = Image.new('RGBA', a2.size, PAPER + (255,)); mark.putalpha(a2)
    canvas.alpha_composite(mark, ((big - a2.width) // 2, (big - a2.height) // 2 + int(big * 0.02)))
    if radius:
        m = Image.new('L', (big, big), 0)
        from PIL import ImageDraw
        ImageDraw.Draw(m).rounded_rectangle((0, 0, big - 1, big - 1), int(big * radius), fill=255)
        canvas.putalpha(m)
    return canvas.resize((size, size), Image.LANCZOS)

tile(512, 0.70, 5, 0.22).save(out / 'icon-512.png', optimize=True)
tile(192, 0.70, 7, 0.22).save(out / 'icon-192.png', optimize=True)
tile(180, 0.66, 7).save(out / 'apple-touch-icon.png', optimize=True)      # iOS 가 자체로 모서리를 둥글게 처리
tile(32, 0.84, 17, 0.18).save(out / 'favicon-32.png', optimize=True)
ico = [tile(s, 0.86, 21, 0.18) for s in (16, 32, 48)]
ico[2].save(out / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[:2])
print('ok', sorted(p.name for p in out.iterdir()))
