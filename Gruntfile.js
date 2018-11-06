module.exports = grunt => {

    // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns.
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
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
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin']);

};
