import express from 'express';

import { getAllAdminController, getAllBooksCacheController, getAllBooksController, getAllEstadosController, getAllNombreUsuariosController, getEjemplaresByIdPedidoController, getUserIdByEmailController, getViewEjemplaresController, modificarEjemplarController, modificarLibroController, postAutorController, postBookController, 
    postCategoriaController, postEdicionController, postEditorialController, 
    postEjemplarController,
    postNewUser,
    postPedidoController} from './controller/controller';

import { getAllAutoresController } from './controller/controller';
import { getAllCategoriasController } from './controller/controller';
import { getAllEditorialesController } from './controller/controller';
import { getAllEdicionesController } from './controller/controller';

import cors from 'cors';
import { sendEmail } from './controller/emailController';
import { modificarLibroService } from './services/services';


const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
            if (origin && origin.includes('https://lokolector.vercel.app')) {
                callback(null, true);
            } else {
                callback(new Error('No permitido'));
            }
        }
    }
    )
);

app.get('/libros', getAllBooksCacheController);

app.get('/all_libros', getAllBooksController);

app.get('/autores', getAllAutoresController);

app.get('/categorias', getAllCategoriasController);

app.get('/editoriales', getAllEditorialesController);

app.get('/ediciones', getAllEdicionesController);

app.get('/librosadmin', getAllBooksController);

app.get('/getadmins', getAllAdminController);

app.get('/ejemplares', getViewEjemplaresController);

app.get('/estados', getAllEstadosController);

app.get('/nombres_usuarios', getAllNombreUsuariosController);

app.post('/libros', postBookController);

app.post('/autores', postAutorController);

app.post('/categorias', postCategoriaController);

app.post('/editoriales', postEditorialController);

app.post('/ediciones', postEdicionController);

app.post('/ejemplares', postEjemplarController);

app.post('/send-email', sendEmail);

app.post('/addUser', postNewUser);

app.post('/ejemplar', postEjemplarController);

app.post('/ejemplaresByPedido', getEjemplaresByIdPedidoController);

app.post('/pedidoo', postPedidoController);

app.post('/getUserIdByEmail', getUserIdByEmailController);

app.post('/modificarEjemplar', modificarEjemplarController);

app.post('/modificarLibro', modificarLibroController);


app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});


