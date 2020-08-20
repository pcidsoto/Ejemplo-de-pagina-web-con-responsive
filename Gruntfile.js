//permitir a node exportar grunt
module.exports = function(grunt){
    //compilar archivos sass a css
    grunt.initConfig({
        sass: {                         //tarea
            dist: {                     //destino
                files: [{               //archivos
                    expand: true,       // buscar todos los archivos
                    cwd: "css",         // carpeta de busqueda
                    src: ["*.scss"],    // tipo de archivo que se busca
                    dest: "css",        // carpeta de destino nuevos .css
                    ext: ".css"     
                }]
            } 
        },
        //sincronizacion sass a css
        watch: {
            files: ["css/*.scss"],
            tasks: ["css"]
        },

        // browser sync
        browserSync: {
            dev:{
                bsFiles: {
                    src: [ // carpetas a leer
                        "css/*.css",
                        "*.html",
                        "js/*.js"
                    ]
                },
            
                options:{
                    watchTask: true, // sincronizado en tiempo real
                    server: {
                        baseDir: "./" //directorio base para nuestro servidor
                    }
                }
            }
        },
        //compresion de imagenes
        imagemin: {
            dynamic: {
                files:[{
                    expand: true,
                    cwd: "./",
                    src: "images/*.{png,gif,jpg,jpeg}",
                    dest: "dist/"
                }]
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-contrib-sass")
    grunt.loadNpmTasks("grunt-browser-sync")
    grunt.loadNpmTasks("grunt-contrib-imagemin")
    grunt.registerTask("css", ["sass"])
    grunt.registerTask("default", ["browserSync", "watch"])
    grunt.registerTask("img:compress", ["imagemin"])
};