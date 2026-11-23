"""실사진 웹용 변환: assets/photos(원본) + assets/photos/완료(보정 png) → assets/photos/web/*.jpg
   - 완료 폴더의 png(보정본)는 원본 색 유지 → config 에서 { src, filter:'none' } 로 지정
   - 나머지는 config.photoFilter(흑백 mono) 적용
   실행 후 tools/config.js 의 photos 블록을 PLAN 대로 다시 씀 → node tools/gen.js"""
import os, re
from PIL import Image, ImageOps
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
SRC, DONE, OUT = 'assets/photos', 'assets/photos/완료', 'assets/photos/web'
PLAN = {
  'hero': '6.png', 'couple': '2.png', 'detail': '12.png',
  'closing': ['43.JPG', '39.JPG'],
  'gallery': ['5.png', '19.jpg', '29.jpg', '8.png', '35.jpg', '36.jpg', '44.JPG',
              '23.jpg', '13.jpg', '16.jpg', '17.jpg', '40.JPG', '42.JPG', '18.jpg',
              '38.JPG', '32.jpg', '45.JPG', '21.jpg'],
}
WIDE = [0, 6, 13, 17]
os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT): os.remove(os.path.join(OUT, f))
def conv(name):
    color = name.lower().endswith('.png')
    im = ImageOps.exif_transpose(Image.open(os.path.join(DONE if color else SRC, name)))
    if im.mode == 'RGBA':
        bg = Image.new('RGB', im.size, 'white'); bg.paste(im, mask=im.split()[3]); im = bg
    im = im.convert('RGB'); im.thumbnail((1800, 1800), Image.LANCZOS)
    out = os.path.splitext(name)[0] + ('-color' if color else '') + '.jpg'
    im.save(f'{OUT}/{out}', quality=84, optimize=True, progressive=True)
    return f"{{ src: '{out}', filter: 'none' }}" if color else f"'{out}'"
P = {k: ([conv(x) for x in v] if isinstance(v, list) else conv(v)) for k, v in PLAN.items()}
L = lambda a: '[\n      ' + ',\n      '.join(a) + '\n    ]'
block = f"""  photos: {{
    dir: '../assets/photos/web/',      // 웹용 변환본 (tools/make-photo-demo.py 로 생성)
    sampleDir: '../assets/sample/',   // 파일이 없을 때 흑백 견본으로 대체. 끄려면 ''
    hero:   {P['hero']},
    couple: {P['couple']},
    detail: {P['detail']},
    closing: {L(P['closing'])},
    gallery: {L(P['gallery'])},
    galleryWide: {WIDE},
    colorExt: ['png']            // 이 확장자 사진은 필터 없이 원본 색 그대로 (사진별로는 filter:'none')
  }},"""
p = 'tools/config.js'
cfg = open(p, encoding='utf-8').read()
cfg, n = re.subn(r"  photos: \{.*?\n  \},", lambda m: block, cfg, count=1, flags=re.S)
assert n == 1
cfg = re.sub(r"photoFilter: '[\w-]+'", "photoFilter: 'mono'", cfg)
open(p, 'w', encoding='utf-8').write(cfg)
print('ok', sum(os.path.getsize(f'{OUT}/' + f) for f in os.listdir(OUT)) // 1024, 'KB')
