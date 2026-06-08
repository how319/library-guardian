// 09_effects.js — 파티클, 식물, 반딧불, 흡입 이펙트
// 파티클 (글자 먹을 때 터지는 이펙트)
  function spawnParticles(x, y) {
  for (let i = 0; i < 15; i++)
    particles.push({ x, y, vx: random(-3, 3), vy: random(-3, 3), alpha: 255, color: color(50, 255, 200) });
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i]; p.x += p.vx; p.y += p.vy; p.alpha -= 8;
    if (p.alpha <= 0) particles.splice(i, 1);
  }
}

function drawParticles() {
  for (let p of particles) {
    fill(red(p.color), green(p.color), blue(p.color), p.alpha); noStroke(); ellipse(p.x, p.y, 4, 4);
  }
}

// 식물 이펙트 (글자 먹을 때 주변에 꽃/풀 생성)
  function spawnVegetation(x, y) {
  for (let i = 0; i < floor(random(2, 4)); i++) {
    let type = random(['grass', 'flower']);
    vegetation.push({
      x: x + random(-25, 25), y: y + random(-10, 15),
      size: random(12, 28), type,
      color: type === 'grass' ? color(0, random(180, 240), 120) : color(random(230, 255), random(120, 180), random(220, 255)),
      petalCount: floor(random(5, 8)), petalSize: random(5, 9)
    });
  }
}

function drawVegetation() {
  for (let f of vegetation) {
    if (f.type === 'grass') {
      stroke(f.color, 180); strokeWeight(2); noFill();
      line(f.x, f.y, f.x - 3, f.y - f.size); line(f.x, f.y, f.x + 3, f.y - f.size * 0.7);
    } else {
      stroke(f.color, 120); strokeWeight(1.5); line(f.x, f.y, f.x, f.y - f.size);
      push(); translate(f.x, f.y - f.size); noStroke(); fill(f.color);
      for (let i = 0; i < f.petalCount; i++) { ellipse(0, -f.petalSize, f.petalSize * 1.2, f.petalSize * 1.8); rotate(TWO_PI / f.petalCount); }
      fill(255, 230, 100); circle(0, 0, f.petalSize * 0.9); pop();
    }
  }
}

// 반딧불 (글자 주변을 떠도는 빛)
function initFirefliesForStage() {
  fireflies = [];
  for (let c of chars)
    for (let j = 0; j < 3; j++)
      fireflies.push({ baseX: c.x, baseY: c.y, angle: random(TWO_PI), radius: random(20, 45), speed: random(0.01, 0.03), size: random(3, 6), col: c.col });
}

function drawFireflies() {
  for (let f of fireflies) {
    f.angle += f.speed;
    let fx = f.baseX + cos(f.angle) * f.radius + sin(frameCount * 0.03) * 3;
    let fy = f.baseY + sin(f.angle * 1.5) * f.radius * 0.6 + cos(frameCount * 0.02) * 3;
    let [cr, cg, cb] = hexToRGB(f.col), pulse = 90 + sin(frameCount * 0.08 + f.angle) * 140;
    push(); drawingContext.shadowBlur = 6; drawingContext.shadowColor = `rgb(${cr},${cg},${cb})`;
    fill(cr, cg, cb, pulse); noStroke(); circle(fx, fy, f.size); pop();
  }
}

// 흡입 이펙트 (보스 퀴즈 화면 블랙홀로 빨려드는 파티클)
  function initSuctionEffect() {
  suctionParticles = [];
  let pool = ['0','1','NULL','VOID','ERR','소거','망각','흡입','LIMIT'];
  for (let i = 0; i < 120; i++)
    suctionParticles.push({
      radius: random(width * 0.3, width * 0.7), angle: random(TWO_PI),
      speed: random(1.6, 4.4), rotSpeed: random(0.02, 0.05),
      ch: random(pool), col: random(COLS), size: random(10, 18)
    });
}
