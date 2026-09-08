let canvas = document.getElementById("areajuego");
let ctx = canvas.getContext("2d");

let gatoX = 220;
let gatoY = canvas.height / 2;
let comidaX = 460;
let comidaY = 460;
const ALTO_GATO= 50;
const ANCHO_GATO=20;
const ALTO_COMIDA=40;
const ANCHO_COMIDA=40;


function iniciarJuego() {
   graficarGato();
   graficarComida();
}

function graficarGato(){
     ctx.fillStyle = "#dfa2f2";
     ctx.fillRect(gatoX,gatoY, ALTO_GATO, ANCHO_GATO);
}

function graficarComida(){
   ctx.fillStyle="#a2f2ee"
   ctx.fillRect(comidaX,comidaY,ALTO_COMIDA,ANCHO_COMIDA);
}
