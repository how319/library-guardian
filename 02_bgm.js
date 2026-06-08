// ====================================================
// 02_bgm.js — BGM 시스템
// ====================================================

let _bgmCtx = null, _bgmMaster = null, _bgmTrack = '', _bgmTimer = null;
let _bgmPos = 0, _bgmLoopLen = 0, _bgmNotes = [], _bgmBeatBass = [], _bgmBeatPerc = [];
let _bgmBeat = 0.5, _bgmScheduleAhead = 0.12, _bgmNextTime = 0, _bgmNoteIdx = 0;
let _bgmLoopStart = 0, _bgmBeatsPerLoop = 16;

// ────────────────────────────────────────────────────
// 초기화 / 내부 헬퍼
// ────────────────────────────────────────────────────
function bgmInit() {
  if (_bgmCtx) { if (_bgmCtx.state === 'suspended') _bgmCtx.resume(); return; }
  _bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
  _bgmMaster = _bgmCtx.createGain(); _bgmMaster.gain.value = 0.32;
  _bgmMaster.connect(_bgmCtx.destination);
}

function _midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }

function _note(ctx, dest, type, freq, gval, t, dur) {
  try {
    let osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gval, t + 0.012);
    g.gain.setValueAtTime(gval, t + dur * 0.75); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(dest); osc.start(t); osc.stop(t + dur + 0.02);
  } catch(e) {}
}

function _kick(ctx, dest, t, gval) {
  try {
    let osc = ctx.createOscillator(), g = ctx.createGain();
    osc.frequency.setValueAtTime(150, t); osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    g.gain.setValueAtTime(gval, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    osc.connect(g); g.connect(dest); osc.start(t); osc.stop(t + 0.2);
  } catch(e) {}
}

function _snare(ctx, dest, t, gval) {
  try {
    let bufSize = Math.floor(ctx.sampleRate * 0.1), buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    let data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    let src = ctx.createBufferSource(), filt = ctx.createBiquadFilter(), g = ctx.createGain();
    filt.type = 'highpass'; filt.frequency.value = 1800; src.buffer = buf;
    g.gain.setValueAtTime(gval, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    src.connect(filt); filt.connect(g); g.connect(dest); src.start(t);
  } catch(e) {}
}

function _hat(ctx, dest, t, gval) {
  try {
    let bufSize = Math.floor(ctx.sampleRate * 0.04), buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    let data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    let src = ctx.createBufferSource(), filt = ctx.createBiquadFilter(), g = ctx.createGain();
    filt.type = 'highpass'; filt.frequency.value = 7000; src.buffer = buf;
    g.gain.setValueAtTime(gval, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    src.connect(filt); filt.connect(g); g.connect(dest); src.start(t);
  } catch(e) {}
}

function _bgmScheduleTick() {
  if (!_bgmCtx || !_bgmNotes.length) return;
  if (_bgmCtx.state === 'suspended') { _bgmCtx.resume(); return; }
  let ctx = _bgmCtx, dest = _bgmMaster, deadline = ctx.currentTime + _bgmScheduleAhead;
  while (_bgmNextTime < deadline) {
    let idx = _bgmNoteIdx % _bgmNotes.length, note = _bgmNotes[idx], t = _bgmNextTime;
    if (note.midi > 0) {
      _note(ctx, dest, note.type || 'square', _midi(note.midi), note.gain || 0.13, t, note.dur * _bgmBeat * 0.72);
      if (note.harm) _note(ctx, dest, 'sine', _midi(note.midi + note.harm), (note.gain || 0.13) * 0.45, t, note.dur * _bgmBeat * 0.65);
    }
    let beatInLoop = (_bgmNextTime - _bgmLoopStart) / _bgmBeat;
    beatInLoop = ((beatInLoop % _bgmBeatsPerLoop) + _bgmBeatsPerLoop) % _bgmBeatsPerLoop;
    let bassIdx = Math.round(beatInLoop) % _bgmBeatBass.length;
    if (_bgmBeatBass.length && Math.abs(beatInLoop - Math.round(beatInLoop)) < 0.05) {
      let bn = _bgmBeatBass[bassIdx]; if (bn > 0) _note(ctx, dest, 'sawtooth', _midi(bn), 0.14, t, _bgmBeat * 0.82);
    }
    for (let p of _bgmBeatPerc) {
      let pb = beatInLoop % p.every;
      if (Math.abs(pb - p.on) < 0.05 || Math.abs(pb - p.on - p.every) < 0.05) {
        if (p.kind === 'kick') _kick(ctx, dest, t, p.gain);
        else if (p.kind === 'snare') _snare(ctx, dest, t, p.gain);
        else if (p.kind === 'hat') _hat(ctx, dest, t, p.gain);
      }
    }
    _bgmNextTime += note.dur * _bgmBeat; _bgmNoteIdx++;
    if (idx === _bgmNotes.length - 1) _bgmLoopStart = _bgmNextTime;
  }
}

// ────────────────────────────────────────────────────
// 트랙 데이터 로드
// ────────────────────────────────────────────────────
function _bgmLoad(trackName) {
  _bgmNotes = []; _bgmBeatBass = []; _bgmBeatPerc = [];

  if (trackName === 'fantasy') {
    _bgmBeat = 60/72; _bgmBeatsPerLoop = 16;
    _bgmNotes = [
      {midi:72,dur:1.5,type:'sine',gain:0.18,harm:4},{midi:71,dur:0.5,type:'sine',gain:0.16},
      {midi:69,dur:1,type:'sine',gain:0.17,harm:4},{midi:67,dur:1,type:'sine',gain:0.17},
      {midi:65,dur:1.5,type:'sine',gain:0.16,harm:3},{midi:64,dur:0.5,type:'sine',gain:0.15},
      {midi:62,dur:1,type:'sine',gain:0.16},{midi:60,dur:1,type:'sine',gain:0.17,harm:4},
      {midi:64,dur:1,type:'sine',gain:0.16,harm:3},{midi:67,dur:1,type:'sine',gain:0.17},
      {midi:69,dur:1,type:'sine',gain:0.17,harm:4},{midi:71,dur:1,type:'sine',gain:0.16},
      {midi:72,dur:2,type:'sine',gain:0.20,harm:7},{midi:72,dur:1,type:'sine',gain:0.18},{midi:0,dur:1}
    ];
    _bgmBeatBass = [48,48,45,45,41,41,43,43,48,48,45,45,41,41,43,43]; _bgmBeatPerc = [];

  } else if (trackName === 'chase_1') {
    _bgmBeat = 60/155; _bgmBeatsPerLoop = 32;
    _bgmNotes = [
      {midi:69,dur:0.5,type:'square',gain:0.15},{midi:72,dur:0.5,type:'square',gain:0.15},
      {midi:71,dur:0.5,type:'square',gain:0.14},{midi:69,dur:0.5,type:'square',gain:0.14},
      {midi:67,dur:0.5,type:'square',gain:0.13},{midi:65,dur:0.5,type:'square',gain:0.13},
      {midi:64,dur:0.5,type:'square',gain:0.14},{midi:62,dur:0.5,type:'square',gain:0.14},
      {midi:64,dur:0.5,type:'square',gain:0.14},{midi:65,dur:0.5,type:'square',gain:0.14},
      {midi:67,dur:0.5,type:'square',gain:0.15},{midi:69,dur:0.5,type:'square',gain:0.15},
      {midi:71,dur:0.5,type:'square',gain:0.14},{midi:69,dur:0.5,type:'square',gain:0.14},
      {midi:67,dur:1.0,type:'square',gain:0.16},{midi:0,dur:0.5},
      {midi:65,dur:0.5,type:'square',gain:0.13},{midi:64,dur:0.5,type:'square',gain:0.13},
      {midi:62,dur:0.5,type:'square',gain:0.14},{midi:60,dur:0.5,type:'square',gain:0.14},
      {midi:62,dur:0.5,type:'square',gain:0.14},{midi:64,dur:0.5,type:'square',gain:0.14},
      {midi:65,dur:0.5,type:'square',gain:0.15},{midi:67,dur:0.5,type:'square',gain:0.15},
      {midi:69,dur:0.5,type:'square',gain:0.15},{midi:71,dur:0.5,type:'square',gain:0.15},
      {midi:72,dur:0.5,type:'square',gain:0.16},{midi:74,dur:0.5,type:'square',gain:0.16},
      {midi:72,dur:1.0,type:'square',gain:0.17},{midi:0,dur:0.5},
      {midi:69,dur:0.5,type:'square',gain:0.14},{midi:67,dur:0.5,type:'square',gain:0.13}
    ];
    _bgmBeatBass = [45,45,45,45,48,48,45,45,43,43,43,43,41,41,43,43,45,45,45,45,48,48,45,45,43,43,41,41,43,43,45,45];
    _bgmBeatPerc = [{kind:'kick',every:4,on:0,gain:0.55},{kind:'kick',every:4,on:2.5,gain:0.35},{kind:'snare',every:4,on:2,gain:0.38},{kind:'hat',every:1,on:0.5,gain:0.15}];

  } else if (trackName === 'chase_2') {
    _bgmBeat = 60/168; _bgmBeatsPerLoop = 32;
    _bgmNotes = [
      {midi:70,dur:0.5,type:'square',gain:0.15},{midi:73,dur:0.5,type:'square',gain:0.15},
      {midi:70,dur:0.5,type:'square',gain:0.14},{midi:68,dur:0.5,type:'square',gain:0.14},
      {midi:66,dur:0.5,type:'square',gain:0.13},{midi:68,dur:0.5,type:'square',gain:0.13},
      {midi:70,dur:1.0,type:'square',gain:0.15},{midi:0,dur:0.5},
      {midi:73,dur:0.5,type:'square',gain:0.15},{midi:75,dur:0.5,type:'square',gain:0.16},
      {midi:73,dur:0.5,type:'square',gain:0.15},{midi:70,dur:0.5,type:'square',gain:0.14},
      {midi:68,dur:0.5,type:'square',gain:0.14},{midi:66,dur:0.5,type:'square',gain:0.13},
      {midi:65,dur:0.5,type:'square',gain:0.13},{midi:63,dur:0.5,type:'square',gain:0.14},
      {midi:65,dur:0.5,type:'square',gain:0.14},{midi:66,dur:0.5,type:'square',gain:0.14},
      {midi:68,dur:0.5,type:'square',gain:0.15},{midi:70,dur:0.5,type:'square',gain:0.15},
      {midi:73,dur:0.5,type:'square',gain:0.15},{midi:70,dur:0.5,type:'square',gain:0.14},
      {midi:68,dur:0.5,type:'square',gain:0.14},{midi:66,dur:0.5,type:'square',gain:0.13},
      {midi:68,dur:0.5,type:'square',gain:0.14},{midi:70,dur:0.5,type:'square',gain:0.15},
      {midi:73,dur:0.5,type:'square',gain:0.15},{midi:75,dur:0.5,type:'square',gain:0.16},
      {midi:73,dur:1.0,type:'square',gain:0.17},{midi:0,dur:0.5},
      {midi:70,dur:0.5,type:'square',gain:0.14},{midi:68,dur:0.5,type:'square',gain:0.13}
    ];
    _bgmBeatBass = [46,46,46,46,49,49,46,46,44,44,44,44,42,42,44,44,46,46,46,46,49,49,46,46,44,44,42,42,41,41,46,46];
    _bgmBeatPerc = [{kind:'kick',every:4,on:0,gain:0.58},{kind:'kick',every:4,on:2.5,gain:0.38},{kind:'snare',every:4,on:2,gain:0.40},{kind:'hat',every:1,on:0,gain:0.12},{kind:'hat',every:1,on:0.5,gain:0.18}];

  } else if (trackName === 'chase_3') {
    _bgmBeat = 60/182; _bgmBeatsPerLoop = 32;
    _bgmNotes = [
      {midi:74,dur:0.25,type:'square',gain:0.15},{midi:72,dur:0.25,type:'square',gain:0.14},
      {midi:74,dur:0.25,type:'square',gain:0.15},{midi:76,dur:0.25,type:'square',gain:0.15},
      {midi:77,dur:0.5,type:'square',gain:0.16},{midi:76,dur:0.25,type:'square',gain:0.15},
      {midi:74,dur:0.25,type:'square',gain:0.14},{midi:72,dur:0.25,type:'square',gain:0.14},
      {midi:71,dur:0.25,type:'square',gain:0.13},{midi:72,dur:0.25,type:'square',gain:0.14},
      {midi:74,dur:0.25,type:'square',gain:0.14},{midi:76,dur:0.5,type:'square',gain:0.15},
      {midi:74,dur:0.5,type:'square',gain:0.14},{midi:72,dur:0.25,type:'square',gain:0.14},
      {midi:74,dur:0.25,type:'square',gain:0.14},{midi:72,dur:0.25,type:'square',gain:0.13},
      {midi:71,dur:0.25,type:'square',gain:0.13},{midi:69,dur:0.5,type:'square',gain:0.14},
      {midi:71,dur:0.25,type:'square',gain:0.13},{midi:72,dur:0.25,type:'square',gain:0.14},
      {midi:74,dur:0.25,type:'square',gain:0.14},{midi:72,dur:0.25,type:'square',gain:0.13},
      {midi:71,dur:0.25,type:'square',gain:0.13},{midi:69,dur:0.25,type:'square',gain:0.13},
      {midi:67,dur:0.5,type:'square',gain:0.14},{midi:69,dur:0.5,type:'square',gain:0.14},
      {midi:71,dur:0.5,type:'square',gain:0.15},{midi:72,dur:0.5,type:'square',gain:0.15},
      {midi:74,dur:0.5,type:'square',gain:0.16},{midi:76,dur:0.5,type:'square',gain:0.16},
      {midi:77,dur:1.0,type:'square',gain:0.18},{midi:0,dur:1.0}
    ];
    _bgmBeatBass = [50,50,50,50,53,53,50,50,48,48,48,48,46,46,48,48,50,50,50,50,53,53,52,52,50,50,48,48,46,46,45,45];
    _bgmBeatPerc = [{kind:'kick',every:4,on:0,gain:0.60},{kind:'kick',every:4,on:2.25,gain:0.40},{kind:'snare',every:4,on:2,gain:0.42},{kind:'hat',every:0.5,on:0,gain:0.14}];

  } else if (trackName === 'boss') {
    _bgmBeat = 60/142; _bgmBeatsPerLoop = 16;
    _bgmNotes = [
      {midi:76,dur:0.5,type:'sawtooth',gain:0.13},{midi:75,dur:0.5,type:'sawtooth',gain:0.13},
      {midi:76,dur:0.25,type:'sawtooth',gain:0.14},{midi:75,dur:0.25,type:'sawtooth',gain:0.13},
      {midi:74,dur:0.5,type:'sawtooth',gain:0.13},{midi:72,dur:0.5,type:'sawtooth',gain:0.12},
      {midi:71,dur:0.5,type:'sawtooth',gain:0.12},{midi:69,dur:0.5,type:'sawtooth',gain:0.13},
      {midi:68,dur:0.5,type:'sawtooth',gain:0.13},{midi:69,dur:0.5,type:'sawtooth',gain:0.13},
      {midi:71,dur:0.5,type:'sawtooth',gain:0.13},{midi:72,dur:0.5,type:'sawtooth',gain:0.14},
      {midi:71,dur:0.25,type:'sawtooth',gain:0.13},{midi:72,dur:0.25,type:'sawtooth',gain:0.14},
      {midi:74,dur:1.0,type:'sawtooth',gain:0.15},{midi:0,dur:0.5}
    ];
    _bgmBeatBass = [52,52,52,52,55,55,52,52,50,50,48,48,47,47,52,52];
    _bgmBeatPerc = [{kind:'kick',every:4,on:0,gain:0.52},{kind:'kick',every:4,on:2.67,gain:0.32},{kind:'snare',every:4,on:2,gain:0.40},{kind:'hat',every:1,on:0,gain:0.13},{kind:'hat',every:1,on:0.33,gain:0.10},{kind:'hat',every:1,on:0.67,gain:0.10}];

  } else if (trackName === 'clear') {
    _bgmBeat = 60/120; _bgmBeatsPerLoop = 999;
    _bgmNotes = [
      {midi:60,dur:0.5,type:'sine',gain:0.25,harm:7},{midi:64,dur:0.5,type:'sine',gain:0.25,harm:5},
      {midi:67,dur:0.5,type:'sine',gain:0.25,harm:4},{midi:72,dur:1.5,type:'sine',gain:0.28,harm:12},
      {midi:72,dur:0.25,type:'sine',gain:0.22},{midi:71,dur:0.25,type:'sine',gain:0.20},
      {midi:72,dur:0.5,type:'sine',gain:0.24},{midi:0,dur:0.5},
      {midi:67,dur:0.5,type:'sine',gain:0.22,harm:5},{midi:69,dur:0.5,type:'sine',gain:0.22,harm:4},
      {midi:71,dur:0.5,type:'sine',gain:0.22,harm:3},{midi:72,dur:2.5,type:'sine',gain:0.28,harm:12},{midi:0,dur:1.0}
    ];
    _bgmBeatBass = []; _bgmBeatPerc = [];

  } else if (trackName === 'ending') {
    _bgmBeat = 60/78; _bgmBeatsPerLoop = 16;
    _bgmNotes = [
      {midi:67,dur:1,type:'sine',gain:0.20,harm:4},{midi:69,dur:0.5,type:'sine',gain:0.18,harm:3},
      {midi:71,dur:0.5,type:'sine',gain:0.18},{midi:72,dur:1,type:'sine',gain:0.20,harm:7},
      {midi:71,dur:0.5,type:'sine',gain:0.18,harm:5},{midi:69,dur:0.5,type:'sine',gain:0.17},
      {midi:67,dur:2,type:'sine',gain:0.22,harm:7},{midi:0,dur:1},
      {midi:0,dur:1},{midi:74,dur:1,type:'sine',gain:0.20,harm:4},
      {midi:72,dur:0.5,type:'sine',gain:0.18,harm:3},{midi:71,dur:0.5,type:'sine',gain:0.18},
      {midi:69,dur:1,type:'sine',gain:0.20,harm:5},{midi:71,dur:0.5,type:'sine',gain:0.18,harm:3},
      {midi:72,dur:0.5,type:'sine',gain:0.18},{midi:74,dur:3,type:'sine',gain:0.25,harm:7}
    ];
    _bgmBeatBass = [43,43,43,43,41,41,41,41,38,38,38,38,40,40,40,40]; _bgmBeatPerc = [];
  }
}

// ────────────────────────────────────────────────────
// 공개 API
// ────────────────────────────────────────────────────
function bgmPlay(trackName) {
  bgmInit(); if (_bgmCtx.state === 'suspended') _bgmCtx.resume();
  if (_bgmTrack === trackName) return;
  bgmStop(); _bgmTrack = trackName; _bgmLoad(trackName);
  if (!_bgmNotes.length) return;
  _bgmNoteIdx = 0; _bgmNextTime = _bgmCtx.currentTime + 0.05; _bgmLoopStart = _bgmNextTime;
  _bgmScheduleTick(); _bgmTimer = setInterval(_bgmScheduleTick, 50);
}

function bgmStop() {
  if (_bgmTimer) { clearInterval(_bgmTimer); _bgmTimer = null; }
  _bgmTrack = ''; _bgmNotes = []; _bgmNoteIdx = 0;
}

function bgmUpdateForState(s, stageIdx) {
  if (!_bgmCtx) return;
  if (s === 'intro_title' || s === 'select' || s.startsWith('prologue')) bgmPlay('fantasy');
  else if (s === 'playing') { if (stageIdx <= 1) bgmPlay('chase_1'); else if (stageIdx <= 3) bgmPlay('chase_2'); else bgmPlay('chase_3'); }
  else if (s === 'boss_quiz') bgmPlay('boss');
  else if (s === 'stage_clear') { bgmStop(); _bgmTrack = ''; bgmPlay('clear'); }
  else if (s.startsWith('ending')) bgmPlay('ending');
  else if (s === 'gameover') bgmStop();
}
