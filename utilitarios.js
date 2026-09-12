// utilitarios.js
function generarAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function actualizarTextoHTML(idElemento, nuevoTexto) {
  document.getElementById(idElemento).innerText = nuevoTexto;
}