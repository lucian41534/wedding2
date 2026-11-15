/* ============================================================
   로고 시안 모음 — config.js 의 logo 값으로 선택 (이니셜 없음)
   'ginkgo' | 'cosmos' | 'stream' | 'sunrise' | 'rings' | 'knot' | 'datemark' | 'wordmark'
   텍스트는 --f-display 폰트, 선은 현재 글자색(currentColor)을 따릅니다.
   ============================================================ */
(function () {
  var S = 'fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"';
  function t(x, y, size, str, extra) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '"' + (extra ? ' ' + extra : '') + '>' + str + '</text>';
  }
  function path(d, extra) { return '<path ' + S + ' d="' + d + '"' + (extra ? ' ' + extra : '') + '/>'; }
  var MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  var LOGOS = {
    ginkgo: {
      name: 'Ginkgo', desc: '은행잎 한 장 · 서울의 가을, 10월의 상징',
      vb: '0 0 100 100',
      draw: function () {
        return path('M50,62 C40,52 22,43 12,31 Q20,14 44,12 L50,28 L56,12 Q80,14 88,31 C78,43 60,52 50,62 Z') +
               path('M50,62 L30,24 M50,62 L41,17 M50,62 L59,17 M50,62 L70,24', 'opacity=".45"') +
               path('M50,62 Q49,80 45,96');
      }
    },
    cosmos: {
      name: 'Cosmos', desc: '코스모스 한 송이 · 가을 들꽃의 담백함',
      vb: '0 0 100 100',
      draw: function () {
        var s = '';
        for (var a = 0; a < 360; a += 45) {
          s += '<ellipse ' + S + ' cx="50" cy="31" rx="7.5" ry="15" transform="rotate(' + a + ' 50 50)"/>';
        }
        return s + '<circle ' + S + ' cx="50" cy="50" r="5"/>';
      }
    },
    stream: {
      name: 'Stream', desc: '원 안의 세 물결 · 청계천 곁에서의 시작',
      vb: '0 0 100 100',
      draw: function () {
        return '<circle ' + S + ' cx="50" cy="50" r="44"/>' +
               path('M26,40 q6,-5 12,0 t12,0 t12,0 t12,0') +
               path('M18,52 q8,-6 16,0 t16,0 t16,0 t16,0') +
               path('M26,64 q6,-5 12,0 t12,0 t12,0 t12,0');
      }
    },
    sunrise: {
      name: 'Sunrise', desc: '수평선 위로 떠오르는 해 · 새로운 출발',
      vb: '0 0 100 90',
      draw: function () {
        var r = '';
        for (var a = 202.5; a < 360; a += 22.5) {
          var rad = a * Math.PI / 180, c = Math.cos(rad), s = Math.sin(rad);
          r += 'M' + (50 + 28 * c).toFixed(2) + ',' + (60 + 28 * s).toFixed(2) + ' L' + (50 + 38 * c).toFixed(2) + ',' + (60 + 38 * s).toFixed(2) + ' ';
        }
        return path('M28,60 A22,22 0 0 1 72,60') + path(r) +
               path('M6,60 H94') + path('M22,69 H78', 'opacity=".6"') + path('M36,77 H64', 'opacity=".35"');
      }
    },
    rings: {
      name: 'Rings', desc: '맞물린 두 개의 링 · 작은 반짝임',
      vb: '0 0 100 90',
      draw: function () {
        return '<circle ' + S + ' cx="38" cy="52" r="23"/><circle ' + S + ' cx="62" cy="52" r="23"/>' +
               path('M62,14 Q63,21 70,22 Q63,23 62,30 Q61,23 54,22 Q61,21 62,14 Z');
      }
    },
    knot: {
      name: 'Knot', desc: '한 줄로 이어진 매듭 · 끝없이 이어지는 약속',
      vb: '0 0 100 80',
      draw: function (o) {
        return path('M50,38 C38,20 14,20 14,38 C14,56 38,56 50,38 C62,20 86,20 86,38 C86,56 62,56 50,38 Z') +
               t(50, 74, 7, o.dot, 'class="lg-small"');
      }
    },
    datemark: {
      name: 'Datemark', desc: '날짜 자체를 마크로 · 16 OCT 2027',
      vb: '0 0 100 100',
      draw: function (o) {
        return path('M16,16 H34 M66,16 H84') + t(50, 19, 9, MON[o.month - 1], 'class="lg-small"') +
               t(50, 68, 48, String(o.day)) +
               t(50, 90, 9, String(o.year), 'class="lg-small"');
      }
    },
    wordmark: {
      name: 'Wordmark', desc: '‘Wedding Day’ 타이포 · 가운데 작은 마름모',
      vb: '0 0 160 66',
      draw: function (o) {
        return t(80, 28, 20, 'Wedding Day') +
               path('M30,42 H74 M86,42 H130') + path('M80,38 L84,42 L80,46 L76,42 Z') +
               t(80, 60, 6.5, o.dot, 'class="lg-small"');
      }
    }
  };

  function opts(W) {
    var D = W.date;
    var p = function (n) { return String(n).padStart(2, '0'); };
    return { year: D.year, month: D.month, day: D.day, dot: p(D.day) + ' . ' + p(D.month) + ' . ' + D.year };
  }

  /* 로고 SVG 문자열. attrs 로 width/height/x/y 등을 덧붙일 수 있음 */
  function render(key, W, attrs) {
    var L = LOGOS[key] || LOGOS.ginkgo;
    return '<svg class="lg lg-' + key + '" viewBox="' + L.vb + '" ' + (attrs || '') + ' aria-hidden="true">' + L.draw(opts(W)) + '</svg>';
  }

  window.WEDDING_LOGOS = { list: LOGOS, render: render };
})();
