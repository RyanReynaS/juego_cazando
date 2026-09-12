// Obtener canvas y contexto
let canvas = document.getElementById("areajuego");
let ctx = canvas.getContext("2d");

// Definir variables inicializadas en 0
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;
let puntos = 0;

// PARTE 5: Variable de tiempo e intervalo
let tiempo = 10;
let intervaloJuego;

// Definir constantes
const ALTO_GATO = 50;
const ANCHO_GATO = 20;
const ALTO_COMIDA = 40;
const ANCHO_COMIDA = 40;

function iniciarJuego() {
  // Posicionar al gato centrado
  gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
  gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

  // Posicionar la comida en la esquina inferior derecha
  comidaX = canvas.width - ANCHO_COMIDA;
  comidaY = canvas.height - ALTO_COMIDA;

  // Dibujar elementos iniciales
  limpiarCanva();
  graficarGato();
  graficarComida();

  // PARTE 5: Iniciar el conteo regresivo
  // Se limpia cualquier intervalo previo para evitar errores al reiniciar
  clearInterval(intervaloJuego);
  intervaloJuego = setInterval(restarTiempo, 1000);
}

function graficarGato() {
  graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#dfa2f2");
}

function graficarComida() {
  graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#a2f2ee");
}

function graficarRectangulo(x, y, ancho, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);
}

// ==========================================
// PARTE 3: MOVER GATO
// ==========================================
function limpiarCanva() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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
}

function moverArriba() {
  gatoY -= 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverAbajo() {
  gatoY += 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

// ==========================================
// PARTE 4: COMER Y SISTEMA DE PUNTAJE
// ==========================================
function detectarColision() {
    let colisionX = gatoX < comidaX + ANCHO_COMIDA && gatoX + ANCHO_GATO > comidaX;
    let colisionY = gatoY < comidaY + ALTO_COMIDA && gatoY + ALTO_GATO > comidaY;

    if (colisionX && colisionY) {
        // Aumentar puntos
        puntos = puntos + 1;
        actualizarTextoHTML("puntos", puntos);

        // Mover comida a posición aleatoria
        comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
        comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);

        // Limpiar y redibujar
        limpiarCanva();
        graficarGato();
        graficarComida();
    }
}