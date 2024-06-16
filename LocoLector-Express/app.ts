import express from 'express';

import { getAllBooksCacheController, getAllBooksController, postAutorController, postBookController, 
    postCategoriaController, postEdicionController, postEditorialController } from './controller/controller';

import { getAllAutoresController } from './controller/controller';
import { getAllCategoriasController } from './controller/controller';
import { getAllEditorialesController } from './controller/controller';
import { getAllEdicionesController } from './controller/controller';

import cors from 'cors';


const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
            if (origin && origin.includes('localhost')) {
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

app.post('/libros', postBookController);

app.post('/autores', postAutorController);

app.post('/categorias', postCategoriaController);

app.post('/editoriales', postEditorialController);

app.post('/ediciones', postEdicionController);


app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});


