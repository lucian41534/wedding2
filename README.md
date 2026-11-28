# 모바일 청첩장

2027.10.16 (토) 12:00 · 엘뷔하우스 — yoonjijun.life

## 구조

```
├─ index.html / config.js / logos.js   사이트 = 확정본 (tools/gen.js 가 생성 · 로컬에서 index.html 바로 열기)
├─ assets/                             로고 · 사진(photos/site) · 종이 질감(texture) · 파비콘
├─ images/                             (예비) 사진 넣는 곳
└─ tools/                              template.html + config.js → gen.js
```

확정 폰트: 영문 Anton (+ Archivo), 국문 함렛 · 타이포 B(버밀리언 포스터).

## 화면 대응

- 모바일(~599px): 한 줄 세로 스크롤
- 태블릿(600~1023px): 600px 중앙 정렬
- PC(1024px~): 왼쪽 첫 화면 사진 고정 + 오른쪽 본문 스크롤

## 수정 방법

- **내용**: `tools/config.js` 를 고친 뒤 `node tools/gen.js` (루트 index.html · config.js 를 덮어씀).
- **디자인**: `tools/template.html` 을 고친 뒤 `node tools/gen.js`.
- **사진**: 원본은 `assets/photos/web/` → `python tools/make-web-photos.py` 로 `assets/photos/site/` 생성,
  `config.js` → `photos` 에 파일명을 적습니다.
- **네이버 지도**: NCP 콘솔에서 Maps Application 등록 → Web 서비스 URL 에 배포 도메인 등록 →
  `config.js` → `map.naverClientId` 에 Client ID 입력.

## 로컬 미리보기

```bash
python -m http.server 5500
```

→ http://localhost:5500

## 개인정보 주의

`config.js` 에 연락처·계좌번호가 들어 있습니다. 공개 저장소에서는 누구나 볼 수 있습니다.
