module.exports = function (grunt) {

    grunt.initConfig({
        config: {

        },
        concat: {
            options: {
                separator: ''
            },
            tagenvy: {
                src: [
                    'src/js/src/tagenvy/tagenvy.prefix',
                    'src/js/src/tagenvy/tagenvy.js',
                    'src/js/src/tagenvy/controllers/**/*.js',
                    'src/js/src/tagenvy/directives/**/*.js',
                    'src/js/src/tagenvy/filters/**/*.js',
                    'src/js/src/tagenvy/services/**/*.js',
                    'src/js/src/tagenvy/tagenvy.suffix'
                ],
                dest: 'public/js/tagenvy.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! TagEnvy <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            jid: {
                files: {
                    'public/js/tagenvy.min.js': ['<%= concat.tagenvy.dest %>']
                }
            }
        },
        jshint: {
            beforeConcat: {
                src: ['gruntfile.js', 'src/js/src/tagenvy/**/*.js']
            },
            afterConcat: {
                src: [
                    '<%= concat.tagenvy.dest %>'
                ]
            },
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    angular: true
                },
                globalstrict: false
            }
        },
        connect: {
            server:{
                options: {
                    port: 9000,
                    base: 'public',
                    hostname: 'localhost',
                    keepalive: true,
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: [
                'Gruntfile.js',
                'src/**/*'
            ],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jshint:beforeConcat', 'concat', 'jshint:afterConcat', 'uglify']);
    grunt.registerTask('build', ['default']);
    grunt.registerTask('serve', ['connect']);
    grunt.registerTask('livereload', ['default', 'watch']);

};