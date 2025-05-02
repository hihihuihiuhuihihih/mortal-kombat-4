const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerSize = 40;
const attackRange = 20;
const speed = 3;
const maxHealth = 100;

let keys = {};

const player1 = {
  x: 100,
  y: 180,
  color: 'blue',
  health: maxHealth,
  attacking: false
};

const player2 = {
  x: 660,
  y: 180,
  color: 'red',
  health: maxHealth,
  attacking: false
};

document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => {
  keys[e.code] = false;
  if (e.code === 'KeyE') player1.attacking = false;
  if (e.code === 'ShiftRight') player2.attacking = false;
});

function movePlayers() {
  // Player 1 - WASD
  if (keys['KeyW']) player1.y -= speed;
  if (keys['KeyS']) player1.y += speed;
  if (keys['KeyA']) player1.x -= speed;
  if (keys['KeyD']) player1.x += speed;
  if (keys['KeyE']) player1.attacking = true;

  // Player 2 - Arrows
  if (keys['ArrowUp']) player2.y -= speed;
  if (keys['ArrowDown']) player2.y += speed;
  if (keys['ArrowLeft']) player2.x -= speed;
  if (keys['ArrowRight']) player2.x += speed;
  if (keys['ShiftRight']) player2.attacking = true;
}

function checkAttacks() {
  const distX = player1.x - player2.x;
  const distY = player1.y - player2.y;
  const distance = Math.hypot(distX, distY);

  if (player1.attacking && distance < playerSize + attackRange) {
    player2.health -= 1;
  }

  if (player2.attacking && distance < playerSize + attackRange) {
    player1.health -= 1;
  }
}

function drawPlayer(player) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, playerSize, playerSize);
}

function drawHealthBars() {
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText("P1 Health: " + player1.health, 10, 20);
  ctx.fillText("P2 Health: " + player2.health, 680, 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayers();
  checkAttacks();
  drawPlayer(player1);
  drawPlayer(player2);
  drawHealthBars();

  if (player1.health <= 0 || player2.health <= 0) {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    const winner = player1.health <= 0 ? "Player 2 Wins!" : "Player 1 Wins!";
    ctx.fillText(winner, 300, 200);
  } else {
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
