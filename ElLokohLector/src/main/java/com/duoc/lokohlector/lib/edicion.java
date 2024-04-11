package com.duoc.lokohlector.lib;

public class edicion {
    
    private int id;
    private String nombre;

    public edicion() {
    }

    public edicion(int id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "edicion{" + "id=" + id + ", nombre=" + nombre + '}';
    }

}
