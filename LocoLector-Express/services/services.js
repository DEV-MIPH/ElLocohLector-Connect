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
exports.getBooksCache = exports.getBooks = void 0;
const data_access_layer_1 = require("../data-access-layer/data-access-layer");
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
            const tiempoCache = 60;
            // Intentar obtener los libros de la caché
            const booksFromCache = cache.get(cacheKey);
            if (booksFromCache) {
                console.log("Libros obtenidos de la caché local");
                return booksFromCache;
            }
            // Si no hay libros en la caché, obtenerlos de la base de datos
            const booksFromDb = yield getBooks();
            console.log("Libros obtenidos de la base de datos");
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
