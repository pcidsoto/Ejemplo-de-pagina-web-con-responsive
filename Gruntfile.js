module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    
    grunt.initConfig({
        sass: {
          dist: {
            files: [{
              expand: true,
              cwd: 'css',
              src: ['*.scss'],
              dest: 'css',
              ext: '.css'
            }]
          }
        },//Escuchar cambios
        watch:{
            files:['css/*.scss'],
            tasks:['css']
        },//Escuchar cambios y recarga la pagina
        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },            
                options:{
                    watchTask: true,
                    server:{
                        baseDir:'./'
                    }
                }                
            }       
        },
        imagemin:{
            dynamic:{
                files:[
                    {
                        expand:true,
                        cwd: './',
                        src: 'images/*.{png,gif,jpg,jpge}',
                        dest: 'dist/'
                    }
                ]
            }

        },
        copy:{
            html:{
                files:[{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src:['*.html'],
                    dest: 'dist'
                }]
            }
        },
        clean:{
            build:{
                src:['dist/']
            }
        },
        cssmin:{
            dist:{}
        },
        uglify:{
            dist:{}
        },
        filerev:{
            options:{
                encoding:'utf8',
                algorithm:'md5',
                length:20
            },
            release:{
                files:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        concat:{
            options:{
                separator:';'
            },
            dist:{}
        },
        useminPrepare:{
            foo:{
                dest:'dist',
                src:['index.html','precios.html','contact.html',"despacho.html","about.html"]
            },
            options:{
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['uglify']
                    },
                    post:{
                        css:[{
                            name:'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments:0,
                                    rebase:false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin:{
            html:[
                'dist/index.html',
                'dist/precios.html',
                'dist/contact.html',
                'dist/despacho.html',
                'dist/about.html'
            ],
            options:{
                assetsDir:[
                    'dist',
                    'dist/css',
                    'dist/js'
                ]
            }
        }
      });
      /* grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-browser-sync');
      grunt.loadNpmTasks('grunt-contrib-imagemin'); */ 
      grunt.registerTask('css', ['sass']);
      grunt.registerTask('default', ['browserSync','watch']);
      grunt.registerTask('imagemin:compress', ['imagemin']);
      grunt.registerTask('build', [
          'clean',
          'copy',
          'imagemin',
          'useminPrepare',
          'concat',
          'cssmin',
          'uglify',
          'filerev',
          'usemin'
        ]);


};