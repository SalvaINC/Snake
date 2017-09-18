var c = document.getElementById("windows");
window.addEventListener('keydown',this.down,false);
var ctx = c.getContext("2d");


var x = 140, y = 90, dirX = 0, dirY = 0, speed = 10;
var foodX = foodPosition(20);
var foodY = foodPosition(20);
var dead = false;

function down(e) {
    dirY = 0;
    dirX = 0;

    if(e.keyCode == 38) dirY = -speed;
    if(e.keyCode == 40) dirY = speed;
    if(e.keyCode == 37) dirX = -speed;
    if(e.keyCode == 39) dirX = speed;
  
    if(dead && e.keyCode == 78) restart();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
  
  await sleep(20 + 3*Math.max(10,20-tail.length));
  
  ctx.clearRect(0, 0, 300, 200);
  ctx.beginPath();
    
  if(!dead) {
  snakeFood();
  drawTail();

  x = (x+dirX)%300;
  y = (y+dirY)%200;
    
  collision();

  if(x < 0) x = 290;
  if(y < 0) y = 190;

  ctx.rect(0,0,300,200);
  ctx.rect(x,y,10,10);
  ctx.rect(foodX,foodY,10,10);
  ctx.stroke();
  }
  
  if(!dead) loop();
  else {
    ctx.clearRect(0, 0, 300, 200);
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText("Game over :-/",10,50);
    ctx.fillText("Score: " + tail.length/2,10,80);
    ctx.font = "15px Arial";
    ctx.fillText("press N for new game",10,110);
  }
}

function collision () {
  for(i = 0; i < tail.length; i++)
    if(tail[i] == x && tail[i+1] == y)
      dead = true;
}

function drawTail() {
  if(tail.length == 0) return;
  for(i = tail.length-1; i > 2; i-=2) {
    tail[i] = tail[i-2];
    tail[i-1] = tail[i-3];
  }
  tail[0] = x;
  tail[1] = y;
  for(i = 0; i < tail.length; i+=2){
    ctx.rect(tail[i],tail[i+1],10,10);
  }
}

function snakeFood() {
  if(x == foodX && y == foodY) {
    tail[tail.length] = 0;
    tail[tail.length] = 0;
    foodX = foodPosition(30);
    foodY = foodPosition(20);
  }
}

function foodPosition(max){
  return Math.floor(Math.random() * max)*10;
}

function restart() {
  tail = [];
  x = 140;
  y = 90;
  dead = false;
  loop();
}

var tail = [];
loop();
