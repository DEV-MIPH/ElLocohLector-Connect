"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller/controller");
const controller_2 = require("./controller/controller");
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
app.get('/autores', controller_2.getAllAutoresController);
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
