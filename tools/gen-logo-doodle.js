// 손그림(두들) 로고 시안 → assets/logo-ai/doodle-*.png  (OpenAI 이미지 API)
// 사용법: node tools/gen-logo-doodle.js [키...]   · 환경변수 OPENAI_API_KEY 필요
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'assets', 'logo-ai');
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';
const RED = 'a single vivid vermilion red ink color (#EC4A26)';
const BLACK = 'a single soft charcoal black crayon color';

const BASE = (ink) => 'Original hand-drawn naive doodle illustration used as a wedding invitation logo. ' +
  `Loose, slightly wobbly marker line with a hand-made crayon texture, drawn in ${ink} only, ` +
  'cute and playful, simple round faces with dot eyes and a tiny smile, minimal details, flat line art, ' +
  'pure plain white background, no shading, no gradients, no fill except small solid accents, centered with generous white margin. ';

const P = {
  carry:    [BLACK, 'The groom in a suit with a bow tie happily carrying the bride in his arms, she lifts a fluffy bouquet high in the air, a short horizontal line floating above them.'],
  sticker:  [RED,   'An oval sticker-like frame. Inside: the bride with a long veil blowing in the wind and the groom dancing together, a few big five-petal flowers on top of the frame, a tiny star, a bottle and two clinking champagne glasses beside them. Hand-lettered text "Jun & Yunji" at the bottom inside the frame.'],
  umbrella: [RED,   'A couple walking hand in hand under one shared clear umbrella in light rain, short rain strokes, zebra crosswalk stripes under their feet, she wears a short dress, he wears a suit.'],
  kiss:     [RED,   'The groom in a suit and the bride with a veil leaning in for a kiss, three tiny hearts floating above them, simple and sweet.'],
  toast:    [RED,   'Two hands clinking champagne glasses, little sparkle lines and bubbles popping above, one small heart.'],
  rings:    [BLACK, 'Two wobbly hand-drawn wedding rings linked together with small sparkles and two tiny hearts around them.'],
  stamp:    [RED,   'A round hand-drawn stamp badge with a wobbly double circle border. Inside: two simple smiling faces side by side, groom with short hair and bride with a veil, a tiny heart between them. Hand-lettered text "JUN & YUNJI" under the faces and smaller "16.10.2027" below.'],
  bike:     [RED,   'A couple riding a tandem bicycle together, bride with a veil fluttering behind, a few tin cans tied with string trailing behind the bike, small motion lines.'],
  cake:     [BLACK, 'A tall three-tier wedding cake with tiny frosting dots and a little doodle couple figure standing on top, a few confetti dots around.'],
  dance:    [RED,   'The bride and groom spinning in a dance, her dress flaring out, swirl motion lines and a few music notes and stars around them.'],
  letter:   [RED,   'An envelope with a heart seal, slightly opened with a little card peeking out, three small flowers growing from behind it, playful.'],
  walk:     [BLACK, 'A couple seen from behind walking away hand in hand on a city street at night, tiny crayon-drawn neon sign shapes and street lamps around, a crescent moon.']
};

async function gen(key) {
  const [ink, subject] = P[key];
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
    body: JSON.stringify({ model: MODEL, prompt: BASE(ink) + 'Subject: ' + subject, size: '1024x1024', quality: 'high', output_format: 'png', n: 1 })
  });
  const j = await res.json();
  if (!res.ok) throw new Error(key + ': ' + (j.error && j.error.message || res.status));
  fs.writeFileSync(path.join(OUT, 'doodle-' + key + '.png'), Buffer.from(j.data[0].b64_json, 'base64'));
  return key;
}

(async () => {
  if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY 가 없습니다.'); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(P);
  const results = await Promise.allSettled(keys.map(gen));
  results.forEach((r, i) => console.log(r.status === 'fulfilled' ? 'OK   ' + keys[i] : 'FAIL ' + r.reason.message));
})();
