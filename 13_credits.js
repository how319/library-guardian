// 13_credits.js — 엔딩 크레딧 (3페이지: 출처 / 소감 / AI 활용)
// state = 'credits_1' / 'credits_2' / 'credits_3'

// ─────────────────────────────────────────────
// 공통 헬퍼
// ─────────────────────────────────────────────
function _creditsBg() {
  drawLibraryBackgroundSimple();
  fill(0, 0, 0, 175); noStroke(); rect(0, 0, width, height);
  // 테두리 (프롤로그 가이드 스타일)
  stroke(0, 255, 200, 110); strokeWeight(2); noFill();
  rect(50, 50, width - 100, height - 100, 12);
}

function _creditsHint() {
  fill(200, 210, 230, abs(sin(frameCount * 0.04)) * 150 + 75);
  noStroke(); textSize(12); textAlign(CENTER, CENTER);
  text('[마우스 클릭 또는 아무 키나 누르면 다음으로]', width / 2, height - 38);
}

function _creditsLabel(label) {
  fill(0, 255, 200); noStroke(); textSize(11); textAlign(LEFT, TOP);
  text(label, 76, 62);
}

function _sectionLine(y) {
  stroke(0, 255, 200, 55); strokeWeight(1); line(76, y, width - 76, y);
}

// ─────────────────────────────────────────────
// 크레딧 1 — 정보 및 문장 출처
// ─────────────────────────────────────────────
function drawCredits1() {
  _creditsBg();
  textAlign(CENTER, CENTER); fill(255); noStroke();
  textSize(min(22, width / 38)); text('— 정보 및 문장 출처 —', width / 2, 92);
  _sectionLine(116);

  let lx = 82, ry = 132, ls = min(12.5, width / 72), lh = 22;

  // 서가1 속담
  fill(0, 255, 200); noStroke(); textSize(11); textAlign(LEFT, TOP);
  text('■ 서가 1구역  속담 서가', lx, ry); ry += 18;
  fill(220); textSize(ls);
  let s1 = [
    '"가는 말이 고와야 오는 말이 곱다." — 한국 전통 속담',
    '"세 살 버릇 여든까지 간다." — 한국 전통 속담',
    '"낮말은 새가 듣고 밤말은 쥐가 듣는다." — 한국 전통 속담',
    '"콩 심은 데 콩 나고 팥 심은 데 팥 난다." — 한국 전통 속담',
  ];
  for (let t of s1) { text(t, lx + 10, ry); ry += lh; }
  ry += 6; _sectionLine(ry); ry += 8;

  // 서가2 철학
  fill(0, 255, 200); textSize(11); text('■ 서가 2구역  형이상학의 서가', lx, ry); ry += 18;
  fill(220); textSize(ls);
  let s2 = [
    '"나는 생각한다, 고로 존재한다." — 르네 데카르트, 『방법서설』',
    '"신은 죽었다. 그리고 우리가 그를 죽였다." — 프리드리히 니체, 『즐거운 학문』',
    '"말할 수 없는 것에 대해서는 침묵해야 한다." — 루트비히 비트겐슈타인, 『논리철학 논고』',
    '"실존은 본질에 앞선다. 인간은 먼저 존재한다." — 장 폴 사르트르, 『실존주의는 휴머니즘이다』',
  ];
  for (let t of s2) { text(t, lx + 10, ry); ry += lh; }
  ry += 6; _sectionLine(ry); ry += 8;

  // 서가3 고전
  fill(0, 255, 200); textSize(11); text('■ 서가 3구역  세계 고전 서가', lx, ry); ry += 18;
  fill(220); textSize(ls);
  let s3 = [
    '"국경의 긴 터널을 빠져나오자, 눈의 고장이었다." — 가와바타 야스나리, 『설국』',
    '"오늘 엄마가 죽었다. 아니 어쩌면 어제." — 알베르 카뮈, 『이방인』',
    '"행복한 가정은 모두 모습이 비슷하고..." — 레프 톨스토이, 『안나 카레니나』',
    '"사월의 쌀쌀한 날이었다. 시계가 열세 번을 울리고 있었다." — 조지 오웰, 『1984』',
  ];
  for (let t of s3) { text(t, lx + 10, ry); ry += lh; }
  ry += 8; _sectionLine(ry); ry += 8;

  // 서가4·5 동물·지혜 — 공간 절약해서 두 줄씩
  fill(0, 255, 200); textSize(11); text('■ 서가 4구역  동물 습성 서가', lx, ry); ry += 18;
  fill(220); textSize(ls);
  let s4 = [
    '"문어는 색맹임에도 영점삼 초 만에 완벽한 위장을 해낸다." — Current Biology (2015), 문어 피부 광수용체 연구',
    '"코끼리는 죽은 동료의 뼈를 다시 마주치면 애도한다." — Joyce Poole, 코끼리 사회적 행동 연구',
    '"까마귀는 자신을 괴롭힌 사람 얼굴을 기억하고 동료에게 가르친다." — John Marzluff (UW), 얼굴 인식 실험',
    '"갯가재는 인간보다 다섯 배 많은 색을 감지하지만 분석하지 않는다." — Justin Marshall, 갯가재 복안 연구',
  ];
  for (let t of s4) { text(t, lx + 10, ry); ry += lh; }
  ry += 6; _sectionLine(ry); ry += 8;

  fill(0, 255, 200); textSize(11); text('■ 서가 5구역  지혜의 서가', lx, ry); ry += 18;
  fill(220); textSize(ls);
  let s5 = [
    '"겨울이 오면 봄도 멀지 않으리." — P.B. 셸리, 「서풍에게 바치는 노래」',
    '"자신을 믿는 순간, 어떻게 살아갈지 알게 된다." — 요한 볼프강 폰 괴테',
    '"말이 입히는 상처는 칼이 입히는 상처보다 깊다." — 서양 격언',
    '"인생은 사건이 아니라 그 사건에 대처하는 태도로 결정된다." — 에픽테토스 영향 격언',
  ];
  for (let t of s5) { text(t, lx + 10, ry); ry += lh; }

  _creditsHint();
}

// ─────────────────────────────────────────────
// 크레딧 2 — 제작진 소감
// ─────────────────────────────────────────────
function drawCredits2() {
  _creditsBg();
  textAlign(CENTER, CENTER); fill(255); noStroke();
  textSize(min(22, width / 38)); text('— 제작진 소감 —', width / 2, 92);
  _sectionLine(116);

  let lx = 82, rx = width - 82, ry = 134, ls = min(13, width / 68), lh = 20;
  let maxW = rx - lx;

  // 이윤서
  fill(0, 255, 200); noStroke(); textSize(13); textAlign(LEFT, TOP);
  text('이윤서', lx, ry); ry += 22;
  fill(210); textSize(ls); textAlign(LEFT, TOP);
  let t1 = '사실 대학에 와서 이렇게 팀을 짜고, 기획부터 개발까지 하나의 진짜 게임을 직접 만들어 본 게 처음이고, 코딩도 쉽지 않고, 아이디어를 조율할 때도 서툴러서 막막한 적이 정말 많았습니다. 그래도 팀원들이랑 밤새 같이 고민하고, 부족한 부분들을 서로 채워주면서 결국 이렇게 완성해 내니 정말 뿌듯한 것 같습니다. 이 팀 프로젝트에서 많은 것을 배울 수 있었습니다. 뜻깊은 경험이었다고 생각합니다.';
  _wrapText(t1, lx, ry, maxW, lh);
  ry += _lineCount(t1, maxW) * lh + 18;
  _sectionLine(ry); ry += 12;

  // 양서영
  fill(0, 255, 200); textSize(13); textAlign(LEFT, TOP);
  text('양서영', lx, ry); ry += 22;
  fill(210); textSize(ls);
  let t2 = '대학교에 와서 처음 팀 프로젝트를 맡아보았고, 전에 학창시절에는 써보지 못했던 프로그램 언어들을 팀원들과 함께 사용하면서 더 많이 발전할 수 있었습니다. 또한 팀원들의 아이디어와 저의 아이디어를 합쳐서 나온 결과물을 보니 뿌듯할 때가 많았습니다. 나중에 유사한 프로젝트 기회가 더 있다면, 이 팀 프로젝트에서 배웠던 내용들을 모두 활용하며 유연하게 발전할 수 있을 것 같습니다.';
  _wrapText(t2, lx, ry, maxW, lh);
  ry += _lineCount(t2, maxW) * lh + 18;
  _sectionLine(ry); ry += 12;

  // 신현지
  fill(0, 255, 200); textSize(13); textAlign(LEFT, TOP);
  text('신현지', lx, ry); ry += 22;
  fill(210); textSize(ls);
  let t3 = '프로젝트 초반에는 기능 구현이라는 기술적인 문제에 매몰되어 있었지만, 프로그램이 전달하고자 하는 메시지나 존재 이유를 고민하며 기획 방향을 전환할 수 있었습니다. 콘텐츠가 사용자에게 어떤 서사적 경험을 제공해야 할지 사용자 입장에서 고민해 보면서도, 주체적으로 프로그램을 만들어 나갈 수 있는 좋은 기회였습니다. 부족함이 많았지만, 팀원들과 함께였기에 결과물 산출이 가능했다고 생각합니다. 팀원들에게 고맙다는 말 전하고 싶습니다.';
  _wrapText(t3, lx, ry, maxW, lh);

  _creditsHint();
}

// ─────────────────────────────────────────────
// 크레딧 3 — AI 활용 고지 + Thank You
// ─────────────────────────────────────────────
function drawCredits3() {
  _creditsBg();
  textAlign(CENTER, CENTER); fill(255); noStroke();
  textSize(min(22, width / 38)); text('— AI 활용 고지 —', width / 2, 92);
  _sectionLine(116);

  let lx = 82, rx = width - 82, ry = 136, ls = min(13, width / 68), lh = 21;
  let maxW = rx - lx;

  fill(160, 170, 190); textSize(ls); textAlign(LEFT, TOP);
  let intro = '이 게임의 일부 기술적 요소는 AI 어시스턴트(Claude, Anthropic)의 도움을 받아 구현되었습니다.';
  _wrapText(intro, lx, ry, maxW, lh); ry += _lineCount(intro, maxW) * lh + 14;
  _sectionLine(ry); ry += 12;

  let items = [
    {
      title: '◆ Web Audio API 기반 BGM / 효과음 시스템',
      body: 'MIDI 음정 변환, 오실레이터 체인 설계, 킥·스네어·하이햇 타악 합성, 멀티 트랙 스케줄러(chase_1~3, boss, clear, ending) 등 Web Audio API 저수준 구현 전반을 AI의 도움을 받아 작성하였습니다. (02_bgm.js / 03_sfx.js)'
    },
    {
      title: '◆ 흡입 파티클 · 반딧불 이펙트',
      body: '보스 퀴즈 화면의 블랙홀 흡입 파티클 궤도 계산, 활자 주변 반딧불 리사주 운동 등 수치 기반 이펙트 로직 설계에 AI의 도움을 받았습니다. (09_effects.js)'
    },
    {
      title: '◆ 프롤로그·엔딩 씬 전환 구조',
      body: '페이드 인/아웃 상태 머신, 씬별 타이머 및 카메라 줌 보간 등 다단계 씬 전환 구조 설계에 AI의 도움을 받았습니다. (06_scenes.js / 11_input.js)'
    },
    {
      title: '◆ 일시정지 오버레이 UI',
      body: '키보드 포커스 관리, ESC 토글, 방향키 선택·실행 흐름을 포함한 일시정지 시스템 구현에 AI의 도움을 받았습니다. (07_gameplay.js / 11_input.js)'
    },
  ];

  for (let item of items) {
    if (ry > height - 120) break; // 화면 넘침 방지
    fill(0, 255, 200); textSize(12); textAlign(LEFT, TOP); text(item.title, lx, ry); ry += 20;
    fill(200); textSize(ls); _wrapText(item.body, lx + 8, ry, maxW - 8, lh - 2);
    ry += _lineCount(item.body, maxW - 8) * (lh - 2) + 14;
  }

  _sectionLine(ry); ry += 16;

  // Thank You
  fill(255, 255, 255); noStroke(); textSize(min(18, width / 40)); textAlign(CENTER, CENTER);
  text('Thank You for Playing.', width / 2, ry + 12);
  fill(160, 170, 190); textSize(12);
  text('제작  이윤서 · 양서영 · 신현지', width / 2, ry + 38);

  // 마지막 페이지는 클릭 시 select로
  fill(200, 210, 230, abs(sin(frameCount * 0.04)) * 150 + 75);
  noStroke(); textSize(12); textAlign(CENTER, CENTER);
  text('[마우스 클릭 또는 아무 키나 누르면 메인 화면으로]', width / 2, height - 38);
}

// ─────────────────────────────────────────────
// 텍스트 줄바꿈 헬퍼 (p5.js용)
// ─────────────────────────────────────────────
function _wrapText(str, x, y, maxW, lineH) {
  let words = str.split(' '), line = '', cy = y;
  for (let i = 0; i < words.length; i++) {
    let test = line + (line ? ' ' : '') + words[i];
    if (textWidth(test) > maxW && line) {
      text(line, x, cy); line = words[i]; cy += lineH;
    } else { line = test; }
  }
  if (line) text(line, x, cy);
}

function _lineCount(str, maxW) {
  let words = str.split(' '), line = '', count = 1;
  for (let i = 0; i < words.length; i++) {
    let test = line + (line ? ' ' : '') + words[i];
    if (textWidth(test) > maxW && line) { count++; line = words[i]; }
    else { line = test; }
  }
  return count;
}
