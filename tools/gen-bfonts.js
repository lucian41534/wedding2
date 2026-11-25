// B안(버밀리언 포스터) 영문 폰트 시안 → 타이포B_폰트/NN_이름.html (config·로고 공유) + B폰트시안.html
// gen.js 끝에서 require 로 실행됨
const fs = require('fs');
const path = require('path');

module.exports = function ({ OUT, tpl, config, logos, G }) {
  function buildHtml(v) {
    const x = v.vars;
    const vars = [
      `      --f-display: ${x.display};`, `      --f-label: ${x.label};`,
      `      --f-kr: ${x.kr}, 'Apple SD Gothic Neo', 'Malgun Gothic', serif;`,
      `      --display-weight: ${x.dw};`, `      --display-track: ${x.dt};`, `      --label-weight: ${x.lw};`,
      `      --kr-weight: ${x.kw};`, `      --kr-strong: ${x.ks};`, `      --kr-track: ${x.kt};`, `      --amp-style: ${x.amp};`
    ].join('\n');
    return tpl.split('{{VARIANT}}').join(v.name).replace('{{FONT_LINK}}', v.link).replace('{{FONT_VARS}}', vars);
  }
  const KR = 'family=Hahmlet:wght@300;500';
  const NN = 'https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/';
  const GG = `
  <style>
    @font-face { font-family: 'GyeonggiBatang'; src: url('${NN}GyeonggiBatang.woff') format('woff'); font-weight: 100 900; font-display: swap; }
    @font-face { font-family: 'GyeonggiTitleM'; src: url('${NN}GyeonggiTitleM.woff') format('woff'); font-weight: 100 900; font-display: swap; }
  </style>`;
  // [이름, 구글폰트 쿼리, display, label, 굵기, 자간, &스타일, 메모]
  const BF = [
    ['Marcellus', 'family=Marcellus&family=Jost:wght@400;500', "'Marcellus', serif", "'Jost', sans-serif", 400, '0.02em', 'normal', '현재 확정 · 로마 비문풍 세리프'],
    ['Anton', 'family=Anton&family=Archivo:wght@400;500', "'Anton', sans-serif", "'Archivo', sans-serif", 400, '0em', 'normal', '레퍼런스 포스터에 가장 가까운 압축 굵은 산세리프'],
    ['Bebas Neue', 'family=Bebas+Neue&family=Archivo:wght@400;500', "'Bebas Neue', sans-serif", "'Archivo', sans-serif", 400, '0.01em', 'normal', '깔끔한 압축 대문자 · 공연 포스터'],
    ['Oswald', 'family=Oswald:wght@400;600&family=Archivo:wght@400;500', "'Oswald', sans-serif", "'Archivo', sans-serif", 600, '-0.01em', 'normal', '압축 고딕 · 단단하고 현대적'],
    ['League Gothic', 'family=League+Gothic&family=Archivo:wght@400;500', "'League Gothic', sans-serif", "'Archivo', sans-serif", 400, '0em', 'normal', '빈티지 신문 헤드라인 압축체'],
    ['Six Caps', 'family=Six+Caps&family=Archivo:wght@400;500', "'Six Caps', sans-serif", "'Archivo', sans-serif", 400, '0.02em', 'normal', '극단적으로 가늘고 긴 대문자 · 패션 매거진'],
    ['Big Shoulders', 'family=Big+Shoulders+Display:wght@500;800&family=Archivo:wght@400;500', "'Big Shoulders Display', sans-serif", "'Archivo', sans-serif", 800, '0em', 'normal', '시카고 간판풍 압축 굵은체'],
    ['Archivo Black', 'family=Archivo+Black&family=Archivo:wght@400;500', "'Archivo Black', sans-serif", "'Archivo', sans-serif", 400, '-0.03em', 'normal', '넓고 묵직한 그로테스크'],
    ['Syne', 'family=Syne:wght@500;800', "'Syne', sans-serif", "'Syne', sans-serif", 800, '-0.03em', 'normal', '아트 갤러리풍 개성 있는 그로테스크'],
    ['Unbounded', 'family=Unbounded:wght@400;700&family=Archivo:wght@400;500', "'Unbounded', sans-serif", "'Archivo', sans-serif", 700, '-0.03em', 'normal', '둥글고 넓은 Y2K 디스플레이'],
    ['Bricolage', 'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800', "'Bricolage Grotesque', sans-serif", "'Bricolage Grotesque', sans-serif", 800, '-0.04em', 'normal', '손맛 있는 굵은 그로테스크 · 두들 로고와 잘 맞음'],
    ['Familjen', 'family=Familjen+Grotesk:wght@500;700', "'Familjen Grotesk', sans-serif", "'Familjen Grotesk', sans-serif", 700, '-0.03em', 'normal', '따뜻한 휴머니스트 그로테스크'],
    ['Space Grotesk', 'family=Space+Grotesk:wght@500;700', "'Space Grotesk', sans-serif", "'Space Grotesk', sans-serif", 700, '-0.03em', 'normal', '모던 그로테스크'],
    ['Inter Tight', 'family=Inter+Tight:wght@500;800', "'Inter Tight', sans-serif", "'Inter Tight', sans-serif", 800, '-0.05em', 'normal', '스위스 스타일 타이트 산세리프'],
    ['Darker Grotesque', 'family=Darker+Grotesque:wght@500;900', "'Darker Grotesque', sans-serif", "'Darker Grotesque', sans-serif", 900, '-0.02em', 'normal', '좁고 높은 그로테스크 · 리듬감'],
    ['Rubik Mono One', 'family=Rubik+Mono+One&family=Archivo:wght@400;500', "'Rubik Mono One', sans-serif", "'Archivo', sans-serif", 400, '-0.04em', 'normal', '모노스페이스 블록체 · 그래픽적'],
    ['DM Serif Display', 'family=DM+Serif+Display:ital@0;1&family=Jost:wght@400;500', "'DM Serif Display', serif", "'Jost', sans-serif", 400, '-0.02em', 'italic', '대비 강한 디스플레이 세리프 · 클래식 포스터'],
    ['Playfair', 'family=Playfair+Display:ital,wght@0,800;1,800&family=Jost:wght@400;500', "'Playfair Display', serif", "'Jost', sans-serif", 800, '-0.02em', 'italic', '굵은 디돈 세리프 · 매거진 커버'],
    ['Abril Fatface', 'family=Abril+Fatface&family=Jost:wght@400;500', "'Abril Fatface', serif", "'Jost', sans-serif", 400, '-0.01em', 'normal', '아주 굵은 팻페이스 · 빈티지 포스터'],
    ['Bodoni Moda', 'family=Bodoni+Moda:ital,opsz,wght@0,6..96,700;1,6..96,700&family=Jost:wght@400;500', "'Bodoni Moda', serif", "'Jost', sans-serif", 700, '-0.01em', 'italic', '하이패션 보도니'],
    ['Fraunces', 'family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,700&family=Jost:wght@400;500', "'Fraunces', serif", "'Jost', sans-serif", 700, '-0.03em', 'italic', '말랑하고 위트 있는 세리프'],
    ['Gloock', 'family=Gloock&family=Jost:wght@400;500', "'Gloock', serif", "'Jost', sans-serif", 400, '-0.02em', 'normal', '단단한 고대비 세리프 · 에디토리얼'],
    ['Instrument Serif', 'family=Instrument+Serif:ital@0;1&family=Inter:wght@500', "'Instrument Serif', serif", "'Inter', sans-serif", 400, '-0.03em', 'italic', '좁고 우아한 세리프 · 요즘 브랜딩 감성'],
    ['Italiana', 'family=Italiana&family=Jost:wght@400;500', "'Italiana', serif", "'Jost', sans-serif", 400, '0.01em', 'normal', '가늘고 높은 이탈리안 디스플레이'],
    ['Cormorant', 'family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Jost:wght@400;500', "'Cormorant Garamond', serif", "'Jost', sans-serif", 600, '-0.01em', 'italic', '섬세한 가라몬드 · 고전적'],
    // 국문 경기천년체 시안 (9번째 값 = 국문 폰트)
    ['Marcellus · 경기천년바탕', 'family=Marcellus&family=Jost:wght@400;500', "'Marcellus', serif", "'Jost', sans-serif", 400, '0.02em', 'normal', '국문 경기천년바탕 · 붓맛 있는 바탕체 (영문 현재 확정)', "'GyeonggiBatang', serif"],
    ['Marcellus · 경기천년제목', 'family=Marcellus&family=Jost:wght@400;500', "'Marcellus', serif", "'Jost', sans-serif", 400, '0.02em', 'normal', '국문 경기천년제목 · 단정한 고딕형 제목체 (영문 현재 확정)', "'GyeonggiTitleM', sans-serif"],
    ['Anton · 경기천년제목', 'family=Anton&family=Archivo:wght@400;500', "'Anton', sans-serif", "'Archivo', sans-serif", 400, '0em', 'normal', '포스터 압축체 + 경기천년제목', "'GyeonggiTitleM', sans-serif"],
    ['Bricolage · 경기천년바탕', 'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800', "'Bricolage Grotesque', sans-serif", "'Bricolage Grotesque', sans-serif", 800, '-0.04em', 'normal', '손맛 그로테스크 + 경기천년바탕', "'GyeonggiBatang', serif"],
  ];
  const BDIR = '타이포B_폰트';
  const dir = path.join(OUT, BDIR);
  fs.mkdirSync(path.join(dir, 'logo'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'config.js'), config.replace("typo: '',", "typo: 'b',"));
  fs.writeFileSync(path.join(dir, 'logos.js'), logos);
  const logoSrc = path.join(OUT, 'assets', 'logo');
  fs.readdirSync(logoSrc).forEach((f) => fs.copyFileSync(path.join(logoSrc, f), path.join(dir, 'logo', f)));
  fs.readdirSync(dir).filter((f) => f.endsWith('.html')).forEach((f) => fs.unlinkSync(path.join(dir, f)));
  const items = BF.map((b, i) => {
    const file = String(i + 1).padStart(2, '0') + '_' + b[0].replace(/[\s·]+/g, '') + '.html';
    fs.writeFileSync(path.join(dir, file), buildHtml({
      name: 'B · ' + b[0], link: G(b[1] + '&' + KR) + (b[8] ? GG : ''),
      vars: { display: b[2], label: b[3], kr: b[8] || "'Hahmlet', serif", dw: b[4], dt: b[5], lw: 500, kw: 300, ks: 500, kt: '-0.02em', amp: b[6] }
    }));
    return { file, b, i };
  });
  const num = (i) => String(i + 1).padStart(2, '0');
  fs.writeFileSync(path.join(OUT, 'B폰트시안.html'), `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>B안 폰트 시안 ${BF.length}종</title>
<link rel="icon" href="assets/favicon/favicon.ico" sizes="any" />
${BF.map((b) => G(b[1])).join('\n')}
<style>
  body { margin: 0; background: #111; color: #F2F1EE; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; }
  header { padding: 40px 32px 0; } header h1 { margin: 0 0 8px; font-weight: 400; letter-spacing: .2em; font-size: 14px; }
  header p { margin: 0; color: rgba(242,241,238,.6); font-size: 13px; line-height: 1.7; }
  main { display: grid; grid-template-columns: repeat(auto-fill, 375px); gap: 44px 32px; padding: 32px; justify-content: center; }
  iframe { width: 375px; height: 720px; border: 0; border-radius: 28px; background: #F2F1EE; box-shadow: 0 0 0 8px #222; }
  .spec { margin: 20px 0 6px; font-size: 46px; line-height: 1; color: #EC4A26; white-space: nowrap; overflow: hidden; }
  h2 { font-size: 14px; font-weight: 600; margin: 6px 0 4px; } p { font-size: 13px; color: rgba(242,241,238,.6); margin: 0 0 8px; line-height: 1.6; }
  a { color: #F2F1EE; font-size: 12px; }
</style></head>
<body><header><h1>B · VERMILION POSTER — DISPLAY FONT DRAFTS (${BF.length})</h1>
<p>B안에서 영문 대형 타이포 폰트만 바꾼 시안입니다. 국문은 함렛 (마지막 4종은 경기천년체), 모두 무료(Google Fonts · OFL).<br>각 화면은 안에서 스크롤해 볼 수 있고, 아래 링크로 새 창에서 크게 열립니다.</p></header>
<main>${items.map(({ file, b, i }) => `
  <article>
    <iframe src="${encodeURI(BDIR + '/' + file)}" loading="lazy" title="${b[0]}"></iframe>
    <div class="spec" style="font-family:${b[2].replace(/'/g, '&#39;')};font-weight:${b[4]};letter-spacing:${b[5]}">JUN &amp; YUNJI</div>
    <h2>${num(i)} · ${b[0]}</h2>
    <p>${b[7]}</p>${b[8] ? `<p style="font-family:${b[8].replace(/'/g, '&#39;')};font-size:17px;color:#F2F1EE">서로 다른 길을 걸어온 두 사람이 이제 같은 곳을 바라봅니다.</p>` : ''}
    <a href="${encodeURI(BDIR + '/' + file)}" target="_blank">새 창으로 열기 →</a>
  </article>`).join('')}
</main></body></html>`);
  return BF.length;
};
