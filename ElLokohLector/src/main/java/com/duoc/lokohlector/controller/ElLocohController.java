package com.duoc.lokohlector.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.duoc.lokohlector.lib.Libro;
import com.duoc.lokohlector.lib.Autor;
import com.duoc.lokohlector.lib.Categoria;
import com.duoc.lokohlector.lib.Edicion;
import com.duoc.lokohlector.lib.Editorial;
import com.duoc.lokohlector.lib.FiltroLibro;
import com.duoc.lokohlector.service.ElLocohService;

import java.util.List;

@RestController
public class ElLocohController {
    
    @Autowired
    private ElLocohService service;

    @GetMapping("/libros")
    public ResponseEntity<List<Libro>> getLibros() {
        List<Libro> libros = service.getLibros();
        return ResponseEntity.ok(libros);
    }
    
    @PostMapping("/libro")
    public ResponseEntity<Libro> getLibro(@RequestBody Libro libro) {
        Libro res = service.getLibro(libro.getId());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/autores")
    public ResponseEntity<List<Autor>> getAutores() {
        List<Autor> autores = service.getAutores();
        return ResponseEntity.ok(autores);
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> getCategorias() {
        List<Categoria> categorias = service.getCategorias();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/editoriales")
    public ResponseEntity<List<Editorial>> getEditoriales() {
        List<Editorial> editoriales = service.getEditoriales();
        return ResponseEntity.ok(editoriales);
    }

    @GetMapping("/ediciones")
    public ResponseEntity<List<Edicion>> getEdiciones() {
        List<Edicion> ediciones = service.getEdiciones();
        return ResponseEntity.ok(ediciones);
    }

    @PostMapping("/FiltrarLibros")
    public ResponseEntity<List<Libro>> getFiltrarLibros(@RequestBody FiltroLibro filtro) {
        List<Libro> libros = service.getLibrosFiltrados(filtro.getTitulo(),filtro.getCategoria(), filtro.getAutor(), filtro.getEditorial(), filtro.getEdicion());
        return ResponseEntity.ok(libros);
    }



    
    
}
