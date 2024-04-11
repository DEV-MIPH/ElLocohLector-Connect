package com.duoc.lokohlector.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import com.duoc.lokohlector.lib.Libro;
import com.duoc.lokohlector.lib.autor;
import com.duoc.lokohlector.lib.categoria;
import com.duoc.lokohlector.lib.edicion;
import com.duoc.lokohlector.lib.editorial;

@Repository
@Mapper
public interface ElLocohDao {
    @Select("SELECT * FROM libros_view;")
    public List<Libro> getLibros(); 

    @Select("SELECT * FROM libros_view\n" + 
            "WHERE id = #{id};")
    public Libro getLibro(@Param("id") int id);

    @Select("SELECT * FROM autor;")
    public List<autor> getAutores();

    @Select("SELECT * FROM categoria;")
    public List<categoria> getCategorias();

    @Select("SELECT * FROM editorial;")
    public List<editorial> getEditoriales();

    @Select("SELECT * FROM edicion;")
    public List<edicion> getEdiciones();
}
