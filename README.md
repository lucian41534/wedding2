# 모바일 청첩장

2027.10.16 (토) 12:00 · 엘뷔하우스 — 블랙 & 화이트 모노크롬 모바일 청첩장.
폰트 조합별 시안 5종이 각각 독립 패키지(폴더)로 들어 있습니다.

## 구조

```
├─ index.html                → 시안비교.html 로 이동
├─ 시안비교.html              시안을 휴대폰 프레임으로 나란히 비교
├─ 로고시안.html              로고 8종 비교 (config.js → logo 로 선택)
├─ 혼주배치시안.html          혼주 표기 방식 3종 비교
├─ 시안01_BodoniModa+NotoSerifKR/
│   ├─ index.html            청첩장 본문
│   ├─ config.js             이름·날짜·장소·연락처·계좌·사진 파일명·지도 키·로고
│   ├─ logos.js              로고 SVG 모음
│   └─ images/               사진 넣는 곳 (git 에는 올라가지 않음)
├─ 시안02 ~ 시안06/           (동일 구조, 폰트만 다름 · 06 이 확정 조합)
├─ tools/                    시안 생성기 (template.html + config.js + gen.js)
└─ drafts/                   이전 초안
```

| 시안 | 영문 | 한글 |
|---|---|---|
| 01 | Bodoni Moda (+ Jost) | Noto Serif KR |
| 02 | Cormorant Garamond | 나눔명조 |
| 03 | Italiana (+ Tenor Sans) | 고운바탕 |
| 04 | Marcellus | Pretendard |
| 05 | Gilda Display (+ Jost) | 함렛 |
| **06 (확정)** | **Marcellus (+ Jost)** | **함렛** |

모두 무료 폰트(Google Fonts / Pretendard, SIL OFL)이며 CDN 으로 불러옵니다.

## 화면 대응

- 모바일(~599px): 한 줄 세로 스크롤
- 태블릿(600~1023px): 600px 중앙 정렬
- PC(1024px~): 왼쪽 첫 화면 사진 고정 + 오른쪽 본문 스크롤

## 수정 방법

- **내용**: 시안 폴더의 `config.js` 만 수정합니다.
- **사진**: `images/` 에 넣고 `config.js` → `photos` 에 파일명(또는 `https://` 주소)을 적습니다.
  파일이 없으면 캔버스 견본이 표시됩니다. 필요한 파일·비율은 `images/README.txt` 참고.
- **네이버 지도**: NCP 콘솔에서 Maps Application 등록 → Web 서비스 URL 에 배포 도메인 등록 →
  `config.js` → `map.naverClientId` 에 Client ID 입력.

## 디자인 일괄 수정 (선택)

5개 시안의 공통 레이아웃을 한 번에 바꾸려면 `tools/template.html` 을 고친 뒤:

```bash
node tools/gen.js
```

> ⚠️ 시안 폴더의 `index.html` · `config.js` 를 **덮어씁니다.** 폴더별로 직접 수정한 내용이 있다면 먼저 백업하세요.

## 로컬 미리보기

```bash
python -m http.server 5500
```

→ http://localhost:5500

## 개인정보 주의

`config.js` 에 연락처·계좌번호가 들어 있습니다. 공개 저장소로 올리면 누구나 볼 수 있으니,
저장소는 **Private** 으로 두는 것을 권장합니다. (사진은 `.gitignore` 로 제외되어 있습니다.)
