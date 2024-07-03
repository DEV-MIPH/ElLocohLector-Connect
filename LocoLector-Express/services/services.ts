import { getAllAuthors, getBooksJoin, getAllCategories,getAllEditorials, getAllEditions, getAllBooks, postUserData, getAdmins, getViewEjemplares, getBookByData, postPedidoData } from '../data-access-layer/data-access-layer';
import {postBookData, postAuthorData,postCategoryData,postEditionData,postEditorialData,postEjemplarData } from '../data-access-layer/data-access-layer';
import { getAuthorByName,getEditorialByName, getEditionByName,getCategoryByName } from '../data-access-layer/data-access-layer';

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

interface NewBook{
    titulo_libro: string;
    autor: number | null;
    categoria: number | null;
    editorial: number | null;
    edicion: number | null;
}

interface EjemplarData {
    id_libro: number;
    id_pedido: number| null;
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


//Cache de libros


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

        // Intentar obtener los libros de Redis
        const booksFromCache = await redis.get(redisKey);
        if (booksFromCache) {
            console.log("Libros obtenidos de la caché Redis");
            return JSON.parse(booksFromCache);
        }

        // Si no hay libros en la caché, obtenerlos de la base de datos
        const booksFromDb = await getBooksService();
        console.log("Libros obtenidos de la base de datos");

        // Guardar los libros en la caché Redis para la próxima vez
        await redis.set(redisKey, JSON.stringify(booksFromDb));
        console.log("Libros guardados en la caché Redis");

        return booksFromDb;
    } catch (error) {
        console.error("Error al obtener los libros:", error);
        return [];
    }
}
//Funcion que obtiene los datos del cache y si no los tiene los obtiene de la base de datos y los guarda en el cache
export async function getBooksCache() {
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
        const booksFromDb = await getBooks();

        // Guardar los libros en la caché local para la próxima vez
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
        //limpiar cache
        cache.flushAll();
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


//Funcion para crear un nuevo libro con los datos del libro y los datos de autor, categoria, editorial y edicion
export async function postNewBook(book: Book) {
    const libroCreado: NewBook = {
        titulo_libro: book.titulo_libro,
        autor: 0,
        categoria: 0,
        editorial: 0,
        edicion: 0
    }
    const { firstName, lastName } = splitName(book.autor);
    if(!await searchAutor(firstName, lastName)){
        await postAutorService({nombre_autor: firstName, apellido_autor: lastName});
        console.log("Autor nuevo creado "+ book.autor)
        if(await getAuthorByName(firstName, lastName) != null){
            libroCreado.autor = await getAuthorByName(firstName, lastName);
        }
    }else{
        if(await getAuthorByName(firstName, lastName) != null){
            libroCreado.autor = await getAuthorByName(firstName, lastName);
        }
    }

    if(!await searchCategoria(book.categoria)){
        await postCategoriaService({nombre_categoria: book.categoria});
        console.log("Categoria nueva creada "+ book.categoria)
        if(await getCategoryByName(book.categoria) != null){
            libroCreado.categoria = await getCategoryByName(book.categoria);
        }
    }else{
        if(await getCategoryByName(book.categoria) != null){
            libroCreado.categoria = await getCategoryByName(book.categoria);
        }
    }

    if(!await searchEditorial(book.editorial)){
        await postEditorialService({nombre_editorial: book.editorial});
        console.log("Editorial nueva creada "+ book.editorial)
        if(await getEditorialByName(book.editorial) != null){
            libroCreado.editorial = await getEditorialByName(book.editorial);
        }
    }else{
        if(await getEditorialByName(book.editorial) != null){
            libroCreado.editorial = await getEditorialByName(book.editorial);
        }
    }

    if(!await searchEdicion(book.edicion)){
        await postEdicionService({edicion: book.edicion});
        console.log("Edicion nueva creada "+ book.edicion)
        if(await getEditionByName(book.edicion) != null){
            libroCreado.edicion = await getEditionByName(book.edicion);
        }
    }else{
        if(await getEditionByName(book.edicion) != null){
            libroCreado.edicion = await getEditionByName(book.edicion);
        }
    }

    try {
        const newBook = await postBookService(libroCreado);
        console.log("Libro nuevo creado "+ libroCreado.titulo_libro)
        return newBook;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

//Funcion para postear ejemplares de un libro
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
        return newEjemplar;
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

//Funciones para buscar si existe un autor, categoria, editorial o edicion
async function searchAutor(autor: string, apellido: string) {
    try {
        const autorBuscado = await getAuthorByName(autor,apellido);
        if(autorBuscado){
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
        if(categoriaBuscada){
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
        if(editorialBuscada){
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
        if(edicionBuscada){
           return true;
        }
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        return false;
    }
}

//funcion para agregar un usuario a la base de datos
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



//Funcion para separar el nombre del autor en nombre y apellido
function splitName(fullName: string) {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    return { firstName, lastName };
}
