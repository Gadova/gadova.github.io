/*
function cambiaColor(){

    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)

    zona3 = document.getElementsByClassName("Zona-3");

    zona3[0].style.backgroundColor= 'rgb('+ r + ',' + g + ',' + b + ')';

}


function cambiarColor(micolor) {
    const zona1 = document.getElementsByClassName("Zona-1");
    zona1[0].style.color = micolor;
    if(micolor === 'white' || micolor === 'yellow'){
        zona1[0].style.backgroundColor = '#3b3a3a';
    } else{
        zona1[0].style.backgroundColor = '#b1acac';
    }
}
*/

// Variables para calcular nuevos top y left
let newTop; let newLeft;

// Cantidad de píxeles que se desplaza el cursor
let desplazamiento = 15;

// Variable que indica qué nota está bajo el cursor 
let notaSeleccionada;

// Velocidad inicial de la pelota
let velocidadX = 3; let velocidadY = 3;

// Función para mover el cursor
function moverCursor(event){

    // Cursor y su rectángulo
    let cursor = document.getElementById("cursor");
    let cursorRect = cursor.getBoundingClientRect();

    // Marco y su rectángulo
    let marco = document.getElementById("marco");
    let marcoRect = marco.getBoundingClientRect();

    // Inicializar si está vacío
    if (!cursor.style.top) cursor.style.top = "550px";
    if (!cursor.style.left) cursor.style.left = "950px";

    console.log(cursor.style.left, cursor.style.top);
    console.log(cursorRect.left, cursorRect.top);


    switch(event.key){
        case "ArrowLeft":
            newLeft = parseInt(cursor.style.left) - desplazamiento;
            if(newLeft >= marcoRect.left){
                cursor.style.left = newLeft + "px";
            }
            break;

        case "ArrowUp":
            newTop = parseInt(cursor.style.top)  - desplazamiento;
            if(newTop >= marcoRect.top){
                cursor.style.top = newTop + "px";
            }
            break;

        case "ArrowRight":
            newLeft = parseInt(cursor.style.left)  + desplazamiento;
            if(newLeft <= marcoRect.right){
                cursor.style.left = newLeft + "px";
            }     
            break;

        case "ArrowDown":
            newTop = parseInt(cursor.style.top) + desplazamiento;
            if(newTop <= marcoRect.bottom){
                cursor.style.top = newTop + "px";
            }
            break;

        case "Enter":
            if (notaSeleccionada) {
                window.location.href = notaSeleccionada.href;
            }
            return;
    }

    // Se activa la funcion cada vez que se mueve el cursor para detectar si se solapa con algún otro elemento
    detectarColision();
}

// Función que permite a la pelota moverse automáticamente
function moverPelota() {

    // Tablero y su rectángulo
    let pelota = document.getElementById("pelota");
    let pelotaRect = pelota.getBoundingClientRect();
    
    // Pelota y su rectángulo
    let tablero = document.getElementById("tablero");
    let tableroRect = tablero.getBoundingClientRect();

    // Posición inicial de la pelota
    if (!pelota.style.top) pelota.style.top = "600px";
    if (!pelota.style.left) pelota.style.left = "400px";
    //console.log(pelota.style.top, pelota.style.left)

    // Rebote horizontal
    if (pelotaRect.left <= tableroRect.left || pelotaRect.right >= tableroRect.right) {
        velocidadX *= -1;
    }

    // Rebote vertical
    if (pelotaRect.top <= tableroRect.top || pelotaRect.bottom >= tableroRect.bottom) {
        velocidadY *= -1;
    }

    // Mover pelota
    pelota.style.left = (pelotaRect.left + velocidadX) + "px";
    pelota.style.top = (pelotaRect.top + velocidadY) + "px";

    detectarColision();

    requestAnimationFrame(moverPelota);
}

// Función que detecta colisiones/solapamientos entre el cursor y otros elementos
function detectarColision(){
    
    // Cursor y su rectángulo
    let cursor = document.getElementById("cursor");
    let cursorRect = cursor.getBoundingClientRect();

    // Logo y notas
    let logo = document.querySelector(".logo");
    let notas = document.querySelectorAll(".nota");

    // Pelota y su rectángulo
    let pelota = document.getElementById("pelota");
    let pelotaRect = pelota.getBoundingClientRect();

    // No hay ninguna nota seleccionada
    notaSeleccionada = null;

    // Detectar colisión con el logo
    if (logo) {
        let rectLogo = logo.getBoundingClientRect();

        let colisionLogo =
            cursorRect.left < rectLogo.right &&
            cursorRect.right > rectLogo.left &&
            cursorRect.top < rectLogo.bottom &&
            cursorRect.bottom > rectLogo.top;

        if (colisionLogo){
            logo.classList.add("hover-cursor");
        } else {
            logo.classList.remove("hover-cursor");

        }
    }
 
    // Detectar colisión con las notas
    notas.forEach(nota => {
        let rectNota = nota.getBoundingClientRect();

        let colisionNota =
            cursorRect.left < rectNota.right &&
            cursorRect.right > rectNota.left &&
            cursorRect.top < rectNota.bottom &&
            cursorRect.bottom > rectNota.top;

        if (colisionNota){
            nota.classList.add("hover-cursor");
            // Marcar la nota que está debajo del cursor como seleccionada
            notaSeleccionada = nota;
        } else {
            nota.classList.remove("hover-cursor");
        }
    });

    // Detectar colisión con la pelota y hacer que cambie de dirección
    if(pelota){

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
moverPelota();
