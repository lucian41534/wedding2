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
  walk:     [BLACK, 'A couple seen from behind walking away hand in hand on a city street at night, tiny crayon-drawn neon sign shapes and street lamps around, a crescent moon.'],
  // ── Invitation 시안용 소품 ──
  'inv-envelope': [RED, 'An open envelope seen from the front, a folded letter card popping out of it upward, three small hearts and little sparkle strokes bursting out of the envelope.'],
  'inv-route':    [RED, 'A wide horizontal scene: a tiny house on the far left and another tiny house on the far right, a long wobbly dotted path winding from each house and meeting in the middle at a big heart, a few tiny trees along the path.'],
  'inv-autumn':   [RED, 'A loose scattered sprinkle of falling autumn leaves: ginkgo leaves and small maple leaves of different sizes tumbling down, with tiny motion strokes, spread over the whole square.'],
  'inv-bouquet':  [RED, 'A hand-tied wedding bouquet of simple five-petal flowers and cosmos with long stems wrapped by a ribbon bow with long flowing ribbon tails.'],
  'inv-scribble': [RED, 'Hand-lettered brush script words "you are invited!" written casually, with a looping underline swash and two tiny stars, nothing else.'],
  'inv-peek':     [RED, 'The groom and the bride peeking over a straight horizontal edge line, only their heads, eyes and little hands visible above the line, the bride with a veil, a tiny heart floating between them, playful.'],
  'inv-walkline': [RED, 'A very wide horizontal strip: a long straight wobbly ground line across the whole width, a tiny couple walking hand in hand on the right part of the line, small footprints dotted behind them, a little heart above them.'],
  'inv-ticket':   [RED, 'A hand-drawn admission ticket with a wobbly outline, notched round cut-outs on both sides and a dashed perforation line near the right end, hand-lettered "ADMIT TWO" in the middle and a small star, empty otherwise.']
};

async function gen(key) {
  const [ink, subject] = P[key];
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
    body: JSON.stringify({ model: MODEL, prompt: BASE(ink) + 'Subject: ' + subject, size: /route|walkline|ticket/.test(key) ? '1536x1024' : '1024x1024', quality: 'high', output_format: 'png', n: 1 })
  });
  const j = await res.json();
  if (!res.ok) throw new Error(key + ': ' + (j.error && j.error.message || res.status));
  fs.writeFileSync(path.join(OUT, 'doodle-' + key + '.png'), Buffer.from(j.data[0].b64_json, 'base64'));
  return key;
}

(async () => {
  if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY 가 없습니다.'); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const keys = process.argv.slice(2);   // 덮어쓰기 방지: 키를 반드시 지정 (예: node tools/gen-logo-doodle.js inv-peek)
  if (!keys.length) { console.error('생성할 키를 지정하세요: ' + Object.keys(P).join(' ')); process.exit(1); }
  const results = await Promise.allSettled(keys.map(gen));
  results.forEach((r, i) => console.log(r.status === 'fulfilled' ? 'OK   ' + keys[i] : 'FAIL ' + r.reason.message));
})();
