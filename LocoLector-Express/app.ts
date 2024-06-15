import express from 'express';

import { getAllBooksController } from './controller/controller';
import { getAllAutoresController } from './controller/controller';
import { getAllCategoriasController } from './controller/controller';
import { getAllEditorialesController } from './controller/controller';
import { getAllEdicionesController } from './controller/controller';

import cors from 'cors';

const app = express();
const port = 3000;

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

app.get('/libros', getAllBooksController);

app.get('/autores', getAllAutoresController);

app.get('/categorias', getAllCategoriasController);

app.get('/editoriales', getAllEditorialesController);

app.get('/ediciones', getAllEdicionesController);



app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});


