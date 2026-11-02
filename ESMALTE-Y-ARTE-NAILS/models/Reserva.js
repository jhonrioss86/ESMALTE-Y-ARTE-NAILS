const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    servicio: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Reserva", reservaSchema);