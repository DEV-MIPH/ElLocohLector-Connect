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
exports.modificarLibro = exports.modificarEjemplar = exports.getIdEstadoByNombreEstado = exports.getUserIdByEmail = exports.getAllEstados = exports.getAllNombreUsuariosData = exports.getEjemplaresByIdPedido = exports.getUserByEmail = exports.postPedidoData = exports.postEjemplarData = exports.getViewEjemplares = exports.getAdmins = exports.postUserData = exports.getBookByData = exports.getEditionByName = exports.getCategoryByName = exports.getEditorialByName = exports.getAuthorByName = exports.postEditionData = exports.postEditorialData = exports.postCategoryData = exports.postAuthorData = exports.postBookData = exports.getAllEditions = exports.getAllEditorials = exports.getAllCategories = exports.getAllAuthors = exports.getBooksJoin = exports.getAllBooks = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = require("mysql2/promise");
dotenv_1.default.config();
const pool = (0, promise_1.createPool)({
    host: process.env.DATABASE_URL,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.NAME_DATABASE,
    connectionLimit: 10,
    queueLimit: 0
});
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
            const [rows] = yield pool.query('SELECT * FROM usuario where id_tipo_usuario = 2 or id_usuario = 1 ;');
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
function getUserIdByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT id_usuario FROM usuario WHERE email_usuario = ?;', [email]);
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener el id del usuario:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getUserIdByEmail = getUserIdByEmail;
function getIdEstadoByNombreEstado(estado) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield pool.query('SELECT id_estado FROM estado WHERE nombre_estado = ?;', [estado]);
            if (rows.length > 0) {
                return rows[0].id_estado;
            }
            else {
                return null;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener el id del estado:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return null;
        }
    });
}
exports.getIdEstadoByNombreEstado = getIdEstadoByNombreEstado;
function modificarEjemplar(ejemplar) {
    return __awaiter(this, void 0, void 0, function* () {
        let id_estado = yield getIdEstadoByNombreEstado(ejemplar.estado);
        if (id_estado === null) {
            console.error('Error: el estado especificado no existe');
            return false;
        }
        try {
            const sql = 'UPDATE ejemplar SET id_estado = ?, id_pedido = ? WHERE id_ejemplar = ?';
            const [result] = yield pool.query(sql, [id_estado, ejemplar.id_pedido, ejemplar.id_ejemplar]);
            // Asegúrate de que `result` no sea undefined
            if (result && result.affectedRows !== undefined) {
                return result.affectedRows > 0;
            }
            else {
                console.error('Error: El resultado de la consulta no tiene la estructura esperada');
                return false;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error al modificar el ejemplar:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.modificarEjemplar = modificarEjemplar;
function modificarLibro(libro, id_libro) {
    return __awaiter(this, void 0, void 0, function* () {
        const idAutor = libro.autor;
        const idCategoria = libro.categoria;
        const idEditorial = libro.editorial;
        const idEdicion = libro.edicion;
        const libroActualizado = {
            titulo_libro: libro.titulo_libro,
            autor: idAutor,
            categoria: idCategoria,
            editorial: idEditorial,
            edicion: idEdicion
        };
        try {
            const sql = 'UPDATE libro SET titulo_libro = ?, autor = ?, categoria = ?, editorial = ?, edicion = ? WHERE id_libro = ?';
            const [result] = yield pool.query(sql, [libroActualizado.titulo_libro, libroActualizado.autor, libroActualizado.categoria, libroActualizado.editorial, libroActualizado.edicion, id_libro]);
            if (result && result.affectedRows !== undefined) {
                return result.affectedRows > 0;
            }
            else {
                console.error('Error: El resultado de la consulta no tiene la estructura esperada');
                return false;
            }
        }
        catch (error) {
            console.error('Error al modificar el libro:', error);
            return false;
        }
    });
}
exports.modificarLibro = modificarLibro;
