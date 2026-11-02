const mongoose = require("mongoose");
const Reserva = require("./models/Reserva");
const express = require("express");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const puerto = 3000;

// Carpeta pública
app.use(express.static("public"));

// Mostrar página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Conectar a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ESMALTE_Y_ARTE_NAILS")
.then(() => {
    console.log("✅ MongoDB conectado");
})
.catch((error) => {
    console.log(error);
});

// Guardar reservas
app.post("/reservar", async (req, res) => {
    console.log(req.body);
    try {
        const nuevaReserva = new Reserva({
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            servicio: req.body.servicio,
            fecha: req.body.fecha
        });

        await nuevaReserva.save();

        res.send("✅ Reserva guardada correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("❌ Error al guardar la reserva");
    }
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor funcionando en puerto ${puerto}`);
});