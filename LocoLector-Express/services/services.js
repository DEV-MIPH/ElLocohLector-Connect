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
exports.getViewEjemplaresService = exports.getAllAdminService = exports.postUser = exports.searchEdicion = exports.searchEditorial = exports.searchCategoria = exports.postEjemplar = exports.postNewBook = exports.postEjemplarService = exports.postEdicionService = exports.postEditorialService = exports.postCategoriaService = exports.postAutorService = exports.postBookService = exports.getEdicionesService = exports.getEditorialesService = exports.getCategoriasService = exports.getAutorService = exports.getBooksCache = exports.getBooks = exports.getAllBooksService = exports.getBooksService = void 0;
const data_access_layer_1 = require("../data-access-layer/data-access-layer");
const data_access_layer_2 = require("../data-access-layer/data-access-layer");
const data_access_layer_3 = require("../data-access-layer/data-access-layer");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis = new ioredis_1.default(`rediss://default:${process.env.REDIS_TOKEN}@engaging-termite-30271.upstash.io:30271`);
const NodeCache = require('node-cache');
const cache = new NodeCache();
//Cache de libros
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
            // Intentar obtener los libros de Redis
            const booksFromCache = yield redis.get(redisKey);
            if (booksFromCache) {
                console.log("Libros obtenidos de la caché Redis");
                return JSON.parse(booksFromCache);
            }
            // Si no hay libros en la caché, obtenerlos de la base de datos
            const booksFromDb = yield getBooksService();
            console.log("Libros obtenidos de la base de datos");
            // Guardar los libros en la caché Redis para la próxima vez
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
//Funcion que obtiene los datos del cache y si no los tiene los obtiene de la base de datos y los guarda en el cache
function getBooksCache() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const booksFromDb = yield getBooks();
            // Guardar los libros en la caché local para la próxima vez
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
            //limpiar cache
            cache.flushAll();
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
function postEjemplarService(Ejemplar) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newEjemplar = yield (0, data_access_layer_2.postEjemplarData)(Ejemplar);
            return newEjemplar;
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
exports.postEjemplarService = postEjemplarService;
//Funcion para crear un nuevo libro con los datos del libro y los datos de autor, categoria, editorial y edicion
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
//Funcion para postear ejemplares de un libro
function postEjemplar(ejemplar) {
    return __awaiter(this, void 0, void 0, function* () {
        const ejemplarCreado = {
            id_libro: ejemplar.id_libro,
            id_pedido: ejemplar.id_pedido,
            id_estado: ejemplar.id_estado,
            descripcion_ejemplar: ejemplar.descripcion_ejemplar,
            cantidad_ejemplar: ejemplar.cantidad_ejemplar
        };
        try {
            const newEjemplar = yield postEjemplarService(ejemplar);
            return newEjemplar;
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            return false;
        }
    });
}
exports.postEjemplar = postEjemplar;
//Funciones para buscar si existe un autor, categoria, editorial o edicion
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
//funcion para agregar un usuario a la base de datos
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
//Funcion para separar el nombre del autor en nombre y apellido
function splitName(fullName) {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    return { firstName, lastName };
}
