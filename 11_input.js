// 11_input.js — 입력 처리 (키보드, 마우스, 페이드 전환)
// 페이드 전환
function startFadeTo(nextState) { fadeMode = 'out'; nextStateAfterFade = nextState; }

function handleFade() {
  if (fadeMode === 'out') {
    fadeAlpha += 15;
    if (fadeAlpha >= 255) {
      fadeAlpha = 255; state = nextStateAfterFade; fadeMode = 'in'; introTimer = 0; endingTimer = 0;
      if (state === 'ending_1') endingLetters = [];
      if (state === 'playing') { stageStartFrame = frameCount; hiddenInput.elt.focus(); }
      if (state === 'stage_clear') clearTimer = 0;
      bgmUpdateForState(state, stage);
    }
  } else if (fadeMode === 'in') {
    fadeAlpha -= 15; if (fadeAlpha <= 0) fadeAlpha = 0;
  }
  if (fadeAlpha > 0) { fill(0, fadeAlpha); noStroke(); rect(0, 0, width, height); }
}

// 히든 인풋 (타자 입력)
function handleHiddenInput() {
  let val = this.value(); if (val.length === 0) return;
  let raw = val.charAt(0); this.value('');
  if (['gameover','ending_1','ending_2','ending_3','ending_4','ending_5'].includes(state)) return;
  if (state === 'prologue_cam')     { startFadeTo('prologue_shake');   return; }
  if (state === 'prologue_shake')   { startFadeTo('prologue_villain'); return; }
  if (state === 'prologue_villain') { startFadeTo('prologue_angry');   return; }
  if (state === 'prologue_angry')   { startFadeTo('prologue_versus');  return; }
  if (state === 'prologue_versus')  { startFadeTo('prologue_guide');   return; }
  if (state === 'prologue_guide')   { startFadeTo('select');           return; }
  if (state === 'stage_clear')      { goToSelectAfterClear();          return; }
  if (state === 'playing') {
    if (isPaused) return;
    let idx = caterpillar.targetIdx; if (idx >= chars.length) return;
    let target = chars[idx].ch, mapped = ENG_TO_KOR[raw] || raw;
    if (mapped === target || raw === target) {
      sfxTyping();
      caterpillar.eatCharAndGrow(chars[idx]);
      if (predator.active) predator.spd = max(STAGE_SPEEDS[stage] * 0.85, predator.spd - 0.04);
    }
    return;
  }
  if (state === 'boss_quiz') {
    let upper = raw.toUpperCase();
    let engToOX = {'ㅇ':'O','ㅌ':'X','O':'O','X':'X','o':'O','x':'X'};
    let ans = engToOX[raw] || engToOX[upper];
    if (ans) submitBossAnswer(ans);
    return;
  }
}

// 보스 정답 처리

function submitBossAnswer(ans) {
  sfxOXClick();
  if (currentBossQuizIdx >= currentBossQuizData.length) return;
  let q = currentBossQuizData[currentBossQuizIdx];
  if (ans === q.ans) {
    sfxCorrect();
    bossHealth -= Math.ceil(100 / currentBossQuizData.length); bossGlitchIntensity = 20; currentBossQuizIdx++;
    if (bossHealth <= 0 || currentBossQuizIdx >= currentBossQuizData.length) {
      if (stage === TOTAL_STAGES - 1) { setTimeout(() => { state = 'ending_1'; endingTimer = 0; endingLetters = []; }, 400); }
      else { setTimeout(() => { startFadeTo('stage_clear'); }, 400); }
    }
  } else {
    sfxWrong();
    bossLives--; bossLivesLostAnim = 30; bossGlitchIntensity = 50;
    if (bossLives <= 0) { state = 'gameover'; bgmUpdateForState('gameover', stage); sfxGameover(); }
  }
}

// 클리어 후 선택 화면으로
function goToSelectAfterClear() {
  if (stage + 1 === unlockedStages && unlockedStages < TOTAL_STAGES) unlockedStages++;
  startFadeTo('select');
}

// 일시정지 옵션 실행
function executePauseOption(idx) {
  isPaused = false; pauseSelectedOption = 0;
  if (idx === 0) hiddenInput.elt.focus();
  else if (idx === 1) { particles = []; vegetation = []; fireflies = []; suctionParticles = []; loadStage(); startFadeTo('playing'); }
  else if (idx === 2) startFadeTo('select');
}


// 마우스 이벤트
function mousePressed() {
  if (state === 'playing' && isPaused) {
    let pw = min(420, width * 0.8), py = height / 2 - 160, px = width / 2 - pw / 2;
    let optH = 52, optPad = 12, optStartY = py + 68;
    for (let i = 0; i < PAUSE_OPTIONS.length; i++) {
      let ox = px + 20, oy = optStartY + i * (optH + optPad), ow = pw - 40;
      if (mouseX > ox && mouseX < ox + ow && mouseY > oy && mouseY < oy + optH) { executePauseOption(i); return; }
    }
    return;
  }
  if (state === 'playing' && !isPaused) {
    let bx = width - 72, by = 12, bw = 60, bh = 28;
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh) { isPaused = true; return; }
  }
  if (state === 'intro_title') {
    let btnX = width / 2 - 110, btnY = height / 2 + 50, btnW = 220, btnH = 55;
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) startFadeTo('prologue_cam'); return;
  }
  if (state === 'prologue_cam')     { startFadeTo('prologue_shake');   return; }
  if (state === 'prologue_shake')   { startFadeTo('prologue_villain'); return; }
  if (state === 'prologue_villain') { startFadeTo('prologue_angry');   return; }
  if (state === 'prologue_angry')   { startFadeTo('prologue_versus');  return; }
  if (state === 'prologue_versus')  { startFadeTo('prologue_guide');   return; }
  if (state === 'prologue_guide')   { startFadeTo('select');           return; }
  if (state === 'stage_clear')      { goToSelectAfterClear();          return; }
  if (state === 'select') {
    for (let btn of stageButtons) {
      if (btn.unlocked && mouseX > btn.x && mouseX < btn.x + btn.w && mouseY > btn.y && mouseY < btn.y + btn.h) {
        stage = btn.id; cameraY = 0; particles = []; vegetation = []; fireflies = []; suctionParticles = []; butterflies = [];
        loadStage(); isPaused = false; startFadeTo('playing'); break;
      }
    }
    return;
  }
  if (state === 'boss_quiz') {
    if (bossCaveHoverO) { submitBossAnswer('O'); return; }
    if (bossCaveHoverX) { submitBossAnswer('X'); return; }
  }
  if (state === 'ending_2') { startFadeTo('ending_3'); return; }
  if (state === 'ending_4') { startFadeTo('ending_5'); return; }
  if (state === 'ending_5') {
    let btnW = 260, btnH = 55, btnGap = 50;
    let btn1X = width / 2 - btnW - btnGap / 2, btn2X = width / 2 + btnGap / 2, btnY = height * 0.62;
    if (mouseX > btn1X && mouseX < btn1X + btnW && mouseY > btnY && mouseY < btnY + btnH) { startFadeTo('select'); return; }
    if (mouseX > btn2X && mouseX < btn2X + btnW && mouseY > btnY && mouseY < btnY + btnH) { startFadeTo('intro_title'); return; }
  }
}

// 키보드 이벤트
function keyPressed() {
  if (keyCode === ESCAPE && state === 'playing') {
    isPaused = !isPaused; if (!isPaused) { pauseSelectedOption = 0; hiddenInput.elt.focus(); } return false;
  }
  if (state === 'playing' && isPaused) {
    if (keyCode === UP_ARROW)   { pauseSelectedOption = (pauseSelectedOption - 1 + PAUSE_OPTIONS.length) % PAUSE_OPTIONS.length; return false; }
    if (keyCode === DOWN_ARROW) { pauseSelectedOption = (pauseSelectedOption + 1) % PAUSE_OPTIONS.length; return false; }
    if (keyCode === ENTER)      { executePauseOption(pauseSelectedOption); return false; }
    if (key === 'r' || key === 'R' || key === 'ㄱ') { executePauseOption(1); return false; }
    if (key === 'q' || key === 'Q' || key === 'ㅂ') { executePauseOption(2); return false; }
    return false;
  }
  if (state === 'boss_quiz') {
    if (keyCode === LEFT_ARROW)  { bossSelectedOption = 0; return false; }
    if (keyCode === RIGHT_ARROW) { bossSelectedOption = 1; return false; }
    if (keyCode === ENTER)       { submitBossAnswer(bossSelectedOption === 0 ? 'O' : 'X'); return false; }
  }
  if (keyCode === 32 || key === ' ') {
    if (state === 'prologue_cam')     { startFadeTo('prologue_shake');   return false; }
    if (state === 'prologue_shake')   { startFadeTo('prologue_villain'); return false; }
    if (state === 'prologue_villain') { startFadeTo('prologue_angry');   return false; }
    if (state === 'prologue_angry')   { startFadeTo('prologue_versus');  return false; }
    if (state === 'prologue_versus')  { startFadeTo('prologue_guide');   return false; }
    if (state === 'prologue_guide')   { startFadeTo('select');           return false; }
    if (state === 'stage_clear')      { goToSelectAfterClear();          return false; }
    if (state === 'ending_2')         { startFadeTo('ending_3');         return false; }
    if (state === 'ending_4')         { startFadeTo('ending_5');         return false; }
  }
  if (state === 'gameover' && (key === 'r' || key === 'R' || key === 'ㄱ')) {
    state = 'select'; _bgmTrack = ''; bgmUpdateForState('select', stage); return false;
  }
  if (state === 'stage_clear') { goToSelectAfterClear(); return false; }
  return true;
}
