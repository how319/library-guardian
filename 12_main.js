// ====================================================
// 12_main.js — p5.js 진입점 (setup, draw)
// ====================================================

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace');

  hiddenInput = createInput('');
  hiddenInput.position(-9999, -9999); hiddenInput.size(1, 1);
  hiddenInput.attribute('autocomplete', 'off');
  hiddenInput.attribute('autocorrect', 'off');
  hiddenInput.attribute('autocapitalize', 'off');
  hiddenInput.attribute('spellcheck', 'false');
  hiddenInput.input(handleHiddenInput);
  hiddenInput.elt.focus();

  document.addEventListener('click', () => {
    if (state === 'playing' || state === 'boss_quiz') hiddenInput.elt.focus();
    bgmInit(); bgmUpdateForState(state, stage);
  });

  generateLibraryBackground();
  loadStage();
}

function draw() {
  resetMatrix(); push();
  if      (state === 'intro_title')      drawIntroTitle();
  else if (state === 'prologue_cam')     drawPrologueCam();
  else if (state === 'prologue_shake')   drawPrologueShake();
  else if (state === 'prologue_villain') drawPrologueVillain();
  else if (state === 'prologue_angry')   drawPrologueAngry();
  else if (state === 'prologue_versus')  drawPrologueVersus();
  else if (state === 'prologue_guide')   drawPrologueGuide();
  else if (state === 'select')           drawSelectMenu();
  else if (state === 'playing')          drawGame();
  else if (state === 'boss_quiz')        drawBossQuizPage();
  else if (state === 'stage_clear')      drawStageClear();
  else if (state === 'gameover')         drawGameover();
  else if (state === 'ending_1')         drawEnding1();
  else if (state === 'ending_2')         drawEnding2();
  else if (state === 'ending_3')         drawEnding3();
  else if (state === 'ending_4')         drawEnding4();
  else if (state === 'ending_5')         drawEnding5();
  pop(); resetMatrix(); handleFade();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateLibraryBackground();
}
