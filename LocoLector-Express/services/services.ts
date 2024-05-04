import { getAllBooks } from '../data-access-layer/data-access-layer';
import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(`rediss://default:${process.env.REDIS_TOKEN}@engaging-termite-30271.upstash.io:30271`);

async function getBooksService() {
    try {
        const books = await getAllBooks();
        return books;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getBooks() {
    try {
        const redisKey = "libros"; 

        // Intentar obtener los libros de Redis
        const booksFromCache = await redis.get(redisKey);
        if (booksFromCache) {
            console.log("Libros obtenidos de la caché Redis");
            return JSON.parse(booksFromCache);
        }

        // Si no hay libros en la caché, obtenerlos de la base de datos
        const booksFromDb = await getBooksService();
        console.log("Libros obtenidos de la base de datos");

        // Guardar los libros en la caché Redis para la próxima vez
        await redis.set(redisKey, JSON.stringify(booksFromDb));
        console.log("Libros guardados en la caché Redis");

        return booksFromDb;
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        return [];
    }
}

