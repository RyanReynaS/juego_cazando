let canvas = document.getElementById("areajuego");
let ctx = canvas.getContext("2d");

function iniciar() {
   graficarGato();
}

function graficarGato(){
     ctx.fillStyle = "#dfa2f2";
     ctx.fillRect(210, 220, 80, 20);
}


