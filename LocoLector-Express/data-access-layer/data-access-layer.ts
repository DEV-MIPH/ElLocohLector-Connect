import { createClient } from "@libsql/client";
import dotenv from 'dotenv';
import { createPool, Pool } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2/promise';

// Cargar las variables de entorno desde un archivo .env
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



// Función para obtener todos los libros de la base de datos
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

//Funcion para hacer un join entre las tablas libro , autor , editorial , categoria , edicion
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

//Funcion para obtener todos los autores de la base de datos
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

//Funcion para obtener todas las categorias de la base de datos
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

//Funcion para obtener todas las editoriales de la base de datos
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

//Funcion para obtener todas las ediciones de la base de datos
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

//Funcion para postear un libro en la base de datos
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

//Funcion para postear un autor en la base de datos
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


//Funcion para postear una categoria en la base de datos
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



//Funcion para postear una editorial en la base de datos
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

//Funcion para postear una edicion en la base de datos
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





//Funcion para obtener un autor por su nombre y retorna su id
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


//Funcion para obtener un editorial por su nombre
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

//Funcion para obtener una categoria por su nombre
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

//Funcion para obtener una edicion por su nombre y retorne su id
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

//Funcion para obtener un libro por su titulo, autor, categoria, editorial, edicion y retorne su id 
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

//Funcion para agregar un usuario a la base de datos
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

//Funcion para agregar un ejemplar a la tabla ejemplar
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

//Post para agregar un nuevo Pedido que retorna el id del pedido
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

//Funcion para obtener un usuario por su correo y retorne su id
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

