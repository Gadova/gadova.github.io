
/*
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Ruta de prueba
app.post("/contacto", (req, res) => {
    console.log("Datos recibidos:", req.body);
    res.send("El servidor recibió los datos correctamente");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
*/

const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Ruta POST del formulario
app.post("/contacto", async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    console.log("Datos recibidos:", req.body);

    try {
        // Configurar transporte SMTP (Gmail con contraseña de aplicación)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "gadova.mmi@gmail.com",
                pass: "ikaf unst zhyq hxci "
            }
        });

        // Contenido del correo
        const mailOptions = {
            from: "gadova.mmi@gmail.com",
            to: "gadova.mmi@gmail.com",
            replyTo: email,
            subject: `Nuevo mensaje de ${nombre}`,
            text: `
                Nombre: ${nombre}
                Email: ${email}
                Mensaje:
                ${mensaje}
    `
};

        // Enviar correo
        await transporter.sendMail(mailOptions);

        res.send("Correo enviado correctamente");

    } catch (error) {
        res.status(500).send("Error enviando el correo");
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
