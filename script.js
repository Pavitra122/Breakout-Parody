var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var lines=3;
var BricksArray= [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

class Bricks {
  constructor(line,width,visible) {
      this.line= line;
      this.width = width;
      this.height;
      this.xcood;
      this.ycood;
      this.visible=visible
  }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function initializeBricks()
{
    var randomBricks=[7,8,5];
    var BricksArray= [];
    var j=0;
    for(var i=0; i<3;i++)
    {
        var brickwidth= 500/randomBricks[i];
        for( ;j<randomBricks[i];j++)
        {
             BricksArray[j]=Bricks(i+1,brickwidth,1);
             
        }
    }
}

 function ballcollision()
{
     for( var i=0;i<BricksArray.length; i++)
     {
        if( (x+dx) > (BricksArray[i].xcood) && (x+dx) < (BricksArray[i].xcood + BricksArray[i].width) )
            if((y+dy) > (BricksArray[i].ycood) && (y+dy) < (BricksArray[i].ycood+25))
                   BricksArray[i].visible=0;
     }
  draw();
}

    
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);
