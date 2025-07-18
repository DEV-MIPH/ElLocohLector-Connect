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
const cors_1 = __importDefault(require("cors"));
const emailController_1 = require("./controller/emailController");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (origin && origin.includes('https://lokolector.vercel.app')) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido'));
        }
    }
}));
app.get('/libros', controller_1.getAllBooksCacheController);
app.get('/all_libros', controller_1.getAllBooksController);
app.get('/autores', controller_2.getAllAutoresController);
app.get('/categorias', controller_3.getAllCategoriasController);
app.get('/editoriales', controller_4.getAllEditorialesController);
app.get('/ediciones', controller_5.getAllEdicionesController);
app.get('/librosadmin', controller_1.getAllBooksController);
app.get('/getadmins', controller_1.getAllAdminController);
app.get('/ejemplares', controller_1.getViewEjemplaresController);
app.get('/estados', controller_1.getAllEstadosController);
app.get('/nombres_usuarios', controller_1.getAllNombreUsuariosController);
app.post('/libros', controller_1.postBookController);
app.post('/autores', controller_1.postAutorController);
app.post('/categorias', controller_1.postCategoriaController);
app.post('/editoriales', controller_1.postEditorialController);
app.post('/ediciones', controller_1.postEdicionController);
app.post('/ejemplares', controller_1.postEjemplarController);
app.post('/send-email', emailController_1.sendEmail);
app.post('/addUser', controller_1.postNewUser);
app.post('/ejemplar', controller_1.postEjemplarController);
app.post('/ejemplaresByPedido', controller_1.getEjemplaresByIdPedidoController);
app.post('/pedidoo', controller_1.postPedidoController);
app.post('/getUserIdByEmail', controller_1.getUserIdByEmailController);
app.post('/modificarEjemplar', controller_1.modificarEjemplarController);
app.post('/modificarLibro', controller_1.modificarLibroController);
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
