// Variables para calcular nuevos top y left
let newTop;
let newLeft;

// Cantidad de píxeles que se desplaza el cursor
let desplazamiento = 15;

// Velocidad inicial de la pelota
let velocidadX = 3;
let velocidadY = 3;

// Función para mover el cursor
function moverCursor(event){

    // Cursor y su rectángulo
    let cursor = document.getElementById("cursor");
    if (!cursor) return;
    let cursorRect = cursor.getBoundingClientRect();

    // Marco del juego
    let marco = document.getElementById("marco-juego");
    if (!marco) return;

    // Inicializar si está vacío (posiciones dentro del nuevo marco)
    if (!cursor.style.top) cursor.style.top = "100px";
    if (!cursor.style.left) cursor.style.left = "100px";

    switch(event.key){
        case "ArrowLeft":
            newLeft = parseInt(cursor.style.left) - desplazamiento;
            if(newLeft >= 0){
                cursor.style.left = newLeft + "px";
            }
            break;

        case "ArrowUp":
            newTop = parseInt(cursor.style.top)  - desplazamiento;
            if(newTop >= 0){
                cursor.style.top = newTop + "px";
            }
            break;

        case "ArrowRight":
            newLeft = parseInt(cursor.style.left)  + desplazamiento;
            if(newLeft + cursorRect.width <= marco.clientWidth){
                cursor.style.left = newLeft + "px";
            }
            break;

        case "ArrowDown":
            newTop = parseInt(cursor.style.top) + desplazamiento;
            if(newTop + cursorRect.height <= marco.clientHeight){
                cursor.style.top = newTop + "px";
            }
            break;
    }

    // Se activa la funcion cada vez que se mueve el cursor para detectar si se solapa con algún otro elemento
    detectarColision();
}

// Función que permite a la pelota moverse automáticamente
function moverPelota() {

    // Pelota
    let pelota = document.getElementById("pelota");
    if (!pelota) return;

    // Marco del juego
    let tablero = document.getElementById("marco-juego");
    if (!tablero) return;

    let tableroRect = tablero.getBoundingClientRect();
    let pelotaRect = pelota.getBoundingClientRect();

    // Posición inicial de la pelota
    if (!pelota.style.top) pelota.style.top = "50px";
    if (!pelota.style.left) pelota.style.left = "50px";

    // Rebote horizontal
    if (pelotaRect.left <= tableroRect.left || pelotaRect.right >= tableroRect.right) {
        velocidadX *= -1;
    }

    // Rebote vertical
    if (pelotaRect.top <= tableroRect.top || pelotaRect.bottom >= tableroRect.bottom) {
        velocidadY *= -1;
    }

    // Posiciones relativas actuales
    let posLeft = parseInt(pelota.style.left) || 50;
    let posTop  = parseInt(pelota.style.top)  || 50;

    // Mover pelota
    pelota.style.left = (posLeft + velocidadX) + "px";
    pelota.style.top  = (posTop  + velocidadY) + "px";

    detectarColision();

    requestAnimationFrame(moverPelota);
}

// Función que detecta colisiones/solapamientos entre el cursor y otros elementos
function detectarColision(){
    
    // Cursor y su rectángulo
    let cursor = document.getElementById("cursor");
    if (!cursor) return;
    let cursorRect = cursor.getBoundingClientRect();

    // Pelota y su rectángulo
    let pelota = document.getElementById("pelota");
    let pelotaRect = pelota ? pelota.getBoundingClientRect() : null;

    // Detectar colisión con la pelota y hacer que cambie de dirección
    if(pelota && pelotaRect){

        let colisionPelota =
        cursorRect.left < pelotaRect.right &&
        cursorRect.right > pelotaRect.left &&
        cursorRect.top < pelotaRect.bottom &&
        cursorRect.bottom > pelotaRect.top;

        if (colisionPelota) {
            // Cambiar dirección aleatoriamente
            velocidadX *= (Math.random() > 0.5 ? 1 : -1);
            velocidadY *= (Math.random() > 0.5 ? 1 : -1);
        }
    }
}

// Activar/Invocar la función
window.addEventListener("keydown", moverCursor);
moverPelota();
