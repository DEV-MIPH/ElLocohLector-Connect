package com.duoc.lokohlector.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.duoc.lokohlector.lib.Libro;
import com.duoc.lokohlector.lib.autor;
import com.duoc.lokohlector.lib.categoria;
import com.duoc.lokohlector.lib.edicion;
import com.duoc.lokohlector.lib.editorial;
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
    public ResponseEntity<List<autor>> getAutores() {
        List<autor> autores = service.getAutores();
        return ResponseEntity.ok(autores);
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<categoria>> getCategorias() {
        List<categoria> categorias = service.getCategorias();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/editoriales")
    public ResponseEntity<List<editorial>> getEditoriales() {
        List<editorial> editoriales = service.getEditoriales();
        return ResponseEntity.ok(editoriales);
    }

    @GetMapping("/ediciones")
    public ResponseEntity<List<edicion>> getEdiciones() {
        List<edicion> ediciones = service.getEdiciones();
        return ResponseEntity.ok(ediciones);
    }
    
    
}
