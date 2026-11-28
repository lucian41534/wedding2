// Invitation 레이아웃 시안 비교 페이지 → Invitation시안.html (B안 화면을 ?invite=N 으로 미리보기)
const fs = require('fs');
const path = require('path');

module.exports = function ({ OUT }) {
  const L = [
    ['1', 'Poster Stack', '화면 끝까지 차는 INVITATION + 본문 + 좌우 대칭 이름. 지금 구성.'],
    ['2', 'Vertical Title', '왼쪽에 세로로 선 대형 INVITATION, 오른쪽에 날짜·본문·이름. 포스터 측면 타이포.'],
    ['3', 'Info Grid', '스위스 포스터식 칸 나눔: 날짜 칸 + 손그림 스탬프 칸, 아래 본문과 이름. 레퍼런스의 정보 블록 느낌.'],
    ['4', 'Center Poem', '큰 날짜 아래 본문을 크게 가운데 정렬, 이름은 현준 / & / 하윤지 세로로 크게.'],
    ['5', 'Letter Card', '살짝 기울어진 종이 카드에 손그림 스탬프, Dear our beloved, 마지막에 서명. (현재 적용)'],
    ['6', 'Envelope', 'NEW · 버밀리언 바탕에 손글씨 you are invited! 와 카드 아래 열린 봉투.'],
    ['7', 'Ticket', 'NEW · 손그림 ADMIT TWO 아래 절취선 있는 버밀리언 입장권. 날짜를 크게.'],
    ['8', 'Mega Type', "NEW · WE'RE GETTING MARRIED 가 화면을 꽉 채우고 뒤로 낙엽이 흩날림."],
    ['9', 'Two Houses', 'NEW · 신랑·신부 이름 아래 두 집에서 이어진 손그림 길이 하트에서 만남, 그 아래 날짜.'],
    ['10', 'Peek-a-boo', 'NEW · 버밀리언 카드 위 모서리에 두 사람이 빼꼼. 흰 글씨.'],
    ['11', 'Collage', 'NEW · 테이프 붙인 폴라로이드 사진 + 카드 + 꽃다발 + 스탬프 콜라주.'],
    ['12', 'Newspaper', 'NEW · THE JUN & YUNJI TIMES 신문 1면. 헤드라인, 사진, 2단 본문.'],
    ['13', 'Ribbon', 'NEW · 교차하는 SAVE THE DATE 띠가 흐르고, 아래 한 줄 위를 걷는 두 사람.'],
    ['14', 'Flip Letter', 'NEW · 스크롤하면 버밀리언 봉투 뒷면(스탬프 · To. our beloved)이 뒤집히며 편지(5안 카드)가 나타남. 위에서 천천히 스크롤해 보세요.'],
    ['15', 'Envelope Pull', 'NEW · 화려한 모노톤 배경(흐르는 대형 타이포 · 회전 광선 · 흰 낙서) 위 버밀리언 봉투. 스크롤하면 덮개가 열리고 편지가 꺼내져 화면 가운데로.']
  ];
  const src = (n) => encodeURI('타이포B_버밀리언/index.html') + `?invite=${n}&nointro=1` + (n === '14' || n === '15' ? '#top' : '#invitation');
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
<body><header><h1>INVITATION LAYOUT DRAFTS · 15</h1><p>B안(버밀리언 포스터) 기준, 첫 화면 바로 아래 Invitation 섹션만 바꾼 시안입니다. 각 화면은 Invitation 위치에서 시작합니다.<br>적용은 config.js 의 invite 값 한 줄.</p></header>
<main>${L.map(([n, name, mood]) => `
  <article>
    <iframe src="${src(n)}" title="${name}"></iframe>
    <h2>${n} · ${name}</h2>
    <p>${mood}</p>
    <a href="${src(n)}" target="_blank">새 창으로 열기 →</a>
  </article>`).join('')}
</main></body></html>`);
};
