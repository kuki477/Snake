var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
let foodRand = Math.floor(Math.random() * 4);
console.log(foodRand);
//segment gry
const box = 20;

let gameOver = false;
let victory = false;
let chodzenie;
let score = 0;


//pozycja snakea
let snake = [{
  x: 10 * 20,
  y: 10 * 20
}];

//losowanie pozycji jedzenia
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

//wyswietlenie wspolrzednych w konsoli
console.log(snake);
console.log(food);

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const settingsButton = document.getElementById("settingsButton");
const exitButton = document.getElementById("exitButton");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
settingsButton.addEventListener("click", settings);
exitButton.addEventListener("click", exit);

//tlo zmieniacz
var wybranyBackground = document.getElementById('pickerbackground');
wybranyBackground.addEventListener('change', zmianaBackground);

function zmianaBackground() {
  var wybranyValue = wybranyBackground.value;


  switch (wybranyValue) {
    case '1':
      document.body.style.backgroundColor = '#222'; // Domyślny kolor
      document.body.style.backgroundImage = 'none';
      break;
    case '2':
      document.body.style.backgroundImage = "url('assets/backgrounds/Blue.png')";
      break;
    case '3':
      document.body.style.backgroundImage = "url('assets/backgrounds/Brown.png')";
      break;
    case '4':
      document.body.style.backgroundImage = "url('assets/backgrounds/Gray.png')";
      break;
    case '5':
      document.body.style.backgroundImage = "url('assets/backgrounds/Green.png')";
      break;
    case '6':
      document.body.style.backgroundImage = "url('assets/backgrounds/Pink.png')";
      break;
    case '7':
      document.body.style.backgroundImage = "url('assets/backgrounds/Purple.png')";
      break;
    case '8':
      document.body.style.backgroundImage = "url('assets/backgrounds/Yellow.png')";
      break;
    default:
      document.body.style.backgroundColor = '#222'; // Domyślny kolor
  }
}
var wybranyBackgroundCanvas = document.getElementById('picker');
wybranyBackgroundCanvas.addEventListener('change', zmiana);

function zmiana() {
  var wybranyValue = wybranyBackgroundCanvas.value;


  switch (wybranyValue) {
    case '1':
      canvas.style.backgroundColor = '#222'; // Domyślny kolor
      canvas.style.backgroundImage = 'none';
      break;
    case '2':
      canvas.style.backgroundImage = "url('assets/backgrounds/Blue.png')";
      break;
    case '3':
      canvas.style.backgroundImage = "url('assets/backgrounds/Brown.png')";
      break;
    case '4':
      canvas.style.backgroundImage = "url('assets/backgrounds/Gray.png')";
      break;
    case '5':
      canvas.style.backgroundImage = "url('assets/backgrounds/Green.png')";
      break;
    case '6':
      canvas.style.backgroundImage = "url('assets/backgrounds/Pink.png')";
      break;
    case '7':
      canvas.style.backgroundImage = "url('assets/backgrounds/Purple.png')";
      break;
    case '8':
      canvas.style.backgroundImage = "url('assets/backgrounds/Yellow.png')";
      break;
    default:
      canvas.style.backgroundColor = '#222'; // Domyślny kolor
  }
}


function exit() {
  document.getElementById("menu").style.display = "inline-flex";
  document.getElementById("ustawienia").style.display = "none";
}

function settings() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("ustawienia").style.display = "block";
}

//funkcja startowania gry
function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  document.getElementById("score").style.display = "block";
  game = setInterval(draw, 100);
}

//funkcja resetowania gry
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

//zmiana wartosci zmiennej chodzenie poprzez klikniecia danego przycisku
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

//kiedy snake walnie w samego siebie wtedy ta funkcja zwraca wartosc true i kolizja ze samym soba zostanie wykryta
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
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // losowanie pozycji jedzenie na canvasie
  //ctx.fillStyle = "red";
  //ctx.fillRect(food.x, food.y, box, box);
  //ctx.strokeRect(food.x, food.y, box, box);

  const image = new Image();
  if (foodRand == "0") {
    image.src = "assets/fruits/cherry.png";
    image.onload = function () {
      ctx.drawImage(image, food.x, food.y, box, box)
    }
  }
  if (foodRand == "1") {
    image.src = "assets/fruits/apple.png";
    image.onload = function () {
      ctx.drawImage(image, food.x, food.y, box, box)
    }
  }
  if (foodRand == "2") {
    image.src = "assets/fruits/lemon.png";
    image.onload = function () {
      ctx.drawImage(image, food.x, food.y, box, box)
    }
  }
  if (foodRand == "3") {
    image.src = "assets/fruits/orange.png";
    image.onload = function () {
      ctx.drawImage(image, food.x, food.y, box, box)
    }
  }



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
    foodRand = Math.floor(Math.random() * 4);
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };

    document.getElementById("score").innerText = "Punkty: " + score;
    var audio = new Audio('assets/audio/blip.mp3');
    audio.volume = 0.2;
    audio.play();
  } else {
    snake.pop();
  }


  let newHead = { x: snakeX, y: snakeY };

  //system zakonczenia gry kiedy kolizja zostanie wykryta
  if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || kolizja(newHead, snake)) {
    clearInterval(game);
    gameOver = true;
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("restartButton").style.display = "block";
    var audio = new Audio('assets/audio/gameover.mp3');
    audio.volume = 0.4
    audio.play();

  }

  //jaki wynik jest potrzebny do wygrania
  if (score == 25) {
    clearInterval(game);
    victory = true;
    document.getElementById("victory").style.display = "block";
    document.getElementById("restartButton").style.display = "block";
    var audio = new Audio('assets/audio/victory.mp3');
    audio.volume = 0.4
    audio.play();

  }

  snake.unshift(newHead);
}

