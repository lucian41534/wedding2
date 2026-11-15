// OpenAI 이미지 API로 로고 시안 생성 → assets/logo-ai/*.png
// 사용법: node tools/gen-logo-ai.js            (전체)
//        node tools/gen-logo-ai.js ginkgo arch  (일부만)
// 환경변수 OPENAI_API_KEY 필요
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'assets', 'logo-ai');
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';

const BASE = 'Minimal luxury wedding invitation emblem. Pure black ink fine-line drawing, single consistent hairline stroke weight, ' +
  'centered, generous empty margin, plain pure white background, no text, no letters, no shading, no color, no frame unless described. ' +
  'Elegant editorial style like a high-end stationery brand mark. Must read clearly when scaled down to 48px.';

const PROMPTS = {
  ginkgo:  'A single ginkgo leaf with a slender curved stem, drawn with refined veins fanning out, slightly asymmetric and graceful.',
  rings:   'Two interlocking wedding rings seen at a gentle angle, with a tiny four-pointed sparkle above, extremely delicate lines.',
  cosmos:  'One cosmos flower in full bloom with eight notched petals and a short curved stem with one thin leaf, botanical line art.',
  sprig:   'A small autumn branch sprig with three or four leaves and two tiny berries, arranged in a gentle arc, botanical engraving feel.',
  arch:    'A tall slender wedding arch outline with a few trailing vines and small blossoms draped over the top, symmetrical.',
  stream:  'A circle containing three gentle flowing water ripples and a tiny crescent moon above them, calm and poetic.',
  doves:   'Two small doves facing each other forming a heart-like negative space between them, minimal continuous-line style.',
  laurel:  'An open laurel wreath of two thin olive branches meeting at the bottom, leaving the center empty, classic and timeless.'
};

async function gen(key) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
    body: JSON.stringify({
      model: MODEL, prompt: BASE + ' Subject: ' + PROMPTS[key],
      size: '1024x1024', quality: 'high', output_format: 'png', n: 1
    })
  });
  const j = await res.json();
  if (!res.ok) throw new Error(key + ': ' + (j.error && j.error.message || res.status));
  fs.writeFileSync(path.join(OUT, key + '.png'), Buffer.from(j.data[0].b64_json, 'base64'));
  return key;
}

(async () => {
  if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY 가 없습니다.'); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(PROMPTS);
  const results = await Promise.allSettled(keys.map(gen));
  results.forEach((r, i) => console.log(r.status === 'fulfilled' ? 'OK   ' + keys[i] : 'FAIL ' + r.reason.message));
})();
