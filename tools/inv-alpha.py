# Invitation 소품 두들(흰 배경) → 투명 PNG, 버밀리언 잉크 단색 · assets/logo-ai/doodle-inv-*.png → assets/logo/inv-*.png
import pathlib
import numpy as np
from PIL import Image
root = pathlib.Path(__file__).resolve().parent.parent
for f in sorted((root / 'assets' / 'logo-ai').glob('doodle-inv-*.png')):
    g = np.asarray(Image.open(f).convert('RGB')).astype(float).min(axis=2)
    a = np.clip((250 - g) / 210 * 255, 0, 255).astype(np.uint8)
    im = Image.new('RGBA', (a.shape[1], a.shape[0]), (236, 74, 38, 0)); im.putalpha(Image.fromarray(a, 'L'))
    box = Image.fromarray(np.where(a > 20, 255, 0).astype(np.uint8)).getbbox()
    p = int(max(box[2] - box[0], box[3] - box[1]) * 0.03)
    im = im.crop((max(0, box[0] - p), max(0, box[1] - p), min(im.width, box[2] + p), min(im.height, box[3] + p)))
    im.thumbnail((900, 900), Image.LANCZOS)
    out = root / 'assets' / 'logo' / f.name.replace('doodle-', '')
    im.save(out, optimize=True); print(out.name, im.size)
