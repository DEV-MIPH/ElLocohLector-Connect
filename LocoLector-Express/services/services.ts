import { getAllAuthors, getBooksJoin, getAllCategories,getAllEditorials, getAllEditions } from '../data-access-layer/data-access-layer';
import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(`rediss://default:${process.env.REDIS_TOKEN}@engaging-termite-30271.upstash.io:30271`);

const NodeCache = require('node-cache');
const cache = new NodeCache();

//Cache de libros


async function getBooksService() {
    try {
        const books = await getBooksJoin();
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
//Funcion que obtiene los datos del cache y si no los tiene los obtiene de la base de datos y los guarda en el cache
export async function getBooksCache() {

    try {
        const cacheKey = "libros";
        const tiempoCache = 3600;

        // Intentar obtener los libros de la caché
        const booksFromCache = cache.get(cacheKey);
        if (booksFromCache) {
            console.log("Libros obtenidos de la caché local");
            return booksFromCache;
        }

        // Si no hay libros en la caché, obtenerlos de la base de datos
        const booksFromDb = await getBooks();

        // Guardar los libros en la caché local para la próxima vez
        cache.set(cacheKey, booksFromDb, tiempoCache);        

        console.log("Libros guardados en la caché local");

        return booksFromDb;
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        return [];
    }
}

export async function getAutorService() {
    try {
        const autor = await getAllAuthors();
        return autor;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getCategoriasService() {
    try {
        const categorias = await getAllCategories();
        return categorias;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getEditorialesService() {
    try {
        const editoriales = await getAllEditorials();
        return editoriales;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getEdicionesService() {
    try {
        const ediciones = await getAllEditions();
        return ediciones;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}




