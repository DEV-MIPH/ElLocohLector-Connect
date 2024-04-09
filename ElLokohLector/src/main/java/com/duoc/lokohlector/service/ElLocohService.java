package com.duoc.lokohlector.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.duoc.lokohlector.dao.ElLocohDao;
import com.duoc.lokohlector.lib.Libro;

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
} 
