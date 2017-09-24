var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var lines=3;
var BricksArray= [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

class Bricks {
  constructor(line,width,visible,xcood,ycood) {
      this.line= line;
      this.width = width;
      this.height;
      this.xcood=xcood;
      this.ycood=ycood;
      this.visible=visible;
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

function resetBall() {
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height-30, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function resetPaddle() {
    ctx.beginPath();
    ctx.rect((canvas.width-paddleWidth)/2, canvas.height-paddleHeight, paddleWidth, paddleHeight);
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

function drawBricks() {
  
  for( var z=0; z<BricksArray.length; z++)
  {
      if(BricksArray[z].visible==1)  
      {  ctx.beginPath();   
        ctx.rect(BricksArray[z].xcood+5, BricksArray[z].ycood+5, BricksArray[z].width-5, 20);
        ctx.fillStyle = "#841F27";
        ctx.fill();
        ctx.closePath();
      }
  }
}
  
  
 /* ctx.beginPath();
    for (var r = 1; r <= 3; r++) {
      for (var i = 0; i < BricksArray[r].length; i++) {
        Bricks.xcood = i * BricksArray[r].width;
        Bricks.ycood = r * height;
        ctx.rect(Bricks.xcood, Bricks.ycood, BricksArray[r].width, height);
        ctx.fillStyle = "#841F27";
        ctx.fill();
      }
    }
    ctx.closePath();
    
}
*/
function initializeBricks()
{
    var randomBricks=[7,8,5];
    
    var a=0;
    for(var i=0; i<3;i++)
    {
        var brickwidth= 495/randomBricks[i];
        for( var j=0 ;j<randomBricks[i];j++)
        {
             BricksArray[a]= new Bricks(i+1,brickwidth,1, j*brickwidth, 25*i);
             a++;
        }
    }
}

 function ballcollision()
{
     for( var i=0;i<BricksArray.length; i++)
     {
        if( ((x+dx) > (BricksArray[i].xcood) )&& ( (x+dx) < (BricksArray[i].xcood + BricksArray[i].width) ))
            if(((y+dy) > (BricksArray[i].ycood) )&& ((y+dy) < (BricksArray[i].ycood+25)))
            {
               if(BricksArray[i].visible==1)
               {
                 BricksArray[i].visible=0;
                dy=-dy;
               }
            }
     }
  
}

    
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    ballcollision();
    drawBricks();
    
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
           if((x-paddleX)<25 || (x-paddleX>75))
             dx=-dx;
           dy = -dy;
        }
        else {         
            alert("GAME OVER");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            resetBall();
            resetPaddle();
            initializeBricks();
            
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
initializeBricks();
setInterval(draw, 10);
