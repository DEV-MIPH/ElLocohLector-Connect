import { Request, Response } from 'express';
import { getBooks } from '../services/services';

export async function getAllBooksController(req: Request, res: Response) {
    try {
        const books = await getBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}
