import { Request, Response } from 'express';
import { getBooksCache } from '../services/services';
import { getAutorService } from '../services/services';

export async function getAllBooksController(req: Request, res: Response) {
    try {
        const books = await getBooksCache();
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
