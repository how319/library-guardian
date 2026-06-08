// ====================================================
// 03_sfx.js — 효과음 시스템
// ====================================================

// 타자 효과음: 귀여운 계이름 랜덤 (C4~E5 범위)
const TYPING_NOTES = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76];

function sfxTyping() {
  if (!_bgmCtx) return;
  try {
    let ctx = _bgmCtx;
    let midi = TYPING_NOTES[Math.floor(Math.random() * TYPING_NOTES.length)];
    let freq = _midi(midi);
    let t = ctx.currentTime;
    let osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
    osc.connect(g); g.connect(_bgmMaster);
    osc.start(t); osc.stop(t + 0.15);
    // 살짝 하모닉 추가
    let osc2 = ctx.createOscillator(), g2 = ctx.createGain();
    osc2.type = 'triangle'; osc2.frequency.value = freq * 2;
    g2.gain.setValueAtTime(0.0001, t); g2.gain.linearRampToValueAtTime(0.07, t + 0.008);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    osc2.connect(g2); g2.connect(_bgmMaster); osc2.start(t); osc2.stop(t + 0.1);
  } catch(e) {}
}

// OX 선택 클릭 효과음 (중립적 클릭)
function sfxOXClick() {
  if (!_bgmCtx) return;
  try {
    let ctx = _bgmCtx, t = ctx.currentTime;
    let osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'square'; osc.frequency.value = 440;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.12, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    osc.connect(g); g.connect(_bgmMaster); osc.start(t); osc.stop(t + 0.1);
  } catch(e) {}
}

// 정답 효과음 (밝고 경쾌한 두 음)
function sfxCorrect() {
  if (!_bgmCtx) return;
  try {
    let ctx = _bgmCtx, t = ctx.currentTime;
    [[72, 0], [76, 0.1]].forEach(([midi, delay]) => {
      let osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = _midi(midi);
      g.gain.setValueAtTime(0.0001, t + delay); g.gain.linearRampToValueAtTime(0.22, t + delay + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.22);
      osc.connect(g); g.connect(_bgmMaster); osc.start(t + delay); osc.stop(t + delay + 0.25);
    });
  } catch(e) {}
}

// 오답 효과음 (낮고 탁한 단음)
function sfxWrong() {
  if (!_bgmCtx) return;
  try {
    let ctx = _bgmCtx, t = ctx.currentTime;
    let osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.value = 180;
    osc.frequency.linearRampToValueAtTime(120, t + 0.25);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.20, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    osc.connect(g); g.connect(_bgmMaster); osc.start(t); osc.stop(t + 0.30);
  } catch(e) {}
}

// 게임오버 효과음 (하강하는 세 음)
function sfxGameover() {
  if (!_bgmCtx) return;
  try {
    let ctx = _bgmCtx, t = ctx.currentTime;
    [[60, 0], [57, 0.22], [53, 0.44]].forEach(([midi, delay]) => {
      let osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = 'sawtooth'; osc.frequency.value = _midi(midi);
      g.gain.setValueAtTime(0.0001, t + delay); g.gain.linearRampToValueAtTime(0.20, t + delay + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.30);
      osc.connect(g); g.connect(_bgmMaster); osc.start(t + delay); osc.stop(t + delay + 0.35);
    });
  } catch(e) {}
}
