import { Request, Response } from 'express';
import { getAllAdminService, getAllEstadosService, getAllNombreUsuariosService, getBooksCache, getEjemplaresbyIdPedido, getViewEjemplaresService, postEjemplarService, postNewBook } from '../services/services';
import { getAutorService } from '../services/services';
import { getCategoriasService } from '../services/services';
import { getEditorialesService } from '../services/services';
import { getEdicionesService } from '../services/services';
import { getBooksService } from '../services/services';
import { postAutorService } from '../services/services';
import { postCategoriaService } from '../services/services';
import { postEditorialService } from '../services/services';
import { postEdicionService } from '../services/services';
import { postUser } from '../services/services';


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
        const books = await getBooksService();
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
    try {
        const book = await postNewBook(req.body);
        res.status(201).json(book);
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
    try {
        const categoria = await postCategoriaService(req.body);
        res.status(201).json(categoria);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }
}

export async function postEditorialController(req: Request, res: Response) {
    try {
        console.log("Editorial nueva" )
        console.log(req.body);
        const editorial = await postEditorialService(req.body);
        res.status(201).json(editorial);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }
   
}

export async function postEdicionController(req: Request, res: Response) {
    try {
        const edicion = await postEdicionService(req.body);
        res.status(201).json(edicion);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }

}

export async function postEjemplarController(req: Request, res: Response) {
    try {
        const edicion = await postEjemplarService(req.body);
        res.status(201).json(edicion);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }

}

export async function postNewUser(req: Request, res: Response) {
    try {
        const user = await postUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }

}

export async function getAllAdminController(req: Request, res: Response) {
    try {
        const books = await getAllAdminService();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

export async function getViewEjemplaresController(req: Request, res: Response) {
    try {
        const books = await getViewEjemplaresService();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

export async function postNewEjemplar(req: Request, res: Response): Promise<void> {
    try {
        const book = await postEjemplarService(req.body);
        res.status(201).json(book);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al postear un libro' });
    }

}

export async function getEjemplaresByIdPedidoController(req: Request, res: Response): Promise<void> {
    try {
        console.log(req.body.id_pedido)
        const book = await getEjemplaresbyIdPedido(req.params.id_pedido);
        res.status(200).json(book);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

export async function getAllEstadosController(req: Request, res: Response): Promise<void> {
    try {
        const books = await getAllEstadosService();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}

export async function getAllNombreUsuariosController(req: Request, res: Response): Promise<void> {
    try {
        const books = await getAllNombreUsuariosService();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error en el controlador de libros:', error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
}






