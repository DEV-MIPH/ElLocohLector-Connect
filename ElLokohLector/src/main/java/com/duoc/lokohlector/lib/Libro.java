package com.duoc.lokohlector.lib;

public class Libro {
    
    private int id;
    private String titulo;
    private String autor;
    private String categoria;
    private String editorial;
    private String edicion;
    private int cantidad;


    public Libro() {
    }

    public Libro(int id, String titulo, String autor, String categoria, String editorial, String edicion, int cantidad) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.editorial = editorial;
        this.edicion = edicion;
        this.cantidad = cantidad;
    }

    public int getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getEditorial() {
        return editorial;
    }

    public String getEdicion() {
        return edicion;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public void setEdicion(String edicion) {
        this.edicion = edicion;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    @Override
    public String toString() {
        return "Libro{" + "id=" + id + ", titulo=" + titulo + ", autor=" + autor + ", categoria=" + categoria + ", editorial=" + editorial + ", edicion=" + edicion + ", cantidad=" + cantidad + '}';
    }

}
