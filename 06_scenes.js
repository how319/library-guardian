// 06_scenes.js — 씬 드로잉 (타이틀, 프롤로그, 선택, 클리어, 엔딩)

// 타이틀 화면

function drawIntroTitle() {
  drawLibraryBackgroundSimple(); 
	fill(0, 0, 0, 140); 
	noStroke(); 
	rect(0, 0, width, height);
  textAlign(CENTER, CENTER); 
	fill(0, 255, 200); 
	textSize(32); 
	noStroke();
  text("도서관 수호자 (The Library Guardian): 흔적의 미로", width / 2, height / 2 - 40);
  let btnX = width / 2 - 110, btnY = height / 2 + 50, btnW = 220, btnH = 55;
  let hover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
  fill(hover ? color(0, 255, 200) : color(0, 160, 130)); 
  cursor(hover ? HAND : ARROW); 
  rect(btnX, btnY, btnW, btnH, 10);
  fill(20); 
  textSize(20); 
  noStroke(); 
  text("게임 시작", width / 2, btnY + btnH / 2);
}

// 프롤로그 씬들
  function drawPrologueCam() {
  cursor(ARROW); 
	introTimer += 0.005;
  let zoom = map(min(introTimer, 1), 0, 1, 0.8, 2.2), wormWorldX = width / 2, wormWorldY = height / 2 + 90;
  push(); 
	translate(width / 2, height / 2); 
	scale(zoom); 
	translate(-wormWorldX, -wormWorldY);
  drawLibraryBackgroundSimple(); 
	let sleepWiggle = sin(frameCount * 0.05) * 2;
  drawBookwormCharacter(wormWorldX, wormWorldY + sleepWiggle, 100, true, false, false, false, false); 
	pop();
  fill(0, 0, 0, 200); 
	rect(0, height - 120, width, 120); 
	fill(255); 
	noStroke(); 
	textSize(18); 
	textAlign(CENTER, CENTER);
  text("숭실도서관 책장 위에서 곤히 단잠을 자고 있는 귀여운 책벌레", width / 2, height - 75);
  fill(150, 160, 180, abs(sin(frameCount * 0.04)) * 180 + 75); textSize(12); text("[마우스 클릭 또는 스페이스바를 누르면 다음으로]", width / 2, height - 30);
}

function drawPrologueShake() {
  background(0); let shakeX = random(-15, 15), shakeY = random(-15, 15);
  textAlign(CENTER, CENTER); fill(255, 30, 30); stroke(255); strokeWeight(4); textSize(72); text("그 때!!", width / 2 + shakeX, height / 2 + shakeY);
  noStroke(); fill(150, 160, 180, abs(sin(frameCount * 0.04)) * 180 + 75); textSize(12); text("[마우스 클릭 또는 스페이스바를 누르면 다음으로]", width / 2, height - 30);
}

function drawPrologueVillain() {
  introTimer += 1.2; let villainX = width * 0.35, villainY = height * 0.7 - 70;
  if (introTimer < 100) { drawDoorBackground(); let vX = width * 0.35 + introTimer * 0.5; drawVillainCharacter(vX, height / 2 + 50, 90, false, false); }
  else { let zoom = map(min(introTimer / 100, 1), 0, 1, 1.0, 1.6); push(); translate(width / 2, height / 2); scale(zoom); translate(-villainX, -(villainY - 40)); background(20, 15, 12); let eatAnimateY = sin(frameCount * 0.2) * 4; drawVillainCharacter(villainX, villainY + eatAnimateY, 110, false, false); pop(); }
  fill(0, 0, 0, 180); rect(0, height - 120, width, 120); fill(255, 80, 100); noStroke(); textSize(18); textAlign(CENTER, CENTER);
  text("망토를 두른 어둠의 악당이 나타나 고서를 파괴하기 시작합니다!", width / 2, height - 75);
  fill(150, 160, 180, abs(sin(frameCount * 0.04)) * 180 + 75); textSize(12); text("[마우스 클릭 또는 스페이스바를 누르면 다음으로]", width / 2, height - 30);
}

function drawPrologueAngry() {
  introTimer += 0.015; let zoom = map(min(introTimer, 1), 0, 1, 1.2, 3.8), targetWormX = width / 2, targetWormY = height / 2 + 90;
  push(); translate(width / 2, height * 0.35); scale(zoom); translate(-targetWormX, -targetWormY); drawLibraryBackgroundSimple();
  drawBookwormCharacter(targetWormX, targetWormY, 100, introTimer < 0.2, introTimer >= 0.2 && introTimer < 0.5, introTimer >= 0.5, false, false); pop();
  fill(0, 0, 0, 220); stroke(0, 255, 200, 120); strokeWeight(2); rect(40, height - 135, width - 80, 95, 8);
  fill(0, 255, 200); noStroke(); textSize(19); textAlign(CENTER, CENTER); text('"소중한 고서 유산을 감히 갉아먹다니!! 내가 널 저지하겠다!"', width / 2, height - 100);
  fill(150, 160, 180, abs(sin(frameCount * 0.04)) * 180 + 75); textSize(12); text("[마우스 클릭 또는 스페이스바를 누르면 다음으로]", width / 2, height - 60);
}

function drawPrologueVersus() {
  noStroke();
  for (let i = 0; i < width; i += 4) { let t = map(i, 0, width, 0, 1); let c = lerpColor(color(20, 10, 50), color(90, 10, 20), t); fill(c); rect(i, 0, 4, height); }
  stroke(255, 30); strokeWeight(5); line(width * 0.4, 0, width * 0.6, height);
  push(); drawVillainCharacter(width * 0.25, height * 0.52 + 180, 250, true, false); pop();
  push(); drawBookwormCharacter(width * 0.72, height * 0.55, 250, false, false, false, true, false); pop();
  fill(255, abs(sin(frameCount * 0.08)) * 180 + 75); stroke(255, 80, 80); strokeWeight(3); textSize(min(70, width / 10)); textAlign(CENTER, CENTER); text("VS", width / 2, height / 2);
  noStroke(); fill(255, abs(sin(frameCount * 0.05)) * 180 + 75); textSize(13); text("[마우스 클릭 또는 스페이스바를 누르면 게임 설명으로]", width / 2, height - 45);
}

function drawPrologueGuide() {
  background(12, 18, 28); stroke(0, 255, 200, 120); strokeWeight(2); noFill(); rect(50, 50, width - 100, height - 100, 12);
  textAlign(CENTER, CENTER); fill(0, 255, 200); textSize(min(28, width / 25)); noStroke(); text("— MISSION INSTRUCTION —", width / 2, height * 0.18);
  fill(235); textSize(min(15, width / 55)); textLeading(30);
  text("• 화면에 흘러가는 색상의 한글 활자들을 순서대로 입력하세요.\n\n• 완벽히 입력할수록 책벌레가 성장하며 전진합니다.\n\n• 오타가 나면 디지털 블랙홀의 추격 속도가 빨라집니다.\n\n• 모든 활자 복원 후 보스 퀴즈(O/X)를 통과하면 스테이지 클리어!", width / 2, height * 0.52);
  fill(0, 255, 200, abs(sin(frameCount * 0.04)) * 200 + 55); textSize(min(15, width / 55)); text("아무 키나 누르거나 클릭하여 서가 선택 화면으로", width / 2, height * 0.84);
}

// 서가 선택 화면
function drawSelectMenu() {
  background(10, 12, 18); stroke(30, 35, 50, 60);
  for (let x = 0; x < width; x += 50) line(x, 0, x, height);
  for (let y = 0; y < height; y += 50) line(0, y, width, y);
  textAlign(CENTER, CENTER); fill(0, 255, 200); noStroke(); textSize(min(26, width / 30)); text('복원할 서가 구역을 선택하세요', width / 2, 80);
  textSize(min(12, width / 60)); fill(120, 130, 150); text('이전 구역을 복원하면 다음 서가 구역의 잠금이 해제됩니다.', width / 2, 115);
  stageButtons = []; let btnW = min(380, width * 0.7), btnH = 60, startY = 155;
  for (let i = 0; i < PROVERBS_DATA.length; i++) {
    let btnX = width / 2 - btnW / 2, btnY = startY + i * (btnH + 16), isUnlocked = i < unlockedStages;
    let isHover = isUnlocked && mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    stageButtons.push({ id: i, x: btnX, y: btnY, w: btnW, h: btnH, unlocked: isUnlocked });
    if (!isUnlocked) { fill(25, 25, 30, 150); stroke(80, 85, 100, 100); strokeWeight(1); drawingContext.shadowBlur = 0; }
    else if (isHover) { fill(16, 45, 45, 240); stroke(0, 255, 200); strokeWeight(2); drawingContext.shadowBlur = 12; drawingContext.shadowColor = 'rgb(0,255,200)'; cursor(HAND); }
    else { fill(16, 22, 32, 200); stroke(0, 255, 200, 100); strokeWeight(1); drawingContext.shadowBlur = 0; }
    rect(btnX, btnY, btnW, btnH, 6); drawingContext.shadowBlur = 0; noStroke();
    if (isUnlocked) {
      fill(isHover ? 255 : 200, 255, 235); textSize(min(14, width / 60)); textAlign(LEFT, CENTER); text(`  서가 제 ${i + 1} 구역 — ${STAGE_NAMES[i]}`, btnX + 15, btnY + btnH / 2);
      fill(0, 255, 200, isHover ? 255 : 150); textSize(11); textAlign(RIGHT, CENTER); text(`문장 ${PROVERBS_DATA[i].length}개  ➔ `, btnX + btnW - 15, btnY + btnH / 2);
    } else {
      fill(100, 105, 115); textSize(min(14, width / 60)); textAlign(LEFT, CENTER); text(`  서가 제 ${i + 1} 구역 — ${STAGE_NAMES[i]}`, btnX + 15, btnY + btnH / 2);
      textSize(12); textAlign(RIGHT, CENTER); text('🔒 잠김  ', btnX + btnW - 15, btnY + btnH / 2);
    }
  }
  if (!stageButtons.some(b => b.unlocked && mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h)) cursor(ARROW);
}

// 스테이지 클리어
  function drawStageClear() {
  clearTimer++; background(8, 14, 22);
  for (let i = 0; i < 3; i++) { let rx = random(width), ry = random(height); fill(0, 255, 200, random(30, 80)); noStroke(); ellipse(rx, ry, random(2, 5)); }
  stroke(0, 255, 200, 80); strokeWeight(2); noFill(); rect(40, 40, width - 80, height - 80, 16);
  drawBookwormCharacter(width / 2, height * 0.38, 130, false, false, false, false, true);
  textAlign(CENTER, CENTER); noStroke(); let pulse = abs(sin(clearTimer * 0.05)) * 30 + 225;
  fill(0, pulse, 180); textSize(min(30, width / 22)); text(`서가 제 ${stage + 1} 구역 [${STAGE_NAMES[stage]}] 복원 완료!`, width / 2, height * 0.62);
  fill(200, 220, 255); textSize(min(15, width / 52)); text("디지털 블랙홀로부터 고서들을 성공적으로 지켜냈습니다!", width / 2, height * 0.7);
  if (stage + 1 < TOTAL_STAGES) { fill(0, 200, 160, 180); textSize(min(13, width / 58)); text(`다음 목표: 서가 제 ${stage + 2} 구역 — ${STAGE_NAMES[stage + 1]}`, width / 2, height * 0.78); }
  else { fill(255, 220, 80); textSize(min(14, width / 55)); text("모든 서가가 복원되었습니다! 도서관이 완전히 되살아납니다!", width / 2, height * 0.78); }
  fill(150, 160, 180, abs(sin(clearTimer * 0.06)) * 180 + 75); textSize(12); text("[마우스 클릭 또는 아무 키나 눌러 서가 선택으로 돌아가기]", width / 2, height * 0.88);
}

// 게임오버
function drawGameover() {
  background(8, 0, 0, 210); fill(255, 60, 60); noStroke(); textSize(min(24, width / 28)); textAlign(CENTER, CENTER);
  text('서가의 문장이 완전히 소멸되었습니다', width / 2, height / 2 - 50);
  fill(160); textSize(min(14, width / 55)); text('디지털 블랙홀에 모든 흔적이 삼켜졌습니다', width / 2, height / 2 - 10);
  fill(0, 255, 200, abs(sin(frameCount * 0.06)) * 200 + 55); textSize(min(13, width / 60)); text('R 키를 눌러 서가 선택으로 돌아가기', width / 2, height / 2 + 40);
}

// 엔딩 씬들
function drawEnding1() {
  drawEatingBackground(); endingTimer += 1;
  let vX = width * 0.5, vY = height * 0.55 + sin(frameCount * 0.3) * 5;
  drawVillainCharacter(vX + random(-3, 3), vY, 135, false, true);
  if (endingTimer % 3 === 0 && endingTimer < 110) {
    let hanguls = ["훈","민","정","음","한","글","수","호","자","지","혜","미","로","속","담","책","빛","ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ"];
    endingLetters.push({ ch: random(hanguls), x: vX, y: vY - 70, vx: random(-7, 7), vy: random(-11, -4), rot: random(TWO_PI), rotSpd: random(-0.08, 0.08), col: random(COLS), pulseSize: random(20, 28) });
  }
  for (let l of endingLetters) {
    l.x += l.vx; l.y += l.vy; l.vy += 0.22; l.rot += l.rotSpd;
    push(); translate(l.x, l.y); rotate(l.rot);
    fill(red(color(l.col)), green(color(l.col)), blue(color(l.col)), 40); noStroke(); ellipse(0, 0, l.pulseSize + 12 + sin(frameCount * 0.1) * 4);
    fill(l.col); stroke(255, 200); strokeWeight(1.5); textSize(l.pulseSize); textAlign(CENTER, CENTER); text(l.ch, 0, 0); pop();
  }
  fill(255, 50, 60, abs(sin(frameCount * 0.15)) * 130 + 125); textAlign(CENTER, CENTER); textSize(50); stroke(0); strokeWeight(6); text('"쿠어어억!! 내 활자들이...!!"', width / 2, height * 0.18);
  if (endingTimer > 160) startFadeTo('ending_2');
}

function drawEnding2() {
  drawDoorBackground(); endingTimer += 1.3;
  let escapeX = lerp(width * 0.15, width * 0.68, min(endingTimer / 100, 1.0)), escapeY = height * 0.6 + abs(sin(frameCount * 0.4)) * -25;
  if (endingTimer < 110) drawVillainCharacter(escapeX, escapeY, 105, false, true);
  fill(0, 0, 0, 190); noStroke(); rect(0, height - 130, width, 130); fill(255, 220, 80); textSize(19); textAlign(CENTER, CENTER);
  text("책벌레 악당이 자신이 파괴한 활자들을 전부 쏟아낸 채\n노란 새벽빛이 흘러나오는 비밀의 문 밖으로 전속력으로 달아납니다!", width / 2, height - 80);
  fill(160, 170, 190, abs(sin(frameCount * 0.05)) * 160 + 95); textSize(12); text("[마우스 클릭 또는 스페이스바를 누르면 다음 단계로]", width / 2, height - 30);
}

function drawEnding3() {
  drawDeskSceneBackground(); endingTimer += 1; let deskBookX = width / 2, deskBookY = height * 0.58;
  drawBookwormCharacter(width * 0.22, height * 0.62, 100, false, false, false, false, false);
  let allAbsorbed = true;
  for (let l of endingLetters) {
    l.x = lerp(l.x, deskBookX + random(-40, 40), 0.05); l.y = lerp(l.y, deskBookY - 15, 0.05);
    let d = dist(l.x, l.y, deskBookX, deskBookY); if (d > 25) allAbsorbed = false;
    push(); translate(l.x, l.y); fill(l.col); stroke(255, 150); strokeWeight(1); textSize(18); textAlign(CENTER, CENTER); text(l.ch, 0, 0); pop();
  }
  if (random() > 0.25) spawnParticles(deskBookX + random(-60, 60), deskBookY - 10);
  updateParticles(); drawParticles();
  fill(0, 0, 0, 180); noStroke(); rect(0, height - 110, width, 110); fill(0, 255, 190); textSize(19); textAlign(CENTER, CENTER);
  text("공중에 떠돌던 아름다운 한글 속담 활자들이 고서 책 속으로 차례차례 스며들며\n훼손되었던 도서관의 영혼이 찬란하게 복원되기 시작합니다.", width / 2, height - 65);
  if (endingTimer > 180 || allAbsorbed) startFadeTo('ending_4');
}

function drawEnding4() {
  endingTimer += 0.006; let zoom = map(min(endingTimer, 1), 0, 1, 1.0, 2.6), wormDeskX = width / 2, wormDeskY = height / 2 + 80;
  push(); translate(width / 2, height / 2); scale(zoom); translate(-wormDeskX, -wormDeskY); drawLibraryBackgroundSimple();
  drawBookwormCharacter(wormDeskX, wormDeskY, 115, false, false, false, false, endingTimer > 0.35); pop();
  fill(0, 0, 0, 220); stroke(0, 255, 150); strokeWeight(3); rect(width / 2 - 260, 40, 520, 75, 12);
  noStroke(); fill(255, 255, 100); textSize(25); textAlign(CENTER, CENTER); text('"완벽해! 도서관의 책들을 모두 지켜냈어!!"', width / 2, 76);
  fill(255, abs(sin(frameCount * 0.04)) * 180 + 75); textSize(12); text("[마우스 클릭 또는 스페이스바를 누르면 최종 결과 창으로]", width / 2, height - 45);
}


function drawEnding5() {
  background(12, 16, 26);
  stroke(0, 255, 200, 100); strokeWeight(2); noFill();
  rect(40, 40, width - 80, height - 80, 16);
  textAlign(CENTER, CENTER); fill(0, 255, 200);
  textSize(min(32, width / 22)); noStroke();
  text("도서관 수호자 (The Library Guardian): 흔적의 미로", width / 2, height * 0.23);
  fill(240); textSize(min(20, width / 36));
  text(`서가 구역 ${stage + 1} [${STAGE_NAMES[stage]}] 복원 완료!`, width / 2, height * 0.34);
  fill(200); textSize(min(15, width / 52));
  text("🎉 축하합니다! 위대한 고서들이 모두 원래 자리를 찾았습니다.", width / 2, height * 0.42);

  let btnW = min(220, width * 0.26), btnH = 52, btnGap = 28;
  let totalW = btnW * 3 + btnGap * 2;
  let b1X = width / 2 - totalW / 2;
  let b2X = b1X + btnW + btnGap;
  let b3X = b2X + btnW + btnGap;
  let btnY = height * 0.56;

  let h1 = mouseX > b1X && mouseX < b1X + btnW && mouseY > btnY && mouseY < btnY + btnH;
  let h2 = mouseX > b2X && mouseX < b2X + btnW && mouseY > btnY && mouseY < btnY + btnH;
  let h3 = mouseX > b3X && mouseX < b3X + btnW && mouseY > btnY && mouseY < btnY + btnH;

  fill(h1 ? color(0, 230, 150) : color(0, 150, 100)); if (h1) cursor(HAND);
  rect(b1X, btnY, btnW, btnH, 8); fill(15); textSize(15); text("서가 선택으로 돌아가기", b1X + btnW / 2, btnY + btnH / 2);

  fill(h2 ? color(0, 255, 200) : color(0, 140, 140)); if (h2) cursor(HAND);
  rect(b2X, btnY, btnW, btnH, 8); fill(15); textSize(15); text("엔딩 크레딧 보기", b2X + btnW / 2, btnY + btnH / 2);

  fill(h3 ? color(0, 200, 255) : color(0, 120, 180)); if (h3) cursor(HAND);
  rect(b3X, btnY, btnW, btnH, 8); fill(15); textSize(15); text("메인 타이틀로 이동", b3X + btnW / 2, btnY + btnH / 2);

  if (!h1 && !h2 && !h3) cursor(ARROW);
}
