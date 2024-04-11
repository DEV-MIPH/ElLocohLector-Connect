package com.duoc.lokohlector.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.duoc.lokohlector.lib.Libro;
import com.duoc.lokohlector.lib.Autor;
import com.duoc.lokohlector.lib.Categoria;
import com.duoc.lokohlector.lib.Edicion;
import com.duoc.lokohlector.lib.Editorial;

@Repository
@Mapper
public interface ElLocohDao {
    @Select("SELECT * FROM libros_view;")
    public List<Libro> getLibros(); 

    @Select("SELECT * FROM libros_view\n" + 
            "WHERE id = #{id};")
    public Libro getLibro(@Param("id") int id);

    @Select("SELECT * FROM autor;")
    public List<Autor> getAutores();

    @Select("SELECT * FROM categoria;")
    public List<Categoria> getCategorias();

    @Select("SELECT * FROM editorial;")
    public List<Editorial> getEditoriales();

    @Select("SELECT * FROM edicion;")
    public List<Edicion> getEdiciones();

}
