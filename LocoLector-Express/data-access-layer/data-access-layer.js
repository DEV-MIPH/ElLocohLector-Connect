"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEditions = exports.getAllEditorials = exports.getAllCategories = exports.getAllAuthors = exports.getBooksJoin = exports.getAllBooks = void 0;
const client_1 = require("@libsql/client");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno desde un archivo .env
dotenv_1.default.config();
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
const client = (0, client_1.createClient)({
    url: dbUrl,
    authToken: authToken,
});
// Función para obtener todos los libros de la base de datos
function getAllBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.execute("SELECT * FROM libro;");
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los libros:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllBooks = getAllBooks;
//Funcion para hacer un join entre las tablas libro , autor , editorial , categoria , edicion
function getBooksJoin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.execute("SELECT libro.id AS id, libro.titulo AS titulo,autor.nombre AS Autor,categoria.nombre AS Categoria,editorial.nombre AS Editorial, edicion.nombre AS edicion,libro.cantidad AS cantidad FROM libro JOIN autor ON autor.id = libro.autor JOIN categoria ON libro.categoria = categoria.id JOIN editorial ON libro.editorial = editorial.id JOIN edicion ON libro.edicion = edicion.id;");
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los libros:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getBooksJoin = getBooksJoin;
//Funcion para obtener todos los autores de la base de datos
function getAllAuthors() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.execute("SELECT * FROM autor;");
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los autores:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllAuthors = getAllAuthors;
//Funcion para obtener todas las categorias de la base de datos
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.execute("SELECT * FROM categoria;");
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener las categorias:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllCategories = getAllCategories;
//Funcion para obtener todas las editoriales de la base de datos
function getAllEditorials() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.execute("SELECT * FROM editorial;");
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener las editoriales:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllEditorials = getAllEditorials;
//Funcion para obtener todas las ediciones de la base de datos
function getAllEditions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.execute("SELECT * FROM edicion;");
            return result.rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener las ediciones:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllEditions = getAllEditions;
