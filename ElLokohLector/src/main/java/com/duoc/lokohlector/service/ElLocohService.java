package com.duoc.lokohlector.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.duoc.lokohlector.dao.ElLocohDao;
import com.duoc.lokohlector.lib.Libro;
import com.duoc.lokohlector.lib.autor;
import com.duoc.lokohlector.lib.categoria;
import com.duoc.lokohlector.lib.edicion;
import com.duoc.lokohlector.lib.editorial;

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

    public List<autor> getAutores() {
        List<autor> autores =  dao.getAutores();
        return autores;
    }

    public List<categoria> getCategorias() {
        List<categoria> categorias =  dao.getCategorias();
        return categorias;
    }

    public List<editorial> getEditoriales() {
        List<editorial> editoriales =  dao.getEditoriales();
        return editoriales;
    }

    public List<edicion> getEdiciones() {
        List<edicion> ediciones =  dao.getEdiciones();
        return ediciones;
    }

        


} 
