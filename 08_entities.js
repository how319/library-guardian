// 08_entities.js — 엔티티 클래스 (Caterpillar, Predator)

class Caterpillar {
  constructor(x, y) {
    this.segs = [];
    for (let i = 0; i < 4; i++) this.segs.push({ x: x - i * 14, y });
    this.targetIdx = 0; this.trail = []; this.lastEatenPos = { x, y };
  }

  get head() { return this.segs[0]; }

  eatCharAndGrow(c) {
    c.eaten = true; this.lastEatenPos = { x: c.x, y: c.y };
    if (c.isGrowPoint) this.segs.unshift({ x: c.x, y: c.y });
    else { this.segs.unshift({ x: this.head.x, y: this.head.y }); this.segs.pop(); }
    spawnParticles(c.x, c.y); spawnVegetation(c.x, c.y);
    this.trail.push({ x: c.x, y: c.y, life: 120 });
    this.targetIdx++;
    if (this.targetIdx >= chars.length) {
      bossLives = calcBossLives(this.segs.length);
      bossLivesLostAnim = 0;
      currentBossQuizData = buildBossQuiz(stage % TOTAL_STAGES);
      currentBossQuizIdx = 0; bossHealth = 100;
      state = 'boss_quiz'; initSuctionEffect(); bgmUpdateForState('boss_quiz', stage);
    }
  }

  update() {
    this.head.x = lerp(this.head.x, this.lastEatenPos.x, 0.08);
    this.head.y = lerp(this.head.y, this.lastEatenPos.y, 0.08);
    for (let i = 1; i < this.segs.length; i++) {
      let a = this.segs[i], b = this.segs[i - 1];
      let dx = b.x - a.x, dy = b.y - a.y, dd = sqrt(dx * dx + dy * dy);
      if (dd > 14) { a.x = lerp(a.x, b.x - dx / dd * 14, 0.45); a.y = lerp(a.y, b.y - dy / dd * 14, 0.45); }
    }
    this.trail = this.trail.filter(t => { t.life--; return t.life > 0; });
  }

  draw() {
    for (let t of this.trail) {
      let a = map(t.life, 0, 120, 0, 50); fill(0, 255, 200, a); noStroke(); circle(t.x, t.y, 5);
    }
    for (let i = this.segs.length - 1; i >= 0; i--) {
      let s = this.segs[i], r = i === 0 ? 15 : map(i, 0, this.segs.length, 12, 6);
      let [cr, cg, cb] = hexToRGB(COLS[i % COLS.length]); fill(cr, cg, cb); noStroke(); circle(s.x, s.y, r * 2);
      if (i === 0) {
        fill(255); noStroke(); ellipse(s.x - 5, s.y - 3, 10, 10); ellipse(s.x + 5, s.y - 3, 10, 10);
        fill(0); ellipse(s.x - 5, s.y - 3, 6, 6); ellipse(s.x + 5, s.y - 3, 6, 6);
        fill(255); ellipse(s.x - 3, s.y - 5, 3, 3); ellipse(s.x + 7, s.y - 5, 3, 3);
        fill(255, 160, 160, 160); noStroke(); ellipse(s.x - 10, s.y + 3, 7, 5); ellipse(s.x + 10, s.y + 3, 7, 5);
        let gl = this.targetIdx < chars.length && this.head.x > chars[this.targetIdx].x, ad = gl ? -1 : 1;
        stroke(0, 220, 120); strokeWeight(2); noFill();
        line(s.x - 3, s.y - r, s.x - 3 + ad * -4, s.y - r - 10);
        line(s.x + 3, s.y - r, s.x + 3 + ad * 4, s.y - r - 10);
        noStroke(); fill(255, 140, 50);
        circle(s.x - 3 + ad * -4, s.y - r - 10, 5); circle(s.x + 3 + ad * 4, s.y - r - 10, 5);
      }
    }
  }

  shrink() {
    if (this.segs.length > 4) { this.segs.pop(); return true; } return false;
  }
}

class Predator {
  constructor(initialSpd) {
    this.x = windowWidth / 2; this.y = 0; this.spd = initialSpd || 1.04;
    this.phase = 0; this.active = false; this.hitCooldown = 0;
  }

  update() {
    if (!this.active) return; this.phase += 0.08;
    let tail = caterpillar.segs[caterpillar.segs.length - 1];
    let dx = tail.x - this.x, dy = tail.y - this.y, dist = sqrt(dx * dx + dy * dy);
    if (dist > 1) { this.x += dx / dist * this.spd; this.y += dy / dist * this.spd; }
    if (this.hitCooldown > 0) this.hitCooldown--;
    else if (dist < 38) {
      if (!caterpillar.shrink()) { state = 'gameover'; bgmUpdateForState('gameover', stage); sfxGameover(); }
      else this.hitCooldown = 60;
    }
  }

  draw() {
    if (!this.active) return;
    drawVillainCharacter(this.x, this.y + 40, 55, false, false);
    push(); translate(this.x, this.y + 40);
    let br = 32 + sin(frameCount * 0.12) * 3;
    noFill(); stroke(255, 40, 100, 100 + sin(frameCount * 0.1) * 50); strokeWeight(2); ellipse(0, 0, br * 2.5, br * 2.5);
    stroke(0, 255, 220, 80); strokeWeight(1); ellipse(0, 0, br * 1.8, br * 1.8); pop();
  }
}
