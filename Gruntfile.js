module.exports = grunt => {

    // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns.
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        // Minify CSS.
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css'
                }]
            }
        },

        // Uglify JS.
        uglify: {
            dev: {
                options: {
                    mangle: {
                        reserved: ['jQuery']
                    }
                },
                files: [{
                    expand: true,
                    src: ['js/**/*.js', '!js/*.min.js'],
                    dest: '.',
                    cwd: 'src/',
                    rename: function (dst, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        // return dst + '/' + src.replace('.js', '.min.js');
                        // Or to override to src:
                        return dst + '/' + src;
                    }
                }]
            }
        },

        // Minify HTML.
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'src/index.html'
                }
            }
        },

        clean: [
            'css/',
            'js/',
            'index.html'
        ],

        // Watch for changes.
        watch: {
            scripts: {
                files: ['src/**/*.*'],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Default task(s).
    grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin']);

};
