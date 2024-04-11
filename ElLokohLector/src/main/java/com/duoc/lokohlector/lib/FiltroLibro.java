package com.duoc.lokohlector.lib;

public class FiltroLibro {
    
    private String titulo;
    private String categoria;
    private String autor;
    private String editorial;
    private String edicion;

    public FiltroLibro() {
    }

    public FiltroLibro(String titulo, String categoria, String autor, String editorial, String edicion) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.autor = autor;
        this.editorial = editorial;
        this.edicion = edicion;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCategoria() {
        return this.categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getAutor() {
        return this.autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getEditorial() {
        return this.editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public String getEdicion() {
        return this.edicion;
    }

    public void setEdicion(String edicion) {
        this.edicion = edicion;
    }

    @Override
    public String toString() {
        return "{" +
            " titulo='" + getTitulo() + "'" +
            ", categoria='" + getCategoria() + "'" +
            ", autor='" + getAutor() + "'" +
            ", editorial='" + getEditorial() + "'" +
            ", edicion='" + getEdicion() + "'" +
            "}";
    }
    

}
