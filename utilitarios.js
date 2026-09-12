// utilitarios.js

// Función para generar un número aleatorio entre un mínimo y un máximo
function generarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para actualizar el texto de una etiqueta HTML según su ID
function actualizarTextoHTML(idElemento, nuevoTexto) {
  document.getElementById(idElemento).innerText = nuevoTexto;
}