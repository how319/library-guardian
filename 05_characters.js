// 05_characters.js — 캐릭터 드로잉 (책벌레, 악당)

// 책벌레 캐릭터
function drawBookwormCharacter(x, y, size, isSleep, isSurprised, isAngry, isExtremeAngry, isWink) {
  let s = size / 100;
  if (!isExtremeAngry) {
    let segments = [{ox:-90,oy:20},{ox:-60,oy:10},{ox:-28,oy:5},{ox:6,oy:0}];
    let bodyColors = ['#5db845','#6dcf52','#7de060','#6dcf52'];
    for (let i = 0; i < segments.length - 1; i++) {
      fill(bodyColors[i]); 
	noStroke(); 
	ellipse(x + segments[i].ox * s, y + segments[i].oy * s, 60 * s, 52 * s);
    }
    stroke('#4a9e35'); strokeWeight(2 * s); noFill();
    let legPairs = [{bx:-80,by:30,len:18},{bx:-50,by:28,len:16},{bx:-20,by:26,len:14}];
    for (let lp of legPairs) {
      line(x + lp.bx * s, y + lp.by * s, x + (lp.bx - 8) * s, y + (lp.by + lp.len) * s);
      line(x + lp.bx * s, y + lp.by * s, x + (lp.bx + 8) * s, y + (lp.by + lp.len) * s);
    }
  }
  noStroke(); 
  fill('#7de060'); 
  ellipse(x + 6 * s, y, 72 * s, 68 * s);
  fill('#90ee78'); 
  ellipse(x + 4 * s, y - 4 * s, 62 * s, 58 * s);
  stroke('#8B6914'); 
  strokeWeight(2 * s); 
  noFill();
  ellipse(x - 14 * s, y - 4 * s, 26 * s, 24 * s); 
  ellipse(x + 14 * s, y - 4 * s, 26 * s, 24 * s);
  line(x - 1 * s, y - 4 * s, x + 1 * s, y - 4 * s);
  line(x - 27 * s, y - 4 * s, x - 34 * s, y + 2 * s);
  line(x + 27 * s, y - 4 * s, x + 34 * s, y + 2 * s);

  if (isWink) {
    fill('#fff'); 
    noStroke(); 
	ellipse(x - 14 * s, y - 4 * s, 18 * s, 17 * s); 
	fill('#1a1a2a'); 
	ellipse(x - 13 * s, y - 5 * s, 10 * s, 10 * s);
    stroke('#1a1a2a'); 
	strokeWeight(3 * s); 
	noFill(); 
	arc(x + 14 * s, y - 4 * s, 16 * s, 12 * s, PI, TWO_PI);
  } else if (isSleep) {
    stroke('#1a1a2a'); 
	strokeWeight(2.5 * s); 
	noFill();
    arc(x - 14 * s, y - 4 * s, 14 * s, 10 * s, 0, PI); 
	arc(x + 14 * s, y - 4 * s, 14 * s, 10 * s, 0, PI);
  } else if (isExtremeAngry) {
    fill('#ffdddd'); 
	noStroke(); 
	ellipse(x - 14 * s, y - 4 * s, 20 * s, 19 * s); 
	ellipse(x + 14 * s, y - 4 * s, 20 * s, 19 * s);
    fill('#dc143c'); 
	ellipse(x - 12 * s, y - 6 * s, 12 * s, 12 * s); 
	ellipse(x + 16 * s, y - 6 * s, 12 * s, 12 * s);
    fill('#000'); 
	ellipse(x - 12 * s, y - 6 * s, 5 * s, 5 * s); 
	ellipse(x + 16 * s, y - 6 * s, 5 * s, 5 * s);
  } else {
    fill('#fff'); 
	noStroke(); 
	ellipse(x - 14 * s, y - 4 * s, 18 * s, 17 * s); 
	ellipse(x + 14 * s, y - 4 * s, 18 * s, 17 * s);
    fill('#1a1a2a');
    if (isAngry) { ellipse(x - 14 * s, y - 7 * s, 10 * s, 10 * s); 
	ellipse(x + 14 * s, y - 7 * s, 10 * s, 10 * s); }
    else { ellipse(x - 13 * s, y - 5 * s, 10 * s, 10 * s); 
	ellipse(x + 15 * s, y - 5 * s, 10 * s, 10 * s); }
    fill('#fff'); 
	ellipse(x - 11 * s, y - 7 * s, 4 * s, 4 * s); 
	ellipse(x + 17 * s, y - 7 * s, 4 * s, 4 * s);
  }

  if (!isAngry && !isExtremeAngry && !isWink) {
    fill(255, 160, 160, 120); 
	noStroke(); 
	ellipse(x - 26 * s, y + 8 * s, 16 * s, 10 * s); 
	ellipse(x + 26 * s, y + 8 * s, 16 * s, 10 * s);
  } else if (isExtremeAngry) {
    fill(255, 60, 0, 90); 
	noStroke(); 
	ellipse(x - 24 * s, y + 10 * s, 14 * s, 14 * s); 
	ellipse(x + 24 * s, y + 10 * s, 14 * s, 14 * s);
  }

  if (isExtremeAngry) { stroke('#ff0000'); 
	strokeWeight(4.5 * s); 
	line(x - 28 * s, y - 18 * s, x - 4 * s, y - 10 * s); 
	line(x + 28 * s, y - 18 * s, x + 4 * s, y - 10 * s); }
  else if (isAngry) { stroke('#2a5a18'); 
	strokeWeight(2.5 * s); 
	line(x - 24 * s, y - 14 * s, x - 6 * s, y - 11 * s); }

  if (isSleep) { stroke('#3a7a28'); 
	strokeWeight(2 * s); 
	noFill(); 
	arc(x + 2 * s, y + 8 * s, 10 * s, 8 * s, 0, PI); }
  else if (isSurprised) { fill('#3a7a28'); 
	noStroke(); 
	ellipse(x + 2 * s, y + 8 * s, 12 * s, 16 * s); }
  else if (isWink) { stroke('#3a7a28'); 
	strokeWeight(2.5 * s); fill('#ff9999'); 
	arc(x + 2 * s, y + 4 * s, 22 * s, 18 * s, 0, PI, CHORD); }
  else if (isExtremeAngry) {
    stroke('#204010'); 
	strokeWeight(3.5 * s); 
	noFill(); 
	line(x - 12 * s, y + 12 * s, x + 16 * s, y + 10 * s);
    stroke('#ff3000'); 
	strokeWeight(1.5 * s); 
	line(x - 8 * s, y + 8 * s, x - 4 * s, y + 14 * s); 
	line(x + 4 * s, y + 7 * s, x + 8 * s, y + 13 * s);
  } else if (isAngry) { stroke('#2a5a18'); 
	strokeWeight(2.5 * s); 
	noFill(); 
	line(x - 8 * s, y + 10 * s, x + 12 * s, y + 8 * s); }
  else { stroke('#3a7a28'); 
	strokeWeight(2 * s); 
	noFill(); 
	arc(x + 2 * s, y + 6 * s, 20 * s, 14 * s, 0, PI); }

  stroke('#5db845'); 
	strokeWeight(2.5 * s); 
	noFill();
  if (isAngry || isExtremeAngry) {
    line(x - 8 * s, y - 32 * s, x - 22 * s, y - 54 * s); 
    line(x + 12 * s, y - 32 * s, x + 26 * s, y - 56 * s);
    fill('#ff3030'); 
	noStroke(); 
	ellipse(x - 22 * s, y - 56 * s, 11 * s, 11 * s); 
	ellipse(x + 26 * s, y - 56 * s, 11 * s, 11 * s);
  } else {
    line(x - 8 * s, y - 32 * s, x - 18 * s, y - 54 * s); 
	line(x + 12 * s, y - 32 * s, x + 22 * s, y - 56 * s);
    fill('#ff9040'); 
	noStroke(); 
	ellipse(x - 18 * s, y - 56 * s, 10 * s, 10 * s); 
	ellipse(x + 22 * s, y - 56 * s, 10 * s, 10 * s);
  }

  if (!isExtremeAngry) {
    push(); 
	translate(x + 44 * s, y + 12 * s); 
	rotate(-0.3);
    fill('#e8c84a');
	 stroke('#b09020'); 
	strokeWeight(1 * s); 
	rect(-18 * s, -26 * s, 36 * s, 48 * s, 2 * s);
    fill('#f8f0c0'); 
	noStroke(); 
	rect(-14 * s, -22 * s, 28 * s, 40 * s);
    stroke('#c0a840'); s
	trokeWeight(0.5 * s);
    for (let i = 0; i < 5; i++) line(-10 * s, (-16 + i * 8) * s, 10 * s, (-16 + i * 8) * s);
    pop();
  }
}

// 악당 캐릭터
function drawVillainCharacter(x, y, size, isHeadOnly, isScared) {
  let s = size / 100;
  if (!isHeadOnly) {
    fill('#1a0a2e'); 
	noStroke();
    beginShape(); 
	vertex(x - 70 * s, y + 120 * s); 
	vertex(x - 80 * s, y - 20 * s); 
	vertex(x - 40 * s, y - 60 * s);
    vertex(x, y - 70 * s); 
	vertex(x + 40 * s, y - 60 * s); 
	vertex(x + 80 * s, y - 20 * s); 
	vertex(x + 70 * s, y + 120 * s); 
	endShape(CLOSE);
    fill('#0d0618');
    beginShape();
	vertex(x - 50 * s, y + 120 * s); 
	vertex(x - 55 * s, y + 10 * s); 
	vertex(x - 28 * s, y - 50 * s);
    vertex(x, y - 58 * s); 
	vertex(x + 28 * s, y - 50 * s); 
	vertex(x + 55 * s, y + 10 * s); 
	vertex(x + 50 * s, y + 120 * s); 
	endShape(CLOSE);
    fill('#2a1050'); 
	noStroke();
    beginShape(); 
	vertex(x - 40 * s, y - 55 * s); 
	vertex(x - 50 * s, y - 80 * s); 
	vertex(x - 28 * s, y - 90 * s);
    vertex(x, y - 65 * s); 
	vertex(x + 28 * s, y - 90 * s); 
	vertex(x + 50 * s, y - 80 * s); 
	vertex(x + 40 * s, y - 55 * s); 
	endShape(CLOSE);
    fill('#221030'); 
	noStroke(); 
	ellipse(x, y - 10 * s, 80 * s, 100 * s);
  }

  fill('#2a1e38'); 
	noStroke(); 
	ellipse(x, y - 80 * s, 76 * s, 84 * s);
  fill('#332444'); 
	ellipse(x, y - 82 * s, 68 * s, 76 * s);

  if (isScared) {
    fill('#fff'); 
	noStroke(); 
	ellipse(x - 18 * s, y - 86 * s, 24 * s, 22 * s); 
	ellipse(x + 18 * s, y - 86 * s, 24 * s, 22 * s);
    fill('#000'); 
	let shake = random(-2, 2); 
	ellipse(x - 18 * s + shake, y - 86 * s, 6 * s, 6 * s); 
	ellipse(x + 18 * s + shake, y - 86 * s, 6 * s, 6 * s);
    stroke('#443355'); 
	strokeWeight(3 * s); 
	noFill();
    line(x - 26 * s, y - 102 * s, x - 10 * s, y - 96 * s); 
	line(x + 26 * s, y - 102 * s, x + 10 * s, y - 96 * s);
    fill('#1a0515'); 
	stroke('#ff3355'); 
	strokeWeight(2); 
	ellipse(x, y - 56 * s, 26 * s, 34 * s);
  } else {
    fill('#000'); 
	ellipse(x - 18 * s, y - 86 * s, 22 * s, 18 * s); 
	ellipse(x + 18 * s, y - 86 * s, 22 * s, 18 * s);
    fill('#cc0000'); 
	ellipse(x - 18 * s, y - 86 * s, 14 * s, 12 * s); 
	ellipse(x + 18 * s, y - 86 * s, 14 * s, 12 * s);
    fill(255, 0, 0, 60); 
	noStroke(); 
	ellipse(x - 18 * s, y - 86 * s, 30 * s, 26 * s); 
	ellipse(x + 18 * s, y - 86 * s, 30 * s, 26 * s);
    fill(255, 180, 100, 180); 
	ellipse(x - 15 * s, y - 89 * s, 5 * s, 4 * s); 
	ellipse(x + 21 * s, y - 89 * s, 5 * s, 4 * s);
    stroke('#ff2000'); 
	strokeWeight(2.5 * s); 
	noFill();
    line(x - 26 * s, y - 96 * s, x - 10 * s, y - 93 * s); 
	line(x + 10 * s, y - 93 * s, x + 26 * s, y - 96 * s);
    fill('#1a1028'); 
	noStroke(); 
	triangle(x, y - 74 * s, x - 6 * s, y - 62 * s, x + 6 * s, y - 62 * s);
    stroke('#8040a0'); 
	strokeWeight(2 * s); 
	noFill(); 
	line(x - 16 * s, y - 56 * s, x + 16 * s, y - 56 * s);
    fill('#c0b0d0'); 
	noStroke(); 
	rect(x - 6 * s, y - 58 * s, 5 * s, 4 * s, 1 * s); 
	rect(x + 1 * s, y - 58 * s, 5 * s, 4 * s, 1 * s);
  }

  fill('#120820'); 
	noStroke(); 
	ellipse(x, y - 122 * s, 90 * s, 20 * s);
  fill('#0e0618'); 
	rect(x - 30 * s, y - 180 * s, 60 * s, 62 * s, 4 * s);
  fill('#1a0c2e'); 
	rect(x - 28 * s, y - 178 * s, 56 * s, 8 * s); 
	fill('#8040c0'); 
	rect(x - 8 * s, y - 177 * s, 16 * s, 8 * s, 2 * s);

  if (!isHeadOnly) {
    stroke('#1a0a28'); 
	strokeWeight(12 * s); 
	noFill(); 
	line(x - 36 * s, y - 30 * s, x - 70 * s, y + 40 * s);
    stroke('#3a2858'); 
	strokeWeight(5 * s); 
	line(x - 70 * s, y + 38 * s, x - 100 * s, y + 100 * s);
    fill('#9060d0'); 
	noStroke(); 
	ellipse(x - 70 * s, y + 38 * s, 16 * s, 16 * s); 
	fill('#c090ff'); 
	ellipse(x - 68 * s, y + 35 * s, 6 * s, 6 * s);
    fill(160, 80, 255, 80); 
	noStroke(); 
	ellipse(x - 70 * s, y + 38 * s, 30 * s, 30 * s);
    stroke('#1a0a28'); 
	strokeWeight(12 * s); 
	noFill(); 
	line(x + 36 * s, y - 30 * s, x + 65 * s, y + 30 * s);
    stroke('#2a1840'); 
	strokeWeight(3 * s);
    line(x + 65 * s, y + 30 * s, x + 72 * s, y + 18 * s); 
	line(x + 65 * s, y + 30 * s, x + 75 * s, y + 28 * s);
  }
}
