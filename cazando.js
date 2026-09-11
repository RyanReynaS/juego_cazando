//Obtener canvas y contexto
let canvas = document.getElementById("areajuego");
let ctx = canvas.getContext("2d");

//Definir variables inicializadas en 0
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

//Definir constantes
const ALTO_GATO= 50;
const ANCHO_GATO=20;
const ALTO_COMIDA=40;
const ANCHO_COMIDA=40;

//Iniciar juego asignando posiciones requeridas
function iniciarJuego() {
  // Posicionar al gato centrado en el canvas (500x500)
  gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
  gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

  // Posicionar la comida en la esquina inferior derecha
  comidaX = canvas.width - ANCHO_COMIDA;
  comidaY = canvas.height - ALTO_COMIDA;

  // Dibujar elementos
  graficarGato();
  graficarComida();
}
   //Modificado para usar graficarRectangulo
function graficarGato() {
  graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#dfa2f2");
}
 //Modificado para usar graficarRectangulo
function graficarComida(){
   graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#a2f2ee");
}

//Función para graficar cualquier rectángulo
function graficarRectangulo(x, y, ancho, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);
}
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/*ctx.clearRect(X, Y, ancho, alto);
Entonces 0, 0, canvas.width, canvas.height borra desde la esquina superior izquierda hasta cubrir todo el canvas.*/

function moverIzquierda() {
    gatoX -= 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}
function moverDerecha() {
    gatoX += 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}function moverArriba() {
    gatoY -= 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}function moverAbajo() {
    gatoY += 10;
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function detectarColision() {
    let colisionX =
        gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX;

    let colisionY =
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY;

    if (colisionX && colisionY) {
        alert("¡El gato encontró la comida!");
    }
}