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
exports.getAllEdicionesController = exports.getAllEditorialesController = exports.getAllCategoriasController = exports.getAllAutoresController = exports.getAllBooksController = void 0;
const services_1 = require("../services/services");
const services_2 = require("../services/services");
const services_3 = require("../services/services");
const services_4 = require("../services/services");
const services_5 = require("../services/services");
function getAllBooksController(req, res) {
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
