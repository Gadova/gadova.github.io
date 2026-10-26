
/* ---------- 1. Navegación entre pantallas ---------- */

// Orden en el que se recorren las pantallas del portfolio.
const ORDEN_PANTALLAS = ['inicio', 'proyectos', 'sobre-mi', 'contacto'];

// Elementos que participan en la navegación.
const pantallas = document.querySelectorAll('.pantalla');
const botonesNavegacion = document.querySelectorAll('.navegacion-elemento');

let pantallaActual = 'inicio';

/* Cambia la pantalla visible y actualiza el botón seleccionado. */
function irAPantalla(id) {
    const destino = document.getElementById(id);

    // Evita cambiar de pantalla si el identificador no existe.
    if (!destino) return;

    pantallaActual = id;

    // Solo la sección seleccionada conserva la clase que la hace visible.
    pantallas.forEach(pantalla => {
        pantalla.classList.toggle('foco', pantalla.id === id);
    });

    // Mantiene sincronizado el aspecto del menú con la pantalla visible.
    botonesNavegacion.forEach(boton => {
        boton.classList.toggle('foco', boton.getAttribute('dir-pantalla') === id);
    });
}

/* Avanza o retrocede una posición sin salir de los límites del portfolio. */
function cambiarPantalla(direccion) {
    const indiceActual = ORDEN_PANTALLAS.indexOf(pantallaActual);
    const indiceSiguiente = Math.max(
        0,
        Math.min(indiceActual + direccion, ORDEN_PANTALLAS.length - 1)
    );

    if (indiceSiguiente !== indiceActual) {
        irAPantalla(ORDEN_PANTALLAS[indiceSiguiente]);
    }
}

/* Comprueba si la pantalla actual todavía puede desplazarse en esa dirección. */
function pantallaPuedeDesplazarse(direccion) {
    const pantalla = document.getElementById(pantallaActual);
    const desplazamientoMaximo = pantalla.scrollHeight - pantalla.clientHeight;

    // Una diferencia mínima evita problemas por redondeos de píxeles.
    if (desplazamientoMaximo <= 2) return false;

    return direccion > 0
        ? pantalla.scrollTop < desplazamientoMaximo - 2
        : pantalla.scrollTop > 2;
}

/* Asocia cada botón del menú con su pantalla mediante dir-pantalla. */
document.querySelectorAll('[dir-pantalla]').forEach(elemento => {
    elemento.addEventListener('click', () => {
        irAPantalla(elemento.getAttribute('dir-pantalla'));
    });
});

/* El logo vuelve a la portada y el botón principal abre Proyectos. */
document.querySelector('.encabezado-logo')?.addEventListener('click', () => {
    irAPantalla('inicio');
});

document.querySelector('.portada-boton-accion')?.addEventListener('click', () => {
    irAPantalla('proyectos');
});

/* ---------- Navegación con la rueda del ratón ---------- */

let bloqueoRueda = false;

window.addEventListener('wheel', evento => {
    // Evita reaccionar a movimientos mínimos o repetir cambios muy seguidos.
    if (bloqueoRueda || Math.abs(evento.deltaY) < 10) return;

    const direccion = evento.deltaY > 0 ? 1 : -1;

    // Permite leer el contenido antes de pasar a la siguiente pantalla.
    if (pantallaPuedeDesplazarse(direccion)) return;

    bloqueoRueda = true;

    cambiarPantalla(direccion);

    // La pausa reduce los saltos múltiples provocados por la inercia.
    setTimeout(() => {
        bloqueoRueda = false;
    }, 700);
}, { passive: true });

/* ---------- Navegación mediante gestos táctiles ---------- */

let posicionInicialToque = null;

window.addEventListener('touchstart', evento => {
    posicionInicialToque = evento.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', evento => {
    if (posicionInicialToque === null) return;

    // Compara la posición inicial y final para detectar el sentido del gesto.
    const desplazamiento = posicionInicialToque - evento.changedTouches[0].clientY;
    posicionInicialToque = null;

    // Ignora los movimientos demasiado cortos para considerarlos un deslizamiento.
    if (Math.abs(desplazamiento) < 45) return;

    const direccion = desplazamiento > 0 ? 1 : -1;

    if (!pantallaPuedeDesplazarse(direccion)) {
        cambiarPantalla(direccion);
    }
}, { passive: true });

/* ---------- Navegación mediante el teclado ---------- */

window.addEventListener('keydown', evento => {
    // No intercepta las flechas cuando se está escribiendo en un campo.
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(evento.target.tagName)) return;

    const direccion = {
        ArrowDown: 1,
        ArrowRight: 1,
        ArrowUp: -1,
        ArrowLeft: -1
    }[evento.key];

    if (!direccion) return;

    evento.preventDefault();
    cambiarPantalla(direccion);
});

/* ---------- 2. Funcionamiento del reloj ---------- */

// Recoger el reloj del index
const reloj = document.querySelector('#pie-pagina-reloj');
// Instanciar un formato de reloj 24 horas: horas, minutos y segundos (XX:XX:XX)
const relojFormato = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

function ejecucionReloj() {
    if (!reloj) return;

    reloj.textContent = relojFormato.format(new Date());
}

ejecucionReloj();
setInterval(ejecucionReloj, 1000);

/* ---------- 3. Efecto parallax en la pantalla inicio ---------- */

const parallax = document.querySelector('.portada-esfera-decoracion');

if (parallax) {
    window.addEventListener('pointermove', evento => {

        // Calcula el desplazamiento respecto al centro de la ventana.
        const x = (evento.clientX / window.innerWidth - 0.5) * 20;
        const y = (evento.clientY / window.innerHeight - 0.5) * 20;
        
        parallax.style.transform = `translate(${x}px,${y}px)`;

    });
}

// ------------------------------------------
// Referencia a 1. Navegación entre pantallas
// Selecciona la pantalla inicio por defecto
irAPantalla('inicio');