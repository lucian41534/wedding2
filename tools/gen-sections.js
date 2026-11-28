// Location · Contact 시안 비교 → 시안/Location.html · 시안/Contact.html
// 각 화면 = ../index.html?loc=N (또는 con=N) — 사이트 본체 하나로 미리보기, 복사본 없음
const fs = require('fs');
const path = require('path');

const SETS = {
  Location: { key: 'loc', anchor: 'location', L: [
    ['1', 'Index', '교통 안내를 왼쪽 항목 · 오른쪽 내용의 표처럼.'],
    ['2', 'Overlap Card', '지도를 먼저 크게, 그 위로 장소 카드가 겹쳐 올라옴.'],
    ['3', 'Document', 'A. 장소 · B. 지도 · C. 교통 으로 나눈 부록 문서.'],
    ['4', 'Night', '검정 섹션, 어두운 지도와 빛나는 핀, 교통 2×2.'],
    ['5', 'Accordion', '둥근 지도, 교통수단을 눌러 펼침.'],
    ['6', 'Segmented', 'Subway · Bus · Parking · Tel 작은 탭.'],
    ['7', 'Colophon', '가운데 작은 장소명, 얇은 액자 지도, 교통은 각주처럼.'],
    ['8', 'Icon List', '교통수단 아이콘 목록 + 검정 알약 버튼.'],
    ['9', 'Thumbnail', 'NEW · 정사각 지도 썸네일과 주소를 한 줄에 나란히, 교통은 두 단.'],
    ['10', 'Mini Ticket', 'NEW · 날짜 · 시간 · 층(B1)을 점선으로 나눈 작은 티켓 줄.'],
    ['11', 'Glass Card', 'NEW · 세로로 긴 지도 오른쪽 아래에 흐린 유리 정보 카드.'],
    ['12', 'Vermilion', 'NEW · 버밀리언 섹션에 흰 글씨, 흰 테두리 지도.'],
    ['13', 'Envelope Address', 'NEW · 봉투 주소란처럼 To. 와 밑줄, 우표 자리.'],
    ['14', 'Swipe Steps', 'NEW · 교통 안내를 01~04 카드로 옆으로 넘김.'],
    ['15', 'Side Label', 'NEW · 왼쪽에 세로로 선 작은 LOCATION 라벨, 오른쪽 본문.'],
    ['16', 'Bento', 'NEW · 둥근 칸들로 나눈 벤토 그리드 (장소 · 지도 · 버튼 · 교통).']
  ]},
  Contact: { key: 'con', anchor: 'contact', L: [
    ['1', 'Directory', '한 줄 연락처 + 아래 계좌 모아보기.'],
    ['2', 'Two Cards', '신랑 · 신부 작은 카드 두 장 + 계좌 모아보기.'],
    ['3', 'Segmented', '신랑측 / 신부측 탭, 계좌가 바로 보임.'],
    ['4', 'Leaders', '밝은 종이 바탕, 이름 ···· 번호 점선.'],
    ['5', 'Folded', '두 줄만, 누르면 번호와 계좌가 펼쳐짐.'],
    ['6', 'Receipt', '작은 영수증.'],
    ['7', 'Footer', '두 단의 작은 글씨, 밑줄 링크.'],
    ['8', 'Gift Chips', '계좌는 봉투 종이 질감의 버밀리언 칩.'],
    ['9', 'Bento', 'NEW · 둥근 칸 두 개에 연락처와 계좌를 함께.'],
    ['10', 'Sentence', 'NEW · "신랑 현준에게 전화 · 문자" 문장처럼 읽히는 밑줄 링크.'],
    ['11', 'Vermilion', 'NEW · 버밀리언 섹션에 흰 글씨.'],
    ['12', 'Initial', 'NEW · 이름 끝 글자를 넣은 버밀리언 원 + 번호.'],
    ['13', 'Table', 'NEW · 구분 · 이름 · 연락 칸으로 나눈 표.'],
    ['14', 'Bottom Sheet', 'NEW · 신랑측 / 신부측 버튼 두 개, 누르면 아래에서 연락처·계좌 창이 올라옴.'],
    ['15', 'Postcards', 'NEW · 살짝 기운 작은 엽서 두 장.'],
    ['16', 'Library Card', 'NEW · 줄 쳐진 도서 대출카드에 타자기 글씨.']
  ]}
};

module.exports = function ({ OUT }) {
  const dir = path.join(OUT, '시안');
  fs.mkdirSync(dir, { recursive: true });
  Object.entries(SETS).forEach(([name, S]) => {
    const src = (n) => `../index.html?${S.key}=${n}&nointro=1#${S.anchor}`;
    fs.writeFileSync(path.join(dir, name + '.html'), `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${name} 시안</title>
<link rel="icon" href="../assets/favicon/favicon.ico" sizes="any" />
<style>
  body { margin: 0; background: #111; color: #F2F1EE; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; }
  header { padding: 32px 32px 0; } header h1 { margin: 0 0 8px; font-weight: 400; letter-spacing: .2em; font-size: 14px; }
  header p { margin: 0; color: rgba(242,241,238,.6); font-size: 13px; line-height: 1.7; }
  nav { margin-top: 12px; display: flex; gap: 14px; } nav a { color: #F2F1EE; font-size: 12px; }
  main { display: flex; gap: 28px; overflow-x: auto; padding: 28px 32px; }
  article { flex: none; width: 375px; }
  iframe { width: 375px; height: 760px; border: 0; border-radius: 26px; background: #F2F1EE; box-shadow: 0 0 0 8px #222; }
  h2 { font-size: 14px; font-weight: 600; margin: 20px 0 6px; } p { font-size: 13px; color: rgba(242,241,238,.6); margin: 0 0 10px; line-height: 1.6; }
  a { color: #F2F1EE; font-size: 12px; }
</style></head>
<body><header><h1>${name.toUpperCase()} · ${S.L.length}</h1><p>작은 머리 · 작은 글씨의 부록 스타일. 9~16 이 새 시안입니다. 화면은 ${name} 위치에서 시작합니다.</p>
<nav><a href="Location.html">Location</a><a href="Contact.html">Contact</a><a href="${encodeURI('한글폰트.html')}">한글 폰트</a></nav></header>
<main>${S.L.slice().reverse().map(([n, t, mood]) => `
  <article>
    <iframe src="${src(n)}" title="${t}" loading="lazy"></iframe>
    <h2>${n} · ${t}</h2>
    <p>${mood}</p>
    <a href="${src(n)}" target="_blank">새 창으로 열기 →</a>
  </article>`).join('')}
</main></body></html>`);
  });
};
