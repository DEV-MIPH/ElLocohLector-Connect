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
exports.getAllBooks = void 0;
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
