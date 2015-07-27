module.exports = function (grunt) {

    "use strict";

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-upload-file');

    var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

    /*
     Load package.json
     */
    var pkg = grunt.file.readJSON("package.json");
    var config = grunt.file.readJSON("config.json");
    var libs_files = config["libs_files"];

    var movilizerMDS = config["movilizerMDS"];

    //console.log('libs_files', libs_files);

    grunt.initConfig({

        pkg: pkg,


        /*
         Clean the Www folder
         */
        clean: {
            www: {
                src: ["www/*"]
            }
        },

        /*
         concatenate all js source files
         */
        concat: {
            js: {
                src: ['src/js/*js'],
                dest: 'www/js/app.js'
            }
        },

        /*
         We copy libs folders to
         */
        copy: {

            src: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['index.html', 'plugins/*', 'cordova.js', 'css/*', 'images/*', 'sass/*', 'fonts/*'],
                    dest: 'www/'
                }]
            },
            //Bower components
            libs_files: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: libs_files,
                    dest: 'www/'
                }]
            }
        },

        sass: {

            dev: {
                options: {
                    style: "compressed"
                },

                files: {
                    "src/css/main.min.css": "src/sass/main.scss"
                }
            }
        },

        /*
         Minifying
         */
        uglify: {
            options: {
                output: {
                    beautify: false
                },
                compress: {
                    global_defs: {
                        "DEBUG": false
                    },
                    dead_code: true
                },
                warnings: true,
                mangle: false
            },

            js: {
                src: ['www/js/app.js'],
                dest: 'www/js/app.min.js'
            }
        },


        /*
         Watch file changes and re-build immediately !
         */
        watch: {
            scripts: {
                files: ['src/js/*.js','src/plugins/*', 'src/sass/*.scss', 'src/index.html', 'src/css/*.css', 'Gruntfile.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },


        /*
         Compress www
         */
        compress: {
            main: {
                options: {
                    archive: "../www.zip",
                    mode: 'zip'
                },
                expand: true,
                cwd: 'www/',
                src: ['**/*']
            }
        },


        /*
         upload zip
         */
        upload_file: {
            "zip-partly": {
                src: ['../www.zip'],
                options: {
                    url: movilizerMDS["url"],
                    method: 'POST',
                    paramObj: {
                        'systemId': movilizerMDS["systemId"],
                        'password': movilizerMDS["password"],
                        'pool': movilizerMDS["pool"],
                        'key': movilizerMDS["key"],
                        'lang': movilizerMDS["lang"],
                        'suffix': movilizerMDS["suffix"]
                    }
                }
            }
        },


        /*
         Server local
         */
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'www',
                    hostname: '0.0.0.0',
                    keepalive: true,
                    middleware: function (connect, options) {
                        return [
                            rewriteRulesSnippet, // RewriteRules support
                            connect.static(require('path').resolve("www")), // mount filesystem
                            function (req, res, next) {
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.setHeader('Access-Control-Allow-Methods', '*');
                                next();
                            }
                        ];
                    }
                }
            }
        }
    });

    grunt.registerTask("default", ["clean", "sass:dev", "copy", "concat", "uglify", "watch"]);
    grunt.registerTask("server", ["connect:server"]);
    grunt.registerTask("upload", ["compress", "upload_file"]);

};