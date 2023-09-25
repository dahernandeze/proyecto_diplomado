// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// var ballRadius = 10;  //variable delimita el radio de la bolita

// //definir punto inicio de juego
// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -2;
// //definicion de la pala para pegar a la pelota
// var paddleHeight = 10;
// var paddleWidth = 75;
// var paddleX = (canvas.width-paddleWidth)/2;
// //variables para permitir al usuario controlar la pala
// var rightPressed = false;
// var leftPressed = false;

// document.addEventListener("keydown", keyDownHandler, false); //keydown detecta cuando presiono teclado
// document.addEventListener("keyup", keyUpHandler, false);    //keyup detecta cuando dejo de presionar teclado

// function keyDownHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }

// function keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }
// //crear bolita
// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
// //funcion para crear pala 
// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
//  //movimiento bolita
// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//     drawPaddle();
//      //limites y rebote de bolita por colision en muros izquierdo derecho
//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
//     //limites y rebote de bolita por colision en muros arriba  abajo
//     // if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//     //     dy = -dy;
//     // }

//     //quito el limite inferior 
//     if(y + dy < ballRadius) {
//         dy = -dy;
//     }
//     else if(y + dy > canvas.height-ballRadius) {
//         if(x > paddleX && x < paddleX + paddleWidth) {
//             dy = -dy;
//         }
//         else {
//             alert("GAME OVER");
//             document.location.reload();
//             clearInterval(interval); // Needed for Chrome to end game
//         }
//     }

    
//     if(rightPressed) {
//         paddleX += 7;
//         if (paddleX + paddleWidth > canvas.width){
//             paddleX = canvas.width - paddleWidth;
//         }
//     }
//     else if(leftPressed) {
//         paddleX -= 7;
//         if (paddleX < 0){
//             paddleX = 0;
//         }
//     }
    
//     x += dx;
//     y += dy;
// }
// //funcion autogenerada hasta que sea detenida
// //setInterval(draw, 100);

// const interval = setInterval(draw, 10);

//----------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------
// Arkanoid game
//
// Author: delimitry

//https://github.com/delimitry/arkanoid-js/blob/master/game.html
//-----------------------------------------------------------------------------------------------------------

function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

var BallDirs = {
	NONE : 0,
	LEFT : 1,
	RIGHT : 2,
	UP : 4,
	DOWN : 8
};

function Ball(x, y, radius, dir, speed) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.dir = BallDirs.NONE;
	this.speed = speed;
}

var BricksTypes = {
	DEFAULT : 1,
	ICE : 1,
	WOOD : 2,
	STONE : 3,
	IRON : 4,
	STEEL : 5
};

function Brick(x, y, width, height, type) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.lifes = type;
}

function Bricks(hor_num, vert_num, brick_width, brick_height) {
	this.bricks = new Array();
	for (var i = 0; i < vert_num; i++) {
		this.bricks[i] = new Array();
		for (var j = 0; j < hor_num; j++) {
			this.bricks[i][j] = new Brick(j * brick_width, i * brick_height, brick_width, brick_height, BricksTypes.DEFAULT);
		}
	}
}

//-----------------------------------------------------------------------------------------------------------
// Arkanoid Game class
//-----------------------------------------------------------------------------------------------------------
function ArkanoidGame(canvas, context) {

	var PADDLE_WIDTH = 60;
	var PADDLE_HEIGHT = 10;
	var PADDLE_SPEED = 1;
	var BALL_RADIUS = 3;
	var BALL_DEFAULT_SPEED = 3;
	var BALL_MAX_SPEED = 6;
	var BRICK_WIDTH = 80;
	var BRICK_HEIGHT = 35;
	var BRICK_SCORE = 100;

	this.level = 0;
	this.lifes = 3;
	this.score = 0;
	this.paddle = new Paddle(canvas.width / 2 - PADDLE_WIDTH / 2, canvas.height - 20, PADDLE_WIDTH, PADDLE_HEIGHT);
	this.ball = new Ball(canvas.width / 2, canvas.height / 2, BALL_RADIUS, BallDirs.NONE, BALL_DEFAULT_SPEED);
	this.gameOver = false;
	this.gameWin = false;
	this.gamePaused = false;
	this.bricks = new Bricks(8, 2, BRICK_WIDTH, BRICK_HEIGHT);

	this.init = function() {
		this.level = 0;
		this.lifes = 3;
		this.score = 0;
		this.gameOver = false;
		this.gameWin = false;
		this.gamePaused = false;
		this.ball.dir = BallDirs.NONE;
		this.initLevel(this.level);
	}

	this.initLevel = function(level) {
		switch (level) {
			case 0:
				this.bricks = new Bricks(8, 2, BRICK_WIDTH, BRICK_HEIGHT);
				for (var i = 0; i < this.bricks.bricks.length; i++) {
					for (var j = 0; j < this.bricks.bricks[i].length; j++) {
						this.bricks.bricks[i][j].lifes = BricksTypes.DEFAULT;
					}
				}
				break;

			case 1:
				this.bricks = new Bricks(8, 2, BRICK_WIDTH, BRICK_HEIGHT);
				for (var i = 0; i < this.bricks.bricks.length; i++) {
					for (var j = 0; j < this.bricks.bricks[i].length; j++) {
						this.bricks.bricks[i][j].lifes = BricksTypes.DEFAULT + i;
					}
				}
				break;

			case 2:
				this.bricks = new Bricks(8, 4, BRICK_WIDTH, BRICK_HEIGHT);
				for (var i = 0; i < this.bricks.bricks.length; i++) {
					for (var j = 0; j < this.bricks.bricks[i].length; j++) {
						this.bricks.bricks[i][j].lifes = BricksTypes.DEFAULT + i;
					}
				}
				break;

			case 3:
				this.bricks = new Bricks(8, 5, BRICK_WIDTH, BRICK_HEIGHT);
				for (var i = 0; i < this.bricks.bricks.length; i++) {
					for (var j = 0; j < this.bricks.bricks[i].length; j++) {
						this.bricks.bricks[i][j].lifes = BricksTypes.DEFAULT + i;
					}
				}
				break;

			default:
				break;
		}
	}

	this.drawBall = function() {
		context.beginPath();
		context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'yellow';
		context.fill();
	}

	this.drawBricks = function() {
		for (var i = 0; i < this.bricks.bricks.length; i++) {
			for (var j = 0; j < this.bricks.bricks[i].length; j++) {
				if (this.bricks.bricks[i][j].lifes > 0) {
					switch (this.bricks.bricks[i][j].lifes) {
						case BricksTypes.ICE: context.fillStyle = 'rgba(220,220,255,0.9)'; break;
						case BricksTypes.WOOD: context.fillStyle = 'rgb(245,155,25)'; break;
						case BricksTypes.STONE: context.fillStyle = 'rgb(55,55,55)'; break;
						case BricksTypes.IRON: context.fillStyle = 'rgb(25,25,85)'; break;
						case BricksTypes.STEEL: context.fillStyle = 'rgb(15,225,255)'; break;
						case BricksTypes.DEFAULT: context.fillStyle = 'rgba(220,220,255,0.9)'; break;
						default: context.fillStyle = 'rgb(255,0,0)';
					}
					context.fillRect(this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width - 2, this.bricks.bricks[i][j].height - 2);
				}
			}
		}
	}

	this.draw = function() {
		context.fillStyle = 'rgb(0,10,0)';
		context.fillRect(0, 0, canvas.width, canvas.height);

		this.drawBall();

		// draw paddle
		context.fillStyle = 'rgb(155,110,5)';
		context.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);

		this.drawBricks();

		if (this.gamePaused && !this.gameWin && !this.gameOver) {
			context.fillStyle = 'rgb(255,255,0)';
			context.font = 'bold 20px Arial';
			context.fillText('Pause', canvas.width / 2 - 30, canvas.height / 2);
		}

		if (this.gameOver) {
			context.fillStyle = 'rgb(255,255,0)';
			context.font = 'bold 20px Arial';
			context.fillText('Game Over', canvas.width / 2 - 40, canvas.height / 2);
		}

		if (this.gameWin) {
			context.fillStyle = 'rgb(255,255,0)';
			context.font = 'bold 20px Arial';
			context.fillText('You Win', canvas.width / 2 - 40, canvas.height / 2);
		}

		context.fillStyle = 'rgb(255,255,220)';
		context.font = 'bold 15px Arial';
		context.fillText('Score: ' + this.score, 5, 15);

		context.fillStyle = 'rgb(255,255,220)';
		context.font = 'bold 15px Arial';
		context.fillText('Lifes: ' + this.lifes, 5, 35);
	}

	this.update = function() {
		if (this.gamePaused || this.gameWin || this.gameOver) return;

		// update ball pos
		if (this.ball.dir & BallDirs.RIGHT) this.ball.x += this.ball.speed;
		else if (this.ball.dir & BallDirs.LEFT) this.ball.x -= this.ball.speed;
		if (this.ball.dir & BallDirs.UP) this.ball.y -= this.ball.speed;
		else if (this.ball.dir & BallDirs.DOWN) this.ball.y += this.ball.speed;

		// ball bounce from paddle
		if ((this.ball.x + this.ball.radius > this.paddle.x && this.ball.x - this.ball.radius < this.paddle.x + this.paddle.width) &&
			(this.ball.y + this.ball.radius > this.paddle.y)) {
			if (this.ball.speed < BALL_MAX_SPEED) this.ball.speed += 0.5;
			if (this.ball.dir & BallDirs.DOWN) {
				this.ball.dir = this.ball.dir - BallDirs.DOWN + BallDirs.UP;
			} else if (this.ball.dir & BallDirs.UP) {
			 	this.ball.dir = this.ball.dir - BallDirs.UP + BallDirs.DOWN;
			}
		}

		// update ball
		if (this.ball.x - this.ball.radius < 0) {
			this.ball.x = this.ball.radius;
			this.ball.dir = this.ball.dir - BallDirs.LEFT + BallDirs.RIGHT;
		}
		if (this.ball.x + this.ball.radius > canvas.width) {
			this.ball.x = canvas.width - this.ball.radius;
			this.ball.dir = this.ball.dir - BallDirs.RIGHT + BallDirs.LEFT;
		}
		if (this.ball.y - this.ball.radius < 0) {
			this.ball.y = this.ball.radius;
			this.ball.dir = this.ball.dir - BallDirs.UP + BallDirs.DOWN;
		}

		if (this.ball.y + this.ball.radius > canvas.height) {
			// lost one life
			this.lifes--;
			this.ball.speed = BALL_DEFAULT_SPEED;
			if (this.lifes == 0) {
				this.gameOver = true;
			} else {
				this.ball.x = canvas.width / 2;
				this.ball.y = canvas.height / 2;
				this.ball.dir = BallDirs.NONE;
			}
		}

		if (this.ball.dir == BallDirs.NONE) {
			this.ball.x = this.paddle.x + this.paddle.width / 2;
			this.ball.y = this.paddle.y - this.ball.radius * 2;
		}

		// bounces
		for (var i = 0; i < this.bricks.bricks.length; i++) {
			for (var j = 0; j < this.bricks.bricks[i].length; j++) {
				if (this.bricks.bricks[i][j].lifes > 0) {
					if (this.ball.dir == BallDirs.LEFT + BallDirs.UP) {
						if (this.isPointInRect(this.ball.x - this.ball.speed, this.ball.y - 0, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.x = this.bricks.bricks[i][j].x + this.bricks.bricks[i][j].width + this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.LEFT + BallDirs.RIGHT;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
						if (this.isPointInRect(this.ball.x - 0, this.ball.y - this.ball.speed, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.y = this.bricks.bricks[i][j].y + this.bricks.bricks[i][j].height + this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.UP + BallDirs.DOWN;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
					} else if (this.ball.dir == BallDirs.LEFT + BallDirs.DOWN) {
						if (this.isPointInRect(this.ball.x - this.ball.speed, this.ball.y + 0, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.x = this.bricks.bricks[i][j].x + this.bricks.bricks[i][j].width + this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.LEFT + BallDirs.RIGHT;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
						if (this.isPointInRect(this.ball.x - 0, this.ball.y + this.ball.speed, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.y = this.bricks.bricks[i][j].y - this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.DOWN + BallDirs.UP;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
					} else if (this.ball.dir == BallDirs.RIGHT + BallDirs.UP) {
						if (this.isPointInRect(this.ball.x + this.ball.speed, this.ball.y - 0, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.x = this.bricks.bricks[i][j].x - this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.RIGHT + BallDirs.LEFT;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
						if (this.isPointInRect(this.ball.x + 0, this.ball.y - this.ball.speed, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.y = this.bricks.bricks[i][j].y + this.bricks.bricks[i][j].height + this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.UP + BallDirs.DOWN;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
					} else if (this.ball.dir == BallDirs.RIGHT + BallDirs.DOWN) {
						if (this.isPointInRect(this.ball.x + this.ball.speed, this.ball.y + 0, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.x = this.bricks.bricks[i][j].x - this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.RIGHT + BallDirs.LEFT;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
						if (this.isPointInRect(this.ball.x + 0, this.ball.y + this.ball.speed, this.bricks.bricks[i][j].x, this.bricks.bricks[i][j].y, this.bricks.bricks[i][j].width, this.bricks.bricks[i][j].height)) {
							this.ball.y = this.bricks.bricks[i][j].y - this.ball.speed;
							this.ball.dir = this.ball.dir - BallDirs.DOWN + BallDirs.UP;
							this.bricks.bricks[i][j].lifes--;
							this.score += BRICK_SCORE;
							return;
						}
					}
				}
			}
		}

		full_level_life = 0;
		for (var i = 0; i < this.bricks.bricks.length; i++) {
			for (var j = 0; j < this.bricks.bricks[i].length; j++) {
				full_level_life += this.bricks.bricks[i][j].lifes
			}
		}

		if (full_level_life == 0) {
			if (this.level < 3) {
				this.ball.dir = BallDirs.NONE;
				this.level++;
				this.initLevel(this.level);
			} else this.gameWin = true;
		}
	}


	this.isPointInRect = function(x, y, rect_x, rect_y, rect_width, rect_height) {
		if ((x > rect_x && x < rect_x + rect_width) &&
			(y > rect_y && y < rect_y + rect_height))
			return true;
		return false;
	}

	this.isBallIntersectBrick = function(i, j) {
		if ((this.ball.x + this.ball.radius > this.bricks.bricks[i][j].x &&
			this.ball.x - this.ball.radius < this.bricks.bricks[i][j].x + this.bricks.bricks[i][j].width) &&
			(this.ball.y + this.ball.radius > this.bricks.bricks[i][j].y &&
			this.ball.y - this.ball.radius < this.bricks.bricks[i][j].y + this.bricks.bricks[i][j].height))
			return true;
		return false;
	}

	this.render = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.update();
		this.draw();
	}

	this.togglePause = function() {
		this.gamePaused = !this.gamePaused;
	}

	this.movePaddleLeft = function() {
		if (this.paddle.x > 0)
			this.paddle.x -= 10 * PADDLE_SPEED;
	}

	this.movePaddleRight = function() {
		if (this.paddle.x < canvas.width - this.paddle.width)
			this.paddle.x += 10 * PADDLE_SPEED;
	}

	this.setPaddlePos = function(x) {
		if (this.gamePaused || this.gameWin || this.gameOver) return;
		if (x < 0) x = 0;
		if (x > canvas.width - this.paddle.width) x = canvas.width - this.paddle.width;
		this.paddle.x = x;
	}

	this.startGame = function() {
		if (this.gamePaused) return;
		if (this.ball.dir == BallDirs.NONE) {
			this.ball.dir = BallDirs.RIGHT + BallDirs.UP;
		}
	}
};


function getRandomRange(min, max) {
	return Math.random() * (max - min + 1) + min;
}

var arkanoidGame;

function render() {
	arkanoidGame.render();
}

function checkCanvasIsSupported() {
	canvas = document.getElementById("gameCanvas");
	canvas.width = 640;
	canvas.height = 480;
	canvas.style.cursor = "none";
	if (canvas.getContext) {
		context = canvas.getContext('2d');

		arkanoidGame = new ArkanoidGame(canvas, context);
		arkanoidGame.init();

		setInterval(render, 1000 / 60);
	} else {
		alert("Sorry, but your browser doesn't support a canvas.");
	}
}

var KeyCodes = {
	SPACE : 32
};

document.onkeydown = function(event) {
	var keyCode;
	if (event == null) {
		keyCode = window.event.keyCode;
	} else {
		keyCode = event.keyCode;
	}
	switch (keyCode) {
		case KeyCodes.SPACE:
			arkanoidGame.togglePause();
			break;
		default:
			break;
	}
}

document.onmousemove = function(event) {
	arkanoidGame.setPaddlePos(event.pageX);
}

document.ontouchmove = function(event) {
	arkanoidGame.setPaddlePos(event.touches[0].clientX);
}

document.onclick = function(){
	arkanoidGame.startGame();
}

