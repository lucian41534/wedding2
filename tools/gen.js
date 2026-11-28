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
    dir: '시안07_Anton+Hahmlet',
    name: 'Anton + 함렛 (+ Archivo) · 확정 · B안',
    mood: '확정 — B안(버밀리언 포스터) + 영문 Anton, 국문 함렛',
    link: G('family=Anton&family=Archivo:wght@400;500&family=Hahmlet:wght@300;500'),
    vars: { display: "'Anton', sans-serif", label: "'Archivo', sans-serif", kr: "'Hahmlet', serif",
            dw: 400, dt: '0em', lw: 500, kw: 300, ks: 500, kt: '-0.02em', amp: 'normal' }
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
{
  const v = variants[0], x = v.vars;
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
  latestHtml = tpl
    .split('{{VARIANT}}').join(v.name)
    .replace('{{FONT_LINK}}', v.link)
    .replace('{{FONT_VARS}}', vars);
}

// 사이트 루트(yoonjijun.life) = 확정 시안. 주소가 바뀌지 않도록 리다이렉트 대신 루트에 직접 생성
// 경로만 루트 기준으로 보정: 로고 assets/logo/, 견본 assets/sample/, 실제 사진 images/
fs.writeFileSync(path.join(OUT, 'index.html'), latestHtml.split('../assets/').join('assets/'));
fs.writeFileSync(path.join(OUT, 'logos.js'), logos);
fs.writeFileSync(path.join(OUT, 'config.js'), config
  .replace("sampleDir: '../assets/sample/'", "sampleDir: 'assets/sample/'")
  .replace("dir: '../assets/photos/", "dir: 'assets/photos/")
  .replace(/'logo\//g, "'assets/logo/"));
fs.mkdirSync(path.join(OUT, 'images'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'images', 'README.txt'), imagesReadme);
fs.writeFileSync(path.join(OUT, 'images', '.gitkeep'), '');

console.log('done · index.html (확정본)');
