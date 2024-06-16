import { Request, Response } from 'express';
import { getBooks, getBooksCache, getAllBooksService } from '../services/services';
import { getAutorService } from '../services/services';
import { getCategoriasService } from '../services/services';
import { getEditorialesService } from '../services/services';
import { getEdicionesService } from '../services/services';
import { postBookService } from '../services/services';
import { postAutorService } from '../services/services';
import { postCategoriaService } from '../services/services';
import { postEditorialService } from '../services/services';
import { postEdicionService } from '../services/services';


export async function getAllBooksCacheController(req: Request, res: Response) {
    try {
        const books = await getBooksCache();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }

    
}

export async function getAllBooksController(req: Request, res: Response) {
    try {
        const books = await getAllBooksService();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }

    
}

export async function getAllAutoresController(req: Request, res: Response) {
    try {
        const autor = await getAutorService();
        res.status(200).json(autor);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }   
}

export async function getAllCategoriasController(req: Request, res: Response) {
    try {
        const categorias = await getCategoriasService();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

export async function getAllEditorialesController(req: Request, res: Response) {
    try {
        const editoriales = await getEditorialesService();
        res.status(200).json(editoriales);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

export async function getAllEdicionesController(req: Request, res: Response) {
    try {
        const ediciones = await getEdicionesService();
        res.status(200).json(ediciones);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

export async function postBookController(req: Request, res: Response) {
    const nuevoLibro = req.body;
    try {
        const libro = await postBookService(nuevoLibro);
        res.status(201).json(libro);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }
}

export async function postAutorController(req: Request, res: Response) {

    try {
        const autor = await postAutorService(req.body);
        res.status(201).json(autor);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }
}

export async function postCategoriaController(req: Request, res: Response) {
    const nuevaCategoria = req.body;
    try {
        const categoria = await postCategoriaService(nuevaCategoria);
        res.status(201).json(categoria);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }
}

export async function postEditorialController(req: Request, res: Response) {
    const nuevaEditorial = req.body;
    try {
        const editorial = await postEditorialService(nuevaEditorial);
        res.status(201).json(editorial);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }
}

export async function postEdicionController(req: Request, res: Response) {
    const nuevaEdicion = req.body;
    try {
        const edicion = await postEdicionService(nuevaEdicion);
        res.status(201).json(edicion);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }
}


