var c = document.getElementById("windows");
window.addEventListener('keydown',this.down,false);
var ctx = c.getContext("2d");


var x = 140, y = 90, dirX = 0, dirY = 0, speed = 10;
var up = false, down = false, right = false, left = false;

function down(e) {
    dirY = 0;
    dirX = 0;

    if(e.keyCode == 38) dirY = -speed;
    if(e.keyCode == 40) dirY = speed;
    if(e.keyCode == 37) dirX = -speed;
    if(e.keyCode == 39) dirX = speed;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
  await sleep(50);

  x = (x+dirX)%300;
  y = (y+dirY)%200;

  if(x < 0) x = 290;
  if(y < 0) y = 190;

  ctx.clearRect(0, 0, 300, 200);
  ctx.beginPath();

  ctx.rect(0,0,300,200);
  ctx.rect(x,y,10,10);
  ctx.stroke();
  loop();
}

loop();
