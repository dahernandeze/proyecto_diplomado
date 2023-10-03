var canvas = document.getElementById("myCanvas"); // nombre referencia para el index y el API Canvas
var ctx = canvas.getContext("2d");
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


//variables de los ladrillos

//variable marcador

let score = 0;
let speed =12;
let delay =0;


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
    ctx.fillStyle = "#121212";
    ctx.fill();
    ctx.closePath();
}
//funcion para crear pala 
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#121212";
    ctx.fill();
    ctx.closePath();
}
// funcion para crear el marcador y ver la velocidad

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#121212D";
    ctx.fillText("Score: "+score, 8, 20);
    //ctx.fillText("Speed: "+speed, 8, 40);
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
            
            
            
        }
        else {
            alert("GAME OVER");
            document.location.reload();
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

if (score % 2){
    speed = speed-1;
}
 var interval = setInterval(draw, speed);





