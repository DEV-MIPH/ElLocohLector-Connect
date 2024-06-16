"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller/controller");
const controller_2 = require("./controller/controller");
const controller_3 = require("./controller/controller");
const controller_4 = require("./controller/controller");
const controller_5 = require("./controller/controller");
const app = (0, express_1.default)();
const port = 3000;
// app.use(cors({
//     origin: (origin, callback) => {
//             if (origin && origin.includes('localhost')) {
//                 callback(null, true);
//             } else {
//                 callback(new Error('No permitido'));
//             }
//         }
//     }
//     )
// );
app.get('/libros', controller_1.getAllBooksCacheController);
app.get('/all_libros', controller_1.getAllBooksController);
app.get('/autores', controller_2.getAllAutoresController);
app.get('/categorias', controller_3.getAllCategoriasController);
app.get('/editoriales', controller_4.getAllEditorialesController);
app.get('/ediciones', controller_5.getAllEdicionesController);
app.post('/libros', controller_1.postBookController);
app.post('/autores', controller_1.postAutorController);
app.post('/categorias', controller_1.postCategoriaController);
app.post('/editoriales', controller_1.postEditorialController);
app.post('/ediciones', controller_1.postEdicionController);
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
