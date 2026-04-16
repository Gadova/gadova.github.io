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

/*
moverCursor()
   └── mueve el cursor
   └── llama a detectarColision()
          └── detecta si toca una nota
          └── activa hover

*/
let newTop; let newLeft;
let notaSeleccionada = null;

function moverCursor(event){

    let cursor = document.getElementById("cursor");

    // Inicializar si está vacío
    if (!cursor.style.top) cursor.style.top = "550px";
    if (!cursor.style.left) cursor.style.left = "950px";

    switch(event.key){
        case "ArrowLeft":
            newLeft = parseInt(cursor.style.left) - 15;
            cursor.style.left = newLeft + "px";
            break;

        case "ArrowUp":
            newTop = parseInt(cursor.style.top) - 15;
            cursor.style.top = newTop + "px";
            break;

        case "ArrowRight":
            newLeft = parseInt(cursor.style.left) + 15;
            cursor.style.left = newLeft + "px";
            break;

        case "ArrowDown":
            newTop = parseInt(cursor.style.top) + 15;
            cursor.style.top = newTop + "px";
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


function detectarColision(){
    let cursor = document.getElementById("cursor");
    let cursorRect = cursor.getBoundingClientRect();

    let notas = document.querySelectorAll(".nota");
    let logo = document.querySelector(".logo");

    notaSeleccionada = null;

    // Quitar hover del logo siempre al empezar
    if (logo) {
        logo.classList.remove("hover-cursor");
    }

    // Detectar colisión con el logo
    if (logo) {
        let rectLogo = logo.getBoundingClientRect();

        let colisionLogo =
            cursorRect.left < rectLogo.right &&
            cursorRect.right > rectLogo.left &&
            cursorRect.top < rectLogo.bottom &&
            cursorRect.bottom > rectLogo.top;

        if (colisionLogo){
            console.log("COLISIÓN CON LOGO");
            logo.classList.add("hover-cursor");
        }
    }
 
    // Detectar colisión con las notas
    notas.forEach(nota => {
        let rect = nota.getBoundingClientRect();

        let colision =
            cursorRect.left < rect.right &&
            cursorRect.right > rect.left &&
            cursorRect.top < rect.bottom &&
            cursorRect.bottom > rect.top;

        if (colision){
            nota.classList.add("hover-cursor");
            notaSeleccionada = nota;
        } else {
            nota.classList.remove("hover-cursor");
        }
    });
}
