// Invitation 레이아웃 시안 비교 페이지 → Invitation시안.html (B안 화면을 ?invite=N 으로 미리보기)
const fs = require('fs');
const path = require('path');

module.exports = function ({ OUT }) {
  const L = [
    ['1', 'Poster Stack', '화면 끝까지 차는 INVITATION + 본문 + 좌우 대칭 이름. 지금 구성.'],
    ['2', 'Vertical Title', '왼쪽에 세로로 선 대형 INVITATION, 오른쪽에 날짜·본문·이름. 포스터 측면 타이포.'],
    ['3', 'Info Grid', '스위스 포스터식 칸 나눔: 날짜 칸 + 손그림 스탬프 칸, 아래 본문과 이름. 레퍼런스의 정보 블록 느낌.'],
    ['4', 'Center Poem', '큰 날짜 아래 본문을 크게 가운데 정렬, 이름은 현준 / & / 하윤지 세로로 크게.'],
    ['5', 'Letter Card', '살짝 기울어진 종이 카드에 손그림 스탬프, Dear our beloved, 마지막에 서명.']
  ];
  const src = (n) => encodeURI('타이포B_버밀리언/index.html') + `?invite=${n}&nointro=1#invitation`;
  fs.writeFileSync(path.join(OUT, 'Invitation시안.html'), `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Invitation 레이아웃 시안</title>
<link rel="icon" href="assets/favicon/favicon.ico" sizes="any" />
<style>
  body { margin: 0; background: #111; color: #F2F1EE; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; }
  header { padding: 40px 32px 0; } header h1 { margin: 0 0 8px; font-weight: 400; letter-spacing: .2em; font-size: 14px; }
  header p { margin: 0; color: rgba(242,241,238,.6); font-size: 13px; line-height: 1.7; }
  main { display: flex; gap: 32px; overflow-x: auto; padding: 32px; }
  article { flex: none; width: 375px; }
  iframe { width: 375px; height: 780px; border: 0; border-radius: 28px; background: #F2F1EE; box-shadow: 0 0 0 8px #222; }
  h2 { font-size: 14px; font-weight: 600; margin: 22px 0 6px; } p { font-size: 13px; color: rgba(242,241,238,.6); margin: 0 0 10px; line-height: 1.6; }
  a { color: #F2F1EE; font-size: 12px; }
</style></head>
<body><header><h1>INVITATION LAYOUT DRAFTS · 5</h1><p>B안(버밀리언 포스터) 기준, 첫 화면 바로 아래 Invitation 섹션만 바꾼 시안입니다. 각 화면은 Invitation 위치에서 시작합니다.<br>적용은 config.js 의 invite 값 한 줄.</p></header>
<main>${L.map(([n, name, mood]) => `
  <article>
    <iframe src="${src(n)}" title="${name}"></iframe>
    <h2>${n} · ${name}</h2>
    <p>${mood}</p>
    <a href="${src(n)}" target="_blank">새 창으로 열기 →</a>
  </article>`).join('')}
</main></body></html>`);
};
