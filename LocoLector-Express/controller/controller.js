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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewUser = exports.postEjemplarController = exports.postEdicionController = exports.postEditorialController = exports.postCategoriaController = exports.postAutorController = exports.postBookController = exports.getAllEdicionesController = exports.getAllEditorialesController = exports.getAllCategoriasController = exports.getAllAutoresController = exports.getAllBooksController = exports.getAllBooksCacheController = void 0;
const services_1 = require("../services/services");
const services_2 = require("../services/services");
const services_3 = require("../services/services");
const services_4 = require("../services/services");
const services_5 = require("../services/services");
const services_6 = require("../services/services");
const services_7 = require("../services/services");
const services_8 = require("../services/services");
const services_9 = require("../services/services");
const services_10 = require("../services/services");
const services_11 = require("../services/services");
function getAllBooksCacheController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, services_1.getBooksCache)();
            res.status(200).json(books);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al obtener los libros' });
        }
    });
}
exports.getAllBooksCacheController = getAllBooksCacheController;
function getAllBooksController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield (0, services_6.getBooksService)();
            res.status(200).json(books);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al obtener los libros' });
        }
    });
}
exports.getAllBooksController = getAllBooksController;
function getAllAutoresController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const autor = yield (0, services_2.getAutorService)();
            res.status(200).json(autor);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al obtener los libros' });
        }
    });
}
exports.getAllAutoresController = getAllAutoresController;
function getAllCategoriasController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categorias = yield (0, services_3.getCategoriasService)();
            res.status(200).json(categorias);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al obtener los libros' });
        }
    });
}
exports.getAllCategoriasController = getAllCategoriasController;
function getAllEditorialesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editoriales = yield (0, services_4.getEditorialesService)();
            res.status(200).json(editoriales);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al obtener los libros' });
        }
    });
}
exports.getAllEditorialesController = getAllEditorialesController;
function getAllEdicionesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ediciones = yield (0, services_5.getEdicionesService)();
            res.status(200).json(ediciones);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al obtener los libros' });
        }
    });
}
exports.getAllEdicionesController = getAllEdicionesController;
function postBookController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield (0, services_1.postNewBook)(req.body);
            res.status(201).json(book);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al postear un libro' });
        }
    });
}
exports.postBookController = postBookController;
function postAutorController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const autor = yield (0, services_7.postAutorService)(req.body);
            res.status(201).json(autor);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al postear un libro' });
        }
    });
}
exports.postAutorController = postAutorController;
function postCategoriaController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoria = yield (0, services_8.postCategoriaService)(req.body);
            res.status(201).json(categoria);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al postear un libro' });
        }
    });
}
exports.postCategoriaController = postCategoriaController;
function postEditorialController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Editorial nueva");
            console.log(req.body);
            const editorial = yield (0, services_9.postEditorialService)(req.body);
            res.status(201).json(editorial);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al postear un libro' });
        }
    });
}
exports.postEditorialController = postEditorialController;
function postEdicionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const edicion = yield (0, services_10.postEdicionService)(req.body);
            res.status(201).json(edicion);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al postear un libro' });
        }
    });
}
exports.postEdicionController = postEdicionController;
function postEjemplarController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const edicion = yield (0, services_1.postEjemplarService)(req.body);
            res.status(201).json(edicion);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al postear un libro' });
        }
    });
}
exports.postEjemplarController = postEjemplarController;
function postNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, services_11.postUser)(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            console.error('Error en el controlador de libros:', error);
            res.status(500).json({ message: 'Error al postear un libro' });
        }
    });
}
exports.postNewUser = postNewUser;
