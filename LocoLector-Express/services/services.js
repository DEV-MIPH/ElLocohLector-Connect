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
exports.limpiarRedis = exports.modificarLibroService = exports.modificarEjemplarService = exports.postPedidoDataService = exports.getUserIdByEmailService = exports.postPedidoService = exports.getAllNombreUsuariosService = exports.getAllEstadosService = exports.getEjemplaresbyIdPedido = exports.getViewEjemplaresService = exports.getAllAdminService = exports.postUser = exports.searchEdicion = exports.searchEditorial = exports.searchCategoria = exports.postEjemplarService = exports.postNewBook = exports.postEdicionService = exports.postEditorialService = exports.postCategoriaService = exports.postAutorService = exports.postBookService = exports.getEdicionesService = exports.getEditorialesService = exports.getCategoriasService = exports.getAutorService = exports.getBooksCache = exports.getBooks = exports.getAllBooksService = exports.getBooksService = void 0;
const data_access_layer_1 = require("../data-access-layer/data-access-layer");
const data_access_layer_2 = require("../data-access-layer/data-access-layer");
const data_access_layer_3 = require("../data-access-layer/data-access-layer");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis = new ioredis_1.default(`rediss://default:${process.env.REDIS_TOKEN}@engaging-termite-30271.upstash.io:30271`);
const NodeCache = require('node-cache');
const cache = new NodeCache();
function getBooksService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, data_access_layer_1.getBooksJoin)();
            return books;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getBooksService = getBooksService;
function getAllBooksService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, data_access_layer_1.getAllBooks)();
            return books;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAllBooksService = getAllBooksService;
function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const redisKey = "libros";
            const booksFromCache = yield redis.get(redisKey);
            if (booksFromCache) {
                console.log("Libros obtenidos de la caché Redis");
                return JSON.parse(booksFromCache);
            }
            const booksFromDb = yield getBooksService();
            console.log("Libros obtenidos de la base de datos");
            yield redis.set(redisKey, JSON.stringify(booksFromDb));
            console.log("Libros guardados en la caché Redis");
            return booksFromDb;
        }
        catch (error) {
            console.error("Error al obtener los libros:", error);
            return [];
        }
    });
}
exports.getBooks = getBooks;
function getBooksCache() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cacheKey = "libros";
            const tiempoCache = 60;
            const booksFromCache = cache.get(cacheKey);
            if (booksFromCache) {
                console.log("Libros obtenidos de la caché local");
                return booksFromCache;
            }
            const booksFromDb = yield getBooks();
            cache.set(cacheKey, booksFromDb, tiempoCache);
            console.log("Libros guardados en la caché local");
            return booksFromDb;
        }
        catch (error) {
            console.error("Error al obtener los libros:", error);
            return [];
        }
    });
}
exports.getBooksCache = getBooksCache;
function getAutorService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const autor = yield (0, data_access_layer_1.getAllAuthors)();
            return autor;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getAutorService = getAutorService;
function getCategoriasService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categorias = yield (0, data_access_layer_1.getAllCategories)();
            return categorias;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getCategoriasService = getCategoriasService;
function getEditorialesService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editoriales = yield (0, data_access_layer_1.getAllEditorials)();
            return editoriales;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getEditorialesService = getEditorialesService;
function getEdicionesService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ediciones = yield (0, data_access_layer_1.getAllEditions)();
            return ediciones;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return [];
        }
    });
}
exports.getEdicionesService = getEdicionesService;
function postBookService(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newBook = yield (0, data_access_layer_2.postBookData)(book);
            limpiarRedis();
            return newBook;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postBookService = postBookService;
function postAutorService(Autor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAutor = yield (0, data_access_layer_2.postAuthorData)(Autor);
            return newAutor;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postAutorService = postAutorService;
function postCategoriaService(Categoria) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCategoria = yield (0, data_access_layer_2.postCategoryData)(Categoria);
            return newCategoria;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postCategoriaService = postCategoriaService;
function postEditorialService(Editorial) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newEditorial = yield (0, data_access_layer_2.postEditorialData)(Editorial);
            return newEditorial;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postEditorialService = postEditorialService;
function postEdicionService(Edicion) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newEdicion = yield (0, data_access_layer_2.postEditionData)(Edicion);
            return newEdicion;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error:', error.message);
            }
            else {
                console.error('Error desconocido:', error);
            }
            return false;
        }
    });
}
exports.postEdicionService = postEdicionService;
function postNewBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const libroCreado = {
            titulo_libro: book.titulo_libro,
            autor: 0,
            categoria: 0,
            editorial: 0,
            edicion: 0
        };
        const { firstName, lastName } = splitName(book.autor);
        if (!(yield searchAutor(firstName, lastName))) {
            yield postAutorService({ nombre_autor: firstName, apellido_autor: lastName });
            console.log("Autor nuevo creado " + book.autor);
            if ((yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName)) != null) {
                libroCreado.autor = yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName)) != null) {
                libroCreado.autor = yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName);
            }
        }
        if (!(yield searchCategoria(book.categoria))) {
            yield postCategoriaService({ nombre_categoria: book.categoria });
            console.log("Categoria nueva creada " + book.categoria);
            if ((yield (0, data_access_layer_3.getCategoryByName)(book.categoria)) != null) {
                libroCreado.categoria = yield (0, data_access_layer_3.getCategoryByName)(book.categoria);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getCategoryByName)(book.categoria)) != null) {
                libroCreado.categoria = yield (0, data_access_layer_3.getCategoryByName)(book.categoria);
            }
        }
        if (!(yield searchEditorial(book.editorial))) {
            yield postEditorialService({ nombre_editorial: book.editorial });
            console.log("Editorial nueva creada " + book.editorial);
            if ((yield (0, data_access_layer_3.getEditorialByName)(book.editorial)) != null) {
                libroCreado.editorial = yield (0, data_access_layer_3.getEditorialByName)(book.editorial);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getEditorialByName)(book.editorial)) != null) {
                libroCreado.editorial = yield (0, data_access_layer_3.getEditorialByName)(book.editorial);
            }
        }
        if (!(yield searchEdicion(book.edicion))) {
            yield postEdicionService({ edicion: book.edicion });
            console.log("Edicion nueva creada " + book.edicion);
            if ((yield (0, data_access_layer_3.getEditionByName)(book.edicion)) != null) {
                libroCreado.edicion = yield (0, data_access_layer_3.getEditionByName)(book.edicion);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getEditionByName)(book.edicion)) != null) {
                libroCreado.edicion = yield (0, data_access_layer_3.getEditionByName)(book.edicion);
            }
        }
        try {
            const newBook = yield postBookService(libroCreado);
            console.log("Libro nuevo creado " + libroCreado.titulo_libro);
            return newBook;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.postNewBook = postNewBook;
function postEjemplarService(ejemplar) {
    return __awaiter(this, void 0, void 0, function* () {
        const libro = yield (0, data_access_layer_1.getBookByData)(ejemplar.nombre_libro, ejemplar.nombre_autor, ejemplar.nombre_categoria, ejemplar.nombre_editorial, ejemplar.edicion);
        const pedido = 1;
        const estado = 5;
        const ejemplarData = {
            id_libro: libro,
            id_pedido: pedido,
            id_estado: estado,
            descripcion_ejemplar: ejemplar.descripcion,
            cantidad_pedido: 1
        };
        try {
            const newEjemplar = yield (0, data_access_layer_2.postEjemplarData)(ejemplarData);
            limpiarRedis();
            return newEjemplar;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.postEjemplarService = postEjemplarService;
function searchAutor(autor, apellido) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const autorBuscado = yield (0, data_access_layer_3.getAuthorByName)(autor, apellido);
            if (autorBuscado) {
                return true;
            }
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
function searchCategoria(categoria) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoriaBuscada = yield (0, data_access_layer_3.getCategoryByName)(categoria);
            if (categoriaBuscada) {
                return true;
            }
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.searchCategoria = searchCategoria;
function searchEditorial(editorial) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editorialBuscada = yield (0, data_access_layer_3.getEditorialByName)(editorial);
            if (editorialBuscada) {
                return true;
            }
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.searchEditorial = searchEditorial;
function searchEdicion(edicion) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const edicionBuscada = yield (0, data_access_layer_3.getEditionByName)(edicion);
            if (edicionBuscada) {
                return true;
            }
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.searchEdicion = searchEdicion;
function postUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield (0, data_access_layer_1.postUserData)(user);
            return newUser;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.postUser = postUser;
function getAllAdminService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, data_access_layer_1.getAdmins)();
            return books;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return [];
        }
    });
}
exports.getAllAdminService = getAllAdminService;
function getViewEjemplaresService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, data_access_layer_1.getViewEjemplares)();
            return books;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return [];
        }
    });
}
exports.getViewEjemplaresService = getViewEjemplaresService;
function getEjemplaresbyIdPedido(pedido) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ejemplares = yield (0, data_access_layer_1.getEjemplaresByIdPedido)(pedido);
            return ejemplares;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return [];
        }
    });
}
exports.getEjemplaresbyIdPedido = getEjemplaresbyIdPedido;
function getAllEstadosService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ejemplares = yield (0, data_access_layer_1.getAllEstados)();
            return ejemplares;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return [];
        }
    });
}
exports.getAllEstadosService = getAllEstadosService;
function getAllNombreUsuariosService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuarios = yield (0, data_access_layer_1.getAllNombreUsuariosData)();
            return usuarios;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return [];
        }
    });
}
exports.getAllNombreUsuariosService = getAllNombreUsuariosService;
function postPedidoService(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(usuario);
            const newPedido = yield (0, data_access_layer_1.postPedidoData)(usuario);
            return newPedido;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.postPedidoService = postPedidoService;
function getUserIdByEmailService(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("user service " + email);
            const user = yield (0, data_access_layer_1.getUserIdByEmail)(email);
            return user;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return null;
        }
    });
}
exports.getUserIdByEmailService = getUserIdByEmailService;
function postPedidoDataService(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(email.email_usuario);
            const idUser = yield getUserIdByEmailService(email.email_usuario);
            console.log(idUser);
            const newPedido = yield (0, data_access_layer_1.postPedidoData)(idUser.id_usuario);
            return newPedido;
        }
        catch (error) {
            console.error('Error en el service de postPedidoDataService:', error);
            return false;
        }
    });
}
exports.postPedidoDataService = postPedidoDataService;
function modificarEjemplarService(ejemplar) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ejemplaresModificados = yield (0, data_access_layer_1.modificarEjemplar)(ejemplar);
            limpiarRedis();
            return ejemplaresModificados;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.modificarEjemplarService = modificarEjemplarService;
function modificarLibroService(libro) {
    return __awaiter(this, void 0, void 0, function* () {
        const libroCreado = {
            titulo_libro: libro.titulo,
            autor: 0,
            categoria: 0,
            editorial: 0,
            edicion: 0
        };
        const { firstName, lastName } = splitName(libro.Autor);
        if (!(yield searchAutor(firstName, lastName))) {
            yield postAutorService({ nombre_autor: firstName, apellido_autor: lastName });
            console.log("Autor nuevo creado " + libro.Autor);
            if ((yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName)) != null) {
                libroCreado.autor = yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName)) != null) {
                libroCreado.autor = yield (0, data_access_layer_3.getAuthorByName)(firstName, lastName);
            }
        }
        if (!(yield searchCategoria(libro.Categoria))) {
            yield postCategoriaService({ nombre_categoria: libro.Categoria });
            console.log("Categoria nueva creada " + libro.Categoria);
            if ((yield (0, data_access_layer_3.getCategoryByName)(libro.Categoria)) != null) {
                libroCreado.categoria = yield (0, data_access_layer_3.getCategoryByName)(libro.Categoria);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getCategoryByName)(libro.Categoria)) != null) {
                libroCreado.categoria = yield (0, data_access_layer_3.getCategoryByName)(libro.Categoria);
            }
        }
        if (!(yield searchEditorial(libro.Editorial))) {
            yield postEditorialService({ nombre_editorial: libro.Editorial });
            console.log("Editorial nueva creada " + libro.Editorial);
            if ((yield (0, data_access_layer_3.getEditorialByName)(libro.Editorial)) != null) {
                libroCreado.editorial = yield (0, data_access_layer_3.getEditorialByName)(libro.Editorial);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getEditorialByName)(libro.Editorial)) != null) {
                libroCreado.editorial = yield (0, data_access_layer_3.getEditorialByName)(libro.Editorial);
            }
        }
        if (!(yield searchEdicion(libro.edicion))) {
            yield postEdicionService({ edicion: libro.edicion });
            console.log("Edicion nueva creada " + libro.edicion);
            if ((yield (0, data_access_layer_3.getEditionByName)(libro.edicion)) != null) {
                libroCreado.edicion = yield (0, data_access_layer_3.getEditionByName)(libro.edicion);
            }
        }
        else {
            if ((yield (0, data_access_layer_3.getEditionByName)(libro.edicion)) != null) {
                libroCreado.edicion = yield (0, data_access_layer_3.getEditionByName)(libro.edicion);
            }
        }
        try {
            const newBook = yield (0, data_access_layer_1.modificarLibro)(libroCreado, libro.id);
            limpiarRedis();
            return newBook;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.modificarLibroService = modificarLibroService;
function limpiarRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield redis.flushall();
            console.log("Redis limpiado");
        }
        catch (error) {
            console.error('Error al limpiar Redis:', error);
        }
    });
}
exports.limpiarRedis = limpiarRedis;
function splitName(fullName) {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    return { firstName, lastName };
}
