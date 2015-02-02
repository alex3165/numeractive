module.exports = function(grunt) {

	grunt.initConfig({

        watch: {
            scripts: {
                files: ['public/*.js', 'public/modules/**/*.js'],
                tasks: ['jshint']
            },
            css: {
                files: ['public/style.styl', 'public/modules/**/*.styl'],
                tasks: ['stylus']
            }
        },

        jshint: {
            src: ['public/js/*.js'],
            options: {
                jshintrc: true
            }
        },

        stylus: {
            'dev': {
                options: {
                    compress: false
                },
                src: ['public/style.styl'],
                dest: 'public/dist/style.css'
            }
        },
	});

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('run', ['watch', 'stylus', 'jshint']);

};