/* ============================================================
   모바일 청첩장 설정 파일 — 이 파일만 수정하면 됩니다.
   ============================================================ */
window.WEDDING = {

  /* ── 신랑 · 신부 ─────────────────────────────── */
  groom: {
    name: '현준',          // 한글 성명 (성 현 · 이름 준)
    given: '준',           // 이름만 (D-day 문구 등)
    en: 'JUN',             // 영문 이름 (워드마크·로고 이니셜). 성까지 쓰려면 'HYEON JUN'
    parents: '',           // 예: '김○○ · 이○○'  (비워두면 숨김)
    relation: '아들'
  },
  bride: {
    name: '하윤지',
    given: '윤지',
    en: 'YUNJI',
    parents: '',
    relation: '딸'
  },

  /* ── 예식 일시 (24시간제) ─────────────────────── */
  date: { year: 2027, month: 10, day: 16, hour: 12, minute: 0 },

  /* ── 예식 장소 ───────────────────────────────── */
  venue: {
    name: '엘뷔하우스',
    address: '서울 중구 다산로46길 17 청계천 두산위브더제니스 B1'
  },

  /* ── 교통 안내 (title·body 둘 다 채운 항목만 표시, 비우면 섹션 숨김) ── */
  transport: [
    { title: 'Subway',  body: '2·6호선 신당역 11-1, 11번 출구\n지하 1층에서 건물로 바로 연결됩니다.\n(2호선 이용 시 6호선 신당역 11번 출구 방면)' },
    { title: 'Bus',     body: '신당역 1번 출구 정류장 하차 후 도보 6분' },
    { title: 'Parking', body: '건물 지하 3층 전용 주차장 이용' },
    { title: 'Tel',     body: '엘뷔하우스 02-2232-6000' }
  ],

  /* ── 연락처 & 계좌 ───────────────────────────── */
  contacts: [
    { role: 'Groom · 신랑측', name: '현준',   phone: '010-9958-4246', bank: '농협', account: '352-1086-3259-03', holder: '현준' },
    { role: 'Bride · 신부측', name: '하윤지', phone: '010-9563-4963', bank: '신한', account: '110-383-291928',   holder: '하윤지' }
    // 혼주 추가 예: { role: 'Groom\'s Father', name: '○○○', phone: '010-...', bank: '', account: '' }
  ],

  /* ── 사진 ─────────────────────────────────────
     - dir 폴더 안의 파일명만 적으면 됩니다. (예: 'hero.jpg')
     - 외부 스토리지 URL(https://...)을 그대로 넣어도 됩니다.
     - 파일이 없거나 비어 있으면 캔버스 견본이 대신 표시됩니다.
     - 초점 위치 조정: { src: 'hero.jpg', pos: '50% 30%' }   */
  photos: {
    dir: 'images/',
    sampleDir: 'assets/sample/',   // images/ 에 없는 사진은 흑백 견본(AI 생성)으로 표시. 끄려면 ''
    hero:   'hero.jpg',          // 첫 화면 전체 (세로 9:16 권장)
    couple: 'couple.jpg',        // 워드마크 아래 (4:5)
    detail: 'detail.jpg',        // 원형 배지 옆 (3:4, 소품·반지·잔 등 디테일 컷)
    closing: ['closing-01.jpg', 'closing-02.jpg'],   // 마지막 빌보드 좌/우 (2:3)
    gallery: [
      'gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg', 'gallery-04.jpg',
      'gallery-05.jpg', 'gallery-06.jpg', 'gallery-07.jpg', 'gallery-08.jpg'
    ],
    galleryWide: [0, 7]          // 가로로 넓게(2칸) 보여줄 갤러리 순번 (0부터)
  },
  /* 사진 필터 (루트의 필터시안.html 에서 비교)
     흑백: 'mono' | 'trix' | 'hp5' | 'platinum' | 'selenium' | 'split' | 'sepia'
     컬러: 'muted' | 'warm-film' | 'none'(원본)                          */
  photoFilter: 'muted',

  /* ── 네이버 지도 (NCP Maps) ────────────────────
     1) https://console.ncloud.com → AI·NAVER API(Maps) → Application 등록
     2) Dynamic Map (+ 좌표 자동보정 원하면 Geocoding) 체크
     3) Web 서비스 URL에 실제 도메인 / http://localhost:포트 등록
     4) 발급된 Client ID 를 아래에 입력                          */
  map: {
    naverClientId: '1dty3fappe',           // ← 여기에 Client ID
    useGeocoder: true,           // 주소로 좌표 자동 보정 (Geocoding 미사용 시 false)
    lat: 37.5696, lng: 127.0196, // 기본 좌표 (근사값 — 지도에서 확인 후 수정 권장)
    zoom: 16,
    mono: true,                  // 지도 흑백 처리
    searchQuery: '엘뷔하우스',    // 네이버지도/카카오맵 버튼 검색어
    geocodeQuery: '서울 중구 다산로46길 17'  // 좌표 보정용 주소 (층·동 제외)
  },

  /* ── 로고 ─────────────────────────────────────
     · AI 생성 이미지: 'assets/logo/ginkgo.png' | 'assets/logo/cosmos.png' | 'assets/logo/arch.png' | 'assets/logo/doves.png'
                       'assets/logo/laurel.png' | 'assets/logo/rings.png' | 'assets/logo/sprig.png' | 'assets/logo/stream.png'
     · 코드 SVG     : 'ginkgo' | 'cosmos' | 'stream' | 'sunrise' | 'rings' | 'knot' | 'datemark' | 'wordmark'
     (루트의 로고시안.html 에서 비교)                     */
  logo: 'assets/logo/rings.png',

  /* ── 문구 ───────────────────────────────────── */
  badgeTop: 'FROM THIS DAY FORWARD',     // 원형 배지 위쪽 호 (고정)
  badgeBottom: 'WE WALK AS ONE',         // 원형 배지 아래쪽 호 (고정)
  // 배지 가운데에 차례로 팝업되는 웨딩 심볼 (첫 번째 = 현재 로고)
  symbols: ['assets/logo/rings.png', 'assets/logo/doves.png', 'assets/logo/laurel.png', 'assets/logo/cosmos.png', 'assets/logo/arch.png'],
  symbolMs: 2400,
  closingTag: 'One day.<br>One promise.<br>Forever.',
  introMs: 2600
};
