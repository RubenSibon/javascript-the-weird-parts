module.exports = grunt => {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Project configuration.
    grunt.initConfig({

        // Copy assets.
        copy: {
            main: {
                files: [
                    // Includes files within path.
                    {expand: true, src: ['./robots.txt'], dest: 'dist/', filter: 'isFile'},
                ],
            },
        },

        // Clean compiled assets.
        clean: [
            '.cache/',
            'dist/'
        ],

        jsdoc: {
            dist: {
                src: ['./js/*.js', './js/lib/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['copy', 'jsdoc']);

};
