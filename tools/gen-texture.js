// 종이 질감 텍스처 → assets/texture/*.jpg (OpenAI 이미지 API) · 사용법: node tools/gen-texture.js letter envelope
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..', 'assets', 'texture-ai');
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';
const P = {
  letter: 'Seamless tileable flat scan of premium handmade cotton paper, warm off-white ivory color, visible soft cotton fibers and tiny flecks, very subtle uneven pulp texture, gentle natural tone variation, evenly lit from straight above, no shadows, no folds, no objects, no text, fills the entire frame edge to edge.',
  envelope: 'Seamless tileable flat scan of thick textured envelope paper stock, light neutral grey-white, pronounced felt-like fibrous surface with laid lines and fine fibers, slight mottling, evenly lit from straight above, no shadows, no folds, no objects, no text, fills the entire frame edge to edge.'
};
(async () => {
  const keys = process.argv.slice(2);
  if (!keys.length) { console.error('키 지정: ' + Object.keys(P).join(' ')); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const r = await Promise.allSettled(keys.map(async (k) => {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
      body: JSON.stringify({ model: MODEL, prompt: P[k], size: '1024x1024', quality: 'high', output_format: 'png', n: 1 })
    });
    const j = await res.json();
    if (!res.ok) throw new Error(k + ': ' + (j.error && j.error.message || res.status));
    fs.writeFileSync(path.join(OUT, k + '.png'), Buffer.from(j.data[0].b64_json, 'base64'));
  }));
  r.forEach((x, i) => console.log(x.status === 'fulfilled' ? 'OK   ' + keys[i] : 'FAIL ' + x.reason.message));
})();
