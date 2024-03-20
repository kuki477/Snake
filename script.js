var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

//segment gry
const box = 20;

let gameOver = false;
let victory = false;
let chodzenie;
let score = 0;



let snake = [{
  x: 10 * 20,
  y: 10 * 20
}];
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
console.log(snake);
console.log(food);

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  game = setInterval(draw, 100);
}

function restartGame() {
  victory = false;
  gameOver = false;
  chodzenie = undefined;
  score = 0;
  snake = [{
    x: 10 * 20,
    y: 10 * 20
  }];
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };

  document.getElementById("restartButton").style.display = "none";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("victory").style.display = "none";
  document.getElementById("score").innerText = "Punkty: 0";

  game = setInterval(draw, 100);
}

document.addEventListener("keydown", direction);
function direction(event) {
  if (event.keyCode == 37 && chodzenie != "RIGHT") {
    //37 lewo 65
    chodzenie = "LEFT";
  } else if (event.keyCode == 38 && chodzenie != "DOWN") {
    //38 góra 87
    chodzenie = "UP";
  } else if (event.keyCode == 39 && chodzenie != "LEFT") {
    //39 prawo 68
    chodzenie = "RIGHT";
  } else if (event.keyCode == 40 && chodzenie != "UP") {
    //40 dół 83
    chodzenie = "DOWN";
  }
}

function kolizja(newHead, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
      return true;
    }
  }
  return false;
}
function draw() {
  if (victory) return;
  if (gameOver) return;

  //czyszczenie canvasa
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "darkgreen" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  //losowanie pozycji jedzenie na canvasie
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Pobranie pozycji głowy węża.
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Zmiana pozycji węża na podstawie kierunku (chodzenie).
  if (chodzenie == "LEFT") snakeX -= box;
  if (chodzenie == "UP") snakeY -= box;
  if (chodzenie == "RIGHT") snakeX += box;
  if (chodzenie == "DOWN") snakeY += box;

  //jedzenie jedzenia
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
    document.getElementById("score").innerText = "Punkty: " + score;
  } else {
    snake.pop();
  }
  let newHead = { x: snakeX, y: snakeY };
  if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || kolizja(newHead, snake)) {
    clearInterval(game);
    gameOver = true;
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("restartButton").style.display = "block";
  }
  if (score == 10) {
    clearInterval(game);
    victory = true;
    document.getElementById("victory").style.display = "block";
    document.getElementById("restartButton").style.display = "block";
  }

  snake.unshift(newHead);
}

