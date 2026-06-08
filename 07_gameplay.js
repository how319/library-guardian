// 07_gameplay.js — 게임플레이 HUD, 보스 퀴즈, 일시정지
// 게임 메인 드로우 (플레이 중)
function drawGame() {
  if (isPaused) { drawPauseOverlay(); return; }
  let elapsed = frameCount - stageStartFrame;
  if (!predator.active && elapsed > PREDATOR_DELAY_FRAMES) predator.active = true;
  let targetCamY = caterpillar.head.y - windowHeight / 2; if (targetCamY < 0) targetCamY = 0;
  cameraY = lerp(cameraY, targetCamY, 0.1);
  push(); translate(0, -cameraY);
  drawLibraryBackground(); drawVegetation(); drawFireflies(); drawCharPath(); drawParticles();
  caterpillar.update(); caterpillar.draw(); predator.update(); predator.draw(); pop();
  updateParticles();
  if (!predator.active) {
    let remain = ceil((PREDATOR_DELAY_FRAMES - (frameCount - stageStartFrame)) / 60); if (remain < 0) remain = 0;
    fill(255, 80, 80, 120); noStroke(); textSize(12); textAlign(RIGHT, TOP); text(`블랙홀 활성화까지 ${remain}초`, width - 12, 46);
  }
  drawHUD(); drawPauseButton();
}

// HUD (진행도, 위치 표시)

function drawHUD() {
  fill(16, 20, 30, 220); stroke(0, 255, 200, 50); strokeWeight(1); rect(15, 15, 280, 65, 4);
  fill(0, 255, 200); noStroke(); textSize(11); textAlign(LEFT, TOP); text("● IN-LIBRARY INDEX MONITOR", 28, 25);
  fill(140, 155, 170); textSize(12);
  text(`LOCATION: B1 / 서가 ${stage + 1}구역 [${STAGE_NAMES[stage]}]`, 28, 42);
  text(`BOOKWORM LENGTH: ${caterpillar.segs.length}마디`, 28, 58);
  fill(40); noStroke(); rect(width - 155, height - 25, 135, 12, 6);
  fill(0, 255, 200); rect(width - 155, height - 25, 135 * (caterpillar.targetIdx / chars.length), 12, 6);
  let csub = 0, raw = "";
  if (caterpillar.targetIdx < chars.length) { csub = chars[caterpillar.targetIdx].subStageIndex; raw = chars[caterpillar.targetIdx].rawSentence; }
  else if (chars.length > 0) { csub = chars[chars.length - 1].subStageIndex; raw = chars[chars.length - 1].rawSentence; }
  fill(0, 255, 200, 160); noStroke(); textSize(13); textAlign(LEFT, BASELINE); text(`[도서 복원]`, 20, height - 15);
  fill(140, 150, 165); text(`(${csub + 1}/${PROVERBS_DATA[stage % PROVERBS_DATA.length].length})`, 95, height - 15);
  let si = 0; for (let i = 0; i < chars.length; i++) { if (chars[i].subStageIndex === csub) { si = i; break; } }
  let li = caterpillar.targetIdx - si, done = [], tk = 0;
  for (let i = 0; i < raw.length; i++) {
    let ch = raw.charAt(i); if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(ch)) { if (tk < li) done.push(i); tk++; }
  }
  textAlign(LEFT, BASELINE); let cx2 = 150; textSize(13);
  for (let i = 0; i < raw.length; i++) {
    let ch = raw.charAt(i); fill(done.includes(i) ? color(0, 255, 200) : color(80)); text(ch, cx2, height - 15); cx2 += textWidth(ch);
  }
}

// 일시정지 오버레이
function drawPauseButton() {
  let bx = width - 72, by = 12, bw = 60, bh = 28;
  let hover = mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh;
  fill(20, 25, 35, 200); stroke(0, 255, 200, hover ? 200 : 80); strokeWeight(1); rect(bx, by, bw, bh, 5);
  fill(0, 255, 200, hover ? 255 : 160); noStroke(); textSize(9); textAlign(CENTER, CENTER); text("⏸ 일시정지", bx + bw / 2, by + bh / 2);
  if (hover) cursor(HAND);
}

function drawPauseOverlay() {
  fill(0, 0, 0, 185); noStroke(); rect(0, 0, width, height);
  let pw = min(420, width * 0.8), ph = 320, px = width / 2 - pw / 2, py = height / 2 - ph / 2;
  drawingContext.shadowBlur = 30; drawingContext.shadowColor = 'rgba(0,255,200,0.4)';
  fill(12, 18, 25, 250); stroke(0, 255, 200, 180); strokeWeight(2); rect(px, py, pw, ph, 12); drawingContext.shadowBlur = 0;
  fill(0, 255, 200); noStroke(); textSize(14); textAlign(CENTER, CENTER); text("— 일시 정지 —", width / 2, py + 32);
  stroke(0, 255, 200, 60); strokeWeight(1); line(px + 20, py + 50, px + pw - 20, py + 50);
  let optH = 52, optPad = 12, optStartY = py + 68; pauseBtnHover = -1;
  let icons = ['▶','↺','⌂'], hints = ['ESC','R','Q'];
  let lineColors = [color(0, 255, 200), color(255, 180, 0), color(255, 80, 80)];
  for (let i = 0; i < PAUSE_OPTIONS.length; i++) {
    let ox = px + 20, oy = optStartY + i * (optH + optPad), ow = pw - 40;
    let hover = mouseX > ox && mouseX < ox + ow && mouseY > oy && mouseY < oy + optH, sel = pauseSelectedOption === i;
    if (hover) { pauseBtnHover = i; cursor(HAND); }
    if (sel || hover) { drawingContext.shadowBlur = 8; drawingContext.shadowColor = lineColors[i].toString(); }
    fill(sel || hover ? lerpColor(color(12, 18, 25), lineColors[i], 0.12) : color(12, 18, 25));
    stroke(lineColors[i], sel || hover ? 220 : 80); strokeWeight(sel || hover ? 2 : 1); rect(ox, oy, ow, optH, 6); drawingContext.shadowBlur = 0;
    fill(lineColors[i]); noStroke(); textSize(16); textAlign(LEFT, CENTER); text(icons[i], ox + 18, oy + optH / 2);
    fill(sel || hover ? 255 : 180); textSize(13); textAlign(LEFT, CENTER); text(PAUSE_OPTIONS[i], ox + 44, oy + optH / 2);
    fill(sel || hover ? lineColors[i] : color(80, 90, 100)); textSize(10); textAlign(RIGHT, CENTER); text(hints[i], ox + ow - 14, oy + optH / 2);
  }
  noStroke(); fill(80, 90, 100); textSize(10); textAlign(CENTER, CENTER); text("↑↓ 방향키  |  Enter로 실행", width / 2, py + ph - 16);
}

// 보스 퀴즈 화면
function drawBossLives(cx, cy, blackholeRadius) {
  if (bossLivesLostAnim > 0) bossLivesLostAnim--;
  let liveY = cy - blackholeRadius * 1.55;
  let panelW = max(bossLives * 32 + 60, 120);
  fill(5, 6, 10, 200); stroke(255, 45, 90, 120); strokeWeight(1.5); rect(cx - panelW / 2, liveY - 22, panelW, 40, 8);
  noStroke(); fill(255, 45, 90, 200); textSize(10); textAlign(RIGHT, CENTER); text("생명", cx - panelW / 2 + 36, liveY - 2);
  let heartSize = 18, startX = cx - (bossLives - 1) * (heartSize + 4) / 2;
  for (let i = 0; i < bossLives; i++) {
    let hx = startX + i * (heartSize + 4);
    let shake = (bossLivesLostAnim > 0 && i === bossLives - 1) ? random(-3, 3) : 0;
    let alpha = (bossLivesLostAnim > 0 && i === bossLives - 1) ? (bossLivesLostAnim % 6 < 3 ? 80 : 255) : 255;
    drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'rgba(255,80,120,0.8)';
    fill(255, 60, 100, alpha); noStroke(); textSize(heartSize); textAlign(CENTER, CENTER); text("♥", hx + shake, liveY - 2);
    drawingContext.shadowBlur = 0;
  }
}

function drawBossQuizPage() {
  background(5, 6, 10); if (bossGlitchIntensity > 0) bossGlitchIntensity--;
  let cx = width / 2, cy = height * 0.28;
  for (let i = suctionParticles.length - 1; i >= 0; i--) {
    let p = suctionParticles[i]; p.radius -= p.speed; p.angle += p.rotSpeed;
    let px = cx + cos(p.angle) * p.radius, py = cy + sin(p.angle) * p.radius;
    if (p.radius < 8) { p.radius = random(width * 0.3, width * 0.7); p.angle = random(TWO_PI); }
    let af = map(p.radius, 8, width * 0.4, 0, 240);
    let [cr, cg, cb] = hexToRGB(p.col); fill(cr, cg, cb, af); noStroke();
    textSize(map(p.radius, 8, width * 0.5, 5, p.size)); textAlign(CENTER, CENTER); text(p.ch, px, py);
  }
  push(); translate(cx, cy); let br = 50 + sin(frameCount * 0.15) * 4;
  if (bossGlitchIntensity > 0) translate(random(-bossGlitchIntensity * 0.3, bossGlitchIntensity * 0.3), 0);
  noFill(); stroke(255, 45, 90, 80); strokeWeight(3); ellipse(0, 0, br * 2.8, br * 2.8 + sin(frameCount * 0.25) * 8);
  stroke(0, 235, 255, 120); strokeWeight(1.5); ellipse(0, 0, br * 2.1, br * 2.1);
  fill(255, 45, 90, 30 + sin(frameCount * 0.1) * 20); noStroke(); circle(0, 0, br * 1.6);
  fill(2, 3, 6); stroke(255, 45, 90, 220); strokeWeight(4); circle(0, 0, br); pop();

  drawBossLives(cx, cy, br * 1.4);
  if (currentBossQuizIdx >= currentBossQuizData.length) return;
  let q = currentBossQuizData[currentBossQuizIdx];

  fill(255, 45, 90); noStroke(); textSize(11); textAlign(RIGHT, TOP); text(`[BLACKHOLE_STABILITY]: ${bossHealth}%`, width - 80, 18);
  fill(0, 255, 180); textAlign(LEFT, TOP); text(`[QUIZ]: ${currentBossQuizIdx + 1} / ${currentBossQuizData.length}`, 80, 18);

  fill(10, 14, 22, 230); stroke(255, 50, 80, 130); strokeWeight(2);
  rect(width / 2 - min(380, width * 0.42), height * 0.46 - 20, min(760, width * 0.84), 90, 8);
  noStroke(); fill(255, 50, 80, 180); textSize(10); textAlign(LEFT, TOP); text("■ 데이터 오염 판정 — 원본인가, 왜곡인가?", width / 2 - min(370, width * 0.41), height * 0.46 - 10);
  fill(235, 240, 255); textSize(min(16, width / 48)); textAlign(CENTER, CENTER); text(q.quiz, width / 2, height * 0.46 + 38);

  let caveW = min(240, width * 0.28), caveH = min(200, height * 0.28), gap = min(50, width * 0.05), caveY = height * 0.72;
  let cxO = width / 2 - gap / 2 - caveW / 2, cxX = width / 2 + gap / 2 + caveW / 2;
  bossCaveHoverO = mouseX > cxO - caveW / 2 && mouseX < cxO + caveW / 2 && mouseY > caveY - caveH / 2 && mouseY < caveY + caveH / 2;
  bossCaveHoverX = mouseX > cxX - caveW / 2 && mouseX < cxX + caveW / 2 && mouseY > caveY - caveH / 2 && mouseY < caveY + caveH / 2;
  if (bossCaveHoverO || bossCaveHoverX) cursor(HAND); else cursor(ARROW);

  drawBossCave(cxO, caveY, caveW, caveH, 'O', '#00e0a0', bossSelectedOption === 0 || bossCaveHoverO, '원본 구절', '← 키 / 클릭');
  drawBossCave(cxX, caveY, caveW, caveH, 'X', '#ff4060', bossSelectedOption === 1 || bossCaveHoverX, '왜곡 구절', '→ 키 / 클릭');
  fill(120, 130, 150, abs(sin(frameCount * 0.05)) * 130 + 80); noStroke(); textSize(11); textAlign(CENTER, CENTER);
  text("← → 방향키로 선택  |  Enter / O / X 키 또는 클릭", width / 2, height - 22);
}

function drawBossCave(cx, cy, cw, ch, label, accentCol, isActive, sublabel, hint) {
  let ac = color(accentCol); push(); translate(cx, cy);
  drawingContext.shadowBlur = isActive ? 22 : 5; drawingContext.shadowColor = accentCol;
  fill(isActive ? lerpColor(color(15, 18, 25), ac, 0.1) : color(15, 18, 25)); stroke(accentCol); strokeWeight(isActive ? 3 : 1.5);
  beginShape(); vertex(-cw * 0.5, ch * 0.5); vertex(-cw * 0.5, -ch * 0.1);
  bezierVertex(-cw * 0.5, -ch * 0.55, -cw * 0.28, -ch * 0.5, 0, -ch * 0.5);
  bezierVertex(cw * 0.28, -ch * 0.5, cw * 0.5, -ch * 0.55, cw * 0.5, -ch * 0.1);
  vertex(cw * 0.5, ch * 0.5); endShape(CLOSE);
  fill(isActive ? lerpColor(color(5, 8, 12), ac, 0.06) : color(5, 8, 12)); noStroke();
  beginShape(); vertex(-cw * 0.36, ch * 0.48); vertex(-cw * 0.36, -ch * 0.05);
  bezierVertex(-cw * 0.36, -ch * 0.4, -cw * 0.2, -ch * 0.36, 0, -ch * 0.36);
  bezierVertex(cw * 0.2, -ch * 0.36, cw * 0.36, -ch * 0.4, cw * 0.36, -ch * 0.05);
  vertex(cw * 0.36, ch * 0.48); endShape(CLOSE);
  drawingContext.shadowBlur = 0; let pulse = isActive ? abs(sin(frameCount * 0.08)) * 0.3 + 0.85 : 0.7;
  fill(red(ac) * pulse, green(ac) * pulse, blue(ac) * pulse); noStroke();
  textSize(isActive ? min(68, cw * 0.48) : min(56, cw * 0.4)); textAlign(CENTER, CENTER);
  if (isActive) { drawingContext.shadowBlur = 18; drawingContext.shadowColor = accentCol; }
  text(label, 0, -ch * 0.08); drawingContext.shadowBlur = 0;
  fill(red(ac) * 0.9, green(ac) * 0.9, blue(ac) * 0.9, isActive ? 240 : 140); textSize(12); text(sublabel, 0, ch * 0.2);
  fill(120, 130, 145, isActive ? 200 : 100); textSize(9); text(hint, 0, ch * 0.36);
  if (isActive) { fill(red(ac), green(ac), blue(ac), abs(sin(frameCount * 0.1)) * 180 + 75); textSize(16); text("▲", 0, ch * 0.5 - 6); }
  pop();
}

// 활자 경로 드로잉
function drawCharPath() {
  textAlign(CENTER, CENTER);
  for (let i = 0; i < chars.length; i++) {
    let c = chars[i]; if (c.eaten) continue;
    let isCurrent = i === caterpillar.targetIdx, ts = isCurrent ? 0.15 : 0.06, amp = isCurrent ? 3.5 : 1.5;
    let ox = sin(frameCount * ts + i * 0.5) * amp, oy = cos(frameCount * (ts * 1.2) + i * 0.6) * amp;
    let [cr, cg, cb] = hexToRGB(c.col);
    if (isCurrent) {
      push(); drawingContext.shadowBlur = 15; drawingContext.shadowColor = 'rgb(255,255,255)';
      fill(255, 255, 255, 210 + sin(frameCount * 0.1) * 35); stroke(255, 255, 255, 140); strokeWeight(2.5); ellipse(c.x + ox, c.y + oy, 48, 48); pop();
    }
    push(); drawingContext.shadowBlur = 14; drawingContext.shadowColor = `rgb(${cr},${cg},${cb})`;
    textSize(isCurrent ? 26 : 21); fill(cr, cg, cb); noStroke(); text(c.ch, c.x + ox, c.y + oy); pop();
  }
}
