"""사진 데모: 시안06 + assets/photos 실사진 (png=원본색, 나머지=흑백) → 사진데모/ (로컬 전용, gitignore)"""
import os, shutil, re
from PIL import Image, ImageOps
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
SRC, DONE, OUT = 'assets/photos', 'assets/photos/완료', '사진데모'
# slot → 원본 파일 (완료 폴더 png 우선)
PLAN = {
  'hero': '6.png', 'couple': '2.png', 'detail': '12.png',
  'closing': ['43.JPG', '39.JPG'],
  'gallery': ['5.png', '19.jpg', '29.jpg', '8.png', '35.jpg', '36.jpg', '44.JPG',
              '23.jpg', '13.jpg', '16.jpg', '17.jpg', '40.JPG', '42.JPG', '18.jpg',
              '38.JPG', '32.jpg', '45.JPG', '21.jpg'],
}
WIDE = [0, 6, 13, 17]
if os.path.isdir(OUT): shutil.rmtree(OUT)
shutil.copytree('시안06_Marcellus+Hahmlet', OUT, ignore=shutil.ignore_patterns('images'))
os.makedirs(OUT + '/images')
def conv(name):
    p = os.path.join(DONE if name.endswith('.png') else SRC, name)
    im = ImageOps.exif_transpose(Image.open(p))
    if im.mode == 'RGBA':
        bg = Image.new('RGB', im.size, 'white'); bg.paste(im, mask=im.split()[3]); im = bg
    im = im.convert('RGB'); im.thumbnail((1800, 1800), Image.LANCZOS)
    base, ext = os.path.splitext(name)
    # png 는 원본색 표시를 위해 확장자 png 유지 (용량 위해 jpg 로 저장하되 이름 규칙은 .png 그대로 쓰면 혼동 → 실제 png 로 저장)
    if ext.lower() == '.png':
        out = base + '.png'; im.save(f'{OUT}/images/{out}', optimize=True)
    else:
        out = base + '.jpg'; im.save(f'{OUT}/images/{out}', quality=84, optimize=True)
    return out
photos = {k: ([conv(x) for x in v] if isinstance(v, list) else conv(v)) for k, v in PLAN.items()}
q = lambda a: '[' + ', '.join(f"'{x}'" for x in a) + ']'
cfg = open(f'{OUT}/config.js', encoding='utf-8').read()
block = f"""  photos: {{
    dir: 'images/',
    sampleDir: '',
    hero: '{photos['hero']}', couple: '{photos['couple']}', detail: '{photos['detail']}',
    closing: {q(photos['closing'])},
    gallery: {q(photos['gallery'])},
    galleryWide: {WIDE},
    colorExt: ['png']
  }},"""
cfg = re.sub(r"  photos: \{.*?\n  \},", block, cfg, count=1, flags=re.S)
cfg = cfg.replace("photoFilter: 'muted'", "photoFilter: 'mono'")
open(f'{OUT}/config.js', 'w', encoding='utf-8').write(cfg)
print('ok', sum(os.path.getsize(f'{OUT}/images/'+f) for f in os.listdir(OUT+'/images'))//1024, 'KB')
