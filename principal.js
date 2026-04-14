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
function moverCursor(){

    console.log("dentro")

    let cursor = document.getElementById("cursor");
    let newTop;
    let newLeft;

    switch(parseInt(event.keyCode)){
        case 37:
                console.log("izq")

            newLeft = parseInt(cursor.style.left) - 5;
            cursor.style.left = newLeft.toString() + "px";
            break;

        case 38:
                console.log("arriba")

            newTop = parseInt(cursor.style.top) - 5;
            cursor.style.top = newTop.toString() + "px";
            break;

        case 39:
                console.log("der")

            newLeft = parseInt(cursor.style.left) + 5;
            cursor.style.left = newLeft.toString() + "px";
            break;

        case 40:
                console.log("abajo")

            newTop = parseInt(cursor.style.top) + 5;
            cursor.style.top = newTop.toString() + "px";
            break;
    }
}
*/

let newTop; let newLeft;

function moverCursor(event){

    let cursor = document.getElementById("cursor");

    // Inicializar si está vacío
    if (!cursor.style.top) cursor.style.top = "550px";
    if (!cursor.style.left) cursor.style.left = "950px";

    console.log("Antes: ",newTop,newLeft);

    switch(event.key){
        case "ArrowLeft":
            newLeft = parseInt(cursor.style.left) - 15;
            cursor.style.left = newLeft.toString() + "px";
            break;

        case "ArrowUp":
            newTop = parseInt(cursor.style.top) - 15;
            cursor.style.top = newTop.toString() + "px";
            break;

        case "ArrowRight":
            newLeft = parseInt(cursor.style.left) + 15;
            cursor.style.left = newLeft.toString() + "px";
            break;

        case "ArrowDown":
            newTop = parseInt(cursor.style.top) + 15;
            cursor.style.top = newTop.toString() + "px";
            break;
    }
    console.log("Después: ",newTop,newLeft);

}
