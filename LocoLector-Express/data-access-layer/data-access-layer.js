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
exports.postEditionData = exports.postEditorialData = exports.postCategoryData = exports.postAuthorData = exports.postBookData = exports.getAllEditions = exports.getAllEditorials = exports.getAllCategories = exports.getAllAuthors = exports.getBooksJoin = exports.getAllBooks = void 0;
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
//Funcion para postear un libro en la base de datos
function postBookData(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query('INSERT INTO libro SET ?', book);
            const resultSetHeader = result[0];
            return resultSetHeader.affectedRows > 0;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar el libro:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postBookData = postBookData;
//Funcion para postear un autor en la base de datos
function postAuthorData(author) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(author);
            const sql = 'INSERT INTO libro(nombre_autor,apellido_autor) VALUES(?,?)';
            const result = yield pool.query(sql, [author.nombre_autor, author.apellido_autor]);
            const resultSetHeader = result[0];
            return resultSetHeader.affectedRows > 0;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar el autor:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postAuthorData = postAuthorData;
//Funcion para postear una categoria en la base de datos
function postCategoryData(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query('INSERT INTO categoria SET ?', category);
            const resultSetHeader = result[0];
            return resultSetHeader.affectedRows > 0;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar la categoria:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postCategoryData = postCategoryData;
//Funcion para postear una editorial en la base de datos
function postEditorialData(editorial) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query('INSERT INTO editorial SET ?', editorial);
            const resultSetHeader = result[0];
            return resultSetHeader.affectedRows > 0;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar la editorial:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postEditorialData = postEditorialData;
//Funcion para postear una edicion en la base de datos
function postEditionData(edition) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query('INSERT INTO edicion SET ?', edition);
            const resultSetHeader = result[0];
            return resultSetHeader.affectedRows > 0;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar la edicion:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postEditionData = postEditionData;
