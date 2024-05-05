import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

// Cargar las variables de entorno desde un archivo .env
dotenv.config();

// Obtener el URL de la base de datos y asegurarse de que no sea undefined
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
    throw new Error('El URL de la base de datos no está definido en las variables de entorno');
}

// Obtener el token de autenticación y asegurarse de que no sea undefined
const authToken = process.env.AUTH_TOKEN;
if (!authToken) {
    throw new Error('El token de autenticación no está definido en las variables de entorno');
}

// Crear un cliente de base de datos con las credenciales
const client = createClient({
    url: dbUrl,
    authToken: authToken,
});

// Función para obtener todos los libros de la base de datos
export async function getAllBooks() {
    try {
        const result = await client.execute("SELECT * FROM libro;");
        return result.rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los libros:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

//Funcion para hacer un join entre las tablas libro , autor , editorial , categoria , edicion
export async function getBooksJoin() {
    try {
        const result = await client.execute("SELECT libro.id AS id, libro.titulo AS titulo,autor.nombre AS Autor,categoria.nombre AS Categoria,editorial.nombre AS Editorial, edicion.nombre AS edicion,libro.cantidad AS cantidad FROM libro JOIN autor ON autor.id = libro.autor JOIN categoria ON libro.categoria = categoria.id JOIN editorial ON libro.editorial = editorial.id JOIN edicion ON libro.edicion = edicion.id;");
        return result.rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los libros:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

//Funcion para obtener todos los autores de la base de datos
export async function getAllAuthors() {
    try {
        const result = await client.execute("SELECT * FROM autor;");
        return result.rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los autores:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

//Funcion para obtener todas las categorias de la base de datos
export async function getAllCategories() {
    try {
        const result = await client.execute("SELECT * FROM categoria;");
        return result.rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener las categorias:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

//Funcion para obtener todas las editoriales de la base de datos
export async function getAllEditorials() {
    try {
        const result = await client.execute("SELECT * FROM editorial;");
        return result.rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener las editoriales:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

//Funcion para obtener todas las ediciones de la base de datos

export async function getAllEditions() {
    try {
        const result = await client.execute("SELECT * FROM edicion;");
        return result.rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener las ediciones:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}




