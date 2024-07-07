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
exports.getAllEstados = exports.getAllNombreUsuariosData = exports.getEjemplaresByIdPedido = exports.getUserByEmail = exports.postPedidoData = exports.postEjemplarData = exports.getViewEjemplares = exports.getAdmins = exports.postUserData = exports.getBookByData = exports.getEditionByName = exports.getCategoryByName = exports.getEditorialByName = exports.getAuthorByName = exports.postEditionData = exports.postEditorialData = exports.postCategoryData = exports.postAuthorData = exports.postBookData = exports.getAllEditions = exports.getAllEditorials = exports.getAllCategories = exports.getAllAuthors = exports.getBooksJoin = exports.getAllBooks = void 0;
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
            const sql = 'INSERT INTO libro SET ?';
            const result = yield pool.query(sql, book);
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
            const sql = 'INSERT INTO autor SET ?';
            const result = yield pool.query(sql, author);
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
            const sql = 'INSERT INTO categoria SET ?';
            const result = yield pool.query(sql, category);
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
            const sql = 'INSERT INTO editorial SET ?';
            const result = yield pool.query(sql, editorial);
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
            const sql = 'INSERT INTO edicion SET ?';
            const result = yield pool.query(sql, edition);
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
//Funcion para obtener un autor por su nombre y retorna su id
function getAuthorByName(name, apellido) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT id_autor FROM autor WHERE nombre_autor = ? and apellido_autor = ?', [name, apellido]);
            if (rows.length > 0) {
                return rows[0].id_autor;
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener el autor:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getAuthorByName = getAuthorByName;
//Funcion para obtener un editorial por su nombre
function getEditorialByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT id_editorial FROM editorial WHERE nombre_editorial = ?', [name]);
            if (rows.length > 0) {
                return rows[0].id_editorial;
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener la editorial:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getEditorialByName = getEditorialByName;
//Funcion para obtener una categoria por su nombre
function getCategoryByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT id_categoria FROM categoria WHERE nombre_categoria = ?', [name]);
            if (rows.length > 0) {
                return rows[0].id_categoria;
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener la categoria:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getCategoryByName = getCategoryByName;
//Funcion para obtener una edicion por su nombre y retorne su id
function getEditionByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT id_edicion FROM edicion WHERE edicion = ?', [name]);
            if (rows.length > 0) {
                return rows[0].id_edicion;
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener la edicion:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getEditionByName = getEditionByName;
//Funcion para obtener un libro por su titulo, autor, categoria, editorial, edicion y retorne su id 
function getBookByData(titulo, autor, categoria, editorial, edicion) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(titulo, autor, categoria, editorial, edicion);
        try {
            const [rows] = yield pool.query('SELECT id FROM libros_view WHERE titulo = ? and Autor = ? and Categoria = ? and Editorial = ? and Edicion = ?', [titulo, autor, categoria, editorial, edicion]);
            if (rows.length > 0) {
                return rows[0].id;
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener el libro:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getBookByData = getBookByData;
//Funcion para agregar un usuario a la base de datos
function postUserData(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sql = 'INSERT INTO usuario SET ?';
            const result = yield pool.query(sql, user);
            const resultSetHeader = result[0];
            return resultSetHeader.affectedRows > 0;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar el usuario:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postUserData = postUserData;
function getAdmins() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT email_usuario FROM usuario WHERE id_tipo_usuario = 1;');
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los administradores:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAdmins = getAdmins;
function getViewEjemplares() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT * FROM ejemplares_view;');
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los ejemplares:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getViewEjemplares = getViewEjemplares;
//Funcion para agregar un ejemplar a la tabla ejemplar
function postEjemplarData(ejemplar) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sql = 'INSERT INTO ejemplar SET ?';
            const result = yield pool.query(sql, ejemplar);
            const resultSetHeader = result[0];
            return resultSetHeader.affectedRows > 0;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar el ejemplar:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postEjemplarData = postEjemplarData;
//Post para agregar un nuevo Pedido que retorna el id del pedido
function postPedidoData(id_usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const pedido = {
            fecha_pedido: formattedDate,
            id_usuario: id_usuario
        };
        try {
            const sql = 'INSERT INTO pedido SET ?';
            const result = yield pool.query(sql, pedido);
            const resultSetHeader = result[0];
            return resultSetHeader.insertId;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al insertar el pedido:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.postPedidoData = postPedidoData;
//Funcion para obtener un usuario por su correo y retorne su id
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT id_usuario FROM usuario WHERE email_usuario = ?', [email]);
            if (rows.length > 0) {
                return rows[0].id_usuario;
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener el usuario:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function getEjemplaresByIdPedido(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT * FROM ejemplares_view WHERE id_pedido = ?;', [id]);
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los ejemplares:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getEjemplaresByIdPedido = getEjemplaresByIdPedido;
function getAllNombreUsuariosData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT nombre_usuario from usuario where id_tipo_usuario = 2;');
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los usuarios:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllNombreUsuariosData = getAllNombreUsuariosData;
function getAllEstados() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT nombre_estado FROM estado;');
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los estados:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllEstados = getAllEstados;
