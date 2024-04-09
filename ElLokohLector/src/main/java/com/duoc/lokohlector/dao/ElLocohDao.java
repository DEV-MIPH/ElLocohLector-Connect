package com.duoc.lokohlector.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.duoc.lokohlector.lib.Libro;

@Repository
@Mapper
public interface ElLocohDao {
    @Select("SELECT libro.id,libro.titulo,autor.nombre \"Autor\",categoria.nombre \"Categoria\",libro.cantidad\n" + 
                "FROM libro join autor on\n" + 
                "autor.id = libro.autor\n" + 
                "JOIN categoria on libro.categoria = categoria.id;")
    public List<Libro> getLibros();

    @Select("SELECT libro.id,libro.titulo,autor.nombre \"Autor\",categoria.nombre \"Categoria\",libro.cantidad\n" + 
                "FROM libro join autor on\n" + 
                "autor.id = libro.autor\n" + 
                "JOIN categoria on libro.categoria = categoria.id\n" + 
                "WHERE libro.id = #{id};")
    public Libro getLibro(@Param("id") int id);
}
