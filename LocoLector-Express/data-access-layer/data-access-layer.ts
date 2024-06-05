import { createClient } from "@libsql/client";
import dotenv from 'dotenv';
import { createPool, Pool } from 'mysql2/promise';

// Cargar las variables de entorno desde un archivo .env
dotenv.config();

const pool: Pool = createPool({
    host: process.env.DATABASE_URL, 
    user: process.env.USER_DATABASE, 
    password: process.env.PASSWORD_DATABASE,
    database: process.env.NAME_DATABASE,
    connectionLimit: 10,
    queueLimit: 0
  });



// Función para obtener todos los libros de la base de datos
export async function getAllBooks() {
    try {
        const [rows] = await pool.query('SELECT * FROM libro;');
        return rows;
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
        const [rows] = await pool.query('SELECT * FROM libros_view;');
        return rows;
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
        const [rows] = await pool.query('SELECT * FROM autor;');
        return rows;
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
        const [rows] = await pool.query('SELECT * FROM categoria;');
        return rows;
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
        const [rows] = await pool.query('SELECT * FROM editorial;');
        return rows;
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
        const [rows] = await pool.query('SELECT * FROM edicion;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener las ediciones:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}