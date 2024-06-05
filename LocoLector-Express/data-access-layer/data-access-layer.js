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
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = require("mysql2/promise");
// Cargar las variables de entorno desde un archivo .env
dotenv_1.default.config();
const pool = (0, promise_1.createPool)({
    host: process.env.DATABASE_URL,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.NAME_DATABASE,
    connectionLimit: 10,
    queueLimit: 0
});
// Función para obtener todos los libros de la base de datos
function getAllBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT * FROM libro;');
            return rows;
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
            const [rows] = yield pool.query('SELECT * FROM libros_view;');
            return rows;
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
            const [rows] = yield pool.query('SELECT * FROM autor;');
            return rows;
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
            const [rows] = yield pool.query('SELECT * FROM categoria;');
            return rows;
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
            const [rows] = yield pool.query('SELECT * FROM editorial;');
            return rows;
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
            const [rows] = yield pool.query('SELECT * FROM edicion;');
            return rows;
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
