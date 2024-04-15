package com.duoc.lokohlector.service;



import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import com.duoc.lokohlector.Configuration.RedisConfiguration;
import com.duoc.lokohlector.dao.ElLocohDao;
import com.duoc.lokohlector.lib.Libro;
import com.google.gson.Gson;

import redis.clients.jedis.Jedis;

import com.duoc.lokohlector.lib.Autor;
import com.duoc.lokohlector.lib.Categoria;
import com.duoc.lokohlector.lib.Edicion;
import com.duoc.lokohlector.lib.Editorial;

@Service
public class ElLocohService {
    
    @Autowired
    private ElLocohDao dao;

    @Autowired
    private RedisConfiguration redisConfiguration;

    // @Value("${spring.firebase.bucket}")
    // private String bucketName;
    
    //private final Storage storage = StorageOptions.getDefaultInstance().getService();


    // public String uploadImage(MultipartFile file) throws IOException {
    //     String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
    //     BlobId blobId = BlobId.of(bucketName, fileName);
    //     BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

    //     Blob blob = storage.create(blobInfo, file.getBytes());

    //     return blob.getMediaLink();
    // }
   
    
    
    public List<Libro> getLibros() {
        List<Libro> libros = new ArrayList<>();

        try{
            Jedis jedis = redisConfiguration.jedis();
            // Intentar recuperar los usuarios de Redis
            List<String> libroKeys = jedis.lrange("libros", 0, -1);
            if (!libroKeys.isEmpty()) {
                System.out.println("Se encontraron libros en Redis");
                for (String key : libroKeys) {
                    String libroJson = jedis.get(key);
                    Libro libro = new Gson().fromJson(libroJson, Libro.class);
                    libros.add(libro);
                }
            } else {
                System.out.println("No se encontraron libros en Redis ocupo la base de datos");
                libros = dao.getLibros();

                // Almacenar los usuarios en Redis para futuras consultas
                for (Libro libro : libros) {
                    jedis.set("libro:" + libro.getId(), new Gson().toJson(libro));
                    jedis.rpush("libros", "libro:" + libro.getId());
                }
            }
            return libros;
        } catch (Exception e) {
            System.out.println("Error al conectar a Redis "+ e.getMessage());
            libros = dao.getLibros();
            return libros;
        }
    }

    public Libro getLibro(int id) {
        Libro libro =  dao.getLibro(id);
        return libro;
    }

    public List<Autor> getAutores() {
        List<Autor> autores =  dao.getAutores();
        return autores;
    }

    public List<Categoria> getCategorias() {
        List<Categoria> categorias =  dao.getCategorias();
        return categorias;
    }

    public List<Editorial> getEditoriales() {
        List<Editorial> editoriales =  dao.getEditoriales();
        return editoriales;
    }

    public List<Edicion> getEdiciones() {
        List<Edicion> ediciones =  dao.getEdiciones();
        return ediciones;
    }

    public List<Libro> getLibrosFiltrados(String titulo,String categoria, String autor, String editorial, String edicion) {

        List<Libro> libros = getLibros();

        if(titulo != null && !titulo.isEmpty()) {
            libros.removeIf(libro -> !libro.getTitulo().toLowerCase().contains(titulo.toLowerCase()));
        }
        if(categoria != null && !categoria.isEmpty()) {
            libros.removeIf(libro -> !libro.getCategoria().toLowerCase().contains(categoria.toLowerCase()));
        }
        if(autor != null && !autor.isEmpty()) {
            libros.removeIf(libro -> !libro.getAutor().toLowerCase().contains(autor.toLowerCase()));
        }
        if(editorial != null && !editorial.isEmpty()) {
            libros.removeIf(libro -> !libro.getEditorial().toLowerCase().contains(editorial.toLowerCase()));
        }
        if(edicion != null && !edicion.isEmpty()) {
            libros.removeIf(libro -> !libro.getEdicion().toLowerCase().contains(edicion.toLowerCase()));
        }
        
        return libros;
        
    }
    
    

        


} 
