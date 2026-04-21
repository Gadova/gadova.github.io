const form = document.getElementById("formularioContacto");
const respuesta = document.getElementById("respuesta");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form).entries());

    try {
        const res = await fetch("/contacto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const texto = await res.text();
        respuesta.textContent = texto;
    } catch (err) {
        respuesta.textContent = "Error al enviar el mensaje";
    }
});
