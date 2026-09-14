// ==========================================
// ARCHIVO: utilitarios.js
// ==========================================
// Este archivo contiene funciones auxiliares reutilizables que el juego necesita

// ==========================================
// FUNCIÓN: Generar número aleatorio
// ==========================================
// Genera un número ENTERO aleatorio entre dos valores (inclusivos)
// Parámetros:
//   min = valor mínimo (el número más bajo que puede salir)
//   max = valor máximo (el número más alto que puede salir)
// Retorna: Un número entero aleatorio entre min y max
// Ejemplo: generarAleatorio(0, 100) devuelve un número entre 0 y 100
// Se usa para: Posicionar la comida en coordenadas aleatorias dentro del canvas
function generarAleatorio(min, max) {
  // Math.random() devuelve un número decimal entre 0 y 1 (ej: 0.4532)
  // Multiplicamos por (max - min + 1) para expandir el rango
  // Math.floor() redondea hacia abajo para obtener un entero
  // Sumamos min para desplazar el rango al intervalo [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// FUNCIÓN: Actualizar texto en HTML
// ==========================================
// Cambia el contenido de texto de un elemento HTML según su ID
// Parámetros:
//   idElemento = el ID del elemento HTML que queremos modificar (debe ser único)
//   nuevoTexto = el nuevo texto que queremos mostrar
// Ejemplo: actualizarTextoHTML("puntos", 5) cambia el texto del elemento con id="puntos" a "5"
// Se usa para: Mostrar puntos y tiempo en pantalla
function actualizarTextoHTML(idElemento, nuevoTexto) {
  // document.getElementById() encuentra el elemento HTML con ese ID
  // .innerText = cambia el contenido de texto del elemento encontrado
  document.getElementById(idElemento).innerText = nuevoTexto;
}