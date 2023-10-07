var canvas = document.getElementById("myCanvas"); // nombre referencia para el index y el API Canvas
var ctx = canvas.getContext("2d");

function myGame(cv, ctxt){

    var ballRadius = 10;  //variable delimita el radio de la bolita

//definir punto inicio de juego
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
//definicion de la pala para pegar a la pelota
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
//variables para permitir al usuario controlar la pala
var rightPressed = false;
var leftPressed = false;
this.gameover = false;

//variables de los ladrillos

//variable marcador

let score = 0;
let speed =20;
let delay =0;
let level =1;


document.addEventListener("keydown", keyDownHandler, false); //keydown detecta cuando presiono teclado
document.addEventListener("keyup", keyUpHandler, false);    //keyup detecta cuando dejo de presionar teclado

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
//crear bolita
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
//funcion para crear pala 
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "rgb(155,110,5)";
    ctx.fill();
    ctx.closePath();
}
// funcion para crear el marcador y ver la velocidad

function drawScore() {
    ctx.font = "bold 15px Arial";
    ctx.fillStyle = "rgb(255,255,220)";
    ctx.fillText("Score: "+score, 8, 20);
    ctx.fillText("Level: "+level, 8, 40);
  }
 //movimiento bolita


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
     //limites y rebote de bolita por colision en muros izquierdo derecho
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //limites y rebote de bolita por colision en muros arriba  abajo
    // if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    //     dy = -dy;
    // }

    //quito el limite inferior 
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
            
            if(score % 2 == 0){changeSpeed();nivel++; }
            
            
        }
        else {
            ctx.fillStyle = 'rgb(255,255,0)';
			ctx.font = 'bold 20px Arial';
			ctx.fillText('Game Over', canvas.width / 2 - 40, canvas.height / 2);
            //alert("GAME OVER");
            //gameover == true;
            //document.location.reload();
            clearInterval(interval); // alerta al sobrepasar el limite inferior
        }
    }

    
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    
    x += dx;
    y += dy;

    
}


// funcion autogenerada hasta que sea detenida

    let t = 14;
   // var interval;

    function changeTimer() {
    speed = speed / 1.2;
    }

    function changeSpeed() {
 
        // Limpia el previo setInterval timer
        clearInterval(interval);
                 
        changeTimer();
        interval = setInterval(draw, speed);
        
        }

    var interval = setInterval(draw, speed);
       
    
};

function checkCanvasIsSupported() {
    //let s=15;
	//canvas = document.getElementById("myCanvas");
	canvas.width = 640;
	canvas.height = 380;
	//canvas.style.cursor = "none";
	if (canvas.getContext) {
		context = canvas.getContext('2d');
        gameCesde = new myGame(canvas, context);
        

		} else {
		alert("Lo siento, Tu navegador no soporta canvas.");
	}
}






