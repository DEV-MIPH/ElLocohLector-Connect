package com.duoc.lokohlector.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.duoc.lokohlector.dao.ElLocohDao;
import com.duoc.lokohlector.lib.Libro;
import com.duoc.lokohlector.lib.Autor;
import com.duoc.lokohlector.lib.Categoria;
import com.duoc.lokohlector.lib.Edicion;
import com.duoc.lokohlector.lib.Editorial;

@Service
public class ElLocohService {
    
    @Autowired
    private ElLocohDao dao;
    
    
    public List<Libro> getLibros() {
        List<Libro> libros =  dao.getLibros();
        return libros;
    }

    public Libro getLibro(int id) {
        Libro libro =  dao.getLibro(id);
        return libro;
    }

    public List<Autor> getAutores() {
        List<Autor> autores =  dao.getAutores();
        return autores;
    }

    public List<Categoria> getCategorias() {
        List<Categoria> categorias =  dao.getCategorias();
        return categorias;
    }

    public List<Editorial> getEditoriales() {
        List<Editorial> editoriales =  dao.getEditoriales();
        return editoriales;
    }

    public List<Edicion> getEdiciones() {
        List<Edicion> ediciones =  dao.getEdiciones();
        return ediciones;
    }

    public List<Libro> getLibrosFiltrados(String titulo,String categoria, String autor, String editorial, String edicion) {

        List<Libro> libros =  dao.getLibros();

        if(titulo != null && !titulo.isEmpty()) {
            libros.removeIf(libro -> !libro.getTitulo().toLowerCase().contains(titulo.toLowerCase()));
        }
        if(categoria != null && !categoria.isEmpty()) {
            libros.removeIf(libro -> !libro.getCategoria().toLowerCase().contains(categoria.toLowerCase()));
        }
        if(autor != null && !autor.isEmpty()) {
            libros.removeIf(libro -> !libro.getAutor().toLowerCase().contains(autor.toLowerCase()));
        }
        if(editorial != null && !editorial.isEmpty()) {
            libros.removeIf(libro -> !libro.getEditorial().toLowerCase().contains(editorial.toLowerCase()));
        }
        if(edicion != null && !edicion.isEmpty()) {
            libros.removeIf(libro -> !libro.getEdicion().toLowerCase().contains(edicion.toLowerCase()));
        }
        
        return libros;
        
    }

        


} 
