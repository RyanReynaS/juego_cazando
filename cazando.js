// ==========================================
// OBTENER ELEMENTOS DEL DOM Y CONFIGURACIÓN
// ==========================================
// Obtener el elemento canvas (área donde se dibuja el juego)
let canvas = document.getElementById("areajuego");
// Obtener el contexto 2D para dibujar en el canvas
let ctx = canvas.getContext("2d");

// ==========================================
// VARIABLES DEL JUEGO (posiciones y puntuación)
// ==========================================
// Posición X del gato (coordenada horizontal) - comienza en 0
let gatoX = 0;
// Posición Y del gato (coordenada vertical) - comienza en 0
let gatoY = 0;
// Posición X de la comida (coordenada horizontal) - comienza en 0
let comidaX = 0;
// Posición Y de la comida (coordenada vertical) - comienza en 0
let comidaY = 0;
// Contador de puntos que obtiene el jugador al comer
let puntos = 0;

// ==========================================
// VARIABLES DE TIEMPO (cuenta regresiva)
// ==========================================
// Tiempo restante en segundos - comienza con 10 segundos
let tiempo = 10;
// Variable para almacenar el intervalo del juego (se usa para pausarlo o reiniciarlo)
let intervaloJuego;

// ==========================================
// DIMENSIONES DE LOS OBJETOS DEL JUEGO (en píxeles)
// ==========================================
// Alto (altura) del gato en píxeles - más alto = gato más grande verticalmente
const ALTO_GATO = 80;
// Ancho (anchura) del gato en píxeles - más ancho = gato más grande horizontalmente
const ANCHO_GATO = 40;
// Alto (altura) de la comida en píxeles
const ALTO_COMIDA = 40;
// Ancho (anchura) de la comida en píxeles
const ANCHO_COMIDA = 40;

// ==========================================
// FUNCIÓN: INICIAR JUEGO
// ==========================================
// Esta función prepara todo al comenzar el juego (posiciones, dibujos, tiempo)
function iniciarJuego() {
  // Calcular posición X del gato: centro del canvas menos la mitad del ancho del gato
  // (canvas.width / 2) obtiene el centro horizontal
  // (ANCHO_GATO / 2) centra el gato respecto a ese punto
  gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);

  // Calcular posición Y del gato: centro del canvas menos la mitad del alto del gato
  // El gato comienza en el CENTRO de la pantalla
  gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

  // Posicionar la comida en la esquina INFERIOR DERECHA
  // canvas.width - ANCHO_COMIDA coloca la comida al borde derecho
  comidaX = canvas.width - ANCHO_COMIDA;
  // canvas.height - ALTO_COMIDA coloca la comida al borde inferior
  comidaY = canvas.height - ALTO_COMIDA;

  // Borrar el canvas y dibujar todos los elementos en sus posiciones iniciales
  limpiarCanva();      // Limpia la pantalla (la deja en blanco)
  graficarGato();      // Dibuja el gato en su posición inicial
  graficarComida();    // Dibuja la comida en su posición inicial

  // Iniciar la cuenta regresiva de tiempo
  // clearInterval detiene cualquier intervalo previo (útil si reiniciamos)
  clearInterval(intervaloJuego);
  // setInterval ejecuta la función restarTiempo() cada 1000 milisegundos (1 segundo)
  intervaloJuego = setInterval(restarTiempo, 1000);
}

// ==========================================
// FUNCIONES DE DIBUJO
// ==========================================
// Función para dibujar el gato en el canvas
// El gato es un rectángulo de color púrpura (#dfa2f2)
function graficarGato() {
  // Llama a graficarRectangulo con la posición y dimensiones del gato
  // El color #a2f2ee es un púrpura claro
  graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#dfa2f2");
}

// Función para dibujar la comida en el canvas
// La comida es un rectángulo de color cian/turquesa (#a2f2ee)
function graficarComida() {
  // Llama a graficarRectangulo con la posición y dimensiones de la comida
  // El color #a2f2ee es un cian/turquesa claro
  graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#a2f2ee");
}

// Función genérica para dibujar un rectángulo en el canvas
// Parámetros:
//   x = posición horizontal (desde la izquierda)
//   y = posición vertical (desde arriba)
//   ancho = ancho del rectángulo en píxeles
//   alto = alto del rectángulo en píxeles
//   color = color en formato hexadecimal (ej: #dfa2f2)
function graficarRectangulo(x, y, ancho, alto, color) {
  // ctx.fillStyle establece el color con el que se dibujará
  ctx.fillStyle = color;
  // ctx.fillRect dibuja un rectángulo relleno en las coordenadas x, y con el ancho y alto especificados
  ctx.fillRect(x, y, ancho, alto);
}

// ==========================================
// FUNCIONES DE MOVIMIENTO DEL GATO
// ==========================================
// Limpia todo lo dibujado en el canvas (lo deja en blanco)
// Esto es necesario para crear la ilusión de movimiento (borra y redibuja)
function limpiarCanva() {
  // ctx.clearRect(x, y, ancho, alto) borra el contenido del rectángulo especificado
  // (0, 0, canvas.width, canvas.height) borra TODO el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para mover el gato hacia la IZQUIERDA
// El número 10 es la VELOCIDAD: cambiar este valor hace que se mueva más rápido o más lento
// - Cambiar a 20: el gato se mueve más rápido (salta 20 píxeles en vez de 10)
// - Cambiar a 5: el gato se mueve más lento (salta solo 5 píxeles)
function moverIzquierda() {
  gatoX -= 10;           // Restar 10 a la posición X mueve el gato a la IZQUIERDA
  limpiarCanva();        // Borrar el canvas
  graficarGato();        // Redibujar el gato en su nueva posición
  graficarComida();      // Redibujar la comida (no se movió, pero hay que redibujarla)
  detectarColision();    // Verificar si el gato tocó la comida
}

// Función para mover el gato hacia la DERECHA
// El número 10 es la velocidad del movimiento
function moverDerecha() {
  gatoX += 10;           // Sumar 10 a la posición X mueve el gato a la DERECHA
  limpiarCanva();        // Borrar el canvas
  graficarGato();        // Redibujar el gato en su nueva posición
  graficarComida();      // Redibujar la comida
  detectarColision();    // Verificar si el gato tocó la comida
}

// Función para mover el gato hacia ARRIBA
// El número 10 es la velocidad del movimiento
function moverArriba() {
  gatoY -= 10;           // Restar 10 a la posición Y mueve el gato hacia ARRIBA
  limpiarCanva();        // Borrar el canvas
  graficarGato();        // Redibujar el gato en su nueva posición
  graficarComida();      // Redibujar la comida
  detectarColision();    // Verificar si el gato tocó la comida
}

// Función para mover el gato hacia ABAJO
// El número 10 es la velocidad del movimiento
function moverAbajo() {
  gatoY += 10;           // Sumar 10 a la posición Y mueve el gato hacia ABAJO
  limpiarCanva();        // Borrar el canvas
  graficarGato();        // Redibujar el gato en su nueva posición
  graficarComida();      // Redibujar la comida
  detectarColision();    // Verificar si el gato tocó la comida
}

// ==========================================
// DETECCIÓN DE COLISIONES Y SISTEMA DE PUNTAJE
// ==========================================
// Esta función detecta si el gato tocó la comida (colisión)
// Usa lógica de rectángulos para detectar si se solapan
function detectarColision() {
  // COLISIÓN EN EJE X (horizontal)
  // Verifica si los rectángulos se solapan horizontalmente
  // - gatoX < comidaX + ANCHO_COMIDA: el borde izquierdo del gato está antes del borde derecho de la comida
  // - gatoX + ANCHO_GATO > comidaX: el borde derecho del gato está después del borde izquierdo de la comida
  // Si ambas condiciones son ciertas, hay solapamiento en X
  let colisionX = gatoX < comidaX + ANCHO_COMIDA && gatoX + ANCHO_GATO > comidaX;

  // COLISIÓN EN EJE Y (vertical)
  // Verifica si los rectángulos se solapan verticalmente
  // - gatoY < comidaY + ALTO_COMIDA: el borde superior del gato está antes del borde inferior de la comida
  // - gatoY + ALTO_GATO > comidaY: el borde inferior del gato está después del borde superior de la comida
  // Si ambas condiciones son ciertas, hay solapamiento en Y
  let colisionY = gatoY < comidaY + ALTO_COMIDA && gatoY + ALTO_GATO > comidaY;

  // Si hay colisión TANTO en X como en Y, entonces el gato tocó la comida
  if (colisionX && colisionY) {
    // (Esta línea está comentada - se usaba para hacer un alert)
    // alert("¡El gato encontró la comida!");

    // Sumar 1 punto al contador total
    puntos = puntos + 1;
    // Actualizar el número de puntos mostrado en pantalla (en el HTML)
    actualizarTextoHTML("puntos", puntos);

    // Mover la comida a una nueva posición ALEATORIA dentro del canvas
    // generarAleatorio devuelve un número random entre min y max
    // canvas.width - ANCHO_COMIDA asegura que la comida no salga del borde derecho
    // canvas.height - ALTO_COMIDA asegura que la comida no salga del borde inferior
    comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);

    // Redibujar el canvas con la comida en su nueva posición
    limpiarCanva();
    graficarGato();
    graficarComida();

    // Verificar si el jugador ganó (alcanzó 6 puntos)
    if (puntos >= 6) {
      // Detener el intervalo de tiempo (parar la cuenta regresiva)
      clearInterval(intervaloJuego);
      // Mostrar mensaje de victoria
      alert("¡GANASTE! Has alcanzado 6 puntos.");
    }
  }
}

// ==========================================
// CUENTA REGRESIVA DE TIEMPO
// ==========================================
// Esta función se ejecuta cada 1 segundo (se configura en iniciarJuego con setInterval)
// Reduce el tiempo disponible y verifica si se acabó
function restarTiempo() {
  // Restar 1 segundo al tiempo disponible
  tiempo = tiempo - 1;
  // Actualizar el número de tiempo mostrado en pantalla (en el HTML)
  actualizarTextoHTML("tiempo", tiempo);

  // Verificar si se acabó el tiempo (perdió)
  if (tiempo <= 0) {
    // Detener la cuenta regresiva para que no siga restando
    clearInterval(intervaloJuego);
    // Mostrar mensaje de derrota
    alert("¡GAME OVER! Perdiste la partida.");
  }
}

// ==========================================
// REINICIAR JUEGO
// ==========================================
// Esta función reset a todos los valores iniciales y comienza una nueva partida
function reiniciarJuego() {
  // Restablecer el contador de puntos a 0
  puntos = 0;
  // Restablecer el tiempo a 10 segundos
  tiempo = 10;

  // Actualizar los valores mostrados en pantalla
  // Esto asegura que el HTML refleje los nuevos valores
  actualizarTextoHTML("puntos", puntos);
  actualizarTextoHTML("tiempo", tiempo);

  // Llamar a iniciarJuego() para:
  // - Posicionar el gato en el centro
  // - Posicionar la comida en la esquina
  // - Dibujar los elementos
  // - Iniciar la cuenta regresiva de tiempo
  iniciarJuego();
}

function desaparecerPersonaje(){

  ctx.clearRect(gatoX,gatoY,ANCHO_GATO,ALTO_GATO);
}