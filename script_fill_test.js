var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//crea rectangulo y lo rellena de color rojo
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
//crea circulo y lo rellena de color verde
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
//colorea solo el borde del rectangulo con la funcion stroke
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();