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
