# assets/sample-raw/*.png → 흑백 JPG(긴 변 1600px) assets/sample/*.jpg
import pathlib
from PIL import Image, ImageOps

root = pathlib.Path(__file__).resolve().parent.parent
src, dst = root / 'assets' / 'sample-raw', root / 'assets' / 'sample'
dst.mkdir(parents=True, exist_ok=True)
for f in sorted(src.glob('*.png')):
    im = ImageOps.grayscale(Image.open(f).convert('RGB'))
    im = ImageOps.autocontrast(im, cutoff=0.5)
    im.thumbnail((1600, 1600), Image.LANCZOS)
    out = dst / (f.stem + '.jpg')
    im.save(out, quality=80, optimize=True, progressive=True)
    print('ok', out.name, im.size, out.stat().st_size // 1024, 'KB')
