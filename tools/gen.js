const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const config = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
const logos = fs.readFileSync(path.join(__dirname, 'logos.js'), 'utf8');

const G = (q) => `  <link href="https://fonts.googleapis.com/css2?${q}&display=swap" rel="stylesheet" />`;
const PRETENDARD = '  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet" />';

const variants = [
  {
    dir: '시안06_Marcellus+Hahmlet',
    name: 'Marcellus + 함렛 (+ Jost) · 확정',
    mood: '확정 조합 — 영문 Marcellus, 국문 함렛 (시안05 국문)',
    link: G('family=Marcellus&family=Jost:wght@400;500&family=Hahmlet:wght@300;500'),
    vars: { display: "'Marcellus', serif", label: "'Jost', sans-serif", kr: "'Hahmlet', serif",
            dw: 400, dt: '0.04em', lw: 500, kw: 300, ks: 500, kt: '-0.02em', amp: 'normal' }
  },
  {
    dir: '시안01_BodoniModa+NotoSerifKR',
    name: 'Bodoni Moda + Noto Serif KR (+ Jost)',
    mood: '레퍼런스(The Seasons)에 가장 가까운 하이콘트라스트 디돈 세리프 · 에디토리얼',
    link: G('family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Jost:wght@400;500&family=Noto+Serif+KR:wght@300;500'),
    vars: { display: "'Bodoni Moda', serif", label: "'Jost', sans-serif", kr: "'Noto Serif KR', serif",
            dw: 400, dt: '0.01em', lw: 400, kw: 300, ks: 500, kt: '-0.01em', amp: 'italic' }
  },
  {
    dir: '시안02_CormorantGaramond+NanumMyeongjo',
    name: 'Cormorant Garamond + 나눔명조',
    mood: '클래식 · 로맨틱, 가장 부드럽고 우아한 조합',
    link: G('family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Nanum+Myeongjo:wght@400;700'),
    vars: { display: "'Cormorant Garamond', serif", label: "'Cormorant Garamond', serif", kr: "'Nanum Myeongjo', serif",
            dw: 400, dt: '0.02em', lw: 600, kw: 400, ks: 700, kt: '-0.02em', amp: 'italic' }
  },
  {
    dir: '시안03_Italiana+GowunBatang',
    name: 'Italiana + 고운바탕 (+ Tenor Sans)',
    mood: '가늘고 길쭉한 디스플레이 · 가장 미니멀하고 공기감 있는 조합',
    link: G('family=Italiana&family=Tenor+Sans&family=Gowun+Batang:wght@400;700'),
    vars: { display: "'Italiana', serif", label: "'Tenor Sans', sans-serif", kr: "'Gowun Batang', serif",
            dw: 400, dt: '0.04em', lw: 400, kw: 400, ks: 700, kt: '-0.02em', amp: 'normal' }
  },
  {
    dir: '시안04_Marcellus+Pretendard',
    name: 'Marcellus + Pretendard',
    mood: '로마자 비문 느낌의 영문 + 깔끔한 고딕 · 모던 갤러리 무드',
    link: G('family=Marcellus') + '\n' + PRETENDARD,
    vars: { display: "'Marcellus', serif", label: "'Pretendard', sans-serif", kr: "'Pretendard', sans-serif",
            dw: 400, dt: '0.06em', lw: 500, kw: 300, ks: 500, kt: '-0.01em', amp: 'normal' }
  },
  {
    dir: '시안05_GildaDisplay+Hahmlet',
    name: 'Gilda Display + 함렛 (+ Jost)',
    mood: '단정한 하이패션 세리프 + 현대적 명조 · 시크한 블랙&화이트',
    link: G('family=Gilda+Display&family=Jost:wght@400;500&family=Hahmlet:wght@300;500'),
    vars: { display: "'Gilda Display', serif", label: "'Jost', sans-serif", kr: "'Hahmlet', serif",
            dw: 400, dt: '0.02em', lw: 500, kw: 300, ks: 500, kt: '-0.02em', amp: 'normal' }
  }
];

const imagesReadme = `이 폴더에 사진을 넣으세요. (파일명은 config.js 의 photos 항목과 일치해야 합니다)

hero.jpg           첫 화면 전체 배경      세로 9:16 권장 (최소 1080x1920)
couple.jpg         워드마크 아래          4:5
detail.jpg         원형 배지 옆 디테일컷   3:4
closing-01.jpg     마지막 빌보드 왼쪽      2:3
closing-02.jpg     마지막 빌보드 오른쪽    2:3
gallery-01~08.jpg  갤러리                 3:4 (01, 08 은 가로 3:2)
og.jpg             카카오톡 공유 썸네일     1200x630 (index.html 의 og:image 를 절대경로로)

- 파일명/확장자를 바꾸려면 config.js 의 photos 값만 수정하면 됩니다.
- 외부 스토리지 주소(https://...)를 그대로 적어도 됩니다.
- 파일이 없으면 캔버스 견본(회색 프레임 + 파일명)이 표시됩니다.
- 용량은 장당 300~600KB 정도로 압축 권장 (긴 변 1600px 내외).
`;

let latestHtml = '';
for (const v of variants) {
  const x = v.vars;
  const vars = [
    `      --f-display: ${x.display};`,
    `      --f-label: ${x.label};`,
    `      --f-kr: ${x.kr}, 'Apple SD Gothic Neo', 'Malgun Gothic', serif;`,
    `      --display-weight: ${x.dw};`,
    `      --display-track: ${x.dt};`,
    `      --label-weight: ${x.lw};`,
    `      --kr-weight: ${x.kw};`,
    `      --kr-strong: ${x.ks};`,
    `      --kr-track: ${x.kt};`,
    `      --amp-style: ${x.amp};`
  ].join('\n');
  const html = tpl
    .split('{{VARIANT}}').join(v.name)
    .replace('{{FONT_LINK}}', v.link)
    .replace('{{FONT_VARS}}', vars);
  if (v === variants[0]) latestHtml = html;
  const dir = path.join(OUT, v.dir);
  fs.mkdirSync(path.join(dir, 'images'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  fs.writeFileSync(path.join(dir, 'config.js'), config);
  fs.writeFileSync(path.join(dir, 'logos.js'), logos);
  const logoSrc = path.join(OUT, 'assets', 'logo');
  if (fs.existsSync(logoSrc)) {
    fs.mkdirSync(path.join(dir, 'logo'), { recursive: true });
    fs.readdirSync(logoSrc).forEach((f) => fs.copyFileSync(path.join(logoSrc, f), path.join(dir, 'logo', f)));
  }
  fs.writeFileSync(path.join(dir, 'images', 'README.txt'), imagesReadme);
}

// 시안 비교 페이지
const cards = variants.map((v) => `
    <article>
      <iframe src="${encodeURI(v.dir)}/index.html" loading="lazy" title="${v.name}"></iframe>
      <h2>${v.dir.split('_')[0]} · ${v.name}</h2>
      <p>${v.mood}</p>
      <a href="${encodeURI(v.dir)}/index.html" target="_blank">새 창으로 열기 →</a>
    </article>`).join('');
fs.writeFileSync(path.join(OUT, '시안비교.html'), `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>청첩장 폰트 시안 비교</title>
<link rel="icon" href="assets/favicon/favicon.ico" sizes="any" />
<style>
  body { margin: 0; background: #111; color: #F2F1EE; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; }
  header { padding: 40px 32px 8px; } header h1 { margin: 0 0 8px; font-weight: 400; letter-spacing: .2em; font-size: 14px; }
  header p { margin: 0; color: rgba(242,241,238,.6); font-size: 13px; }
  main { display: flex; gap: 32px; overflow-x: auto; padding: 32px; }
  article { flex: none; width: 375px; }
  iframe { width: 375px; height: 760px; border: 0; border-radius: 28px; background: #F2F1EE; box-shadow: 0 0 0 8px #222; }
  h2 { font-size: 14px; font-weight: 600; margin: 22px 0 6px; } p { font-size: 13px; color: rgba(242,241,238,.6); margin: 0 0 10px; line-height: 1.6; }
  a { color: #F2F1EE; font-size: 12px; }
</style></head>
<body><header><h1>WEDDING INVITATION · FONT DRAFTS</h1><p>각 시안은 폴더별 독립 패키지입니다 (index.html + config.js + images/). 가로 스크롤로 비교하세요.</p></header>
<main>${cards}
</main></body></html>`);
// 사이트 루트(yoonjijun.life) = 확정 시안. 주소가 바뀌지 않도록 리다이렉트 대신 루트에 직접 생성
// 경로만 루트 기준으로 보정: 로고 assets/logo/, 견본 assets/sample/, 실제 사진 images/
fs.writeFileSync(path.join(OUT, 'index.html'), latestHtml.split('../assets/').join('assets/'));
fs.writeFileSync(path.join(OUT, 'logos.js'), logos);
fs.writeFileSync(path.join(OUT, 'config.js'), config
  .replace("sampleDir: '../assets/sample/'", "sampleDir: 'assets/sample/'")
  .replace(/'logo\//g, "'assets/logo/"));
fs.mkdirSync(path.join(OUT, 'images'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'images', 'README.txt'), imagesReadme);
fs.writeFileSync(path.join(OUT, 'images', '.gitkeep'), '');

// 최신 확정 시안 바로가기 (폴더에서 더블클릭으로 열기 · 도메인에서도 동작)
const latest = variants[0];
fs.writeFileSync(path.join(OUT, '최신시안.html'), `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" />
<meta http-equiv="refresh" content="0; url=${encodeURI(latest.dir)}/index.html" />
<title>최신 시안 · ${latest.name}</title></head>
<body><a href="${encodeURI(latest.dir)}/index.html">최신 시안 열기 · ${latest.name}</a></body></html>
`);
console.log('done · 최신시안 →', latest.dir);
