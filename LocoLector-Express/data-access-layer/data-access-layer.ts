import { createClient } from "@libsql/client";
import dotenv from 'dotenv';
import { createPool, Pool } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2/promise';


dotenv.config();

interface Book {
    titulo_libro: string;
    autor: number;
    categoria: number;
    editorial: number;
    edicion: number;
}

interface Author {
    nombre_autor: string;
    apellido_autor: string;
}

interface Category {
    nombre_categoria: string;
}

interface Editorial {
    nombre_editorial: string;
}

interface Edition {
    edicion: string;
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

interface EjemplarView {
    id_ejemplar: number;
    estado: string;
    id_pedido: number;
}





interface Usuario {
    nombre_usuario: string;
    email_usuario: string;
    fono_usuario: string;
    cel_usuario: string;
    id_tipo_usuario: number;
}

interface Pedido {
    fecha_pedido: string;
    id_usuario: number;
}

const pool: Pool = createPool({
    host: process.env.DATABASE_URL, 
    user: process.env.USER_DATABASE, 
    password: process.env.PASSWORD_DATABASE,
    database: process.env.NAME_DATABASE,
    connectionLimit: 10,
    queueLimit: 0
  });

export async function getAllBooks() {
    try {
        const [rows] = await pool.query('SELECT * FROM libro;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los libros:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getBooksJoin() {
    try {
        const [rows] = await pool.query('SELECT * FROM libros_view;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los libros:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    } 
}

export async function getAllAuthors() {
    try {
        const [rows] = await pool.query('SELECT * FROM autor;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los autores:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getAllCategories() {
    try {
        const [rows] = await pool.query('SELECT * FROM categoria;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener las categorias:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getAllEditorials() {
    try {
        const [rows] = await pool.query('SELECT * FROM editorial;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener las editoriales:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getAllEditions() {
    try {
        const [rows] = await pool.query('SELECT * FROM edicion;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener las ediciones:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function postBookData(book: Book): Promise<boolean> {
    try {
        const sql = 'INSERT INTO libro SET ?'; 
        const result = await pool.query(sql, book); 
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.affectedRows > 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar el libro:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function postAuthorData(author: Author): Promise<boolean> {
    try {
        const sql = 'INSERT INTO autor SET ?'; 
        const result = await pool.query(sql, author); 
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.affectedRows > 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar el autor:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function postCategoryData(category: Category): Promise<boolean> {
    try {
        const sql = 'INSERT INTO categoria SET ?'; 
        const result = await pool.query(sql, category); 
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.affectedRows > 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar la categoria:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}


export async function postEditorialData(editorial: Editorial): Promise<boolean> {
    try {
        const sql = 'INSERT INTO editorial SET ?'; 
        const result = await pool.query(sql, editorial); 
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.affectedRows > 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar la editorial:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function postEditionData(edition: Edition): Promise<boolean> {
    try {
        const sql = 'INSERT INTO edicion SET ?'; 
        const result = await pool.query(sql, edition); 
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.affectedRows > 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar la edicion:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function getAuthorByName(name: string, apellido:string): Promise<number | null> {
    try {
        const [rows]: any[] = await pool.query('SELECT id_autor FROM autor WHERE nombre_autor = ? and apellido_autor = ?', [name,apellido]);
        if (rows.length > 0) {
            return rows[0].id_autor;
        } else {
            return null;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener el autor:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function getEditorialByName(name: string) {
    try{
        const [rows]: any[] = await pool.query('SELECT id_editorial FROM editorial WHERE nombre_editorial = ?', [name]);
        if (rows.length > 0) {
            return rows[0].id_editorial;
        } else {
            return null;
        }
    
    }catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener la editorial:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function getCategoryByName(name: string) {
    try{
        const [rows]: any[] = await pool.query('SELECT id_categoria FROM categoria WHERE nombre_categoria = ?', [name]);
        if (rows.length > 0) {
            return rows[0].id_categoria;
        } else {
            return null;
        }
    
    }catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener la categoria:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
    
}

export async function getEditionByName(name: string) {
    try{
        const [rows]: any[] = await pool.query('SELECT id_edicion FROM edicion WHERE edicion = ?', [name]);
        if (rows.length > 0) {
            return rows[0].id_edicion;
        } else {
            return null;
        }
    
    }catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener la edicion:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function getBookByData(titulo: string, autor: string, categoria: string, editorial: string, edicion: string) {
    console.log(titulo,autor,categoria,editorial,edicion);
    try{
        const [rows]: any[] = await pool.query('SELECT id FROM libros_view WHERE titulo = ? and Autor = ? and Categoria = ? and Editorial = ? and Edicion = ?', [titulo,autor,categoria,editorial,edicion]);
        if (rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    
    }catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener el libro:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function postUserData(user: Usuario): Promise<boolean> {
    try {
        const sql = 'INSERT INTO usuario SET ?'; 
        const result = await pool.query(sql, user); 
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.affectedRows > 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar el usuario:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function getAdmins() {
    try {
        const [rows] = await pool.query('SELECT email_usuario FROM usuario WHERE id_tipo_usuario = 1;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los administradores:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getViewEjemplares(){
    try {
        const [rows] = await pool.query('SELECT * FROM ejemplares_view;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los ejemplares:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function postEjemplarData(ejemplar: EjemplarData): Promise<boolean> {
    try {
        const sql = 'INSERT INTO ejemplar SET ?'; 
        const result = await pool.query(sql, ejemplar); 
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.affectedRows > 0;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar el ejemplar:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}

export async function postPedidoData(id_usuario: number): Promise<number | null> {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: string = (today.getMonth() + 1).toString().padStart(2, '0');
    const day: string = today.getDate().toString().padStart(2, '0');
    const formattedDate: string = `${year}-${month}-${day}`;
    const pedido: Pedido = {
        fecha_pedido: formattedDate,
        id_usuario: id_usuario
    }
    try {
        const sql = 'INSERT INTO pedido SET ?'; 
        const result = await pool.query(sql, pedido);
        const resultSetHeader = result[0] as ResultSetHeader;
        return resultSetHeader.insertId;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error al insertar el pedido:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function getUserByEmail(email: string) {
    try{
        const [rows]: any[] = await pool.query('SELECT id_usuario FROM usuario WHERE email_usuario = ?', [email]);
        if (rows.length > 0) {
            return rows[0].id_usuario;
        } else {
            return null;
        }
    
    }catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener el usuario:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function getEjemplaresByIdPedido(id: any) {
    try {
        const [rows] = await pool.query('SELECT * FROM ejemplares_view WHERE id_pedido = ?;', [id]);
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los ejemplares:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getAllNombreUsuariosData() {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario where id_tipo_usuario = 2 or id_usuario = 1 ;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los usuarios:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getAllEstados() {
    try {
        const [rows] = await pool.query('SELECT nombre_estado FROM estado;');
        return rows;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener los estados:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return [];
    }
}

export async function getUserIdByEmail(email: any) {
    try {
        const [rows]: any[] = await pool.query('SELECT id_usuario FROM usuario WHERE email_usuario = ?;', [email]);
        if (rows.length > 0) {
            return rows[0]
        } else {
            return null;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener el id del usuario:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function getIdEstadoByNombreEstado(estado: any) {
    try {
        const [rows]: any[] = await pool.query('SELECT id_estado FROM estado WHERE nombre_estado = ?;', [estado]);
        if (rows.length > 0) {
            return rows[0].id_estado;
        } else {
            return null;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al obtener el id del estado:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return null;
    }
}

export async function modificarEjemplar(ejemplar: EjemplarView) {
    let id_estado = await getIdEstadoByNombreEstado(ejemplar.estado);
    console.log(id_estado);
    console.log(ejemplar);
    if (id_estado === null) {
        console.error('Error: el estado especificado no existe');
        return false;
    }

    try {
        const sql = 'UPDATE ejemplar SET id_estado = ?, id_pedido = ? WHERE id_ejemplar = ?';
        const [result]: any[] = await pool.query(sql, [id_estado, ejemplar.id_pedido, ejemplar.id_ejemplar]);

        // Asegúrate de que `result` no sea undefined
        if (result && result.affectedRows !== undefined) {
            return result.affectedRows > 0;
        } else {
            console.error('Error: El resultado de la consulta no tiene la estructura esperada');
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al modificar el ejemplar:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }
        return false;
    }
}


    

