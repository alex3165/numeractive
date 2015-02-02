module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.initConfig({
        // lint the code with project jshintrc definition
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
                dest: 'public/css/style.css'
            }
        }
	});
    grunt.registerTask('default', ['jshint', 'stylus']);
}