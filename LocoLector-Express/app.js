"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller/controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (origin && origin.includes('localhost')) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido'));
        }
    }
}));
app.get('/libros', controller_1.getAllBooksController);
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
const server = app.listen(port, '127.0.0.1', () => {
    const address = server.address();
    if (address) {
        const host = address.address;
        const port = address.port;
        console.log(`Servidor corriendo en http://${host}:${port}`);
    }
    else {
        console.error('No se pudo obtener la dirección del servidor');
    }
});
