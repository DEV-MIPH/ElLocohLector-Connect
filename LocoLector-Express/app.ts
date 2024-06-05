import express from 'express';
import { getAllBooksController } from './controller/controller';
import cors from 'cors';
import { AddressInfo } from 'net';

const app = express();
const port = 3000;

app.use(cors({
    origin: (origin, callback) => {
        if (origin && origin.includes('https://el-locoh-lector.vercel.app/')) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}
)
);

app.get('/libros', getAllBooksController);


app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


const server = app.listen(port, '127.0.0.1', () => {
    const address = server.address() as AddressInfo;
    if (address) {
        const host = address.address;
        const port = address.port;
        console.log(`Servidor corriendo en http://${host}:${port}`);
    } else {
        console.error('No se pudo obtener la dirección del servidor');
    }
});

