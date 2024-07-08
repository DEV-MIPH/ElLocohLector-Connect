import { getAllAuthors, getBooksJoin, getAllCategories, getAllEditorials, getAllEditions, getAllBooks, postUserData, getAdmins, getViewEjemplares, getBookByData, getEjemplaresByIdPedido, getAllEstados, getAllNombreUsuariosData, getUserByEmail, getUserIdByEmail, postPedidoData, modificarEjemplar, modificarLibro } from '../data-access-layer/data-access-layer';
import { postBookData, postAuthorData, postCategoryData, postEditionData, postEditorialData, postEjemplarData } from '../data-access-layer/data-access-layer';
import { getAuthorByName, getEditorialByName, getEditionByName, getCategoryByName } from '../data-access-layer/data-access-layer';

import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(`rediss://default:${process.env.REDIS_TOKEN}@engaging-termite-30271.upstash.io:30271`);

const NodeCache = require('node-cache');
const cache = new NodeCache();

interface Book {
    titulo_libro: string;
    autor: string;
    categoria: string;
    editorial: string;
    edicion: string;
}

interface NewBook {
    titulo_libro: string;
    autor: number | null;
    categoria: number | null;
    editorial: number | null;
    edicion: number | null;
}

interface EjemplarData {
    id_libro: number;
    id_pedido: number | null;
    id_estado: number;
    descripcion_ejemplar: string;
    cantidad_pedido: number;
}

interface Ejemplar {
    nombre_libro: string;
    nombre_autor: string;
    nombre_categoria: string;
    nombre_editorial: string;
    edicion: string;
    descripcion: string;
}

interface Usuario {
    nombre_usuario: string;
    email_usuario: string;
    fono_usuario: string;
    cel_usuario: string;
    id_tipo_usuario: number;
}

interface PedidoData {
    email_usuario: string;
}



export async function getBooksService() {
    try {
        const books = await getBooksJoin();
        return books;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getAllBooksService() {
    try {
        const books = await getAllBooks();
        return books;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}



export async function getBooks() {
    try {
        const redisKey = "libros";

        const booksFromCache = await redis.get(redisKey);
        if (booksFromCache) {
            console.log("Libros obtenidos de la caché Redis");
            return JSON.parse(booksFromCache);
        }

        const booksFromDb = await getBooksService();
        console.log("Libros obtenidos de la base de datos");

        await redis.set(redisKey, JSON.stringify(booksFromDb));
        console.log("Libros guardados en la caché Redis");

        return booksFromDb;
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        return [];
    }
}

export async function getBooksCache() {
    try {
        const cacheKey = "libros";
        const tiempoCache = 60;


        const booksFromCache = cache.get(cacheKey);
        if (booksFromCache) {
            console.log("Libros obtenidos de la caché local");
            return booksFromCache;
        }

        const booksFromDb = await getBooks();

        cache.set(cacheKey, booksFromDb, tiempoCache);

        console.log("Libros guardados en la caché local");

        return booksFromDb;
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        return [];
    }
}

export async function getAutorService() {
    try {
        const autor = await getAllAuthors();
        return autor;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getCategoriasService() {
    try {
        const categorias = await getAllCategories();
        return categorias;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getEditorialesService() {
    try {
        const editoriales = await getAllEditorials();
        return editoriales;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getEdicionesService() {
    try {
        const ediciones = await getAllEditions();
        return ediciones;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function postBookService(book: any) {
    try {
        const newBook = await postBookData(book);
        limpiarRedis();
        return newBook;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }

}

export async function postAutorService(Autor: any) {
    try {
        const newAutor = await postAuthorData(Autor);
        return newAutor;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function postCategoriaService(Categoria: any) {
    try {
        const newCategoria = await postCategoryData(Categoria);
        return newCategoria;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }

}

export async function postEditorialService(Editorial: any) {
    try {
        const newEditorial = await postEditorialData(Editorial);
        return newEditorial;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function postEdicionService(Edicion: any) {
    try {
        const newEdicion = await postEditionData(Edicion);
        return newEdicion;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}



export async function postNewBook(book: Book) {
    const libroCreado: NewBook = {
        titulo_libro: book.titulo_libro,
        autor: 0,
        categoria: 0,
        editorial: 0,
        edicion: 0
    }
    const { firstName, lastName } = splitName(book.autor);
    if (!await searchAutor(firstName, lastName)) {
        await postAutorService({ nombre_autor: firstName, apellido_autor: lastName });
        console.log("Autor nuevo creado " + book.autor)
        if (await getAuthorByName(firstName, lastName) != null) {
            libroCreado.autor = await getAuthorByName(firstName, lastName);
        }
    } else {
        if (await getAuthorByName(firstName, lastName) != null) {
            libroCreado.autor = await getAuthorByName(firstName, lastName);
        }
    }

    if (!await searchCategoria(book.categoria)) {
        await postCategoriaService({ nombre_categoria: book.categoria });
        console.log("Categoria nueva creada " + book.categoria)
        if (await getCategoryByName(book.categoria) != null) {
            libroCreado.categoria = await getCategoryByName(book.categoria);
        }
    } else {
        if (await getCategoryByName(book.categoria) != null) {
            libroCreado.categoria = await getCategoryByName(book.categoria);
        }
    }

    if (!await searchEditorial(book.editorial)) {
        await postEditorialService({ nombre_editorial: book.editorial });
        console.log("Editorial nueva creada " + book.editorial)
        if (await getEditorialByName(book.editorial) != null) {
            libroCreado.editorial = await getEditorialByName(book.editorial);
        }
    } else {
        if (await getEditorialByName(book.editorial) != null) {
            libroCreado.editorial = await getEditorialByName(book.editorial);
        }
    }

    if (!await searchEdicion(book.edicion)) {
        await postEdicionService({ edicion: book.edicion });
        console.log("Edicion nueva creada " + book.edicion)
        if (await getEditionByName(book.edicion) != null) {
            libroCreado.edicion = await getEditionByName(book.edicion);
        }
    } else {
        if (await getEditionByName(book.edicion) != null) {
            libroCreado.edicion = await getEditionByName(book.edicion);
        }
    }

    try {
        const newBook = await postBookService(libroCreado);
        console.log("Libro nuevo creado " + libroCreado.titulo_libro)
        return newBook;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}


export async function postEjemplarService(ejemplar: Ejemplar) {
    const libro = await getBookByData(ejemplar.nombre_libro, ejemplar.nombre_autor, ejemplar.nombre_categoria, ejemplar.nombre_editorial, ejemplar.edicion);
    const pedido = 1
    const estado = 5;
    const ejemplarData: EjemplarData = {
        id_libro: libro,
        id_pedido: pedido,
        id_estado: estado,
        descripcion_ejemplar: ejemplar.descripcion,
        cantidad_pedido: 1
    }
    try {
        const newEjemplar = await postEjemplarData(ejemplarData);
        limpiarRedis();
        return newEjemplar;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}
async function searchAutor(autor: string, apellido: string) {
    try {
        const autorBuscado = await getAuthorByName(autor, apellido);
        if (autorBuscado) {
            return true;
        }
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

export async function searchCategoria(categoria: string) {
    try {
        const categoriaBuscada = await getCategoryByName(categoria);
        if (categoriaBuscada) {
            return true;
        }
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

export async function searchEditorial(editorial: string) {
    try {
        const editorialBuscada = await getEditorialByName(editorial);
        if (editorialBuscada) {
            return true;
        }
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

export async function searchEdicion(edicion: string) {
    try {
        const edicionBuscada = await getEditionByName(edicion);
        if (edicionBuscada) {
            return true;
        }
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

export async function postUser(user: Usuario) {
    try {
        const newUser = await postUserData(user);
        return newUser;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

export async function getAllAdminService() {
    try {
        const books = await getAdmins();
        return books;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return [];
    }
}

export async function getViewEjemplaresService() {
    try {
        const books = await getViewEjemplares();
        return books;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return [];
    }
}

export async function getEjemplaresbyIdPedido(pedido: any) {
    try {
        const ejemplares = await getEjemplaresByIdPedido(pedido);
        return ejemplares;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return [];
    }

}

export async function getAllEstadosService() {
    try {
        const ejemplares = await getAllEstados();
        return ejemplares;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return [];
    }
}

export async function getAllNombreUsuariosService() {
    try {
        const usuarios = await getAllNombreUsuariosData();
        return usuarios;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return [];
    }
}

export async function postPedidoService(usuario: any) {
    try {
        console.log(usuario)
        const newPedido = await postPedidoData(usuario);
        return newPedido;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }

}

export async function getUserIdByEmailService(email: any) {
    try {
        console.log("user service " + email)
        const user = await getUserIdByEmail(email);
        return user;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return null;
    }
}

export async function postPedidoDataService(email: any) {
    try {
        console.log(email.email_usuario)

        const idUser = await getUserIdByEmailService(email.email_usuario)
        console.log(idUser)
        const newPedido = await postPedidoData(idUser.id_usuario);
        return newPedido;
    } catch (error) {
        console.error('Error en el service de postPedidoDataService:', error);
        return false;
    }
}

export async function modificarEjemplarService(ejemplar: any) {
    try {
        const ejemplaresModificados = await modificarEjemplar(ejemplar);
        limpiarRedis();
        return ejemplaresModificados;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

export async function modificarLibroService(libro: any) {
    const libroCreado: NewBook = {
        titulo_libro: libro.titulo,
        autor: 0,
        categoria: 0,
        editorial: 0,
        edicion: 0
    }
    const { firstName, lastName } = splitName(libro.Autor);
    if (!await searchAutor(firstName, lastName)) {
        await postAutorService({ nombre_autor: firstName, apellido_autor: lastName });
        console.log("Autor nuevo creado " + libro.Autor)
        if (await getAuthorByName(firstName, lastName) != null) {
            libroCreado.autor = await getAuthorByName(firstName, lastName);
        }
    } else {
        if (await getAuthorByName(firstName, lastName) != null) {
            libroCreado.autor = await getAuthorByName(firstName, lastName);
        }
    }

    if (!await searchCategoria(libro.Categoria)) {
        await postCategoriaService({ nombre_categoria: libro.Categoria });
        console.log("Categoria nueva creada " + libro.Categoria)
        if (await getCategoryByName(libro.Categoria) != null) {
            libroCreado.categoria = await getCategoryByName(libro.Categoria);
        }
    } else {
        if (await getCategoryByName(libro.Categoria) != null) {
            libroCreado.categoria = await getCategoryByName(libro.Categoria);
        }
    }

    if (!await searchEditorial(libro.Editorial)) {
        await postEditorialService({ nombre_editorial: libro.Editorial });
        console.log("Editorial nueva creada " + libro.Editorial)
        if (await getEditorialByName(libro.Editorial) != null) {
            libroCreado.editorial = await getEditorialByName(libro.Editorial);
        }
    } else {
        if (await getEditorialByName(libro.Editorial) != null) {
            libroCreado.editorial = await getEditorialByName(libro.Editorial);
        }
    }

    if (!await searchEdicion(libro.edicion)) {
        await postEdicionService({ edicion: libro.edicion });
        console.log("Edicion nueva creada " + libro.edicion)
        if (await getEditionByName(libro.edicion) != null) {
            libroCreado.edicion = await getEditionByName(libro.edicion);
        }
    } else {
        if (await getEditionByName(libro.edicion) != null) {
            libroCreado.edicion = await getEditionByName(libro.edicion);
        }
    }

    try {
        const newBook = await modificarLibro(libroCreado, libro.id);
        limpiarRedis();
        return newBook;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}


    export async function limpiarRedis() {
        try {
            await redis.flushall();
            console.log("Redis limpiado");
        } catch (error) {
            console.error('Error al limpiar Redis:', error);
        }
    }

    function splitName(fullName: string) {
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        return { firstName, lastName };
    }
