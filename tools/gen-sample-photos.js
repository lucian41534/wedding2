// OpenAI 이미지 API로 흑백 견본 사진 생성 → assets/sample-raw/*.png
// 이후 python tools/sample-convert.py 로 흑백 JPG(assets/sample/) 변환
// 사용법: node tools/gen-sample-photos.js [키 ...]   (환경변수 OPENAI_API_KEY)
// 실제 인물이 아닌 가상의 커플입니다.
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'assets', 'sample-raw');
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';
const TALL = '1024x1536', WIDE = '1536x1024';

const BASE = 'Black-and-white editorial wedding photograph, shot on 35mm film, fine grain, soft natural light, ' +
  'elegant and timeless, high-end fashion magazine aesthetic, candid and romantic. ' +
  'A fictional Korean couple: the bride has a sleek low bun and a minimalist satin column dress with a long sheer veil; ' +
  'the groom wears a classic black tuxedo with a bow tie. No text, no watermark. ';

const SHOTS = {
  'hero':        [TALL, 'The couple walking hand in hand down a quiet Seoul street at dusk, veil flowing in the wind, shot from a distance, lots of negative space in the top third.'],
  'couple':      [TALL, 'Close embrace beside a tall window, foreheads touching, eyes closed, window light on their faces.'],
  'detail':      [TALL, 'Still life detail: two crystal champagne coupes and an open ring box on a marble table with a few white flowers, shallow depth of field.'],
  'closing-01':  [TALL, 'Portrait of the bride laughing, holding a loose bouquet of white flowers, veil framing her face.'],
  'closing-02':  [TALL, 'The couple seen from behind walking away down a long corridor with arched windows.'],
  'gallery-01':  [WIDE, 'The couple sitting on stone steps beside an urban stream at night, city lights reflecting on the water, wide composition.'],
  'gallery-02':  [TALL, 'Close-up of the bride\'s face partly behind her sheer veil, soft focus, looking down.'],
  'gallery-03':  [TALL, 'Close-up of the couple\'s hands with wedding rings, fingers intertwined, against the satin of the dress.'],
  'gallery-04':  [TALL, 'The couple slow dancing in an empty hall, motion blur on the veil.'],
  'gallery-05':  [TALL, 'A bouquet of cosmos flowers and small autumn leaves wrapped in silk ribbon, held at the bride\'s waist.'],
  'gallery-06':  [TALL, 'The groom laughing while fixing his cufflink, candid moment.'],
  'gallery-07':  [TALL, 'The couple standing under ginkgo trees with fallen leaves on the ground, autumn atmosphere.'],
  'gallery-08':  [WIDE, 'The couple on a rooftop at golden hour with the city skyline behind them, small figures in a wide frame.']
};

async function gen(key) {
  const [size, shot] = SHOTS[key];
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
    body: JSON.stringify({ model: MODEL, prompt: BASE + shot, size, quality: 'high', output_format: 'png', n: 1 })
  });
  const j = await res.json();
  if (!res.ok) throw new Error(key + ': ' + (j.error && j.error.message || res.status));
  fs.writeFileSync(path.join(OUT, key + '.png'), Buffer.from(j.data[0].b64_json, 'base64'));
  return key;
}

(async () => {
  if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY 가 없습니다.'); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS);
  const results = await Promise.allSettled(keys.map(gen));
  results.forEach((r, i) => console.log(r.status === 'fulfilled' ? 'OK   ' + keys[i] : 'FAIL ' + r.reason.message));
})();
