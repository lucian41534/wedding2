// Gallery · Location · Contact 레이아웃 시안 비교 페이지 → Gallery시안.html · Location시안.html · Contact시안.html
// (B안 화면을 ?gal=N / ?loc=N / ?con=N 으로 미리보기 · 적용은 config.js 의 gal / loc / con 값)
const fs = require('fs');
const path = require('path');

const SETS = {
  Gallery: { key: 'gal', anchor: 'gallerySec', note: '갤러리는 4칸 고정. 각 칸 사진은 계속 차례로 바뀝니다.', L: [
    ['1', 'Grid', '2×2 같은 크기 네 칸.'],
    ['2', 'Hero + Three', '위에 큰 한 장(4:5), 아래 정사각 세 장.'],
    ['3', 'Film Strip', '검정 필름 위 3:2 네 컷, 양옆 필름 구멍, 옆으로 세운 컷 번호.'],
    ['4', 'Polaroids', '기울어진 폴라로이드 네 장이 겹쳐 흩어지고, 버밀리언·종이 테이프.'],
    ['5', 'Magazine', '크기가 다른 비대칭 네 칸 + 큰 번호 01~04. 잡지 화보 느낌. (확정 · 적용)'],
    ['6', 'Contact Sheet', '검정 밀착 인화지에 필름 표기, 한 컷엔 붉은 그리스펜슬 동그라미·체크.'],
    ['7', 'Swipe Cards', '둥근 카드 네 장을 옆으로 넘겨 보는 가로 스와이프.'],
    ['8', 'Stacking', '스크롤하면 흰 테두리 사진이 한 장씩 위로 쌓임.'],
    ['9', 'Vermilion Zigzag', '버밀리언 바탕에 사진이 좌우 지그재그로 겹쳐 내려감.']
  ]},
  Location: { key: 'loc', anchor: 'location', label: 'Location', note: '대형 제목 대신 작은 머리(07 — LOCATION · 오시는 길). 지도는 등록 도메인에서만 표시, 로컬은 견본 그림.', L: [
    ['1', 'Index', '교통 안내를 왼쪽 항목 · 오른쪽 내용의 표처럼.'],
    ['2', 'Overlap Card', '지도를 먼저 크게, 그 위로 장소 카드가 겹쳐 올라옴.'],
    ['3', 'Document', '부록 문서처럼 A. 장소 · B. 지도 · C. 교통 으로 나눔.'],
    ['4', 'Night', '검정 섹션 + 어두운 지도와 빛나는 핀, 교통은 2×2 작은 칸.'],
    ['5', 'Accordion', '둥근 지도 + 둥근 버튼, 교통수단을 눌러 펼침.'],
    ['6', 'Segmented', 'Subway · Bus · Parking · Tel 작은 세그먼트 탭으로 전환.'],
    ['7', 'Colophon', '가운데 작은 장소명, 얇은 액자 지도, 교통은 각주처럼 1 2 3 4.'],
    ['8', 'Icon List', '교통수단 아이콘 목록 + 검정 알약 버튼.']
  ]},
  Contact: { key: 'con', anchor: 'contact', label: 'Contact', note: '부록처럼 작은 머리(08 — CONTACT) · 작은 글씨. 전화·문자·계좌 복사는 모두 동작합니다.', L: [
    ['1', 'Directory', '한 줄 연락처(이름 · 번호 · 전화/문자) + 아래 계좌 모아보기.'],
    ['2', 'Two Cards', '신랑 · 신부 작은 카드 두 장 나란히 + 계좌 모아보기.'],
    ['3', 'Segmented', '신랑측 / 신부측 탭, 계좌가 바로 보임.'],
    ['4', 'Leaders', '밝은 종이 바탕, 이름 ······ 번호 점선 리더 + 계좌 목록.'],
    ['5', 'Folded', '신랑측 · 신부측 두 줄만, 누르면 번호와 계좌가 펼쳐짐.'],
    ['6', 'Receipt', '작은 영수증: THANK YOU, 타자기 글씨, 톱니 끝.'],
    ['7', 'Footer', '사이트 푸터처럼 두 단의 작은 글씨, 전화 · 문자 · 복사는 밑줄 링크.'],
    ['8', 'Gift Chips', '연락처는 한 줄씩, 계좌는 봉투 종이 질감의 작은 버밀리언 칩 두 개.']
  ]},
  Button: { key: 'fab', anchor: 'gallerySec', note: '스크롤하면 오른쪽 아래에 떠 있는 "오시는 길" 버튼. Location 섹션이 보이면 숨습니다.', L: [
    ['1', 'Label', '버밀리언 사각 라벨 LOCATION · 오시는 길.'],
    ['2', 'Pill', '핀 아이콘 + 오시는 길, 둥근 알약 모양.'],
    ['3', 'Spinning Ring', '버밀리언 원 버튼 둘레를 LOCATION · 오시는 길 글자가 회전.'],
    ['4', 'Stamp', '손그림 스탬프가 흔들리고 아래 작은 띠 라벨.'],
    ['5', 'Edge Tab', '화면 오른쪽 끝에 붙은 세로 탭.'],
    ['6', 'Bottom Bar', '아래 전체 바: 핀 · 엘뷔하우스 · 오시는 길 →'],
    ['7', 'Ticket', '양옆 홈이 파인 쿠폰 모양 + 절취선, 문구 오시는 길. (확정 · 적용)'],
    ['8', 'Brutal', '흰 사각 + 검정 테두리·그림자 + 버밀리언 화살표 칸.']
  ]},
  Badge: { key: 'badge', anchor: 'handinhand', label: 'Hand in hand', note: '위는 Our day 사진(밤), 아래는 The day(검정) 섹션.', L: [
    ['1', 'Paper', '이전 종이색.'],
    ['2', 'Blush', '버밀리언을 옅게 푼 밝은 살구빛 + 적갈색 글씨.'],
    ['3', 'Vermilion', '버밀리언 바탕 + 흰 글씨 · 흰 심볼. (확정 · 적용)']
  ]}
};

module.exports = function ({ OUT }) {
  Object.entries(SETS).forEach(([name, S]) => {
    const sec = S.label || name;
    const src = (n) => encodeURI('타이포B_버밀리언/index.html') + `?${S.key}=${n}&nointro=1#${S.anchor}`;
    fs.writeFileSync(path.join(OUT, name + '시안.html'), `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${name} 레이아웃 시안</title>
<link rel="icon" href="assets/favicon/favicon.ico" sizes="any" />
<style>
  body { margin: 0; background: #111; color: #F2F1EE; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; }
  header { padding: 40px 32px 0; } header h1 { margin: 0 0 8px; font-weight: 400; letter-spacing: .2em; font-size: 14px; }
  header p { margin: 0; color: rgba(242,241,238,.6); font-size: 13px; line-height: 1.7; }
  nav { margin-top: 14px; display: flex; gap: 14px; } nav a { font-size: 12px; letter-spacing: .12em; }
  main { display: flex; gap: 32px; overflow-x: auto; padding: 32px; }
  article { flex: none; width: 375px; }
  iframe { width: 375px; height: 780px; border: 0; border-radius: 28px; background: #F2F1EE; box-shadow: 0 0 0 8px #222; }
  h2 { font-size: 14px; font-weight: 600; margin: 22px 0 6px; } p { font-size: 13px; color: rgba(242,241,238,.6); margin: 0 0 10px; line-height: 1.6; }
  a { color: #F2F1EE; font-size: 12px; }
</style></head>
<body><header><h1>${name.toUpperCase()} LAYOUT DRAFTS · ${S.L.length}</h1><p>B안(버밀리언 포스터) 기준, ${sec} 부분만 바꾼 시안입니다. 각 화면은 ${sec} 위치에서 시작합니다.<br>${S.note}<br>적용은 config.js 의 ${S.key} 값 한 줄.</p>
<nav>${Object.keys(SETS).map((k) => `<a href="${encodeURI(k + '시안.html')}">${k}</a>`).join('')}<a href="${encodeURI('Invitation시안.html')}">Invitation</a></nav></header>
<main>${S.L.map(([n, t, mood]) => `
  <article>
    <iframe src="${src(n)}" title="${t}" loading="lazy"></iframe>
    <h2>${n} · ${t}</h2>
    <p>${mood}</p>
    <a href="${src(n)}" target="_blank">새 창으로 열기 →</a>
  </article>`).join('')}
</main></body></html>`);
  });
};
