/* ============================================================
   로고(모노그램) 시안 모음 — config.js 의 logo 값으로 선택
   'arch' | 'seal' | 'rule' | 'diamond' | 'frame' | 'stack' | 'crest' | 'oval'
   텍스트는 --f-display 폰트, 선은 현재 글자색(currentColor)을 따릅니다.
   ============================================================ */
(function () {
  var uid = 0;
  var S = 'fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"';
  function t(x, y, size, str, extra) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '"' + (extra ? ' ' + extra : '') + '>' + str + '</text>';
  }
  var ROMAN = [['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]];
  function roman(n) { var s = ''; ROMAN.forEach(function (r) { while (n >= r[1]) { s += r[0]; n -= r[1]; } }); return s; }

  var LOGOS = {
    arch: {
      name: 'Arch', desc: '웨딩 아치 프레임 안에 이니셜을 세로로',
      vb: '0 0 80 104',
      draw: function (o) {
        return '<path ' + S + ' d="M12,100 V42 A28,28 0 0 1 68,42 V100"/>' +
               '<path ' + S + ' d="M4,100 H76"/>' +
               t(40, 58, 24, o.a) + t(40, 72, 10, '&amp;', 'class="lg-amp"') + t(40, 93, 24, o.b);
      }
    },
    seal: {
      name: 'Seal', desc: '두 겹의 원 · 둘레에 이름과 날짜',
      vb: '0 0 120 120',
      draw: function (o) {
        var id = 'lgring' + (++uid);
        return '<defs><path id="' + id + '" d="M18,60 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"/></defs>' +
               '<circle ' + S + ' cx="60" cy="60" r="57"/><circle ' + S + ' cx="60" cy="60" r="35"/>' +
               '<text font-size="7.2" class="lg-ring"><textPath href="#' + id + '" textLength="262" lengthAdjust="spacing">' +
                 o.A + ' &amp; ' + o.B + ' · THE WEDDING DAY · ' + o.dot + ' · </textPath></text>' +
               t(47, 69, 24, o.a) + t(60, 66, 9, '&amp;', 'class="lg-amp"') + t(73, 69, 24, o.b);
      }
    },
    rule: {
      name: 'Rule', desc: '세로 헤어라인으로 나눈 이니셜 · 하단 날짜',
      vb: '0 0 140 64',
      draw: function (o) {
        return t(46, 40, 36, o.a) + t(94, 40, 36, o.b) +
               '<path ' + S + ' d="M70,8 V48"/>' +
               t(70, 61, 6.5, o.dot, 'class="lg-small"');
      }
    },
    diamond: {
      name: 'Diamond', desc: '마름모 안에 대각선으로 엇갈린 이니셜',
      vb: '0 0 90 90',
      draw: function (o) {
        return '<path ' + S + ' d="M45,2 L88,45 L45,88 L2,45 Z"/>' +
               t(36, 46, 26, o.a) + t(55, 66, 26, o.b) +
               '<path ' + S + ' d="M30,60 L60,30" opacity=".55"/>';
      }
    },
    frame: {
      name: 'Frame', desc: '모서리만 남긴 사각 프레임 · 에디토리얼',
      vb: '0 0 110 90',
      draw: function (o) {
        var c = 'M2,16 V2 H16 M94,2 H108 V16 M108,74 V88 H94 M16,88 H2 V74';
        return '<path ' + S + ' d="' + c + '"/>' +
               t(55, 50, 28, o.a + '<tspan font-size="12" dx="4" dy="-6" class="lg-amp">&amp;</tspan><tspan dx="4" dy="6">' + o.b + '</tspan>') +
               t(55, 70, 6.5, roman(o.year), 'class="lg-small"');
      }
    },
    stack: {
      name: 'Stack', desc: '두 이름을 쌓은 워드마크 · 가운데 앰퍼샌드',
      vb: '0 0 200 84',
      draw: function (o) {
        return t(100, 28, 22, o.A, 'class="lg-wide"') +
               '<path ' + S + ' d="M54,44 H90 M110,44 H146"/>' + t(100, 48, 11, '&amp;', 'class="lg-amp"') +
               t(100, 76, 22, o.B, 'class="lg-wide"');
      }
    },
    crest: {
      name: 'Crest', desc: '이니셜 아래 이중 라인과 로마 숫자 날짜',
      vb: '0 0 130 84',
      draw: function (o) {
        return t(65, 38, 30, o.a + ' <tspan font-size="14" class="lg-amp">&amp;</tspan> ' + o.b) +
               '<path ' + S + ' d="M22,50 H108 M34,54 H96"/>' +
               t(65, 72, 7, roman(o.day) + ' · ' + roman(o.month) + ' · ' + roman(o.year), 'class="lg-small"');
      }
    },
    oval: {
      name: 'Oval (기존)', desc: '타원 안 대각선 이니셜 · 처음 시안',
      vb: '0 0 60 86',
      draw: function (o) {
        return '<ellipse ' + S + ' cx="30" cy="43" rx="28.5" ry="41.5"/>' + t(22, 44, 30, o.a) + t(38, 68, 30, o.b);
      }
    }
  };

  function opts(W) {
    var D = W.date;
    var p = function (n) { return String(n).padStart(2, '0'); };
    return {
      a: (W.groom.en || ' ')[0], b: (W.bride.en || ' ')[0],
      A: W.groom.en, B: W.bride.en,
      year: D.year, month: D.month, day: D.day,
      dot: p(D.day) + '.' + p(D.month) + '.' + D.year
    };
  }

  /* 로고 SVG 문자열. attrs 로 width/height/x/y 등을 덧붙일 수 있음 */
  function render(key, W, attrs) {
    var L = LOGOS[key] || LOGOS.arch;
    return '<svg class="lg lg-' + key + '" viewBox="' + L.vb + '" ' + (attrs || '') + ' aria-hidden="true">' + L.draw(opts(W)) + '</svg>';
  }

  window.WEDDING_LOGOS = { list: LOGOS, render: render };
})();
