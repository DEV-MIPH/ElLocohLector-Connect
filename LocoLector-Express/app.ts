import express from 'express';
import { getAllBooksController } from './controller/controller';

const app = express();
const port = 3000;


app.get('/libros', getAllBooksController);

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});


