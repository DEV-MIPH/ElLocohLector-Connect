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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const lokolector_firebase_json_1 = __importDefault(require("./lokolector-firebase.json"));
// Inicializar la app de Firebase
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(lokolector_firebase_json_1.default),
});
// Configurar Express
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (origin && origin.includes('localhost')) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido'));
        }
    },
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Ruta para logear usuarios
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar el usuario con Firebase
        const userRecord = yield firebase_admin_1.default.auth().getUserByEmail(email);
        if (!userRecord) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Autenticar el usuario
        const customToken = yield firebase_admin_1.default.auth().createCustomToken(userRecord.uid);
        res.status(200).json({ token: customToken });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Ruta para crear un nuevo usuario
app.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, displayName } = req.body;
    try {
        const userRecord = yield firebase_admin_1.default.auth().createUser({
            email,
            password,
            displayName,
        });
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
