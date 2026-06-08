// 04_background.js — 배경 드로잉 (도서관, 씬별 배경)

let libraryShelves = [];

// 도서관 배경 생성 (게임 플레이 중 스크롤 배경)
function generateLibraryBackground() {
  libraryShelves = [];
  randomSeed(99);
  for (let i = 0; i < ceil(6000 / 220); i++) {
    let shelfY = i * 220 + 100, books = [], cx = 50;
    while (cx < windowWidth * 0.32) {
      let bW = random(12, 28), bH = random(80, 150);
      if (cx + bW > windowWidth * 0.32) break;
      books.push({ x: cx, w: bW, h: bH, r: random(20, 60), g: random(25, 70), b: random(40, 90) });
      cx += bW + random(1, 4);
    }
    cx = windowWidth * 0.68;
    while (cx < windowWidth - 50) {
      let bW = random(12, 28), bH = random(80, 150);
      if (cx + bW > windowWidth - 50) break;
      books.push({ x: cx, w: bW, h: bH, r: random(20, 60), g: random(25, 70), b: random(40, 90) });
      cx += bW + random(1, 4);
    }
    libraryShelves.push({ y: shelfY, books });
  }
  randomSeed();
}

function drawLibraryBackground() {
  background(8, 9, 13); 
  stroke(20, 25, 35, 80); 
  strokeWeight(1);
  for (let x = 0; x < width; x += 60) line(x, 0, x, height + cameraY);
  for (let shelf of libraryShelves) {
    noStroke();
    for (let book of shelf.books) {
      fill(book.r, book.g, book.b, 45); 
      rect(book.x, shelf.y - book.h, book.w, book.h, 2, 2, 0, 0);
      if (book.w > 18) { fill(book.r + 20, book.g + 20, book.b + 20, 30); rect(book.x + 4, shelf.y - book.h + 10, book.w - 8, book.h - 20); }
    }
    stroke(45, 55, 70, 75); 
    strokeWeight(4); 
    line(30, shelf.y, width - 30, shelf.y);
    stroke(0, 0, 0, 100); 
    strokeWeight(2); 
line(30, shelf.y + 3, width - 30, shelf.y + 3);
  }
  stroke(35, 42, 55, 60); strokeWeight(8);
  line(width * 0.32 + 10, 0, width * 0.32 + 10, 6000);
  line(width * 0.68 - 10, 0, width * 0.68 - 10, 6000);
}

// 심플 배경 (타이틀 / 프롤로그 / 엔딩 등)
function drawLibraryBackgroundSimple() {
  background(18, 12, 8); 
  fill(10, 16, 26); 
  stroke(35, 25, 20); 
  strokeWeight(6);
  let winW = 240, winH = 260;
  rect(width / 2 - winW / 2, height / 2 - winH / 2 - 50, winW, winH);
  line(width / 2, height / 2 - winH / 2 - 50, width / 2, height / 2 + winH / 2 - 50);
  line(width / 2 - winW / 2, height / 2 - 50, width / 2 + winW / 2, height / 2 - 50);
  fill(240, 240, 180); 
  noStroke(); 
  ellipse(width / 2 + 60, height / 2 - winH / 2 - 10, 20, 20);
  fill(10, 16, 26); 
  ellipse(width / 2 + 54, height / 2 - winH / 2 - 10, 18, 20);
  fill(45, 25, 15); 
  stroke(20, 10, 5); 
  strokeWeight(3);
  rect(40, height / 2 - 220, 180, 420); 
  rect(width - 220, height / 2 - 220, 180, 420);
  drawBooksInShelf(40, height / 2 - 220, 180, 420, 4);
  drawBooksInShelf(width - 220, height / 2 - 220, 180, 420, 4);
  fill(60, 35, 20); 
  stroke(30, 15, 10); 
  strokeWeight(2);
  rect(width / 2 - 250, height / 2 + 120, 500, 25);
  rect(width / 2 - 230, height / 2 + 145, 25, 70);
  rect(width / 2 + 205, height / 2 + 145, 25, 70);
  fill(10, 15, 20, 200); 
  noStroke(); 
  ellipse(width / 2, height / 2 + 190, 300, 60);
}

function drawBooksInShelf(x, y, w, h, shelfRows) {
  let rowH = h / shelfRows;
  let bookColors = ['#A34845','#3A6073','#4F8A8B','#D9A74A','#8B4513','#60696B','#53354A','#2B580C','#654062'];
  randomSeed(12345);
  for (let r = 0; r < shelfRows; r++) {
    let curY = y + r * rowH + rowH - 6, curX = x + 6;
    while (curX < x + w - 12) {
      let bW = random(7, 14), bH = random(rowH * 0.5, rowH * 0.85);
      if (curX + bW > x + w - 6) break;
      fill(random(bookColors)); 
      stroke(15, 10, 5, 100); 
      strokeWeight(1); 
      rect(curX, curY - bH, bW, bH, 1);
      if (bW > 10 && random() > 0.4) { stroke(255, 50); line(curX + bW / 2, curY - bH + 4, curX + bW / 2, curY - 4); }
      curX += bW + random(1, 3);
    }
  }
  randomSeed();
}

// 씬별 특수 배경
function drawDoorBackground() {
 	background(15, 10, 8); 
	fill(35, 20, 12); 
	stroke(10); 
	strokeWeight(3);
	rect(20, 40, width * 0.2, height - 80); 
	drawBooksInShelf(20, 40, width * 0.2, height - 80, 5);
  let doorX = width * 0.6, doorW = width * 0.25, doorH = height - 160, doorY = 80;
  for (let i = 50; i > 0; i--) { fill(255, 220, 100, map(i, 0, 50, 5, 0)); noStroke(); rect(doorX - i * 2, doorY - i, doorW + i * 4, doorH + i * 2, 10); }
	fill(50, 30, 15); 
	stroke(25, 12, 5); 
	strokeWeight(5); 
	rect(doorX, doorY, doorW, doorH, 4);
	
	fill(255, 235, 130); 
	noStroke(); 
	rect(doorX + 10, doorY + 10, 25, doorH - 20);
	
	fill(75, 45, 25); 
	stroke(35, 20, 10); 
	strokeWeight(3); 
	rect(doorX + 35, doorY + 5, doorW - 40, doorH - 10, 2);
	
	fill(210, 160, 50); 
	circle(doorX + 50, doorY + doorH / 2, 12);
}

function drawEatingBackground() {
	background(25, 18, 14); 
	stroke(40, 25, 15); 
	strokeWeight(4); 
	line(0, height * 0.7, width, height * 0.7);
	fill(35, 22, 14); 
	noStroke(); 
	rect(0, height * 0.7, width, height * 0.3);
}

function drawDeskSceneBackground() {
  drawLibraryBackgroundSimple();
	fill(70, 40, 22); 
	stroke(35, 18, 10); 
	strokeWeight(4); 
	rect(width / 2 - 280, height * 0.6, 560, 45, 6);
	
	fill(50, 28, 14); 
	rect(width / 2 - 250, height * 0.6 + 45, 35, 120); 
	rect(width / 2 + 215, height * 0.6 + 45, 35, 120);
  let bookX = width / 2, bookY = height * 0.59;
	
	fill(130, 40, 30); 
	stroke(50, 10, 10); 
	strokeWeight(2); 
	rect(bookX - 105, bookY - 5, 210, 12, 3);

	fill(245, 235, 205); 
	stroke(180, 160, 120);
  quad(bookX - 100, bookY - 5, bookX - 5, bookY - 12, bookX - 5, bookY + 2, bookX - 100, bookY + 5);
  quad(bookX + 5, bookY - 12, bookX + 100, bookY - 5, bookX + 100, bookY + 5, bookX + 5, bookY + 2);
  fill(80, 50, 30); noStroke(); rect(bookX - 5, bookY - 12, 10, 15);
}
