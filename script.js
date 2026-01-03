const width = 20;
const height = 15;
let shipX = Math.floor(width / 2);
let rocks = [];
let tick = 0;
let speed = 300;
let alive = true;

const screen = document.getElementById("screen");

function draw() {
  let grid = Array.from({ length: height }, () =>
    Array(width).fill(" ")
  );

  // Place rocks
  rocks.forEach(r => {
    if (r.y >= 0 && r.y < height) grid[r.y][r.x] = "#";
  });

  // Place ship
  grid[height - 1][shipX] = "^";

  screen.textContent = grid.map(row => row.join("")).join("\n");
}

function update() {
  if (!alive) return;

  tick++;

  // Move rocks
  rocks.forEach(r => r.y++);

  // Remove off-screen rocks
  rocks = rocks.filter(r => r.y < height);

  // Spawn new rock
  if (tick % 3 === 0) {
    rocks.push({ x: Math.floor(Math.random() * width), y: 0 });
  }

  // Collision detection
  for (let r of rocks) {
    if (r.y === height - 1 && r.x === shipX) {
      alive = false;
      screen.textContent += "\n\n💥 GAME OVER";
      return;
    }
  }

  draw();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && shipX > 0) shipX--;
  if (e.key === "ArrowRight" && shipX < width - 1) shipX++;
});

setInterval(update, speed);
draw();