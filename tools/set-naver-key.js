// 사용법: node tools/set-naver-key.js <NCP Maps Client ID>
// tools/config.js 의 map.naverClientId 를 바꾸고 모든 시안을 다시 생성합니다.
const fs = require('fs');
const path = require('path');

const id = (process.argv[2] || '').trim();
if (!/^[A-Za-z0-9_-]+$/.test(id)) {
  console.error('Client ID 를 인자로 넣어주세요.  예) node tools/set-naver-key.js abcd1234');
  process.exit(1);
}
const file = path.join(__dirname, 'config.js');
const src = fs.readFileSync(file, 'utf8');
const out = src.replace(/naverClientId: '[^']*'/, "naverClientId: '" + id + "'");
if (out === src && !src.includes("naverClientId: '" + id + "'")) {
  console.error('config.js 에서 naverClientId 항목을 찾지 못했습니다.');
  process.exit(1);
}
fs.writeFileSync(file, out);
console.log('naverClientId 등록 완료 → 시안 재생성');
require('./gen.js');
