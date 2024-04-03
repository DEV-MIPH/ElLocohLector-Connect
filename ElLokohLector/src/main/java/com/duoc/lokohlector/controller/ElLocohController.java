package com.duoc.lokohlector.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.duoc.lokohlector.lib.Libro;
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
    
}
