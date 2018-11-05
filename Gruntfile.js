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

        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, cwd: 'src/', src: ['js/**'], dest: '.'}
                ],
            },
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
    grunt.registerTask('default', ['cssmin', 'copy', 'htmlmin']);

};
