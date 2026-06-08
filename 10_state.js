// ====================================================
// 10_state.js — 런타임 상태 변수 및 스테이지 로드
// ====================================================

// ────────────────────────────────────────────────────
// 전역 상태 변수
// ────────────────────────────────────────────────────
let state = 'intro_title';

// 게임 오브젝트
let chars = [], caterpillar, predator;
let particles = [], vegetation = [], fireflies = [], butterflies = [];
let suctionParticles = [];

// 진행 상태
let stage = 0;
let stageStartFrame = 0;
const PREDATOR_DELAY_FRAMES = 300;
let unlockedStages = 1;

// 보스 퀴즈
let currentBossQuizData = [];
let bossHealth = 100;
let currentBossQuizIdx = 0;
let bossGlitchIntensity = 0;
let bossSelectedOption = 0;
let bossCaveHoverO = false;
let bossCaveHoverX = false;
let bossLives = 4;
let bossLivesLostAnim = 0;

// UI
let hiddenInput;
let stageButtons = [];
let cameraY = 0;

// 페이드
let fadeAlpha = 255;
let fadeMode = 'in';
let nextStateAfterFade = '';

// 타이머
let introTimer = 0;
let endingTimer = 0;
let endingLetters = [];
let clearTimer = 0;

// 일시정지
let isPaused = false;
let pauseSelectedOption = 0;
let pauseBtnHover = -1;
const PAUSE_OPTIONS = ['게임 계속하기', '스테이지 처음부터', '서가 선택으로'];

// ────────────────────────────────────────────────────
// 스테이지 로드
// ────────────────────────────────────────────────────
function loadStage() {
  let proverbs = shuffleArray(PROVERBS_DATA[stage % PROVERBS_DATA.length]);
  chars = []; let cy = 180, gc = 0;
  for (let s = 0; s < proverbs.length; s++) {
    let raw = proverbs[s], filtered = raw.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    for (let i = 0; i < filtered.length; i++) {
      let wx = windowWidth / 2 + sin(gc * 0.4) * (windowWidth * 0.22);
      chars.push({ ch: filtered[i], x: wx, y: cy, eaten: false, col: COLS[gc % COLS.length], subStageIndex: s, rawSentence: raw, isGrowPoint: (gc > 0 && gc % 4 === 0) });
      cy += 60; gc++;
    }
    cy += 60;
  }
  caterpillar = new Caterpillar(chars[0].x - 120, chars[0].y);
  predator = new Predator(STAGE_SPEEDS[stage] || 1.04);
  initFirefliesForStage();
  bossHealth = 100; currentBossQuizIdx = 0; bossGlitchIntensity = 0; bossSelectedOption = 0;
  bossLives = 4; bossLivesLostAnim = 0;
  currentBossQuizData = buildBossQuiz(stage % TOTAL_STAGES);
  stageStartFrame = frameCount;
  if (hiddenInput) { hiddenInput.value(''); hiddenInput.elt.focus(); }
}
