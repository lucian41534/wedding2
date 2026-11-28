// 한글 폰트 시안 → 시안/한글폰트.html
// 목록: tools/kfonts.json (구글 폰트 한글 지원 전체 + 네이버 나눔손글씨 109종) + 아래 EXTRA
// 각 카드 '사이트에서 보기' = ../index.html?kf=패밀리&ks=주소 (본문 한글 폰트만 바꿔 미리보기)
const fs = require('fs');
const path = require('path');

const CAT = { Serif: '명조', 'Sans Serif': '고딕', Handwriting: '손글씨', Display: '디스플레이' };
const EXTRA = [
  { name: '마루부리', family: 'MaruBuri', cat: '명조', src: 'css:https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css', note: '네이버' },
  { name: '리디바탕', family: 'RIDIBatang', cat: '명조', src: 'https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff', note: '리디' },
  { name: '나눔스퀘어 네오', family: 'NanumSquareNeo', cat: '고딕', src: 'css:https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css', note: '네이버' },
  { name: 'Pretendard', family: 'Pretendard', cat: '고딕', src: 'css:https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css', note: '' },
  { name: '마포 꽃섬', family: 'MapoFlowerIsland', cat: '손글씨', src: 'https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff', note: '마포구' }
];

module.exports = function ({ OUT }) {
  const K = JSON.parse(fs.readFileSync(path.join(__dirname, 'kfonts.json'), 'utf8'));
  const list = [];
  K.google.forEach((g) => {
    const w = g.w.filter((x) => ['300', '400', '500', '700'].includes(x));
    const ws = (w.length ? w : g.w.slice(0, 1)).join(';');
    list.push({ name: g.family, family: g.family, cat: CAT[g.cat] || g.cat, note: 'Google',
      src: 'css:https://fonts.googleapis.com/css2?family=' + g.family.replace(/ /g, '+') + (g.w.length > 1 ? ':wght@' + ws : '') + '&display=swap' });
  });
  EXTRA.forEach((e) => list.push(e));
  K.naver.forEach(([rep, file]) => {
    const base = file.replace(/\.woff2?$/, '');
    list.push({ name: '나눔손글씨 ' + base.replace(/_/g, ' '), family: 'NHW_' + base.replace(/[^A-Za-z0-9]/g, ''), cat: '손글씨', note: '네이버 클로바',
      src: `https://fastly.jsdelivr.net/gh/projectnoonnu/naverfont_${rep}@1.0/${file}`, heavy: true });
  });
  // 현재 사이트 폰트(함렛)를 맨 앞에
  list.sort((a, b) => (b.family === 'Hahmlet') - (a.family === 'Hahmlet'));
  const site = (f) => '../index.html?nointro=1&kf=' + encodeURIComponent(f.family) + '&ks=' + encodeURIComponent(f.src) + '#invitation';
  const cats = ['전체', '손글씨', '명조', '고딕', '디스플레이'];
  const dir = path.join(OUT, '시안');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '한글폰트.html'), `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>한글 폰트 시안</title>
<link rel="icon" href="../assets/favicon/favicon.ico" sizes="any" />
<style>
  :root { --acc: #EC4A26; }
  body { margin: 0; background: #F2F1EE; color: #111; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; }
  header { position: sticky; top: 0; z-index: 5; padding: 22px 20px 14px; background: rgba(242,241,238,.94); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(17,17,17,.12); }
  h1 { margin: 0 0 6px; font-size: 13px; font-weight: 600; letter-spacing: .22em; }
  header p { margin: 0 0 12px; font-size: 12.5px; color: rgba(17,17,17,.6); line-height: 1.6; }
  .f { display: flex; flex-wrap: wrap; gap: 6px; }
  .f button { padding: 7px 13px; border: 1px solid #111; border-radius: 999px; background: none; font: inherit; font-size: 12.5px; cursor: pointer; }
  .f button.on { background: #111; color: #fff; }
  .f input { flex: 1; min-width: 180px; padding: 7px 12px; border: 1px solid rgba(17,17,17,.3); border-radius: 999px; background: #fff; font: inherit; font-size: 12.5px; }
  main { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px; padding: 18px 20px 60px; }
  article { background: #FBFAF7; padding: 18px 18px 14px; box-shadow: 0 6px 18px rgba(0,0,0,.06); display: flex; flex-direction: column; }
  article[hidden] { display: none; }
  .meta { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 14px; font-size: 11.5px; color: rgba(17,17,17,.55); }
  .meta b { color: #111; font-size: 12.5px; font-weight: 600; }
  .meta .c { color: var(--acc); white-space: nowrap; }
  .s { flex: 1; opacity: .25; transition: opacity .4s; }
  .s.ok { opacity: 1; }
  .s .dear { font-size: 22px; margin: 0 0 10px; }
  .s .body { font-size: 16px; line-height: 1.75; margin: 0 0 14px; }
  .s .names { display: flex; justify-content: space-between; align-items: flex-end; font-size: 30px; line-height: 1.1; border-top: 1px solid rgba(17,17,17,.12); padding-top: 12px; }
  .s .names small { display: block; font-size: 12px; color: var(--acc); margin-bottom: 4px; }
  .s .names div:last-child { text-align: right; }
  .s .big { font-size: 34px; margin: 14px 0 0; color: var(--acc); }
  .act { display: flex; justify-content: space-between; margin-top: 14px; font-size: 12px; }
  .act a { color: #111; }
  .act span { color: rgba(17,17,17,.45); }
</style></head>
<body>
<header>
  <h1>한글 폰트 시안 · ${list.length}종</h1>
  <p>구글 폰트의 한글 지원 폰트 전체 + 네이버 나눔손글씨(클로바) 109종 + 마루부리 · 리디바탕 등. 화면에 보이는 카드만 폰트를 불러옵니다.<br>
  카드의 <b>사이트에서 보기</b>를 누르면 청첩장 본문 한글만 그 폰트로 바꿔 보여 줍니다. 나눔손글씨는 파일이 커서(약 3MB) 실제 적용 시 글자만 잘라 쓰는 최적화가 필요합니다.</p>
  <div class="f">${cats.map((c, i) => `<button type="button" data-c="${c}"${i ? '' : ' class="on"'}>${c}</button>`).join('')}<input type="search" placeholder="폰트 이름 검색" /></div>
</header>
<main>${list.map((f, i) => `
  <article data-c="${f.cat}" data-n="${f.name.toLowerCase()}">
    <div class="meta"><b>${f.name}</b><span class="c">${f.cat}${f.note ? ' · ' + f.note : ''}</span></div>
    <div class="s" data-fam="${f.family}" data-src="${f.src.replace(/"/g, '&quot;')}" style="font-family: '${f.family}', serif">
      <p class="dear">Dear our beloved,</p>
      <p class="body">서로 다른 길을 걸어온 두 사람이<br>이제 같은 곳을 바라보며<br>함께 걷기로 약속합니다.</p>
      <div class="names"><div><small>신랑</small>현준</div><div><small>신부</small>하윤지</div></div>
      <p class="big">2027년 10월 16일, 엘뷔하우스</p>
    </div>
    <div class="act"><span>${String(i + 1).padStart(3, '0')}</span><a href="${site(f)}" target="_blank">사이트에서 보기 →</a></div>
  </article>`).join('')}
</main>
<script>
  var loaded = {};
  function load(el) {
    var fam = el.dataset.fam, src = el.dataset.src;
    if (loaded[fam]) { loaded[fam].then(function () { el.classList.add('ok'); }); return; }
    var p;
    if (/^css:/.test(src)) {
      p = new Promise(function (res) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = src.slice(4); l.onload = l.onerror = res; document.head.appendChild(l); })
        .then(function () { return document.fonts.load('16px "' + fam + '"', '가나다'); });
    } else {
      var ff = new FontFace(fam, 'url(' + src + ')'); p = ff.load().then(function (f) { document.fonts.add(f); });
    }
    loaded[fam] = p.catch(function () {});
    loaded[fam].then(function () { el.classList.add('ok'); });
  }
  var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); load(e.target); } }); }, { rootMargin: '300px 0px' });
  document.querySelectorAll('.s').forEach(function (el) { io.observe(el); });
  var cur = '전체', q = '';
  function apply() { document.querySelectorAll('article').forEach(function (a) { a.hidden = !((cur === '전체' || a.dataset.c === cur) && (!q || a.dataset.n.indexOf(q) > -1)); }); }
  document.querySelectorAll('.f button').forEach(function (b) { b.onclick = function () { document.querySelectorAll('.f button').forEach(function (x) { x.classList.toggle('on', x === b); }); cur = b.dataset.c; apply(); }; });
  document.querySelector('.f input').oninput = function (e) { q = e.target.value.trim().toLowerCase(); apply(); };
</script>
</body></html>`);
  return list.length;
};
